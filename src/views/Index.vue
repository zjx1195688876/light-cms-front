<template>
    <el-col class="main-panel" :span="21">
        <div class="search-bar">
            <label for="search">
                <input class="search" type="text" name="search" placeholder="搜索模板">
                <i class="el-icon-search"></i>
            </label>
        </div>
        <el-row class="tpl-list">
            <el-col :span="6"><PageTpl></PageTpl></el-col>
            <el-col :span="6"><PageTpl></PageTpl></el-col>
            <el-col :span="6"><PageTpl></PageTpl></el-col>
            <el-col :span="6"><PageTpl></PageTpl></el-col>
        </el-row>

        <!-- <router-link href="javascript:void(0);" to="/login">去登陆</router-link>
        <router-link href="javascript:void(0);" :to="{ name: 'preview', params: { pageId: '123'}}">点击前往</router-link> -->
    </el-col>
</template>

<script>
    import PageTpl from 'pro/components/PageTpl.vue';

    export default {
        name: 'Index',
        components: {
            PageTpl
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
    /* .tpl-list {
        min-height: 100px;
        background-color: #e4e7ea;
    } */
</style>