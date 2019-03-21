export default {
    install(Vue, options) {
        const parser = key => {
            let result = options
            const arr = key.split('.')
            for (let i = 0; i < arr.length; i++) {
                result && (result = result[arr[i]])
            }
            return result || key
        }

        Vue.filter('i18n', parser)
        Vue.directive('i18n', {
            bind(el, { value }) {
                el.textContent = parser(value)
            },
            update(el, { value }) {
                el.textContent = parser(value)
            },
        })
        Vue.prototype.$i18n = parser
    },
}
