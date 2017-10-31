<template>
    <div id="app" >
        <div style="height: 100%" v-if="loginPage==='login'">
            <router-view v-if="loaded"></router-view>
        </div>
        <div v-else>
            <Modal class="modal_phone"></Modal>
            <div class="container">
                <header-nav></header-nav>
                <left-menu></left-menu>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderNav from 'pro/container/HeaderNav.vue';
import LeftMenu from 'pro/container/LeftMenu.vue';
import Modal from 'pro/components/Modal.vue';
import axios from 'axios';
import router from 'pro/router';

axios.defaults.withCredentials = true;

export default {
    name: 'app',
    components: {
        HeaderNav,
        LeftMenu,
        Modal
    },
    computed: {
        loginPage () {
            return this.$route.name;
        }
    },
    data () {
        return {
            loaded: false // ajax拿到结果前不渲染组件，避免闪屏出现
        };
    },
    mounted () {
        this.getUserInfo();
    },
    methods: {
        getUserInfo () {
            axios.get('http://localhost:3000/login/getUserInfo')
            .then(res => {
                let data = res.data;
                this.loaded = true;
                if (!data || data.code !== 200) {
                    router.push({name: 'login'});
                }
            })
            .catch(() => {
                router.push({name: 'login'});
            });
        }
    }
};
</script>

<style lang="scss">
    * {
        box-sizing: border-box;
    }
    .clearfix:after{
        content: "";
        display: block;
        clear: both;
        height: 0;
        overflow: hidden;
        visibility: hidden;
    }
    .clearfix{
        zoom: 1; 
    }
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
    }
    a {
        display: inline-block;
        text-decoration: none;
    }
    .header {
        height: 54px;
    }
    .container {
        min-height: 100%;
    }
    .main-panel {
        min-height: 1000px;
        background-color: #e4e7ea;
    }
    #app {
        height: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
