<template>
    <component :is="asyncLoadComponent(component.name)"
               :data-component-id="component.id"
               :data-component-name="component.name"
               :properties.sync="component.properties">
        <component class="position-container"
                   :is="asyncLoadComponent(item.name)"
                   v-for="item in component.children"
                   :key="item.id"
                   :data-component-id="item.id"
                   :data-component-name="item.name"
                   :properties.sync="item.properties" />
    </component>
</template>
<script>
import asyncLoadComponentMixins from './asyncLoadComponent'

export default {
    name: 'RenderPositionLayoutCompiler',
    mixins: [asyncLoadComponentMixins],
    props: {
        component: Object
    }
}
</script>
