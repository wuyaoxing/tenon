<template>
    <div class="editor-container"
         tabindex="1">
        <div class="editor-container-layer">
            <div class="highlight-box"
                 :style="highlightBox.style">
                <div class="highlight-name">{{highlightBox.tagName}}</div>
            </div>
            <div class="dragover-box"
                 :style="dragoverBox.style">
                <div class="dragover-hint">{{dragoverBox.hint}}</div>
            </div>
            <div class="select-box"
                 :style="selectBox.style"
                 v-if="selectBox.layout === 'nestedLayout'">
                <div class="select-actions f f-ai-c">
                    <i class="icon-generate-component"
                       title="Generate component"
                       @click="recombinationComponentEvent"></i>
                    <i class="icon-left-up"
                       title="Select parent"
                       v-if="selectBoxVisiable.showSelectParent"
                       @click="selectParentComponentEvent"></i>
                    <i class="el-icon-caret-top"
                       title="Up"
                       v-if="selectBoxVisiable.showUp"
                       @click="upEvent"></i>
                    <i class="el-icon-caret-bottom"
                       title="Down"
                       v-if="selectBoxVisiable.showDown"
                       @click="downEvent"></i>
                    <i class="el-icon-delete"
                       title="Remove"
                       v-if="selectBoxVisiable.showDelete"
                       @click="deleteEvent"></i>
                </div>
            </div>
            <div class="position-select-box"
                 :style="selectBox.style"
                 v-if="selectBox.layout === 'positionLayout'">
                <div class="position-select-handle"
                     ref="positionSelectHandle">
                    <i class="handle-top-left"
                       data-direction="top-left"></i>
                    <i class="handle-top"
                       data-direction="top"></i>
                    <i class="handle-top-right"
                       data-direction="top-right"></i>
                    <i class="handle-bottom-left"
                       data-direction="bottom-left"></i>
                    <i class="handle-bottom"
                       data-direction="bottom"></i>
                    <i class="handle-bottom-right"
                       data-direction="bottom-right"></i>
                    <i class="handle-left"
                       data-direction="left"></i>
                    <i class="handle-right"
                       data-direction="right"></i>
                </div>
                <div class="position-select-actions f f-ai-c">
                    <i class="icon-generate-component"
                       title="Generate component"
                       @click="recombinationComponentEvent"></i>
                    <i class="icon-left-up"
                       title="Select parent"
                       v-if="selectBoxVisiable.showSelectParent"
                       @click="selectParentComponentEvent"></i>
                    <i class="el-icon-delete"
                       title="Remove"
                       v-if="selectBoxVisiable.showDelete"
                       @click="deleteEvent"></i>
                </div>
            </div>
        </div>
        <div class="editor-container-stage"
             ref="stage"
             :style="{
                width: project.resolution.width + 'px',
                height: project.resolution.height + 'px'
            }"
             @click="clickEvent"
             @scroll="resize">
            <RenderNestedLayoutCompiler class="editor-container-wrap"
                                        :component="project.components"
                                        :project="project" />
        </div>
    </div>
</template>
<script>
import RenderNestedLayoutCompiler from 'views/designer/compiler/RenderNestedLayoutCompiler'

import highlightBoxMixins from './highlightBox'
import selectBoxMixins from './selectBox'
import mouseEventMixins from './mouseEvent'

