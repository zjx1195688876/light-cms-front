<template>
    <div class="container">
        <div class="page404">
            <h1 class="h_404">404</h1>
            <el-button class="btn_404" @click="toHome">返回首页</el-button>
        </div>
    </div>
</template>

<script>
    import router from 'pro/router';

    export default {
        name: 'NotFound',
        methods: {
            toHome () {
                router.push({name: 'index'});
            }
        }
    };
</script>

<style lang="scss" scope>
    .container {
        background-image: url('https://haitao.nos.netease.com/d22f723c-12f3-400a-81ff-644849d529fe.jpg');
        background-size: cover;
        height: 100%;
        .page404 {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .h_404 {
                height: 223px;
                line-height: 223px;
                font-size: 150px;
                font-weight: 700;
                text-align: center;
                color: #f0f0f0;
            }
            .btn_404 {
                display: block;
                margin: 150px auto 0;
                width: 300px;
                height: 50px;
                background-color: #1b7878;
                font-size: 16px;
                color: #fff;
                cursor: pointer;
                border: none;
                border-radius: 0;
                letter-spacing: 10px;
            }
        }
    }
</style>