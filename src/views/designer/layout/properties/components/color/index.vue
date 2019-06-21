<template>
    <ColorPicker class="properties-colorPicker"
                 v-model="currentValue"
                 size="mini"></ColorPicker>
</template>
<script>
export default {
    name: 'properties-color'
}
</script>
<style lang="less">
.properties-colorPicker {
    .el-color-picker__trigger {
        padding: 1px;
    }
}
</style>
