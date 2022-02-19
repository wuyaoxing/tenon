import propertiesMixins from './properties'

const modules = import.meta.globEager('../components/**/index.vue')

export default {
    data() {
        return {
            asyncComponents: {}
        }
    },
    methods: {
        asyncLoadComponent(name) {
            if (!this.asyncComponents[name]) {
                try {
                    const component = modules[`../components/${name}/index.vue`].default
                    this.asyncComponents[name] = {
                        extends: component,
                        mixins: [propertiesMixins]
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            return this.asyncComponents[name]
        }
    }
}
