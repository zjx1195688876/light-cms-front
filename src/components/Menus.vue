<template>
    <el-submenu :index="menus.id|string" v-if="menus.children">
        <template slot="title">{{menus.title}}</template>
        <router-link v-for="children in menus.children" :key="children.id" :to="{ name: children.url, params: children.params }">
            <el-menu-item :index="children.id|string">
                {{children.title}}
            </el-menu-item>
        </router-link>
    </el-submenu>
    <router-link :to="{ name: menus.url, params: menus.params}" v-else>
        <el-menu-item :index="menus.id|string">
            {{menus.title}}
        </el-menu-item>
    </router-link>
</template>

<script>
    export default {
        name: 'Menus',
        props: [
            'menus'
        ],
        filters: {
            string (val) {
                return String(val);
            }
        }
    };
</script>

<style lang="scss" scope>
    a {
        display: block;
    }
</style>