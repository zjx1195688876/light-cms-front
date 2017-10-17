<template>
    <el-popover ref="popover" width="400" trigger="click" :value="visible">
        <slot name="popover"></slot>
    </el-popover>
</template>

<script>
    export default {
        name: 'Popover',
        props: [
            'visible'
        ]
    };
</script>

<style lang="scss" scope>

</style>