<template>
    <ul class="tabs f">
        <li class="tabs-item"
            :class="{ active: item.id === active }"
            v-for="item in tablist"
            :key="item.id"
            @click="click(item.id)">{{item.name}}</li>
    </ul>
</template>
<script>
export default {
    name: 'tabs',
    props: {
        tabs: String,
        tablist: Array,
        active: String
    },
    methods: {
        click(val) {
            this.$emit('update:active', val)
        }
    }
}
</script>

<style lang="less">
@import "~styles/variables";

.tabs {
    border: 1px solid @primary-border-color;
    &-item {
        padding: 8px 15px;
        border-right: 1px solid @primary-border-color;
        // &:last-of-type {
        //     border: none;
        // }
        &:hover {
            color: @white-color;
            background: @primary-color;
        }
        &.active {
            color: @white-color;
            background: @primary-color;
        }
    }
}
</style>
