import Handle from './handle/Handle.vue'

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
