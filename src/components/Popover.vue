<template>
    <el-popover ref="popover" placement="right" width="400" trigger="click">
        <slot name="popover"></slot>
    </el-popover>
</template>

<script>
    export default {
        name: 'Popover'
    };
</script>

<style lang="scss" scope>

</style>