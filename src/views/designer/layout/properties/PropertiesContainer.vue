<template>
  <div class="properties-container">
    Properties
    {{component}}
  </div>
</template>
<script>
export default {
    name: 'PropertiesContainer',
    props: {
        componentId: String,
        project: Object
    },
    data() {
        return {
            component: {}
        }
    },
    watch: {
        componentId: {
            handler: 'findComponent',
            immediate: true
        }
    },
    methods: {
        findComponent(componentId) {
            console.log(componentId)
            if (!componentId) {
                this.component = {}
                return
            }
            const recursion = (component, id) => {
                if (component.id === id) {
                    this.component = component
                    return
                }
                for (let i = 0; i < component.children.length; i++) {
                    const data = component.children[i]
                    recursion(data, id)
                    if (data.id === id) break
                }
            }
            recursion(this.project.components, componentId)
        }
    }
}
</script>
