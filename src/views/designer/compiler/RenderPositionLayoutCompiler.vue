<template>
    <component :is="asyncLoadComponent(component.name)"
               :data-component-id="component.id"
               :data-component-name="component.name"
               :data-component-layout="component.layout"
               :properties.sync="component.properties">
        <template v-for="item in component.children">
            <RenderNestedLayoutCompiler v-if="item.name === 'NestedLayoutContainer'"
                                        :component="item"
                                        :key="item.id" />
            <RenderPositionLayoutCompiler class="layout-container"
                                          v-else-if="item.name === 'PositionLayoutContainer'"
                                          :component="item"
                                          :key="item.id" />
            <RenderTabPanelLayoutCompiler class="layout-container"
                                          v-else-if="item.name === 'TabPanel'"
                                          :component="item"
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
import RenderTabPanelLayoutCompiler from './RenderTabPanelLayoutCompiler.vue'

export default {
    name: 'RenderPositionLayoutCompiler',
    props: {
        component: Object
    },
    inject: ['asyncLoadComponent'],
    components: {
        RenderNestedLayoutCompiler: () => import('./RenderNestedLayoutCompiler.vue'),
        RenderTabPanelLayoutCompiler
    }
}
</script>
