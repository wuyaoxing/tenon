<template>
    <ul class="tabs f">
        <li class="tabs-item"
            :class="{ active: item.id === active }"
            v-for="item in tablist"
            :key="item.id"
            @click="selectEvent(item.id)">{{item.name}}</li>
    </ul>
</template>
<script>
export default {
    name: 'tabs',
    props: {
        tablist: Array,
        selected: String
    },
    data() {
        return {
            active: ''
        }
    },
    watch: {
        selected: {
            handler: 'selectEvent',
            immediate: true,
        },
    },
    methods: {
        selectEvent(val) {
            this.active = val
            this.$emit('update:selected', val)
        }
    }
}
</script>

<style lang="less">
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
