export default {
    data() {
        return {
            asyncComponents: {},
        }
    },
    methods: {
        // asyncLoadComponent(name, dir) {
        //     if (this.asyncComponents[name]) return
        //     this.asyncComponents[name] = () => import(`${dir}/${name}`).then(data => {
        //         console.log(data)
        //         return data
        //     })
        // },
        // asyncLoadComponent(name, dir) {
        //     if (this.asyncComponents[name]) return
        //     this.asyncComponents[name] = () => import(`../${dir}`)
        // },

        asyncLoadComponent(name) {
            if (!this.asyncComponents[name]) this.asyncComponents[name] = () => import(`../../components/${name}`)
            return this.asyncComponents[name]
        },
    },
}
