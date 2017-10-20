<template>
    <el-col class="main-panel" :span="21">
        <el-popover class="popover" ref="popover" width="700" v-model="visible">
            <div class="inputs-box">
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
            this.editor = this.$refs.editor;
            if (this.$route.name === 'edit') {  // 编辑模板时，初始化模板内容
                this.tplId = this.$route.params.id;
                this.initEditContentData();
                this.initEditTplData();
            } else {
                this.getDateAsTplId();
            }
            this.initPopoverAction();
        },
        data () {
            return {
                content: '',
                visible: false,
                fileList: [],
                title: '',
                desc: ''
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
                axios.get(
                'http://localhost:3000/editor/getContentById', {
                    params: {
                        id: this.tplId
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
            getDateAsTplId () { // 新建模板时，获取当前时间戳作为模板ID
                let date = new Date().getTime();
                this.tplId = String(date);
                console.log(date);
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
                let tplId = this.tplId;
                this.toPreview()
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        this.$store.dispatch('showModal', tplId);
                    } else {
                        this.$message.error('无法预览，请稍后重试');
                    }
                })
                .catch(err => {
                    this.$message.error(`无法预览，请稍后重试，${err}`);
                });
            },
            previewPCPageTpl () {
                let tplId = this.tplId;
                this.toPreview()
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        let pcLink = `//127.0.0.1:3000/preview/PC/${tplId}`;
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
                if (this.$route.name === 'edit') {
                    editorContentLink = 'http://localhost:3000/editor/updateContent';
                } else {
                    editorContentLink = 'http://localhost:3000/editor/addContent';
                }
                return axios.post(editorContentLink, {
                    id: this.tplId,
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
            saveTogether () {
                let boolean = this.checkBeforeRequest();
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
            checkBeforeRequest () {
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