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
                 :style="selectBox.style">
                <div class="select-actions f f-ai-c">
                    <i class="icon-generate-component"
                       title="Generate component"
                       v-if="selectBoxVisiable.showRecombination"
                       @click="recombinationComponent"></i>
                    <i class="icon-left-up"
                       title="Select parent"
                       v-if="selectBoxVisiable.showSelectParent"
                       @click="selectParentComponent"></i>
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
import { nestedComponents } from '../../components/config'


export default {
    name: 'EditContainer',
    props: {
        componentId: String,
        project: Object
    },
    components: {
        RenderNestedLayoutCompiler
    },
    data() {
        return {
            component: {},
            isStage: false,
            highlightBox: {
                target: null,
                tagName: '',
                style: {}
            },
            dragoverBox: {
                target: null,
                componentId: '',
                rect: {},
                hint: '',
                placement: 'inside',
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
                visiable.showRecombination = this.project.components.id !== this.currentComponentId
                visiable.showSelectParent = this.project.components.id !== this.currentComponentId
            }

            return visiable
        }
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
            console.log(componentId)
            this.component = {}
            if (!componentId) return
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
            const parentNode = this.findParentNodeByClass(e.target, 'nested-container')
            if (!parentNode) return

            if (this.dragoverBox.target !== parentNode) {
                this.dragoverBox.target = parentNode

                this.isStage = parentNode.classList.contains('editor-container-wrap')
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

                let component = null
                if (this.project.components.id === id) {
                    component = this.project.components
                } else {
                    component = this.component.children.find(item => item.id === id)
                }
                this.dropEvent(e, component)
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
        dropEvent(e, component) {
            let message = ''
            const dragData = e.dataTransfer.getData('Text')
            console.log('nested drop:', e, component, dragData, this)

            try {
                const praseDragData = JSON.parse(dragData)
                if (this.dragoverBox.placement === 'up') {
                    if (this.checkNestedName(praseDragData.name)) {
                        const index = this.component.children.findIndex(item => item.id === component.id)
                        this.component.children.splice(index, 0, praseDragData)
                    } else {
                        message = `NestedLayoutContainer 不允许 ${praseDragData.name}  拖放到此处。`
                    }
                } else if (this.dragoverBox.placement === 'down') {
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
        },
        checkNestedName(name) {
            return nestedComponents.indexOf(name) > -1
        },
        clickEvent(e) {
            const parentNode = this.findParentNodeByClass(e.target, 'nested-container')
            if (!parentNode) return
            this.currentComponentId = parentNode.dataset.componentId
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
                this.highlightBox.style = {
                    display: 'block',
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                    top: `${container.scrollTop - container.offsetTop + rect.top}px`,
                    left: `${container.scrollLeft - container.offsetLeft + rect.left}px`
                }
            })
        },
        repaintDragoverBox() {
            if (!this.dragoverBox.target) return
            this.$nextTick(() => {
                const container = this.$el
                const rect = this.dragoverBox.target.getBoundingClientRect()
                this.dragoverBox.style = {
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
        recombinationComponent() {
            const data = localStorage.getItem('Tenon-recombination-components')
            const recombinationComponent = data ? JSON.parse(data) : []
            const currentComponent = this.component.children.find(item => item.id === this.currentComponentId)

            recombinationComponent.push({
                id: this.$uuid(),
                name: currentComponent.name + currentComponent.id,
                data: currentComponent
            })
            localStorage.setItem('Tenon-recombination-components', JSON.stringify(recombinationComponent))
            console.log('showRecombination: ', recombinationComponent)
        },
        selectParentComponent() {
            const recursion = (component, id) => {
                if (component.id === id) {
                    return
                }
                if (component.children) {
                    for (let i = 0; i < component.children.length; i++) {
                        const data = component.children[i]
                        recursion(data, id)
                        if (data.id === id) {
                            this.currentComponentId = component.id
                            break
                        }
                    }
                }
            }
            recursion(this.project.components, this.currentComponentId)
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
    .highlight-box,
    .dragover-box,
    .select-box {
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
}
</style>
