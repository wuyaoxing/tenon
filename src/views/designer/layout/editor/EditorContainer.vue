<template>
    <div class="editor-container"
         tabindex="1">
        <div class="editor-container-layer">
            <div class="highlight-box"
                 :style="highlightBox.style">
                <div class="highlight-name">{{highlightBox.tagName}}</div>
            </div>
            <div class="select-box"
                 :style="selectBox.style">
                <div class="select-actions">
                    <i class="el-icon-caret-top"
                       v-if="selectBoxVisiable.showUp"
                       @click="upEvent"></i>
                    <i class="el-icon-caret-bottom"
                       v-if="selectBoxVisiable.showDown"
                       @click="downEvent"></i>
                    <i class="el-icon-delete"
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
             @scroll="resize">
            <NestedContainer class="editor-container-wrap"
                             :data-component-id="project.components.id"
                             :data-component-name="project.components.name"
                             :properties="project.components.properties"
                             :isDragover="dragoverInfo.componentId === project.components.id"
                             :hint="dragoverInfo.hint"
                             :selected="project.components.id === componentId"
                             :showUp="false"
                             :showDown="false"
                             :showDelete="false"
                             @click="clickEvent(project.components.id)"
                             @drop="dropEvent">
                <RenderNestedLayoutCompiler :componentId.sync="currentComponentId"
                                            :component="project.components"
                                            :dragoverInfo.sync="dragoverInfo" />
            </NestedContainer>
        </div>
    </div>
</template>
<script>
import NestedContainer from './NestedContainer'
import RenderNestedLayoutCompiler from './RenderNestedLayoutCompiler'
import { nestedComponents } from '../../components/config'


