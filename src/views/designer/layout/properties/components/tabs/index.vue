<template>
    <input class="properties-tabs"
           type="text"
           :readonly="readonly"
           v-model="currentValue">
</template>
<script>
export default {
    name: 'properties-tabs',
    props: {
        component: Object
    },
    inject: ['project'],
    data() {
        return {
            currentComponentId: ''
        }
    },
    watch: {
        value(val) {
            // 切换组件引起的value变化，不需处理
            if (this.currentComponentId !== this.component.id) {
                this.currentComponentId = this.component.id
                return
            }

            try {
                const tablist = JSON.parse(val)
                this.$set(this.component.properties, 'tablist', tablist)
                this.$set(this.component.properties, 'enum', tablist.map(item => ({ text: item.name, value: item.id })))
                if (!this.component.properties.selected) this.$set(this.component.properties, 'selected', tablist[0].id)

                const component = this.findComponentByTabsId(this.currentComponentId)
                if (!component) return
                let tabs = []
                if (component.children) {
                    tabs = this.component.properties.tablist.map(item => {
                        const tab = component.children.find(option => option.id === item.id)
                        if (tab) tab.properties.name = item.name
                        return tab || {
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
                        }
                    })
                } else {
                    tabs = this.component.properties.tablist.map(item => ({
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
                }
                this.$set(component, 'children', tabs)
            } catch (error) {
                console.log(error)
            }
        }
    },
    methods: {
        findComponentByTabsId(tabsId) {
            let targetComponent = null
            const recursion = (component, id) => {
                if (component.properties.tabsId === id) {
                    targetComponent = component
                    return
                }
                if (component.children) {
                    for (let i = 0; i < component.children.length; i++) {
                        const data = component.children[i]
                        recursion(data, id)
                        if (data.id === id) {
                            break
                        }
                    }
                }
            }
            recursion(this.project.components, tabsId)
            return targetComponent
        }
    },
    created() {
        this.currentComponentId = this.component.id
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
