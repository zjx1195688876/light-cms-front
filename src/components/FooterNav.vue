<template>
    <el-row>
        <el-col :span="24">
            <div class="grid-content bg-purple-dark footer-container">
                123
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'FooterNav',
        methods: {
        }
    };
</script>

<style lang="scss" scope>
    .footer-container {
        margin-top: -100px;
        width: 100%;
        height: 100px;
        line-height: 54px;
        background-color: #262626;
        color: #fff;
    }
</style>