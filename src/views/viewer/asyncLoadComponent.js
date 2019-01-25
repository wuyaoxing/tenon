import propertiesMixins from './properties'

export default {
    data() {
        return {
            asyncComponents: {},
        }
    },
    methods: {
        asyncLoadComponent(name) {
            if (!this.asyncComponents[name]) {
                this.asyncComponents[name] = () => import(`../designer/components/${name}`).then(module => {
                    const newModule = Object.create(module)
                    newModule.default.mixins = (newModule.default.mixins || []).concat(propertiesMixins)
                    return newModule
                })
            }
            return this.asyncComponents[name]
        },
    },
}