export default {
    name: 'EditContainer',
    props: {
        componentId: String,
        project: Object
    },
    components: {
        NestedContainer,
        RenderNestedLayoutCompiler
    },
    data() {
        return {
            component: {},
            isStage: false,
            dragoverTarget: null,
            dragoverRect: {},
            dragoverInfo: {
                componentId: '',
                hint: '',
                placement: 'inside'
            },
            highlightBox: {
                target: null,
                tagName: '',
                style: {}
            },
            selectBox: {
                target: null,
                tagName: '',
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
        selectBoxVisiable() {
            const visiable = {
                showUp: false,
                showDown: false,
                showDelete: false
            }
            if (this.component.children) {
                const index = this.component.children.findIndex(item => item.id === this.currentComponentId)
                visiable.showUp = index > 0
                visiable.showDown = this.component.children.length > 0 && index !== this.component.children.length - 1
                visiable.showDelete = this.project.components.id !== this.currentComponentId
            }

            return visiable
        }
    },
    watch: {
        componentId(val, oldVal) {
            this.disposeResizeEvent(oldVal)
            this.findComponentById(val)
            this.repaintHighlightBox()
            this.repaintSelectBox()
        }
    },
    methods: {
        findComponentById(componentId) {
            console.log(componentId)
            if (!componentId) {
                this.component = {}
                return
            }
            const recursion = (component, id) => {
                if (component.id === id) {
                    return
                }
                if (component.children) {
                    for (let i = 0; i < component.children.length; i++) {
                        const data = component.children[i]
                        recursion(data, id)
                        if (data.id === id) {
                            this.component = component
                            // this.selectBox.showUp = i > 0
                            // this.selectBox.showDown = component.children.length > 0 && i !== component.children.length - 1
                            // this.selectBox.showDelete = this.project.components.id !== id
                            break
                        }
                    }
                }
            }
            recursion(this.project.components, componentId)
        },
        findParentNodeByClass(el, className) {
            let specifyParentNode = null
            const recursion = node => {
                console.log('node:', node)
                if (node === this.$el) return
                if (node.classList.contains(className)) {
                    specifyParentNode = node
                    return
                }
                if (node.parentNode) {
                    recursion(node.parentNode, className)
                }
            }
            recursion(el)
            return specifyParentNode
        },
        ondragover(e) {
            e.preventDefault()
            if (!this.$el.contains(e.target)) {
                this.dragoverTarget = null
                this.dragoverInfo = {
                    componentId: '',
                    hint: '',
                    placement: 'inside'
                }
                return
            }
            const parentNode = this.findParentNodeByClass(e.target, 'nested-container')
            if (!parentNode) return
            // if (e.target.classList.contains('nested-container')) {
            // console.log('dragover:', e)
            if (this.dragoverTarget !== parentNode) {
                this.dragoverTarget = parentNode
                this.isStage = parentNode.classList.contains('editor-container-wrap')
                this.dragoverInfo.componentId = this.dragoverTarget.dataset.componentId
                this.dragoverRect = this.dragoverTarget.getBoundingClientRect()
            }
            // }

            // 判断点与矩形相交，可设置偏移量，区分同级插入或子级插入以及提示信息
            if (this.dragoverTarget) {
                const { componentName } = this.dragoverTarget.dataset

                const offset = {
                    x: 0,
                    y: 15
                }

                if (componentName !== 'NestedLayoutContainer' && componentName !== 'PositionLayoutContainer') {
                    offset.y = this.dragoverRect.height / 2
                }

                const point = {
                    x: e.clientX,
                    y: e.clientY
                }
                // up
                const rect1 = {
                    x: this.dragoverRect.x + offset.x,
                    y: this.dragoverRect.y,
                    w: this.dragoverRect.width - (offset.x * 2),
                    h: offset.y
                }
                // down
                const rect2 = {
                    x: this.dragoverRect.x + offset.x,
                    y: this.dragoverRect.y + this.dragoverRect.height - offset.y,
                    w: this.dragoverRect.width - (offset.x * 2),
                    h: offset.y
                }
                // inside
                const rect3 = {
                    x: this.dragoverRect.x + offset.x,
                    y: this.dragoverRect.y + offset.y,
                    w: this.dragoverRect.width - (offset.x * 2),
                    h: this.dragoverRect.height - (offset.y * 2)
                }

                if (this.pointInRect(point, rect1)) this.dragoverInfo.placement = 'up'
                if (this.pointInRect(point, rect2)) this.dragoverInfo.placement = 'down'
                if (this.pointInRect(point, rect3)) this.dragoverInfo.placement = 'inside'
                if (this.isStage) this.dragoverInfo.placement = 'inside'
                // console.log('pointInRect', point, rect, this.dragoverRect, this.pointInRect(point, rect), this.dragoverInfo.componentId, e, this.dragoverTarget)

                this.dragoverInfo.hint = `insert ${componentName} ${this.dragoverInfo.placement}`
            }
        },
        pointInRect(point, rect) {
            return point.x >= rect.x && point.y >= rect.y && point.x <= rect.x + rect.w && point.y <= rect.y + rect.h
        },
        ondrop(e) {
            e.preventDefault()
            this.dragoverTarget = null
            this.dragoverInfo = {
                componentId: '',
                hint: '',
                placement: 'inside'
            }
        },
        dropEvent(e) {
            this.ondrop(e)
            const dragData = e.dataTransfer.getData('Text')
            console.log('first drop:', e, dragData, this)
            try {
                const praseDragData = JSON.parse(dragData)
                if (nestedComponents.indexOf(praseDragData.name) > -1) {
                    this.project.components.children.push(praseDragData)
                    this.currentComponentId = praseDragData.id
                } else {
                    this.$Message({
                        showClose: true,
                        message: `NestedLayoutContainer 不允许 ${praseDragData.name}  拖放到此处。`,
                        type: 'warning'
                    })
                }
            } catch (error) {
                console.log('first drop error:', error)
            }
        },
        clickEvent(id) {
            this.currentComponentId = id
        },
        mousemove(e) {
            if (!this.$el.contains(e.target)) {
                this.highlightBox = {
                    target: null,
                    tagName: '',
                    style: {
                        display: 'none'
                    }
                }
                return
            }
            const parentNode = this.findParentNodeByClass(e.target, 'nested-container')
            if (!parentNode) return

            console.log('mousemove: ', this, e, this.highlightBox)
            // if (!e.target.classList.contains('nested-container') && !e.target.classList.contains('position-container')) return
            if (this.highlightBox.target === parentNode) return

            this.highlightBox.target = parentNode
            this.highlightBox.tagName = parentNode.dataset.componentName

            this.repaintHighlightBox()
        },
        repaintHighlightBox() {
            if (!this.highlightBox.target) return
            this.$nextTick(() => {
                const container = this.$el
                const rect = this.highlightBox.target.getBoundingClientRect()
                console.log('stage: ', rect, this)
                this.highlightBox.style = {
                    display: 'block',
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                    top: `${container.scrollTop - container.offsetTop + rect.top}px`,
                    left: `${container.scrollLeft - container.offsetLeft + rect.left}px`
                }
            })
        },
        repaintSelectBox() {
            if (!this.currentComponentId) {
                this.selectBox = {
                    target: null,
                    tagName: '',
                    style: {
                        display: 'none'
                    }
                }
                return
            }
            this.$nextTick(() => {
                const target = document.querySelector(`[data-component-id="${this.currentComponentId}"]`)
                const container = this.$el
                const rect = target.getBoundingClientRect()
                this.selectBox.style = {
                    display: 'block',
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                    top: `${container.scrollTop - container.offsetTop + rect.top}px`,
                    left: `${container.scrollLeft - container.offsetLeft + rect.left}px`
                }
                this.registerResizeEvent(target, this.resize)
            })
        },
        upEvent() {
            const arr = this.component.children
            const index = arr.findIndex(item => item.id === this.currentComponentId)
            arr.splice(index - 1, 0, arr.splice(index, 1)[0])
            this.repaintSelectBox()
        },
        downEvent() {
            const arr = this.component.children
            const index = arr.findIndex(item => item.id === this.currentComponentId)
            arr.splice(index + 1, 0, arr.splice(index, 1)[0])
            this.repaintSelectBox()
        },
        deleteEvent() {
            this.currentComponentId = ''
            const arr = this.component.children
            const index = arr.findIndex(item => item.id === this.currentComponentId)
            arr.splice(index, 1)
        },
        registerResizeEvent(el, callback) {
            this.$ResizeEvent.register(this.currentComponentId, {
                el,
                callback
            })
            console.log(this.$ResizeEvent)
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
        this.$EventStack.register('editor-container', 'mousemove', this.mousemove)
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
            this.$ResizeEvent.register('EditorContainer', option)
        })
    },
    destroyed() {
        this.$ResizeEvent.destroy()

        this.$ResizeEvent.dispose('EditorContainer')
        this.$EventStack.dispose('editor-container', 'mousemove')
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
    }
    .highlight {
        &-box {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            z-index: 1;
            border: 1px solid @primary-color;
        }
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
    .select {
        &-box {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            z-index: 1;
            border: 1px dashed @primary-color;
        }

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
                cursor: pointer;
                &:hover {
                    color: @white-color;
                }
            }
        }
    }
}
</style>
