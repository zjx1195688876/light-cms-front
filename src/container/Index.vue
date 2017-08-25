<template>
    <div class="index-container">
        <div>
            Index
        </div>
        <router-link href="javascript:void(0);" to="/login">去登陆</router-link>
        <router-link href="javascript:void(0);" :to="{ name: 'preview', params: { pageId: '123'}}">点击前往</router-link>
    </div>
</template>

<script>
    export default {
        name: 'Index'
    };
</script>

<style>

</style>