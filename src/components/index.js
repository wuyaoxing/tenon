import Handle from './handle/Handle'

const components = {
    Handle
}

export default {
    install(Vue) {
        Object.keys(components).forEach(key => {
            Vue.component(key, components[key])
        })
    },
}
