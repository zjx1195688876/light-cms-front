<template>
    <el-submenu :default-active="index" :index="menus.id|string" v-if="menus.children">
        <template slot="title">{{menus.title}}</template>
        <router-link v-for="children in menus.children" :key="children.id" :to="{ name: children.url, params: children.params }">
            <el-menu-item :index="children.id|string">
                {{index}} {{children.title}}
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
        data () {
            return {
                index: 1
            };
        },
        filters: {
            string (val) {
                return String(val);
            }
        },
        mounted () {
            if (this.$route.name === 'pageManage') {
                console.log(123);
                this.index = 2;
            };
        }
    };
</script>

<style lang="scss" scope>
    a {
        display: block;
    }
</style>