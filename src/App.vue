<template>
    <div id="app">
        <header-nav></header-nav>
        <img src="./assets/logo.png">
        <router-view></router-view>
    </div>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue';

export default {
    name: 'app',
    components: {
        HeaderNav
    }
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
