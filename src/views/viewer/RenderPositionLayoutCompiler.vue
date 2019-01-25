<template>
    <component :is="asyncLoadComponent(component.name)">
        <component :is="asyncLoadComponent(item.name)"
                   v-for="item in component.children"
                   :key="item.id"
                   :data-component-id="item.id"
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
