<template>
    <el-col :span="3">
        <h1>
            <span>[</span>
             bracket
             <span>]</span>
        </h1>
        <el-menu default-active="0" @open="handleOpen" @close="handleClose" theme="dark">
            <Menus v-for="(menus, index) in menus"
                :menus="menus"
                :key="menus.id"
            ></Menus>
        </el-menu>
    </el-col>
</template>

<script>
    import Menus from 'pro/components/Menus.vue';

    export default {
        name: 'LeftMenu',
        data () {
            return {
                // menus: [
                //     {
                //         id: 1,
                //         parentId: '',
                //         level: 1,
                //         title: '导航1',
                //         url: 'http://www.baidu.com',
                //         children: [
                //             {
                //                 id: 2,
                //                 parentId: 1,
                //                 level: 2,
                //                 title: '导航1-1',
                //                 url: 'http://www.baidu.com'
                //             },
                //             {
                //                 id: 3,
                //                 parentId: 1,
                //                 level: 2,
                //                 title: '导航1-2',
                //                 url: 'http://www.kaola.com'
                //             }
                //         ]
                //     },
                //     {
                //         id: 4,
                //         parentId: '',
                //         level: 1,
                //         title: '导航2',
                //         url: 'http://www.baidu.com',
                //         children: [
                //             {
                //                 id: 5,
                //                 parentId: 4,
                //                 level: 2,
                //                 title: '导航2-1',
                //                 url: 'http://www.baidu.com'
                //             }
                //         ]
                //     },
                //     {
                //         id: 6,
                //         parentId: '',
                //         level: 1,
                //         title: '导航3',
                //         url: 'http://www.baidu.com'
                //     }
                // ]
                menus: [
                    {
                        id: 1,
                        parentId: '',
                        level: 1,
                        title: '首页',
                        url: 'index'
                    },
                    {
                        id: 2,
                        parentId: '',
                        level: 1,
                        title: '预览',
                        url: 'preview',
                        params: {
                            pageId: '123'
                        }
                    },
                    {
                        id: 3,
                        parentId: '',
                        level: 1,
                        title: '登录',
                        url: 'login'
                    }
                ]
            };
        },
        components: {
            Menus
        },
        methods: {
            handleOpen (key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose (key, keyPath) {
                console.log(key, keyPath);
            }
        }
    };
</script>

<style lang="scss" scope>
    h1 {
        margin: 0 0 0 10px;
        height: 50px;
        line-height: 50px;
        text-align: left;
        font-size: 30px;
        font-weight: normal;
        span {
            color: #1caf9a;
        }
    }
    .el-menu--dark {
        background-color: #1d2939;
    }
    .el-menu-item, .el-submenu__title {
        height: 50px;
        text-align: left;
    }
</style>