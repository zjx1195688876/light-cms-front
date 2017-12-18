<template>
    <el-row>
        <el-col :span="24" class="header">
            <div class="grid-content bg-purple-dark header-container clearfix">
                <div class="logo">
                    <img src="../assets/logo.png">
                    <span>轻量级后台管理系统</span>
                </div>
                <div class="user">
                    <span>你好，{{username}}</span>
                    <a class="signOut" href="javascript:void(0)" @click="signOut">退出</a>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import axios from 'axios';
    import { Service } from 'pro/service';
    import Config from 'pro/config';
    import _ from 'pro/lib/util';

    export default {
        name: 'HeaderNav',
        data () {
            return {
                username: '使用者'
            };
        },
        mounted () {
            this.getUserInfo();
        },
        methods: {
            signOut () {
                axios.post(Service.signOut)
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        _.$deleteCookie('user');
                        window.location.reload(true);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            },
            getUserInfo () {
                axios.get(Service.getUserInfo)
                .then(res => {
                    let data = res.data;
                    this.username = data.body && data.body.username;
                });
            }
        }
    };
</script>

<style lang="scss" scope>
    .header-container {
        width: 100%;
        height: 54px;
        line-height: 54px;
        background-color: #262626;
        color: #fff;
        .logo {
            float: left;
            width: 300px;
            line-height: 54px;
            img {
                display: inline-block;
                margin: 0 10px 0 0;
                width: 36px;
                height: 36px;
                line-height: 54px;
                vertical-align: middle;
            }
            span {
                line-height: 54px;
                font-size: 18px;
            }
        }
        .user {
            float: right;
            height: 54px;
            line-height: 54px;
            font-size: 12px;
            .signOut {
                display: inline-block;
                margin: 0 0 0 20px;
                width: 90px;
                height: 54px;
                color: #fff;
                text-align: center;
                background-color: rgba(100,100,100,.3);
                &:hover {
                    background-color: rgba(100,100,100,.6);
                }
            }
        }
    }
</style>