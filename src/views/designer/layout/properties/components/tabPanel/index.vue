<template>
    <Select class="properties-tab-panel"
            v-model="currentValue"
            size="mini"
            filterable
            placeholder="请选择"
            @change="change">
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
    inject: ['project'],
    computed: {
        tabs() {
            const tabs = []
            const recursion = component => {
                if (component.name === 'Tabs') {
                    tabs.push({
                        id: component.id,
                        name: component.properties.name,
                        tablist: component.properties.tablist
                    })
                }
                if (component.children) {
                    for (let i = 0; i < component.children.length; i++) {
                        const data = component.children[i]
                        recursion(data)
                    }
                }
            }
            recursion(this.project.components)
            return tabs
        }
    },
    methods: {
        change(val) {
            const tab = this.tabs.find(item => item.id === val)
            const tabs = tab.tablist.map(item => ({
                id: item.id,
                name: 'NestedLayoutContainer',
                properties: {
                    name: item.name,
                    css: {
                        padding: '8px',
                        minHeight: '150px'
                    },
                    style: ''
                },
                children: []
            }))
            this.$set(this.component, 'children', tabs)
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
