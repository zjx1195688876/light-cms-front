<template>
    <el-col class="main-panel" :span="21">
        <div class="search-bar">
            <label for="search">
                <input class="search" type="text" name="search" placeholder="搜索模板">
                <i class="el-icon-search"></i>
            </label>
        </div>
        <div class="btn-box">
            <el-button type="primary" @click="newPageTpl">新建模板</el-button>
        </div>
        <el-row class="tpl-list">
            <el-col :span="6" v-for="(tplItem, index) in tplList" :key="tplItem.id">
                <PageTpl
                    :tplItem="tplItem"
                ></PageTpl>
            </el-col>
        </el-row>

        <!-- <router-link href="javascript:void(0);" to="/login">去登陆</router-link>
        <router-link href="javascript:void(0);" :to="{ name: 'preview', params: { id: '123'}}">点击前往</router-link> -->
    </el-col>
</template>

<script>
    import PageTpl from 'pro/components/PageTpl.vue';

    export default {
        name: 'Index',
        components: {
            PageTpl
        },
        data () {
            return {
                tplList: [
                    {
                        id: '001',
                        imgUrl: 'http://themetrace.com/demo/bracket/images/photos/blog1.jpg',
                        title: '模板标题1',
                        desc: '模板描述1模板描述1模板描述1模板描述1模板描述1模板描述1模板描述1模板描述1模板描述1'
                    },
                    {
                        id: '002',
                        imgUrl: 'http://themetrace.com/demo/bracket/images/photos/blog1.jpg',
                        title: '模板标题2',
                        desc: '模板描述2'
                    },
                    {
                        id: '003',
                        imgUrl: 'http://themetrace.com/demo/bracket/images/photos/blog1.jpg',
                        title: '模板标题3',
                        desc: '模板描述3'
                    },
                    {
                        id: '004',
                        imgUrl: 'http://themetrace.com/demo/bracket/images/photos/blog1.jpg',
                        title: '模板标题4',
                        desc: '模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4'
                    },
                    {
                        id: '001',
                        imgUrl: 'http://themetrace.com/demo/bracket/images/photos/blog1.jpg',
                        title: '模板标题1',
                        desc: '模板描述1模板描述1模板描述1模板描述1模板描述1模板描述1模板描述1模板描述1模板描述1'
                    },
                    {
                        id: '002',
                        imgUrl: 'http://themetrace.com/demo/bracket/images/photos/blog1.jpg',
                        title: '模板标题2',
                        desc: '模板描述2'
                    },
                    {
                        id: '003',
                        imgUrl: 'http://themetrace.com/demo/bracket/images/photos/blog1.jpg',
                        title: '模板标题3',
                        desc: '模板描述3'
                    },
                    {
                        id: '004',
                        imgUrl: 'http://themetrace.com/demo/bracket/images/photos/blog1.jpg',
                        title: '模板标题4',
                        desc: '模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4模板描述4'
                    }
                ]
            };
        },
        methods: {
            newPageTpl () {
                console.log('新建模板');
            }
        }
    };
</script>

<style lang="scss" scope>
    .search-bar {
        height: 50px;
        border-left: 1px solid #eee;
        background-color: #fff;
        label {
            display: flex;
            float: right;
            width: 250px;
            height: 50px;
            font-size: 14px;
            border-left: 1px solid #eee;
            border-radius: 0;
            .search {
                display: inline-block;
                padding: 18px 20px;
                width: 200px;
                height: 50px;
                outline: none;
                border: none;
            }
            i {
                width: 50px;
                height: 50px;
                line-height: 50px;
                font-size: 16px;
                color: #666;
                text-align: center;
                background-color: #eee;
                cursor: pointer;
                &:hover {
                    background-color: #e0e0e0;
                }
            }
        }
    }
    .btn-box {
        padding: 15px 15px 0;
    }
    .tpl-list {
        padding: 0 5px;
    }
</style>