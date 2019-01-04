export default {
    data() {
        return {
            asyncSchema: {},
        }
    },
    methods: {
        asyncLoadSchema(name) {
            if (!this.asyncSchema[name]) this.asyncSchema[name] = require(`../../components/${name}/schema.js`)
            console.log(this.asyncSchema[name])
            return this.asyncSchema[name]
        },
    },
}
