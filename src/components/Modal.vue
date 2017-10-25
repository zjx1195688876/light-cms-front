<template>
    <div class="mask" @click="hideModal" v-if="isShowModal">
    <!-- {{tplId}} -->
        <div class="modal">
            <div class="preview-phone">
               <iframe class="preview-page" :src="src"></iframe>
           </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Modal',
        computed: {
            isShowModal () {
                return this.$store.getters.isShowModal;
            },
            src () {
                let src = this.$store.getters.src;
                if (!src) {
                    src = 'http://127.0.0.1:3000/preview/h5';
                }
                return src;
            }
        },
        methods: {
            hideModal () {
                this.$store.dispatch('hideModal');
            }
        }
    };
</script>

<style lang="scss" scope>
    .hide {
        display: none;
    }
    .show {
        display: block;
    }
    .mask {
        z-index: 9999;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
    }
    .modal {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 390px;
        padding: 5px;
        // background-color: #fff;
        .preview {
            &-phone {
                margin: 0 auto 0; 
                padding-top: 75px;
                width: 300px;
                height: 651px;
                background-image: url('../assets/phone.png');
                background-size: 300px 651px;
                background-repeat: no-repeat;
            }
            &-page {
                display: block;
                margin: 0 auto;
                width: 275px;
                height: 489px;
                border: none;
                outline: none;
                background-color: #fff;
            }
        }
    }
</style>