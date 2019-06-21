export default {
    data() {
        return {
            asyncSchema: {},
        }
    },
    methods: {
        async asyncLoadSchema(name) {
            if (!this.asyncSchema[name]) {
                await import(`../../components/${name}/schema.js`).then(module => {
                    this.$set(this.asyncSchema, name, module.default)
                    this.$set(this.componentsSchema, name, this.asyncSchema[name])
                })
            }
            return this.asyncSchema[name]
        },
    },
}
