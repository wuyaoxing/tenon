<template>
    <div class="editor-container"
         tabindex="1"
         @click="clickEvent">
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
             @scroll="resize">
            <RenderNestedLayoutCompiler class="editor-container-wrap"
                                        :component="project.components" />
        </div>
    </div>
</template>
<script>
import RenderNestedLayoutCompiler from 'views/designer/compiler/RenderNestedLayoutCompiler'

import asyncLoadComponentMixins from 'views/designer/compiler/asyncLoadComponent'

import dragEventMixins from './dragEvent'
import resizeEventMixins from './resizeEvent'

import highlightBoxMixins from './highlightBox'
import selectBoxMixins from './selectBox'
import mouseEventMixins from './mouseEvent'

export default {
    name: 'EditContainer',
    mixins: [
        asyncLoadComponentMixins,
        dragEventMixins,
        resizeEventMixins,
        highlightBoxMixins,
        selectBoxMixins,
        mouseEventMixins
    ],
    props: {
        componentId: String,
        project: Object
    },
    inject: ['snapshotProject'],
    components: {
        RenderNestedLayoutCompiler
    },
    provide() {
        return {
            asyncLoadComponent: this.asyncLoadComponent,
            project: this.project
        }
    },
    data() {
        return {
            component: {},
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
        clickEvent(e) {
            const targetNode = e.target.closest('.layout-container')
            if (!targetNode) return
            const { componentId } = targetNode.dataset
            this.currentComponentId = componentId
            this.componentSelectedStack = [componentId]
        },
        getContainerRect() {
            const rect = this.$el.getBoundingClientRect()
            return rect
        }
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
    user-select: none;
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
