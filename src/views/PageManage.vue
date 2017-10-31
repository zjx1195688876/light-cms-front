<template>
    <el-col class="main-panel" :span="21">
        <div class="search-bar">
            <label for="search">
                <input class="search" type="text" name="search" placeholder="搜索页面">
                <i class="el-icon-search"></i>
            </label>
        </div>
        <div class="btn-box">
            <el-button type="primary" @click="newPage">新建页面</el-button>
        </div>
        <el-table :data="pageList" border class="page-list">
            <el-table-column prop="id" label="页面id" width="180"></el-table-column>
            <el-table-column prop="name" label="页面名称"></el-table-column>
            <el-table-column label="查看效果">
                <template slot-scope="scope">
                <el-button @click="linkPC(scope.row)">查看PC</el-button>
                <el-button @click="linkH5(scope.row)">查看H5</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                <el-button @click="editPage(scope.row)">编辑</el-button>
                <el-button @click="removePage(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
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
    import router from 'pro/router';

    export default {
        name: 'PageManage',
        data () {
            return {
                pageList: [],
                currentPage: 1,
                limit: 10,
                total: 0
            };
        },
        mounted () {
            this.getTotal();
            this.getPageList(1);
        },
        methods: {
            getTotal () {
                axios.get(
                'http://localhost:3000/page/getTotal')
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        this.total = data.total;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            },
            getPageList (currentPage) {
                axios.get(
                'http://localhost:3000/page/getPageList', {
                    params: {
                        limit: this.limit,
                        currentPage
                    }
                })
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        this.pageList = data.body;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            },
            newPage () {
                router.push({name: 'chooseTpl'});
            },
            linkPC (row) {
                let src = `http://localhost:3000/pages/pc/${row.id}.html`;
                window.open(src);
            },
            linkH5 (row) {
                let src = `http://localhost:3000/pages/h5/${row.id}.html`;
                this.$store.dispatch('showModal', src);
            },
            editPage (row) {
                router.push({name: 'edit', params: {id: row.id}, query: { type: 'page' }});
            },
            removePage (row) {
                axios.post(
                'http://localhost:3000/page/removePage', {
                    id: row.id
                })
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        this.getTotal();
                        this.$message({
                            message: '删除成功！',
                            type: 'success'
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            },
            handleCurrentChange (val) {
                this.getPageList(val);
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
    .page-list {
        margin: 15px;
        width: auto;
        font-size: 12px;
        .el-button {
            padding: 0;
            width: 50px;
            height: 33px;
            line-height: 33px;
            font-size: 12px;
            color: #636e7b;
            border: none;
            background: none;
            &:hover {
                color: #20a0ff;
                border: none;
                background: none;
            }
        }
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