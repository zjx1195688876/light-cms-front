<template>
    <div>
        <label>账号：<input type="text" name="userName" v-model="userName"/></label>
        <label>密码：<input type="text" name="password" v-model="password"/></label>
        <el-button @click="toLogin">登录</el-button>
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
                axios.post(
                'http://localhost:3000/login/signIn', {
                    userName: this.userName,
                    password: this.password
                })
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        router.go(-1);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }
    };
</script>

<style>

</style>