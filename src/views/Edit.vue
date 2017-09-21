<template>
    <el-col class="main-panel" :span="21">
       <mavon-editor v-model="value" class="editor"/>
    </el-col>
</template>

<script>
    import Vue from 'vue';
    import mavonEditor from 'mavon-editor';
    import 'mavon-editor/dist/css/index.css';

    Vue.use(mavonEditor);

    export default {
        name: 'Edit',
        data () {
            return {
                value: ''
            };
        }
    };
</script>

<style lang="scss" scope>
    .main-panel .editor {
        margin: auto;
        min-height: 870px;
    }
</style>