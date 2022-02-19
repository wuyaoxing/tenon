import componentMixins from './components/componentMixins'

const modules1 = import.meta.globEager('./components/**/index.vue')
const modules2 = import.meta.globEager('./layout/**.vue')

export default {
    data() {
        return {
            asyncComponents: {},
        }
    },
    methods: {
        asyncLoadComponent(name) {
            if (!this.asyncComponents[name]) {
                try {
                    const component = modules1[`./components/${name}/index.vue`].default
                    this.asyncComponents[name] = {
                        extends: component,
                        mixins: [componentMixins]
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            return this.asyncComponents[name]
        },
        asyncLoadPanel(name) {
            if (!this.asyncComponents[name]) {
                try {
                    this.asyncComponents[name] = modules2[`./layout/${name}.vue`].default
                } catch (error) {
                    console.log(error)
                }
            }
            return this.asyncComponents[name]
        },
    },
}
