<template>
    <component :is="asyncLoadComponent(component.name)">
        <NestedContainer :data-component-id="tabPanelComponent.id"
                         :data-component-name="tabPanelComponent.name"
                         :properties="tabPanelComponent.properties"
                         :selected="tabPanelComponent.id === componentId"
                         @click="clickEvent(tabPanelComponent.id)"
                         v-if="tabPanelComponent">
            <RenderNestedLayoutCompiler :componentId.sync="currentComponentId"
                                        :component="tabPanelComponent"
                                        :project="project" />
        </NestedContainer>
    </component>
</template>
<script>
import asyncLoadComponentMixins from './asyncLoadComponent'
import NestedContainer from './NestedContainer'

export default {
    name: 'RenderTabPanelLayoutCompiler',
    mixins: [asyncLoadComponentMixins],
    props: {
        componentId: String,
        component: Object,
        project: Object
    },
    components: {
        NestedContainer,
        RenderNestedLayoutCompiler: () => import('./RenderNestedLayoutCompiler')
    },
    data() {
        return {
            isScroll: true
        }
    },
    computed: {
        currentComponentId: {
            get() {
                return this.componentId
            },
            set(val) {
                this.$emit('update:componentId', val)
            }
        },
        tabPanelComponent() {
            let currentComponent = null
            const componentId = this.component.properties.tabsId
            if (componentId) {
                const recursion = (component, id) => {
                    if (component.id === id) {
                        currentComponent = component.children.find(item => item.id === component.properties.active)
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
    },
    methods: {
        clickEvent(id) {
            this.isScroll = false
            this.currentComponentId = id
        }
    }
}
</script>
