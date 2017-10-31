<template>
    <div class="container">
        <form class="form">
            <h1>文案管理系统后台登录</h1>
            <label>账号：<input type="text" name="userName" v-model="userName"/></label>
            <label>密码：<input type="password" name="password" v-model="password"/></label>
            <el-button @click="toLogin">登录</el-button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import router from 'pro/router';

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
                axios.post(
                'http://localhost:3000/login/signIn', {
                    userName: this.userName,
                    password: this.password
                })
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        router.go(-1);
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

        h1 {
            margin-bottom: 30px;
            line-height: 1;
            text-align: center;
            font-size: 16px;
            color: #fff;
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
        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0;
        }
        input[type=text]:focus, input[type=password]:focus{
            -webkit-box-shadow: 0 0 0;
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