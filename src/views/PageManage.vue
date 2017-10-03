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
        <el-table :data="tableData" border class="page-list">
            <el-table-column prop="id" label="页面id" width="180"></el-table-column>
            <el-table-column prop="name" label="页面名称"></el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                <el-button @click="editPage">编辑</el-button>
                <el-button @click="delPage">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pager">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                :current-page.sync="currentPage" :page-size="100" :total="1000"
                layout="prev, pager, next, jumper">
            </el-pagination>
        </div>
    </el-col>
</template>

<script>
    export default {
        name: 'PageManage',
        data () {
            return {
                tableData: [
                    {
                        id: '001',
                        name: '页面1'
                    },
                    {
                        id: '002',
                        name: '页面1'
                    },
                    {
                        id: '003',
                        name: '页面1'
                    },
                    {
                        id: '004',
                        name: '页面1'
                    }
                ],
                currentPage: 1
            };
        },
        methods: {
            newPage () {
                console.log('新建页面');
            },
            editPage () {
                console.log('编辑页面');
            },
            delPage () {
                console.log('删除页面');
            },
            handleSizeChange (val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange (val) {
                console.log(`当前页: ${val}`);
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