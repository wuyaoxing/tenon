<template>
  <div class="properties-container">
    Properties
    {{asyncSchema[component.name]}}
    <ul>
      <li v-for="(item, key) in componentSchema.properties"
          :key="key">
        <span>{{key}}</span>
        <component :is="asyncLoadComponent(item.format)"
                   :schema="item"
                   :properties="component.properties"
                   :value.sync="component.properties[key]"></component>
      </li>
    </ul>
    {{component}}
  </div>
</template>
<script>
import asyncLoadSchemaMixins from './asyncLoadSchema'
import asyncLoadComponentMixins from './asyncLoadComponent'

export default {
    name: 'PropertiesContainer',
    mixins: [asyncLoadSchemaMixins, asyncLoadComponentMixins],
    props: {
        componentId: String,
        project: Object
    },
    data() {
        return {
            component: {}
        }
    },
    computed: {
        componentSchema() {
            return this.asyncSchema[this.component.name] || {}
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
                if (component.children) {
                    for (let i = 0; i < component.children.length; i++) {
                        const data = component.children[i]
                        recursion(data, id)
                        if (data.id === id) break
                    }
                }
            }
            recursion(this.project.components, componentId)

            this.asyncLoadSchema(this.component.name)
        }
    }
}
</script>
