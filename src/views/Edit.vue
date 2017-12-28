<template>
    <el-col class="main-panel" :span="21">
        <el-popover class="popover" ref="popover" width="700" v-model="visible">
            <!-- 编辑模板 -->
            <div class="inputs-box" v-if="pageType === 'tpl'">
                <el-upload
                    :action="uploadUrl"
                    :on-remove="removeFile"
                    :on-success="uploadFileSuccess"
                    :file-list="fileList">
                    <el-button type="primary" size="small">
                        点击上传截图
                        <i class="el-icon-upload el-icon--right"></i>
                    </el-button>
                </el-upload>
                <el-input placeholder="请填写标题" v-model="title">
                    <template slot="prepend">填写标题</template>
                </el-input>
                <el-input placeholder="请填写描述" v-model="desc">
                    <template slot="prepend">填写描述</template>
                </el-input>
            </div>
            <!-- 编辑模板 -->
            <!-- 编辑页面 -->
            <div class="inputs-box" v-if="pageType === 'page'">
                <el-input placeholder="请填写页面标题" v-model="pageTitle">
                    <template slot="prepend">页面标题</template>
                </el-input>
                <el-input placeholder="请填写页面名称" v-model="pageName">
                    <template slot="prepend">页面名称</template>
                </el-input>
            </div>
            <!-- 编辑页面 -->
            <el-button class="save-btn" type="primary" @click="saveTogether">保存</el-button>
        </el-popover>
        <!-- markdown -->
        <div v-if="tplStyle == 0">
            <mavon-editor ref="editor" :toolbars="toolbars" v-model="content" class="editor" @imgAdd="imgAdd" @change="change"/>
            <span class="extend-left-bar" ref="extendLeftBar">
                <el-button type="primary" @click="saveEditor">保存</el-button>
                <el-button type="primary" @click="previewH5PageTpl">预览H5</el-button>
                <el-button type="primary" @click="previewPCPageTpl">预览PC</el-button>
            </span>
        </div>
        <!-- markdown -->

        <!-- 富文本 -->
        <div v-if="tplStyle == 1" style="position: relative">
            <froala ref="froala" :config="config" @input="change" v-model="content"></froala>
            <span class="extend-froala">
                <el-button type="primary" @click="saveEditor">保存</el-button>
                <el-button type="primary" @click="previewH5PageTpl">预览H5</el-button>
                <el-button type="primary" @click="previewPCPageTpl">预览PC</el-button>
            </span>
        </div>
        <!-- 富文本 -->
    </el-col>
</template>