export default {
    name: 'EditContainer',
    mixins: [highlightBoxMixins, selectBoxMixins, mouseEventMixins],
    props: {
        componentId: String,
        project: Object
    },
    inject: ['snapshotProject'],
    components: {
        RenderNestedLayoutCompiler
    },
    data() {
        return {
            component: {},
            isStage: false,
            dragoverBox: {
                target: null,
                componentId: '',
                rect: {},
                hint: '',
                placement: 'inside',
                style: {}
            },
            timeout: '',
            delay: 200,
        }
    },
    computed: {
        currentComponentId: {
            get() {
                return this.componentId
            },
            set(val) {
                this.$emit('update:componentId', val)
            }
        },
    },
    watch: {
        componentId(val, oldVal) {
            this.disposeResizeEvent(oldVal)
            this.findParentComponentById(val)
            this.repaintHighlightBox()
            this.repaintSelectBox()
        }
    },
    methods: {
        findParentComponentById(componentId) {
            this.component = {}
            if (!componentId) return {}
            let targetComponent = null
            if (this.project.components.id === componentId) {
                targetComponent = this.project.components
            } else {
                const recursion = (component, id) => {
                    if (component.id === id) {
                        return
                    }
                    if (component.children) {
                        for (let i = 0; i < component.children.length; i++) {
                            const data = component.children[i]
                            recursion(data, id)
                            if (data.id === id) {
                                targetComponent = component
                                break
                            }
                        }
                    }
                }
                recursion(this.project.components, componentId)
            }

            this.component = targetComponent
            return targetComponent
        },
        findSpecifyNodeByClassName(el, className) {
            let specifyNode = null
            const recursion = node => {
                if (node === this.$el) return
                if (node.classList.contains(className)) {
                    specifyNode = node
                    return
                }
                if (node.parentNode) {
                    recursion(node.parentNode, className)
                }
            }
            recursion(el)
            return specifyNode
        },
        ondragover(e) {
            e.preventDefault()
            if (!this.$el.contains(e.target)) {
                this.dragoverBox = {
                    target: null,
                    componentId: '',
                    rect: {},
                    hint: '',
                    placement: 'inside',
                    style: {}
                }
                return
            }
            const targerNode = this.findSpecifyNodeByClassName(e.target, 'layout-container')
            if (!targerNode) return

            if (this.dragoverBox.target !== targerNode) {
                this.dragoverBox.target = targerNode

                this.isStage = targerNode.classList.contains('editor-container-wrap')
                this.dragoverBox.componentId = this.dragoverBox.target.dataset.componentId
                this.dragoverBox.rect = this.dragoverBox.target.getBoundingClientRect()
            }

            // 判断点与矩形相交，可设置偏移量，区分同级插入或子级插入以及提示信息
            if (this.dragoverBox.target) {
                const { componentName } = this.dragoverBox.target.dataset

                const offset = {
                    x: 0,
                    y: 15
                }

                if (componentName !== 'NestedLayoutContainer' && componentName !== 'PositionLayoutContainer') {
                    offset.y = this.dragoverBox.rect.height / 2
                }

                const point = {
                    x: e.clientX,
                    y: e.clientY
                }
                // up
                const rect1 = {
                    x: this.dragoverBox.rect.x + offset.x,
                    y: this.dragoverBox.rect.y,
                    w: this.dragoverBox.rect.width - (offset.x * 2),
                    h: offset.y
                }
                // down
                const rect2 = {
                    x: this.dragoverBox.rect.x + offset.x,
                    y: this.dragoverBox.rect.y + this.dragoverBox.rect.height - offset.y,
                    w: this.dragoverBox.rect.width - (offset.x * 2),
                    h: offset.y
                }
                // inside
                const rect3 = {
                    x: this.dragoverBox.rect.x + offset.x,
                    y: this.dragoverBox.rect.y + offset.y,
                    w: this.dragoverBox.rect.width - (offset.x * 2),
                    h: this.dragoverBox.rect.height - (offset.y * 2)
                }

                if (this.pointInRect(point, rect1)) this.dragoverBox.placement = 'up'
                if (this.pointInRect(point, rect2)) this.dragoverBox.placement = 'down'
                if (this.pointInRect(point, rect3)) this.dragoverBox.placement = 'inside'
                if (this.isStage) this.dragoverBox.placement = 'inside'
                // console.log('pointInRect', point, rect, this.pointInRect(point, rect), e, this.dragoverBox)

                this.dragoverBox.hint = `insert ${componentName} ${this.dragoverBox.placement}`
            }
            this.repaintDragoverBox()
        },
        pointInRect(point, rect) {
            return point.x >= rect.x && point.y >= rect.y && point.x <= rect.x + rect.w && point.y <= rect.y + rect.h
        },
        ondrop(e) {
            e.preventDefault()
            if (this.dragoverBox.componentId) {
                const id = this.dragoverBox.componentId
                this.findParentComponentById(id)

                let newComponent = null
                let targetComponent = null

                if (this.project.components.id === id) {
                    targetComponent = this.project.components
                } else {
                    targetComponent = this.component.children.find(item => item.id === id)
                }

                try {
                    const dragData = e.dataTransfer.getData('Text')
                    const praseDragData = JSON.parse(dragData)
                    newComponent = praseDragData
                    newComponent.layout = 'nestedLayout'
                    if (targetComponent.name === 'PositionLayoutContainer') {
                        if (this.dragoverBox.placement === 'inside') {
                            const rect = e.target.getBoundingClientRect()
                            const css = {
                                position: 'absolute',
                                top: `${e.clientY - rect.top}px`,
                                left: `${e.clientX - rect.left}px`
                            }
                            newComponent.layout = 'positionLayout'
                            newComponent.properties.css = Object.assign({}, newComponent.properties.css, css)
                            console.log('ondrop event: ', e, rect, newComponent, targetComponent, this)
                        }
                    }
                    this.dropEvent(newComponent, targetComponent)
                } catch (error) {
                    console.log('drop error:', error)
                }
            }

            this.dragoverBox = {
                target: null,
                componentId: '',
                rect: {},
                hint: '',
                placement: 'inside',
                style: {}
            }
        },
        dropEvent(newComponent, targetComponent) {
            console.log('nested drop:', newComponent, targetComponent, this)
            let message = ''
            if (this.dragoverBox.placement === 'up') {
                const index = this.component.children.findIndex(item => item.id === targetComponent.id)
                this.component.children.splice(index, 0, newComponent)
                message = `insert ${newComponent.properties.name} above ${targetComponent.properties.name}`
            } else if (this.dragoverBox.placement === 'down') {
                const index = this.component.children.findIndex(item => item.id === targetComponent.id)
                this.component.children.splice(index + 1, 0, newComponent)
                message = `insert ${newComponent.properties.name} below ${targetComponent.properties.name}`
            } else {
                switch (targetComponent.name) {
                    case 'NestedLayoutContainer': {
                        targetComponent.children.push(newComponent)
                        message = `insert ${newComponent.properties.name} into ${targetComponent.properties.name}`
                        break
                    }
                    case 'PositionLayoutContainer': {
                        targetComponent.children.push(newComponent)
                        message = `insert ${newComponent.properties.name} into ${targetComponent.properties.name}`
                        break
                    }
                    default:
                        console.log(`Sorry, we are out of ${targetComponent.name}.`)
                }
            }
            this.snapshotProject()
            // 通过drop event插入组件数据，DOM重绘时间不确定，使用this.$nextTick()，仍不行，暂时加个延迟
            setTimeout(() => {
                this.currentComponentId = newComponent.id
            }, 200)


            this.$Message({
                showClose: true,
                message,
                type: 'success'
            })
        },
        clickEvent(e) {
            const targetNode = this.findSpecifyNodeByClassName(e.target, 'layout-container')
            if (!targetNode) return
            this.currentComponentId = targetNode.dataset.componentId
            this.componentSelectedStack = [targetNode.dataset.componentId]
        },
        repaintDragoverBox() {
            if (!this.dragoverBox.target) return
            this.$nextTick(() => {
                const containerRect = this.getContainerRect()
                const rect = this.dragoverBox.target.getBoundingClientRect()
                this.dragoverBox.style = {
                    display: 'block',
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                    top: `${this.$el.scrollTop - containerRect.top + rect.top}px`,
                    left: `${this.$el.scrollLeft - containerRect.left + rect.left}px`
                }
            })
        },
        getContainerRect() {
            const rect = this.$el.getBoundingClientRect()
            return rect
        },
        registerResizeEvent(id, option) {
            // option: el, callback
            this.$ResizeEvent.register(id, option)
        },
        disposeResizeEvent(id) {
            this.$ResizeEvent.dispose(id)
        },
        resize(e) {
            if (this.timeout) clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                this.repaintHighlightBox()
                this.repaintSelectBox()
                console.log('resize: ', e)
            }, this.delay)
        }
    },
    created() {
        this.$EventStack.register('editor-container', 'dragover', this.ondragover)
        this.$EventStack.register('editor-container', 'drop', this.ondrop)
        window.addEventListener('resize', this.resize, false)
    },
    mounted() {
        this.$nextTick(() => {
            const option = {
                el: this.$el,
                callback: this.resize
            }
            this.registerResizeEvent('EditorContainer', option)
        })
    },
    destroyed() {
        this.$ResizeEvent.destroy()

        this.$EventStack.dispose('editor-container', 'dragover')
        this.$EventStack.dispose('editor-container', 'drop')
        window.removeEventListener('resize', this.resize, false)
    }
}
</script>
<style lang="less">
@import "~styles/variables";

