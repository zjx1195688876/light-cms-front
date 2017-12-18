<template>
    <div class="container">
        <form class="form" autocomplete="off">
            <h1 class="title">文案管理系统后台登录</h1>
            <label>账号：<input name="userName" v-model="userName"/></label>
            <label>密码：<input class="password" name="password" v-model="password"/></label>
            <el-button @click="toLogin">登录</el-button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import router from 'pro/router';
    import _ from 'pro/lib/util';
    import { Service } from 'pro/service';

    export default {
        name: 'Login',
        props: [
            'isLogin'
        ],
        data () {
            return {
                userName: '',
                password: ''
            };
        },
        methods: {
            toLogin () {
                if (!this.userName.trim()) {
                    this.$message.error('请输入用户名');
                    return;
                }
                if (!this.password.trim()) {
                    this.$message.error('请输入密码');
                    return;
                }
                axios.post(Service.signIn, {
                    username: this.username,
                    password: this.password
                })
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        _.$setCookie('userFront', true, 10);
                        router.push({name: 'index'});
                    } else {
                        this.$message.error(data.message || '未知错误');
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
    .container {
        background-image: url('https://haitao.nos.netease.com/d22f723c-12f3-400a-81ff-644849d529fe.jpg');
        background-size: cover;
        height: 100%;
    }
    .form {
        position: fixed;
        top: 50%;
        left: 50%;
        margin: -150px -250px;
        width: 500px;
        height: 300px;
        padding: 20px 30px;
        background-color: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);

        .title {
            margin-bottom: 30px;
            padding: 0;
            height: auto;
            line-height: 1;
            text-align: center;
            font-size: 16px;
            color: #fff;
            background: none;
        }

        label {
            display: block;
            padding: 0 10px;
            margin-bottom: 20px;
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            color: #fff;
            background: rgba(225, 222, 222, 0.2);
        }

        input {
            display: inline-block;
            width: 370px;
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            color: #fff;
            border: none;
            outline: none;
            background: none;
        }

        .password {
            -webkit-text-security: disc;
        }

        .el-button {
            width: 100%;
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
</style>