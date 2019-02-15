<template>
    <component :is="asyncLoadComponent(component.name)">
        <NestedContainer v-for="item in component.children"
                         :key="item.id"
                         :data-component-id="item.id"
                         :data-component-name="item.name"
                         :properties="item.properties"
                         :isScroll.sync="isScroll"
                         :selected="item.id === componentId"
                         @click="clickEvent(item.id)">
            <RenderNestedLayoutCompiler v-if="item.name === 'NestedLayoutContainer'"
                                        :data-component-id="item.id"
                                        :properties.sync="item.properties"
                                        :component="item"
                                        :componentId.sync="currentComponentId"
                                        :project="project" />
            <RenderPositionLayoutCompiler v-else-if="item.name === 'PositionLayoutContainer'"
                                          :data-component-id="item.id"
                                          :properties.sync="item.properties"
                                          :component="item"
                                          :componentId.sync="currentComponentId" />
            <RenderTabPanelLayoutCompiler v-else-if="item.name === 'TabPanel'"
                                          :data-component-id="item.id"
                                          :properties.sync="item.properties"
                                          :component="item"
                                          :componentId.sync="currentComponentId"
                                          :project="project" />
            <component :is="asyncLoadComponent(item.name)"
                       :data-component-id="item.id"
                       v-bind.sync="item.properties"
                       :properties.sync="item.properties"
                       v-else />
        </NestedContainer>
    </component>
</template>
<script>
import asyncLoadComponentMixins from './asyncLoadComponent'
import NestedContainer from './NestedContainer'
import RenderPositionLayoutCompiler from './RenderPositionLayoutCompiler'
import RenderTabPanelLayoutCompiler from './RenderTabPanelLayoutCompiler'

export default {
    name: 'RenderNestedLayoutCompiler',
    mixins: [asyncLoadComponentMixins],
    props: {
        componentId: String,
        component: Object,
        project: Object
    },
    components: {
        NestedContainer,
        RenderPositionLayoutCompiler,
        RenderTabPanelLayoutCompiler
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
            },
        }
    },
    methods: {
        clickEvent(id) {
            console.log(this.component)
            this.isScroll = false
            this.currentComponentId = id
        }
    },
}
</script>
