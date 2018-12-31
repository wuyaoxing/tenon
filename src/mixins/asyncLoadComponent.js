export default {
    data() {
        return {
            asyncComponents: {},
        }
    },
    methods: {
        asyncLoadComponent(name, dir) {
            if (this.asyncComponents[name]) return
            this.asyncComponents[name] = () => import(`${dir}/${name}`)
        },
    },
}
