<template>
    <component :is="asyncLoadComponent(component.name)">
        <NestedContainer v-for="item in component.children"
                         :key="item.id"
                         :data-component-id="item.id"
                         :data-component-name="item.name"
                         :properties="item.properties"
                         :isDragover="currentDragoverInfo.componentId === item.id"
                         :hint="currentDragoverInfo.hint"
                         :isScroll.sync="isScroll"
                         :selected="item.id === componentId"
                         @click="clickEvent(item.id)"
                         @drop="dropEvent($event, item)">
            <RenderNestedLayoutCompiler v-if="item.name === 'NestedLayoutContainer'"
                                        :data-component-id="item.id"
                                        :properties.sync="item.properties"
                                        :component="item"
                                        :componentId.sync="currentComponentId"
                                        :dragoverInfo.sync="currentDragoverInfo" />
            <RenderPositionLayoutCompiler v-else-if="item.name === 'PositionLayoutContainer'"
                                          :data-component-id="item.id"
                                          :properties.sync="item.properties"
                                          :component="item"
                                          :componentId.sync="currentComponentId" />
            <component :is="asyncLoadComponent(item.name)"
                       :data-component-id="item.id"
                       v-bind="item.properties"
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
        dragoverInfo: Object
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
        currentDragoverInfo: {
            get() {
                return this.dragoverInfo
            },
            set(val) {
                this.$emit('update:dragoverInfo', val)
            },
        },
    },
    methods: {
        clickEvent(id) {
            console.log(this.component)
            this.isScroll = false
            this.currentComponentId = id
        },
        dropEvent(e, component) {
            let message = ''
            const dragData = e.dataTransfer.getData('Text')
            console.log('nested drop:', e, dragData, this)

            try {
                const praseDragData = JSON.parse(dragData)
                if (this.currentDragoverInfo.placement === 'up') {
                    if (this.checkNestedName(praseDragData.name)) {
                        const index = this.component.children.findIndex(item => item.id === component.id)
                        this.component.children.splice(index, 0, praseDragData)
                    } else {
                        message = `NestedLayoutContainer 不允许 ${praseDragData.name}  拖放到此处。`
                    }
                } else if (this.currentDragoverInfo.placement === 'down') {
                    if (this.checkNestedName(praseDragData.name)) {
                        const index = this.component.children.findIndex(item => item.id === component.id)
                        this.component.children.splice(index + 1, 0, praseDragData)
                    } else {
                        message = `NestedLayoutContainer 不允许 ${praseDragData.name}  拖放到此处。`
                    }
                } else {
                    switch (component.name) {
                        case 'NestedLayoutContainer': {
                            if (this.checkNestedName(praseDragData.name)) {
                                component.children.push(praseDragData)
                            } else {
                                message = `NestedLayoutContainer 不允许 ${praseDragData.name}  拖放到此处。`
                            }
                            break
                        }
                        case 'PositionLayoutContainer': {
                            if (this.checkNestedName(praseDragData.name)) {
                                message = `PositionLayoutContainer 不允许 ${praseDragData.name}  拖放到此处。`
                            } else {
                                component.children.push(praseDragData)
                            }
                            break
                        }
                        default:
                            console.log(`Sorry, we are out of ${component.name}.`)
                    }
                }

                this.currentComponentId = praseDragData.id
            } catch (error) {
                console.log('drop error:', error)
            }
            message && this.$Message({
                showClose: true,
                message,
                type: 'warning'
            })
            this.currentDragoverInfo = {
                componentId: '',
                hint: '',
                placement: 'inside'
            }
        },
        checkNestedName(name) {
            return nestedComponents.indexOf(name) > -1
        },
    },
}
</script>
