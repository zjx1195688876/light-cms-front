<template>
    <el-col class="main-panel" :span="21">
        <el-popover class="popover" ref="popover" width="700" v-model="visible">
            <!-- 编辑模板 -->
            <div class="inputs-box" v-if="pageType === 'tpl'">
                <el-upload
                    action="https://nos.kaolafed.com/upload"
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
        <mavon-editor ref="editor" v-model="content" class="editor" @imgAdd="imgAdd"/>
        <div class="edit-btn-box">
            <el-button @click="previewH5PageTpl">预览H5</el-button>
            <el-button @click="previewPCPageTpl">预览PC</el-button>
        </div>
    </el-col>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';
    import mavonEditor from 'mavon-editor';
    import 'mavon-editor/dist/css/index.css';

    Vue.use(mavonEditor);

    export default {
        name: 'Edit',
        mounted () {
            this.pageType = this.$route.query.type;
            this.editor = this.$refs.editor;
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
                content: '',
                visible: false,
                fileList: [],
                title: '',
                desc: '',
                pageType: '',
                pageTitle: '',
                pageName: '',
                pageId: ''
            };
        },
        methods: {
            imgAdd (filename, file) {
                let formData = new FormData();
                formData.append('file', file);
                axios.post('https://nos.kaolafed.com/upload', formData)
                .then(res => {
                    if (res && res.status === 200) {
                        this.editor.$img2Url('./0', res.data.url);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            },
            initEditContentData () {
                let id;
                if (this.$route.query.type === 'page' && this.$route.name === 'edit') {
                    id = this.pageId;
                } else {
                    id = this.tplId;
                }
                axios.get(
                'http://localhost:3000/editor/getContentById', {
                    params: {
                        id
                    }
                })
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        this.content = data.body.content;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            },
            initEditTplData () {
                axios.get(
                'http://localhost:3000/tpl/getTplItemById', {
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
                axios.get(
                'http://localhost:3000/page/getPageById', {
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
                    this.tplId = String(date);
                } else {
                    this.pageId = String(date);
                }
            },
            initPopoverAction () {  // 初始化popover的action
                document.getElementById('app').addEventListener('click', ($event) => {
                    if ($event.target.title.indexOf('保存') > -1) {
                        this.visible = true;
                        var popover = document.getElementsByClassName('popover')[0] || '';
                        if (popover) {
                            popover.style.top = ($event.pageY || $event.clientY) + 30 + 'px';
                            popover.style.left = ($event.pageX || $event.clientX) - 350 + 'px';
                        }
                    } else {
                        this.visible = false;
                    }
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
                        let pcLink = `//127.0.0.1:3000/preview/PC`;
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
                this.fileList.push(res);
            },
            toPreview () {
                return axios.post(
                'http://localhost:3000/preview/updateContent', {
                    content: this.content
                });
            },
            updateEditorContent () {
                let editorContentLink;
                let id;
                if (this.$route.name === 'edit') {
                    editorContentLink = 'http://localhost:3000/editor/updateContent';
                } else {
                    editorContentLink = 'http://localhost:3000/editor/addContent';
                }
                if (this.$route.query.type === 'tpl') {     // 模板
                    id = this.tplId;
                } else {   // 页面
                    id = this.pageId;
                }
                return axios.post(editorContentLink, {
                    id,
                    content: this.content
                });
            },
            updateTpl () {
                let tplLink;
                if (this.$route.name === 'edit') {
                    tplLink = 'http://localhost:3000/tpl/updateTpl';
                } else {
                    tplLink = 'http://localhost:3000/tpl/addTpl';
                }
                return axios.post(tplLink, {
                    id: this.tplId,
                    imgName: (this.fileList[0] && this.fileList[0].name) || '',
                    imgUrl: (this.fileList[0] && this.fileList[0].url) || '',
                    title: this.title,
                    desc: this.desc
                });
            },
            updatePage () {
                let pageLink;
                if (this.$route.name === 'edit') {
                    pageLink = 'http://localhost:3000/page/updatePage';
                } else {
                    pageLink = 'http://localhost:3000/page/addPage';
                }
                return axios.post(pageLink, {
                    id: this.pageId,
                    title: this.pageTitle,
                    name: this.pageName
                });
            },
            updateFile () {
                let fileLink;
                if (this.$route.name === 'edit') {
                    fileLink = 'http://localhost:3000/page/updateFile';
                } else {
                    fileLink = 'http://localhost:3000/page/addFile';
                }
                return axios.post(fileLink, {
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
                axios.all([this.updatePage(), this.updateEditorContent(), this.updateFile()])
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
                axios.all([this.updateTpl(), this.updateEditorContent()])
                .then(axios.spread((tplRes, editorRes) => {
                    let tplData = tplRes.data;
                    let editorData = editorRes.data;
                    if (tplData && tplData.code === 200 && editorData && editorData.code === 200) {
                        this.$message({
                            message: '保存成功！',
                            type: 'success'
                        });
                        this.visible = false;
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
        .editor {
            margin: auto;
            min-height: 870px;
        }
        .save-btn {
            float: right;
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
</style>