.editor-container {
    position: relative;
    scroll-behavior: smooth;
    transition: width 0.35s cubic-bezier(0.23, 1, 0.32, 1);
    outline: none;
    overflow: auto;
    &-layer {
        pointer-events: none;
    }
    &-stage {
        margin: 30px auto;
        background: @white-color;
        overflow: auto;
        // background-image: linear-gradient(
        //         rgb(232, 232, 232) 1px,
        //         transparent 0px
        //     ),
        //     linear-gradient(90deg, rgb(232, 232, 232) 1px, transparent 0px),
        //     linear-gradient(rgb(242, 242, 242) 1px, transparent 0px),
        //     linear-gradient(90deg, rgb(242, 242, 242) 1px, transparent 0px);
        // background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
    }
    .highlight-box,
    .dragover-box,
    .select-box,
    .position-select-box {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        z-index: 1;
        outline: 1px solid @primary-color;
    }
    .highlight {
        &-name {
            display: inline-block;
            position: relative;
            top: -20px;
            left: -1px;
            z-index: 2;
            width: auto;
            height: 20px;
            padding: 2px 5px;
            border-radius: 3px 3px 0px 0px;
            font-size: @font-size-small;
            color: @white-color;
            background: @primary-color;
        }
    }
    .dragover {
        &-box {
            outline: 1px dashed @primary-color;
            background: rgba(187, 218, 239, 0.5);
        }
        &-hint {
            text-align: center;
            color: @white-color;
            background: @primary-color;
        }
    }
    .select {
        &-actions {
            position: absolute;
            top: -26px;
            right: -1px;
            z-index: 2;
            border-radius: 3px 3px 0px 0px;
            overflow: hidden;
            i {
                padding: 6px;
                color: @primary-light-color;
                background: @primary-color;
                pointer-events: auto;
                line-height: 1;
                cursor: pointer;
                &:hover {
                    color: @white-color;
                }
            }
        }
    }
    .position-select {
        &-box {
            outline: 1px dashed @primary-color;
        }
        &-handle {
            width: 100%;
            height: 100%;
            pointer-events: auto;
            cursor: grab;
            i {
                position: absolute;
                display: inline-block;
                width: 9px;
                height: 9px;
                border: 1px solid @primary-color;
            }
            .handle {
                &-top-left {
                    top: -5px;
                    left: -5px;
                    cursor: nwse-resize;
                }
                &-top {
                    top: -5px;
                    left: 50%;
                    margin-left: -5px;
                    cursor: ns-resize;
                }
                &-top-right {
                    top: -5px;
                    right: -5px;
                    cursor: nesw-resize;
                }
                &-bottom-left {
                    bottom: -5px;
                    left: -5px;
                    cursor: nesw-resize;
                }
                &-bottom {
                    bottom: -5px;
                    left: 50%;
                    margin-left: -5px;
                    cursor: ns-resize;
                }
                &-bottom-right {
                    bottom: -5px;
                    right: -5px;
                    cursor: nwse-resize;
                }
                &-left {
                    top: 50%;
                    left: -5px;
                    margin-top: -5px;
                    cursor: ew-resize;
                }
                &-right {
                    top: 50%;
                    right: -5px;
                    margin-top: -5px;
                    cursor: ew-resize;
                }
            }
        }
        &-actions {
            position: absolute;
            top: -36px;
            right: -1px;
            z-index: 2;
            border-radius: 3px 3px 0px 0px;
            overflow: hidden;
            i {
                padding: 6px;
                color: @primary-light-color;
                background: @primary-color;
                pointer-events: auto;
                line-height: 1;
                cursor: pointer;
                &:hover {
                    color: @white-color;
                }
            }
        }
    }
}
</style>
