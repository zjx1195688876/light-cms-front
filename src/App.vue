<template>
    <div id="app">
        <div class="container">
            <header-nav></header-nav>
            <main>
                <tab-nav></tab-nav>
                <router-view></router-view>
            </main>
        </div>
        <!-- <footer-nav></footer-nav> -->
    </div>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue';
import TabNav from './components/TabNav.vue';
import FooterNav from './components/FooterNav.vue';

export default {
    name: 'app',
    components: {
        HeaderNav,
        TabNav,
        FooterNav
    }
};
</script>

<style>
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
