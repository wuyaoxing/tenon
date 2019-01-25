<template>
    <component :is="asyncLoadComponent(component.name)"
               :properties.sync="component.properties">
        <template v-for="item in component.children">
            <RenderNestedLayoutCompiler v-if="item.name === 'NestedLayoutContainer'"
                                        :data-component-id="item.id"
                                        :component="item"
                                        :key="item.id" />
            <RenderPositionLayoutCompiler v-else-if="item.name === 'PositionLayoutContainer'"
                                          :data-component-id="item.id"
                                          :component="item"
                                          :key="item.id" />
            <component :is="asyncLoadComponent(item.name)"
                       :data-component-id="item.id"
                       v-bind="item.properties"
                       :properties.sync="item.properties"
                       :key="item.id"
                       v-else />
        </template>
    </component>
</template>
<script>
import asyncLoadComponentMixins from './asyncLoadComponent'
import RenderPositionLayoutCompiler from './RenderPositionLayoutCompiler'

export default {
    name: 'RenderNestedLayoutCompiler',
    mixins: [asyncLoadComponentMixins],
    props: {
        component: Object
    },
    components: {
        RenderPositionLayoutCompiler,
    }
}
</script>
