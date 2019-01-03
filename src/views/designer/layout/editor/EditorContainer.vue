<template>
  <div class="editor-container f-f-1"
       tabindex="1">
    <NestedContainer :selected="project.components.id === componentId"
                     :showUp="false"
                     :showDown="false"
                     :showDelete="false"
                     @click="clickEvent(project.components.id)"
                     @drop="dropEvent">
      <RenderNestedLayoutCompiler :componentId.sync="currentComponentId"
                                  :component="project.components" />
    </NestedContainer>
  </div>
</template>
<script>
import NestedContainer from './NestedContainer'
import RenderNestedLayoutCompiler from './RenderNestedLayoutCompiler'

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
    data() {
        return {
            dragoverTarget: null
        }
    },
    methods: {
        ondragover(e) {
            e.preventDefault()
            if (e.target.classList.contains('nested-container')) {
                if (this.dragoverTarget === e.target) return
                this.dragoverTarget = e.target
                this.removeHoverHandler()
                e.target.classList.add('hover')
            }
        },
        ondrop(e) {
            e.preventDefault()
            this.removeHoverHandler()
        },
        removeHoverHandler() {
            const nestedContainerItems = document.querySelectorAll('.nested-container')
            nestedContainerItems.forEach(item => {
                item.classList.remove('hover')
            })
        },
        dropEvent(e) {
            const dragData = e.dataTransfer.getData('Text')
            console.log('first drop:', e, dragData, this)
            try {
                const praseDragData = JSON.parse(dragData)
                this.project.components.children.push(praseDragData)
            } catch (error) {
                console.log('first drop error:', error)
            }
        },
        clickEvent(id) {
            this.currentComponentId = id
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
