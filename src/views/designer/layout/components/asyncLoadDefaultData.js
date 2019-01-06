export default {
    data() {
        return {
            asyncDefaultData: {},
        }
    },
    methods: {
        asyncLoadDefaultData(name) {
            if (!this.asyncDefaultData[name]) this.asyncDefaultData[name] = require(`../../components/${name}/data.json`)
            return this.asyncDefaultData[name]
        },
    },
}
