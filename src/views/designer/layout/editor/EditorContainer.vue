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
            designerContentProperties: {}
        }
    },
    methods: {
        ondragover(e) {
            e.preventDefault()
        },
        dropEvent(e) {
            const dragData = e.dataTransfer.getData('Text')
            console.log('first drop:', e, dragData, this)
            if (dragData) {
                const praseDragData = JSON.parse(dragData)
                this.project.components.children.push(praseDragData)
            }
        },

        clickEvent(id) {
            this.currentComponentId = id
        },
        ondrop(e) {
            console.log('first drop:', e, this)
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

            // const recursion = (component, id) => {
            //     if (component.id === id) {
            //         this.component = component
            //         return
            //     }
            //     for (let i = 0; i < component.children.length; i++) {
            //         const data = component.children[i]
            //         recursion(data, id)
            //         if (data.id === id) break
            //     }
            // }
            // recursion(this.project.components, componentId)

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
