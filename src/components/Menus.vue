<template>
    <el-submenu :index="index" v-if="menus.children">
        <template slot="title">{{menus.title}}</template>
        <router-link :to="{ name: 'children.url' }">
            <el-menu-item :index="index" v-for="children in menus.children" :key="children.id">
                {{children.title}}
            </el-menu-item>
        </router-link>
    </el-submenu>
    <router-link :to="{ name: 'menus.url' }" v-else>
        <el-menu-item :index="index">
            {{menus.title}}
        </el-menu-item>
    </router-link>
</template>

<script>
    export default {
        name: 'Menus',
        props: [
            'menus',
            'index'
        ]
    };
</script>

<style lang="scss" scope>
    a {
        display: block;
    }
</style>