<template>
    <input class="properties-text"
           type="text"
           :readonly="readonly"
           v-model="currentValue">
</template>
<script>
export default {
    name: 'properties-text'
}
</script>

<style lang="less">
.properties-text {
    width: 98px;
    height: 23px;
    // background: #545454;
    border: 1px #2e2e2e solid;
    // color: #fff;
    line-height: 23px;
    padding: 0 5px;
}
</style>
