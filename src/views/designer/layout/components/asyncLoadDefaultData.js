const modules = import.meta.globEager('../../components/**/data.json')

export default {
    data() {
        return {
            asyncDefaultData: {},
        }
    },
    methods: {
        asyncLoadDefaultData(name) {
            if (!this.asyncDefaultData[name]) this.asyncDefaultData[name] = modules[`../../components/${name}/data.json`]
            return this.asyncDefaultData[name]
        },
    },
}
