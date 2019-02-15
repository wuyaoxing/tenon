<template>
    <component class="nested-container"
               :is="asyncLoadComponent(component.name)"
               :data-component-id="component.id"
               :data-component-name="component.name"
               :properties.sync="component.properties">
        <template v-for="item in component.children">
            <RenderNestedLayoutCompiler v-if="item.name === 'NestedLayoutContainer'"
                                        :component="item"
                                        :project="project"
                                        :key="item.id" />
            <RenderPositionLayoutCompiler class="nested-container"
                                          v-else-if="item.name === 'PositionLayoutContainer'"
                                          :component="item"
                                          :key="item.id" />
            <RenderTabPanelLayoutCompiler class="nested-container"
                                          v-else-if="item.name === 'TabPanel'"
                                          :component="item"
                                          :project="project"
                                          :key="item.id" />
            <component class="nested-container"
                       :is="asyncLoadComponent(item.name)"
                       :data-component-id="item.id"
                       :data-component-name="item.name"
                       v-bind.sync="item.properties"
                       :properties.sync="item.properties"
                       :key="item.id"
                       v-else />
        </template>
    </component>
</template>
<script>
import asyncLoadComponentMixins from './asyncLoadComponent'
import RenderPositionLayoutCompiler from './RenderPositionLayoutCompiler'
import RenderTabPanelLayoutCompiler from './RenderTabPanelLayoutCompiler'

export default {
    name: 'RenderNestedLayoutCompiler',
    mixins: [asyncLoadComponentMixins],
    props: {
        component: Object,
        project: Object
    },
    components: {
        RenderPositionLayoutCompiler,
        RenderTabPanelLayoutCompiler
    }
}
</script>
