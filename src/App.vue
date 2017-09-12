<template>
    <div id="app">
        <div class="container">
            <header-nav></header-nav>
            <left-menu></left-menu>
            <router-view></router-view>
        </div>
        <!-- <footer-nav></footer-nav> -->
    </div>
</template>

<script>
import HeaderNav from 'pro/container/HeaderNav.vue';
import FooterNav from 'pro/container/FooterNav.vue';
import LeftMenu from 'pro/container/LeftMenu.vue';

export default {
    name: 'app',
    components: {
        HeaderNav,
        LeftMenu,
        FooterNav
    }
};
</script>

<style>
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
    #app {
        height: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
