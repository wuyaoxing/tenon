import componentMixins from './components/componentMixins'

export default {
    data() {
        return {
            asyncComponents: {},
        }
    },
    methods: {
        asyncLoadComponent(name) {
            if (!this.asyncComponents[name]) {
                this.asyncComponents[name] = () => import(`./components/${name}`).then(module => {
                    const newModule = Object.create(module)
                    newModule.default.mixins = (newModule.default.mixins || []).concat(componentMixins)
                    return newModule
                })
            }
            return this.asyncComponents[name]
        },
    },
}
