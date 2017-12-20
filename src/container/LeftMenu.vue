<template>
    <el-col class="left-panel" :span="3">
        <h1>
            <span>[</span>
             bracket
             <span>]</span>
        </h1>
        <el-menu :default-active="active_index" @open="handleOpen" @close="handleClose" theme="dark">
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
                active_index: '1',
                menus: [
                    {
                        id: 1,
                        parentId: '',
                        level: 1,
                        title: '模板管理',
                        url: 'index'
                    },
                    {
                        id: 2,
                        parentId: '',
                        level: 1,
                        title: '页面管理',
                        url: 'pageManage'
                    }
                    /* {
                        id: 2,
                        parentId: '',
                        level: 1,
                        title: '预览',
                        url: 'preview',
                        params: {
                            pageId: '123'
                        }
                    } */
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
        },
        created () {
            const pageArr = ['index', 'pageManage'];
            pageArr.map((item, index) => {
                if (item === this.$route.name) {
                    this.active_index = String(index + 1);
                };
            });
        }
    };
</script>

<style lang="scss" scope>
    .left-panel {
        min-height: 1000px;
        background-color: #1d2939;
    }
    h1 {
        margin: 0;
        padding: 0 0 0 10px;
        height: 50px;
        line-height: 50px;
        text-align: left;
        font-size: 30px;
        font-weight: normal;
        background-color: #fff;
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