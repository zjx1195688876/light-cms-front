<template>
    <div class="tpl-item">
        <span class="item-tag">{{tag}}</span>
        <div class="item-img-box">
            <img class="item-img" :src="tplItem.imgUrl" alt="">
        </div>
        <div class="item-detail">
            <h1 class="item-title">{{tplItem.title}}</h1>
            <p class="item-desc">{{tplItem.desc}}</p>
            <el-button @click="previewH5PageTpl(tplItem.id)">预览H5</el-button>
            <el-button @click="previewPCPageTpl(tplItem.id)">预览PC</el-button>
            <el-button v-if="pageType === 'index'" @click="editPageTpl(tplItem.id, tplItem.tplStyle)">编辑模板</el-button>
            <el-button v-if="pageType === 'chooseTpl'" @click="usePageTpl(tplItem.id, tplItem.tplStyle)">使用模板</el-button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import router from 'pro/router';
    import { Service } from 'pro/service';

    export default {
        name: 'PageTpl',
        props: [
            'tplItem',
            'pageType'
        ],
        computed: {
            tag () {
                return this.tplItem.tplStyle === '1' ? '富文本' : 'markdown';
            }
        },
        methods: {
            toPreview () {
                return axios.post(Service.updateContent, {
                    content: this.content
                });
            },
            getContentById (id, callback) {
                axios.get(Service.getContentById, {
                    params: {
                        id
                    }
                })
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        this.content = data.body.content;
                        callback();
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            },
            previewH5 () {
                this.toPreview()
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        this.$store.dispatch('showModal');
                    } else {
                        this.$message.error('无法预览，请稍后重试');
                    }
                })
                .catch(err => {
                    this.$message.error(`无法预览，请稍后重试，${err}`);
                });
            },
            previewPC () {
                this.toPreview()
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        let pcLink = Service.previewPC;
                        window.open(pcLink);
                    } else {
                        this.$message.error('无法预览，请稍后重试');
                    }
                })
                .catch(err => {
                    this.$message.error(`无法预览，请稍后重试，${err}`);
                });
            },
            previewH5PageTpl (id) {
                this.getContentById(id, this.previewH5);
            },
            previewPCPageTpl (id) {
                this.getContentById(id, this.previewPC);
            },
            editPageTpl (tplId, tplStyle = '0') {
                router.push({name: 'edit', params: {id: tplId}, query: { type: 'tpl', tplStyle: tplStyle }});
            },
            usePageTpl (tplId, tplStyle = '0') {
                router.push({name: 'add', query: { id: tplId, type: 'page', tplStyle: tplStyle }});
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
            &-tag {
                z-index: 999;
                position: absolute;
                top: 0;
                left: 0;
                line-height: 15px;
                padding:  3px 7px;
                font-size: 12px;
                color: #fff;
                background-color: #50b5ff;
            }
            &-img-box {
                position: relative;
                width: 100%;
                height: 150px;
                overflow: hidden;
                border-radius: 3px 3px 0 0;
            }
            &-img {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100%;
                height: auto;
                transform: translate(-50%, -50%);
            }
            &-detail {
                text-align: center;
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
                text-align: left;
                font-size: 13px;
                line-height: 26px;
                color: #636e7b;

                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
                height: 52px;
            }
        }
        .el-button {
            padding: 0;
            width: 70px;
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