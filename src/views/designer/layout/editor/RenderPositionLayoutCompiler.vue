<template>
  <component :is="asyncLoadComponent(component.name)">
    <PositionContainer v-for="item in component.children"
                       :key="item.id"
                       :selected="item.id === componentId"
                       @click="click(item.id)">
      <component :is="asyncLoadComponent(item.name)"
                 :data-component-id="item.id"
                 :properties.sync="item.properties" />
    </PositionContainer>
  </component>
</template>
<script>
import asyncLoadComponentMixins from './asyncLoadComponent'
import PositionContainer from './PositionContainer'

export default {
    name: 'RenderPositionLayoutCompiler',
    mixins: [asyncLoadComponentMixins],
    props: {
        componentId: String,
        component: Object
    },
    components: {
        PositionContainer
    },
    computed: {
        currentComponentId: {
            get() {
                return this.componentId
            },
            set(val) {
                this.$emit('update:componentId', val)
            }
        }
    },
    methods: {
        click(id) {
            this.currentComponentId = id
            this.$root.$emit('show-properties', this.component)
        }
    }
}
</script>
