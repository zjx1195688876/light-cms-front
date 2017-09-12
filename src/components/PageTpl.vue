<template>
    <div class="tpl-item">
        <img class="item-img" src="http://themetrace.com/demo/bracket/images/photos/blog1.jpg" alt="">
        <div class="item-detail">
            <h1 class="item-title">模板标题</h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PageTpl'
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
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
                height: 40px;
                line-height: 20px;
                font-size: 16px;
            }
        }
    }
</style>