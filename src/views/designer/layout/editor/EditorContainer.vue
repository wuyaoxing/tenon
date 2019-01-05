<template>
  <div class="editor-container f-f-1"
       tabindex="1">
    <NestedContainer :data-component-id="project.components.id"
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
            dragoverTarget: null,
            dragoverInfo: {}
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
            // TODO：判断点与矩形相交，可设置偏移量，以区分同级插入或子级插入以及提示信息
            if (e.target.classList.contains('nested-container')) {
                if (this.dragoverTarget === e.target) return
                this.dragoverTarget = e.target
                this.dragoverInfo = {
                    componentId: this.dragoverTarget.dataset.componentId,
                    hint: this.hint(this.dragoverTarget.dataset.componentName)
                }
            }
        },
        ondrop(e) {
            e.preventDefault()
            this.dragoverTarget = null
            this.dragoverInfo = {}
        },
        dropEvent(e) {
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
        hint(name) {
            let hint = ''
            if (name === 'NestedLayoutContainer') {
                hint = '插入 NestedLayoutContainer 内部'
            } else if (name === 'PositionLayoutContainer') {
                hint = '插入 PositionLayoutContainer 内部'
            } else {
                hint = `插入 ${name} 下方`
            }
            return hint
        }
    },
    created() {
        this.$EventStack.register('editor-container', 'dragover', this.ondragover)
        this.$EventStack.register('editor-container', 'drop', this.ondrop)
    },
    destroyed() {
        this.$EventStack.dispose('editor-container', 'dragover')
        this.$EventStack.dispose('editor-container', 'drop')
    }
}
</script>
<style lang="less">
@import "~styles/variables";

.editor-container {
  outline: none;
  overflow: auto;
}
</style>
