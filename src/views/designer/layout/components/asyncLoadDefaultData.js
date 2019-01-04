export default {
    data() {
        return {
            asyncDefaultData: {},
        }
    },
    methods: {
        async asyncLoadDefaultData(name) {
            if (!this.asyncDefaultData[name]) this.asyncDefaultData[name] = await require(`../../components/${name}/data.json`)
            return this.asyncDefaultData[name]
        },
    },
}
