<template>
    <el-col class="main-panel" :span="21">
        <Popover>
            <div slot="popover">
                <div>上传图片</div>
                <div>填写标题</div>
                <div>填写描述</div>
            </div>
        </Popover>
        <mavon-editor v-model="editorVal" class="editor" @save="saveEditor"/>
        <div class="edit-btn-box">
            <el-button @click="previewH5PageTpl">预览H5</el-button>
            <el-button @click="previewPCPageTpl">预览PC</el-button>
        </div>
    </el-col>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';
    import router from 'pro/router';
    import mavonEditor from 'mavon-editor';
    import Popover from 'pro/components/Popover';
    import 'mavon-editor/dist/css/index.css';

    Vue.use(mavonEditor);

    export default {
        name: 'Edit',
        mounted () {
            this.getDateAsTplId();
        },
        data () {
            return {
                editorVal: ''
            };
        },
        components: {
            Popover
        },
        methods: {
            getDateAsTplId () {
                let date = new Date().getTime();
                this.tplId = String(date);
                console.log(date);
            },
            previewH5PageTpl () {
                let tplId = this.tplId;
                this.$store.dispatch('showModal', tplId);
            },
            previewPCPageTpl () {
                let tplId = this.tplId;
                router.push({name: 'preview', params: {id: tplId}, query: { type: 'tpl' }});
            },
            saveEditor () {
                // this.show
                this.postEditorVal();
            },
            postEditorVal () {
                axios.post(
                'http://localhost:3000/tpl/postEditorVal', {
                    id: this.tplId,
                    value: this.editorVal
                })
                .then(res => {
                    console.log(res);
                    let data = res.data;
                    if (data && data.code === 200) {
                        // this.tplList = data.body;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }
    };
</script>

<style lang="scss" scope>
    .main-panel {
        .editor {
            margin: auto;
            min-height: 870px;
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