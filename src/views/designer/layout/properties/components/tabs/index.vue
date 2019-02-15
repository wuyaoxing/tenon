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
    data() {
        return {
            currentComponentId: ''
        }
    },
    watch: {
        value(val, oldVal) {
            // 切换组件引起的value变化，不需处理
            if (this.currentComponentId !== this.component.id) {
                this.currentComponentId = this.component.id
                return
            }

            console.log(val, oldVal)
            try {
                this.$set(this.component.properties, 'tablist', JSON.parse(val))
                this.$set(this.component.properties, 'enum', this.component.properties.tablist.map(item => ({ text: item.name, value: item.id })))
                this.$set(this.component.properties, 'active', this.component.properties.tablist[0].id)
                let tabs = []
                if (this.component.tabs) {
                    tabs = this.component.properties.tablist.map(item => {
                        const tab = this.component.tabs.find(option => option.id === item.id)
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
                this.$set(this.component, 'tabs', tabs)
                this.$set(this.component, 'children', tabs)
            } catch (error) {
                console.log(error)
            }
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
