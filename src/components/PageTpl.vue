<template>
    <div class="tpl-item">
        <img class="item-img" :src="tplItem.imgUrl" alt="">
        <div class="item-detail">
            <h1 class="item-title">{{tplItem.title}}</h1>
            <p class="item-desc">{{tplItem.desc}}</p>
            <el-button @click="previewPageTpl(tplItem.id)">预览模板</el-button>
            <el-button @click="editPageTpl(tplItem.id)">编辑模板</el-button>
        </div>
    </div>
</template>

<script>
    import router from 'pro/router';

    export default {
        name: 'PageTpl',
        props: [
            'tplItem'
        ],
        methods: {
            previewPageTpl (tplId) {
                router.push({name: 'preview', params: {id: tplId}, query: { type: 'tpl' }});
            },
            editPageTpl (tplId) {
                router.push({name: 'edit', params: {id: tplId}, query: { type: 'tpl' }});
            }
        }
    };
</script>

<style lang="scss" scope>
    .tpl-item {
        margin: 20px 10px;
        position: relative;
        border-radius: 3px;
        background-color: #fcfcfc;
        box-shadow: 0 3px 0 rgba(12,12,12,0.03);
        .item {
            &-img {
                max-width: 100%;
                height: auto;
                border-radius: 3px 3px 0 0;
            }
            &-detail {
                padding: 10px;
            }
            &-title {
                margin: 0;
                padding: 0;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
                height: 20px;
                line-height: 20px;
                font-size: 16px;
            }
            &-desc {
                font-size: 13px;
                color: #636e7b;
            }
        }
        .el-button {
            padding: 0;
            width: 80px;
            height: 33px;
            line-height: 33px;
            font-size: 12px;
            color: #636e7b;
            &:hover {
                color: #20a0ff;
            }
        }
    }
</style>