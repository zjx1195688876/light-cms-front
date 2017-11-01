<template>
    <el-col class="main-panel" :span="21">
        <div class="search-bar">
            <label for="search">
                <input class="search" type="text" name="search" placeholder="搜索模板">
                <i class="el-icon-search"></i>
            </label>
        </div>
        <div v-if="pageType !== 'chooseTpl'" class="index-btn-box">
            <el-button type="primary" @click="newPageTpl">新建模板</el-button>
        </div>
        <el-row class="tpl-list">
            <el-col :span="6" v-for="(tplItem, index) in tplList" :key="tplItem.id">
                <PageTpl
                    :tplItem="tplItem"
                    :pageType="pageType"
                ></PageTpl>
            </el-col>
        </el-row>
        <div class="pager">
            <el-pagination @current-change="handleCurrentChange" 
                :current-page.sync="currentPage" :page-size="limit" :total="total"
                layout="prev, pager, next, jumper">
            </el-pagination>
        </div>
    </el-col>
</template>

<script>
    import axios from 'axios';
    import PageTpl from 'pro/components/PageTpl.vue';
    import router from 'pro/router';

    export default {
        name: 'Index',
        components: {
            PageTpl
        },
        mounted () {
            if (this.$route.name === 'chooseTpl') {
                this.pageType = 'chooseTpl';
            }
            this.getTotal();
            this.getTplList(1);
        },
        data () {
            return {
                tplList: [],
                pageType: 'index',
                currentPage: 1,
                limit: 10,
                total: 0
            };
        },
        methods: {
            newPageTpl () {
                router.push({name: 'add', query: { type: 'tpl' }});
            },
            getTotal () {
                axios.get(
                'http://localhost:3000/tpl/getTotal')
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        this.total = data.body;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            },
            getTplList (currentPage) {
                axios.get(
                'http://localhost:3000/tpl/getTplList', {
                    params: {
                        limit: this.limit,
                        currentPage
                    }
                })
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        this.tplList = data.body;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            },
            handleCurrentChange (val) {
                this.getTplList(val);
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
    .index-btn-box {
        padding: 15px 15px 0;
    }
    .tpl-list {
        padding: 0 5px;
    }
    .pager {
        padding: 15px;
        .el-pagination {
            float: right;
            button, span {
                font-size: 12px;
            }
        }
    }
</style>