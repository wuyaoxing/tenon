<template>
    <div class="editor-container f-f-1"
         tabindex="1">
        <div class="editor-container-layer">
            <div class="highlight-box"
                 :style="highlight.style">
                <div class="highlight-name">{{highlight.tagName}}</div>
            </div>
        </div>
        <NestedContainer class="editor-container-stage"
                         :data-component-id="project.components.id"
                         :data-component-name="project.components.name"
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
            isStage: false,
            dragoverTarget: null,
            dragoverRect: {},
            dragoverInfo: {
                componentId: '',
                hint: '',
                placement: 'inside'
            },
            highlight: {
                target: null,
                tagName: '',
                style: {}
            }
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
        }
    },
    methods: {
        ondragover(e) {
            e.preventDefault()
            if (e.target.classList.contains('nested-container')) {
                // console.log('dragover:', e)
                if (this.dragoverTarget !== e.target) {
                    this.dragoverTarget = e.target
                    this.isStage = e.target.classList.contains('editor-container-stage')
                    this.dragoverInfo.componentId = this.dragoverTarget.dataset.componentId
                    this.dragoverRect = this.dragoverTarget.getBoundingClientRect()
                }
            }

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
                this.highlight = {
                    target: null,
                    tagName: '',
                    style: {
                        display: 'none'
                    }
                }
                return
            }
            if (!e.target.classList.contains('nested-container') && !e.target.classList.contains('position-container')) return
            if (this.highlight.target === e.target) return

            const container = this.$el
            const rect = e.target.getBoundingClientRect()
            this.highlight.style = {
                display: 'block',
                width: `${rect.width}px`,
                height: `${rect.height}px`,
                top: `${container.scrollTop - container.offsetTop + rect.top}px`,
                left: `${container.scrollLeft - container.offsetLeft + rect.left}px`
            }
            this.highlight.target = e.target
            this.highlight.tagName = e.target.tagName
            console.log(this, e, rect, this.highlight)
        }
    },
    created() {
        this.$EventStack.register('editor-container', 'mousemove', this.mousemove)
        this.$EventStack.register('editor-container', 'dragover', this.ondragover)
        this.$EventStack.register('editor-container', 'drop', this.ondrop)
    },
    destroyed() {
        this.$EventStack.dispose('editor-container', 'mousemove')
        this.$EventStack.dispose('editor-container', 'dragover')
        this.$EventStack.dispose('editor-container', 'drop')
    }
}
</script>
<style lang="less">
@import "~styles/variables";

.editor-container {
    position: relative;
    outline: none;
    overflow: auto;
    scroll-behavior: smooth;
    .highlight {
        &-box {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            z-index: inherit;
            border: 1px solid @primary-color;
        }
        &-name {
            display: inline-block;
            position: relative;
            top: -20px;
            left: -1px;
            z-index: 1;
            width: auto;
            height: 20px;
            padding: 2px 5px;
            border-radius: 3px 3px 0px 0px;
            font-size: @font-size-small;
            color: @white-color;
            background: @primary-color;
        }
    }
}
</style>
