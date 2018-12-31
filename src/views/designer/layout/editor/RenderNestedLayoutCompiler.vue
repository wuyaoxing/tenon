<template>
  <component :is="asyncLoadComponent(component.name)">
    <NestedContainer v-for="(item, index) in component.children"
                     :key="item.id"
                     :selected="item.id === componentId"
                     :showUp="index > 0"
                     :showDown="component.children.length > 0 && index !== component.children.length - 1"
                     @up="upEvent(index)"
                     @down="downEvent(index)"
                     @click="clickEvent(item.id)">
      <RenderNestedLayoutCompiler v-if="item.name === 'NestedLayoutContainer'"
                                  :data-component-id="item.id"
                                  :properties.sync="item.properties"
                                  :component="item"
                                  :componentId.sync="currentComponentId" />
      <RenderPositionLayoutCompiler v-else-if="item.name === 'PositionLayoutContainer'"
                                    :data-component-id="item.id"
                                    :properties.sync="item.properties"
                                    :component="item"
                                    :componentId.sync="currentComponentId" />
      <component :is="asyncLoadComponent(item.name)"
                 :data-component-id="item.id"
                 :properties.sync="item.properties"
                 v-else />
    </NestedContainer>
  </component>
</template>
<script>
import asyncLoadComponentMixins from './asyncLoadComponent'
import NestedContainer from './NestedContainer'
import RenderPositionLayoutCompiler from './RenderPositionLayoutCompiler'

export default {
    name: 'RenderNestedLayoutCompiler',
    mixins: [asyncLoadComponentMixins],
    props: {
        componentId: String,
        component: Object,
    },
    components: {
        NestedContainer,
        RenderPositionLayoutCompiler,
    },
    computed: {
        currentComponentId: {
            get() {
                return this.componentId
            },
            set(val) {
                this.$emit('update:componentId', val)
            },
        },
    },
    methods: {
        upEvent(index) {
            const arr = this.component.children
            arr.splice(index - 1, 0, arr.splice(index, 1)[0])
        },
        downEvent(index) {
            const arr = this.component.children
            arr.splice(index + 1, 0, arr.splice(index, 1)[0])
        },
        clickEvent(id) {
            console.log(this.component)
            this.currentComponentId = id
            this.$root.$emit('show-properties', this.component)
        },
    },
}
</script>
