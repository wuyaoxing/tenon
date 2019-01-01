<template>
  <div class="editor-container f-f-1"
       tabindex="1"
       @dragover="ondragover"
       @drop="ondrop">
    <RenderNestedLayoutCompiler :componentId.sync="currentComponentId"
                                :component="project.components" />
  </div>
</template>
<script>
import RenderNestedLayoutCompiler from './RenderNestedLayoutCompiler'

export default {
    name: 'EditContainer',
    props: {
        componentId: String,
        project: Object
    },
    components: {
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
            designerContentProperties: {}
        }
    },
    methods: {
        ondragover(e) {
            e.preventDefault()
        },
        ondrop(e) {
            console.log('drop:', e, this)
            const dragData = e.dataTransfer.getData('Text')
            if (dragData) {
                const praseDragData = JSON.parse(dragData)

                const properties = {
                    ...praseDragData.properties,
                    x: e.clientX - this.designerContentProperties.x,
                    y: e.clientY - this.designerContentProperties.y,
                    z: 1
                    // minWidth: 80,
                    // minHeight: 80,
                    // maxWidth: 120,
                    // maxHeight: 120
                }
                this.addComponent({ ...praseDragData, properties })
            }
        },
        addComponent(data) {
            const component = { id: this.$uuid(), ...data }
            // 注册组件
            this.asyncLoadComponent(component)
            this.components.push(component)

            // this.dragContainerSelect(component)
        }
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