<script>
    // Require Froala Editor js file.
    require('froala-editor/js/froala_editor.pkgd.min');

    // Require Froala Editor css files.
    require('froala-editor/css/froala_editor.pkgd.min.css');
    require('font-awesome/css/font-awesome.css');
    require('froala-editor/css/froala_style.min.css');

    import Vue from 'vue';
    import axios from 'axios';
    import mavonEditor from 'mavon-editor';
    import VueFroala from 'vue-froala-wysiwyg';
    import _ from 'pro/lib/util';
    import 'mavon-editor/dist/css/index.css';
    import { Service } from 'pro/service';

    Vue.use(mavonEditor);
    Vue.use(VueFroala);

    export default {
        name: 'Edit',
        created () {
            this.pageType = this.$route.query.type;
            this.tplStyle = this.$route.query.tplStyle;
        },
        mounted () {
            this.initEditor();
            this.checkStorage(); // 校验是否上次无保存退出
            if (this.$route.query.type === 'tpl') { // 模板
                if (this.$route.name === 'edit') {  // 编辑模板时，初始化模板内容
                    this.tplId = this.$route.params.id;
                    this.initEditContentData();
                    this.initEditTplData();
                } else {
                    this.getDateAsId();
                }
            } else {  // 页面
                if (this.$route.name === 'edit') {
                    this.pageId = this.$route.params.id;
                    this.initEditContentData();
                    this.initEditPageData();
                } else {
                    this.tplId = this.$route.query.id;
                    this.initEditContentData();
                    this.getDateAsId();
                }
            }
            this.initPopoverAction();
        },
        data () {
            return {
                tplStyle: '0', // 模板类型，0为markdown，1为富文本
                content: '',    // markdown的content
                config: {
                    placeholderText: '请输入内容...',
                    imageUploadURL: Service.froalaUpload,
                    fileUploadURL: Service.froalaUpload,
                    videoUploadURL: Service.froalaUpload
                },
                imgIndex: 0,    // 上传图片的index
                visible: false, // popvoer是否可见
                fileList: [],   // popover的上传的图片列表
                title: '',  // 模板title
                desc: '',   // 模板desc
                pageType: '',   // 当前页面的type, 是来自管理模板还是管理页面
                pageTitle: '',  // 页面标题
                pageName: '',   // 页面名称
                pageId: '',  // 页面id
                uploadUrl: Service.upload,
                isChooseStorage: false, // 是否使用了缓存的数据，若为true,那就不发请求了，直接用缓存的数据
                toolbars: {
                    'bold': true,
                    'italic': true,
                    'header': true,
                    'underline': true,
                    'strikethrough': true,
                    'mark': true,
                    'superscript': true,
                    'subscript': true,
                    'quote': true,
                    'ol': true,
                    'ul': true,
                    'link': true,
                    'imagelink': true,
                    'code': true,
                    'table': true,
                    'undo': true,
                    'redo': true,
                    'trash': true,
                    'save': false,
                    'alignleft': true,
                    'aligncenter': true,
                    'alignright': true,
                    'navigation': true,
                    'subfield': true,
                    'fullscreen': true,
                    'readmodel': true,
                    'htmlcode': true,
                    'help': true,
                    'preview': true
                }
            };
        },
        methods: {
            initEditor () {
                if (String(this.tplStyle) === '0') {
                    this.editor = this.$refs.editor || '';
                    const toolbarLeft = this.editor && this.editor.$refs.toolbar_left;
                    const extendLeftBar = this.editor && this.$refs.extendLeftBar;
                    this.editor && toolbarLeft.$el.append(extendLeftBar);
                } else if (String(this.tplStyle) === '1') {
                    this.froala = this.$refs.froala || '';
                    console.log(this.froala);
                }
            },
            checkStorage () {
                const editorStorage = localStorage.getItem('editorStorage') || '';
                const editorId = localStorage.getItem('editorId') || '';
                const editorName = localStorage.getItem('editorName') || '';
                const tplStyle = localStorage.getItem('tplStyle') || '';
                this.editorId = this.$route.params.id || this.$route.query.id || '0';
                this.name = this.$route.name;
                this.tplStyle = String(this.$route.query.tplStyle);
                if (this.editorId === editorId && this.name === editorName && this.tplStyle === tplStyle) {
                    this.confirmStorageModal(editorStorage);
                } else {
                    localStorage.setItem('editorId', '');
                    localStorage.setItem('editorName', '');
                    localStorage.setItem('editorStorage', '');
                    localStorage.setItem('tplStyle', '');
                }
            },
            confirmStorageModal (editorStorage) {
                if (editorStorage) {
                    this.$confirm('上次异常退出，是否恢复之前的文案？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        this.content = editorStorage;
                        this.isChooseStorage = true;
                    }).catch(() => {
                        localStorage.setItem('editorId', '');
                        localStorage.setItem('editorName', '');
                        localStorage.setItem('editorStorage', '');
                        localStorage.setItem('tplStyle', '');
                    });
                }
            },
            imgAdd (filename, file) {
                let formData = new FormData();
                formData.append('file', file);
                axios.post(Service.upload, formData)
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        this.editor.$img2Url(`./${this.imgIndex}`, data.body.url);
                        this.imgIndex++;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            },
            change () {
                if (!this.init) {
                    setTimeout(() => {
                        try {
                            localStorage.setItem('editorName', this.name);
                            localStorage.setItem('editorId', this.editorId);
                            localStorage.setItem('editorStorage', this.content);
                            localStorage.setItem('tplStyle', this.tplStyle);
                        } catch (e) {
                            console.warn(`localStorage已无法写入，原因如下：${e}`);
                        }
                    }, 2000);
                }
                if (this.content) {
                    this.init = false;
                }
            },
            initEditContentData () {
                // 若使用了缓存的数据，直接返回缓存的数据，不发请求了
                if (this.isChooseStorage) {
                    return;
                }

                let id;
                if (this.$route.query.type === 'page' && this.$route.name === 'edit') {
                    id = this.pageId;
                } else {
                    id = this.tplId;
                }
                axios.get(Service.getContentById, {
                    params: {
                        id
                    }
                })
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        this.content = data.body.content;
                        this.init = true;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            },
            initEditTplData () {
                axios.get(Service.getTplItemById, {
                    params: {
                        id: this.tplId
                    }
                })
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        var body = data.body;
                        this.fileList.push({name: body.imgName, url: body.imgUrl});
                        this.title = body.title;
                        this.desc = body.desc;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            },
            initEditPageData () {
                axios.get(Service.getPageById, {
                    params: {
                        id: this.pageId
                    }
                })
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        var body = data.body;
                        this.pageTitle = body.title;
                        this.pageName = body.name;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            },
            getDateAsId () { // 新建模板时，获取当前时间戳作为模板ID
                let date = new Date().getTime();
                if (this.$route.query.type === 'tpl') {
                    this.tplId = String(date) + _.$uuid(5, 10);
                } else {
                    this.pageId = String(date) + _.$uuid(5, 10);
                }
            },
            saveEditor ($event) {
                this.visible = true;
                var popover = document.getElementsByClassName('popover')[0] || '';
                if (popover) {
                    popover.style.top = ($event.pageY || $event.clientY) + 30 + 'px';
                    popover.style.left = ($event.pageX || $event.clientX) - 350 + 'px';
                }
            },
            initPopoverAction () {  // 初始化popover的action
                document.getElementById('app').addEventListener('click', ($event) => {
                    // if ($event.target.title.indexOf('保存') > -1) {
                    //     this.visible = true;
                    //     var popover = document.getElementsByClassName('popover')[0] || '';
                    //     if (popover) {
                    //         popover.style.top = ($event.pageY || $event.clientY) + 30 + 'px';
                    //         popover.style.left = ($event.pageX || $event.clientX) - 350 + 'px';
                    //     }
                    // } else {
                    this.visible = false;
                    // }
                }, true);
                // popvoer内点击不触发隐藏popover的逻辑
                document.getElementsByClassName('el-popover')[0].addEventListener('click', () => {
                    this.visible = true;
                }, true);
            },
            previewH5PageTpl () {
                this.toPreview()
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        this.$store.dispatch('showModal');
                    } else {
                        this.$message.error('无法预览，请稍后重试');
                    }
                })
                .catch(err => {
                    this.$message.error(`无法预览，请稍后重试，${err}`);
                });
            },
            previewPCPageTpl () {
                this.toPreview()
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        let pcLink = Service.previewPC;
                        window.open(pcLink);
                    } else {
                        this.$message.error('无法预览，请稍后重试');
                    }
                })
                .catch(err => {
                    this.$message.error(`无法预览，请稍后重试，${err}`);
                });
            },
            removeFile (res) {
                this.fileList.forEach((file, index) => {
                    if (file.url === res.url) {
                        this.fileList.splice(index, 1);
                    }
                });
            },
            uploadFileSuccess (res) {
                if (res && res.code === 200 && res.body) {
                    this.fileList.push(res.body);
                }
            },
            toPreview () {
                return axios.post(Service.updateContent, {
                    content: this.content
                });
            },
            addOrUpdateContent () {
                let id;
                if (this.$route.query.type === 'tpl') {     // 模板
                    id = this.tplId;
                } else {   // 页面
                    id = this.pageId;
                }
                return axios.post(Service.addOrUpdateContent, {
                    id,
                    content: this.content
                });
            },
            addOrUpdateTpl () {
                return axios.post(Service.addOrUpdateTpl, {
                    id: this.tplId,
                    imgName: (this.fileList[0] && this.fileList[0].name) || '',
                    imgUrl: (this.fileList[0] && this.fileList[0].url) || '',
                    title: this.title,
                    desc: this.desc,
                    tplStyle: this.tplStyle
                });
            },
            addOrUpdatePage () {
                return axios.post(Service.addOrUpdatePage, {
                    id: this.pageId,
                    title: this.pageTitle,
                    name: this.pageName
                });
            },
            addOrUpdateFile () {
                return axios.post(Service.addOrUpdateFile, {
                    id: this.pageId,
                    title: this.pageTitle,
                    name: this.pageName,
                    content: this.content
                });
            },
            saveTogether () {
                if (this.pageType === 'tpl') {
                    this.saveTplTogether();
                } else {
                    this.savePageTogether();
                }
            },
            savePageTogether () {
                let boolean = this.checkPageBeforeRequest();
                if (!boolean) {
                    return;
                }
                // 保存page为html文件
                axios.all([this.addOrUpdatePage(), this.addOrUpdateContent(), this.addOrUpdateFile()])
                .then(axios.spread((pageRes, editorRes, fileRes) => {
                    let pageData = pageRes.data;
                    let editorData = editorRes.data;
                    let fileData = fileRes.data;
                    if (pageData && pageData.code === 200 &&
                        editorData && editorData.code === 200 &&
                        fileData && fileData.code === 200) {
                        this.$message({
                            message: '保存成功！',
                            type: 'success'
                        });
                        this.visible = false;
                        localStorage.setItem('editorId', '');
                        localStorage.setItem('editorName', '');
                        localStorage.setItem('editorStorage', '');
                        localStorage.setItem('tplStyle', '');
                    }
                }))
                .catch(err => {
                    console.log(err);
                });
            },
            saveTplTogether () {
                let boolean = this.checkTplBeforeRequest();
                if (!boolean) {
                    return;
                }
                axios.all([this.addOrUpdateTpl(), this.addOrUpdateContent()])
                .then(axios.spread((tplRes, editorRes) => {
                    let tplData = tplRes.data;
                    let editorData = editorRes.data;
                    if (tplData && tplData.code === 200 && editorData && editorData.code === 200) {
                        this.$message({
                            message: '保存成功！',
                            type: 'success'
                        });
                        this.visible = false;
                        localStorage.setItem('editorId', '');
                        localStorage.setItem('editorName', '');
                        localStorage.setItem('editorStorage', '');
                        localStorage.setItem('tplStyle', '');
                    }
                }))
                .catch(err => {
                    console.log(err);
                });
            },
            checkTplBeforeRequest () {
                let checkObj = {
                    0: this.content,
                    1: (this.fileList[0] && this.fileList[0].url) || '',
                    2: this.title,
                    3: this.desc
                };
                let message = ['不要上传空模板', '上传截图', '填写标题', '填写描述'];
                for (let key in checkObj) {
                    if (!checkObj[key]) {
                        this.$message.error('请' + message[key]);
                        return false;
                    }
                }
                return true;
            },
            checkPageBeforeRequest () {
                let checkObj = {
                    0: this.content,
                    1: this.pageTitle,
                    2: this.pageName
                };
                let message = ['不要上传空页面', '填写页面标题', '填写页面名称'];
                for (let key in checkObj) {
                    if (!checkObj[key]) {
                        this.$message.error('请' + message[key]);
                        return false;
                    }
                }
                return true;
            }
        }
    };
</script>

<style lang="scss" scope>
    .main-panel {
        .popover {
            display: block;
            position: absolute;
        }
        .inputs-box {
            &>div {
                margin-bottom: 15px;
            }
        }
        // markdown 的样式
        .editor {
            margin: auto;
            min-height: 895px;
        }
        .save-btn {
            float: right;
        }
        // 富文本的样式
        .fr-toolbar {
            border-top: none;
        }
        .fr-box.fr-basic .fr-element {
            min-height: 815px;
        }
    }
    .edit-btn-box {
        z-index: 9999;
        position: fixed;
        right: 10px;
        bottom: 30px;
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: rgba(0,0,0,.3);
        .el-button {
            display: inline-block;
            padding: 0;
            width: 70px;
            height: 33px;
            line-height: 33px;
            font-size: 12px;
            color: #636e7b;
        }
    }
    .extend-froala {
        position: absolute;
        top: 3px;
        right: 250px;
        z-index: 9999;
    }
    .extend-left-bar, .extend-froala {
        margin-left: 160px;
        .el-button {
            padding: 0;
            width: 62px;
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            // color: #636e7b;
        }
    }
</style>