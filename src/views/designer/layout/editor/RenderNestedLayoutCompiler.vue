<template>
  <component :is="asyncLoadComponent(component.name)">
    <NestedContainer v-for="(item, index) in component.children"
                     :key="item.id"
                     :name="item.name"
                     :isScroll.sync="isScroll"
                     :selected="item.id === componentId"
                     :showUp="index > 0"
                     :showDown="component.children.length > 0 && index !== component.children.length - 1"
                     @up="upEvent(index)"
                     @down="downEvent(index)"
                     @delete="deleteEvent(index)"
                     @click="clickEvent(item.id)"
                     @drop="dropEvent($event, item)">
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
import { nestedComponents } from '../../components/config'

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
        deleteEvent(index) {
            const arr = this.component.children
            arr.splice(index, 1)
        },
        clickEvent(id) {
            console.log(this.component)
            this.isScroll = false
            this.currentComponentId = id
        },
        dropEvent(e, component) {
            const dragData = e.dataTransfer.getData('Text')
            console.log('nested drop:', e, dragData, this)
            try {
                const praseDragData = JSON.parse(dragData)

                if (component.name === 'NestedLayoutContainer') {
                    if (nestedComponents.indexOf(praseDragData.name) > -1) {
                        component.children.unshift(praseDragData)
                    } else {
                        this.$Message({
                            showClose: true,
                            message: `NestedLayoutContainer 不允许 ${praseDragData.name}  拖放到此处。`,
                            type: 'warning'
                        })
                    }
                } else if (component.name === 'PositionLayoutContainer') {
                    if (nestedComponents.indexOf(praseDragData.name) > -1) {
                        this.$Message({
                            showClose: true,
                            message: `PositionLayoutContainer 不允许 ${praseDragData.name}  拖放到此处。`,
                            type: 'warning'
                        })
                    } else {
                        component.children.push(praseDragData)
                    }
                } else if (nestedComponents.indexOf(praseDragData.name) > -1) {
                    const index = this.component.children.findIndex(item => item.id === component.id)
                    this.component.children.splice(index + 1, 0, praseDragData)
                    // this.component.children.push(praseDragData)
                } else {
                    this.$Message({
                        showClose: true,
                        message: `NestedLayoutContainer 不允许 ${praseDragData.name}  拖放到此处。`,
                        type: 'warning'
                    })
                }
            } catch (error) {
                console.log('drop error:', error)
            }
        },
    },
}
</script>
