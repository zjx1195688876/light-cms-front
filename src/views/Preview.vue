<template>
    <el-col class="main-panel" :span="21">
       <div class="preview-phone">
           <iframe class="preview-page" src=""></iframe>
       </div>
    </el-col>
</template>

<script>
    export default {
        name: 'Preview',
        created () {
            console.log(this.$route);
        },
        methods: {}
    };
</script>

<style lang="scss" scope>
    .preview {
        &-phone {
            margin: 25px auto; 
            padding-top: 100px;
            width: 410px;
            height: 890px;
            background-image: url('../assets/phone.png');
            background-size: 410px 890px;
            background-repeat: no-repeat;
        }
        &-page {
            display: block;
            margin: 0 auto;
            width: 375px;
            height: 667px;
            border: none;
            outline: none;
            background-color: #fff;
        }
    }
</style>