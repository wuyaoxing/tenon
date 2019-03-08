<template>
    <component :is="asyncLoadComponent(component.name)"
               :data-component-id="component.id"
               :data-component-name="component.name"
               :data-component-layout="component.layout"
               :properties.sync="component.properties">
        <RenderNestedLayoutCompiler :component="tabPanelComponent"
                                    v-if="tabPanelComponent" />
    </component>
</template>
<script>
export default {
    name: 'RenderTabPanelLayoutCompiler',
    props: {
        component: Object
    },
    inject: ['asyncLoadComponent', 'project'],
    components: {
        RenderNestedLayoutCompiler: () => import('./RenderNestedLayoutCompiler')
    },
    computed: {
        tabPanelComponent() {
            let currentComponent = null
            const componentId = this.component.properties.tabsId
            if (componentId) {
                const recursion = (component, id) => {
                    if (component.id === id) {
                        currentComponent = this.component.children.find(item => item.id === component.properties.selected)
                        return
                    }
                    if (component.children) {
                        for (let i = 0; i < component.children.length; i++) {
                            const data = component.children[i]
                            recursion(data, id)
                        }
                    }
                }
                recursion(this.project.components, componentId)
            }
            return currentComponent
        }
    }
}
</script>
