<template>
    <el-row>
        <el-col :span="24" class="header">
            <div class="grid-content bg-purple-dark header-container clearfix">
                <div class="logo">
                    <img src="../assets/logo.png">
                    <span>轻量级后台管理系统</span>
                </div>
                <div class="user">
                    <span>你好，使用者</span>
                    <a class="logout" href="javascript:void(0)" @click="logout">退出</a>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'HeaderNav',
        methods: {
            logout () {
                alert('登出');
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
            .logout {
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