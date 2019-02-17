<template>
    <Select class="properties-tab-panel"
            v-model="currentValue"
            size="mini"
            filterable
            placeholder="请选择">
        <Option v-for="item in tabs"
                :key="item.id"
                :label="item.name"
                :value="item.id">
        </Option>
    </Select>
</template>
<script>
export default {
    name: 'properties-tab-panel',
    props: {
        component: Object
    },
    computed: {
        tabs() {
            const tabs = []
            const recursion = component => {
                if (component.name === 'Tabs') {
                    tabs.push({
                        id: component.id,
                        name: component.properties.name
                    })
                }
                if (component.children) {
                    for (let i = 0; i < component.children.length; i++) {
                        const data = component.children[i]
                        recursion(data)
                    }
                }
                if (component.tabs) {
                    for (let i = 0; i < component.tabs.length; i++) {
                        const data = component.tabs[i]
                        recursion(data)
                    }
                }
            }
            recursion(this.$parent.$parent.$parent.project.components)
            return tabs
        }
    },
    watch: {
        value(val, oldVal) {
            console.log(val, oldVal)
        }
    }
}
</script>

<style lang="less">
.properties-tabs {
    min-width: 30px;
    height: 23px;
    // background: #545454;
    border: 1px #2e2e2e solid;
    // color: #fff;
    line-height: 23px;
    padding: 0 5px;
}
</style>
