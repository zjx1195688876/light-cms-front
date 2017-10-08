<template>
    <div>
        <el-col class="main-panel" :span="21">
           <mavon-editor v-model="editorVal" class="editor" @save="saveEditor"/>
        </el-col>
        <div class="edit-btn-box">
            <el-button @click="previewH5PageTpl">预览H5</el-button>
            <el-button @click="previewPCPageTpl">预览PC</el-button>
        </div>
    </div>
    
</template>

<script>
    import Vue from 'vue';
    import router from 'pro/router';
    import mavonEditor from 'mavon-editor';
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
                console.log(this.editorVal);
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
        bottom: 10px;
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