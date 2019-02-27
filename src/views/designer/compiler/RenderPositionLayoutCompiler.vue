<template>
    <component :is="asyncLoadComponent(component.name)"
               :data-component-id="component.id"
               :data-component-name="component.name"
               :data-component-layout="component.layout"
               :properties.sync="component.properties">
        <!-- <component class="position-container layout-container"
                   :is="asyncLoadComponent(item.name)"
                   v-for="item in component.children"
                   :key="item.id"
                   :data-component-id="item.id"
                   :data-component-name="item.name"
                   :properties.sync="item.properties" /> -->
        <template v-for="item in component.children">
            <RenderNestedLayoutCompiler v-if="item.name === 'NestedLayoutContainer'"
                                        :component="item"
                                        :project="project"
                                        :key="item.id" />
            <RenderPositionLayoutCompiler class="layout-container"
                                          v-else-if="item.name === 'PositionLayoutContainer'"
                                          :component="item"
                                          :key="item.id" />
            <RenderTabPanelLayoutCompiler class="layout-container"
                                          v-else-if="item.name === 'TabPanel'"
                                          :component="item"
                                          :project="project"
                                          :key="item.id" />
            <component class="layout-container"
                       :is="asyncLoadComponent(item.name)"
                       :data-component-id="item.id"
                       :data-component-name="item.name"
                       :data-component-layout="item.layout"
                       v-bind.sync="item.properties"
                       :properties.sync="item.properties"
                       :key="item.id"
                       v-else />
        </template>
    </component>
</template>
<script>
import asyncLoadComponentMixins from './asyncLoadComponent'
import RenderTabPanelLayoutCompiler from './RenderTabPanelLayoutCompiler'

export default {
    name: 'RenderPositionLayoutCompiler',
    mixins: [asyncLoadComponentMixins],
    props: {
        component: Object,
        project: Object
    },
    components: {
        RenderNestedLayoutCompiler: () => import('./RenderNestedLayoutCompiler'),
        RenderTabPanelLayoutCompiler
    }
}
</script>
