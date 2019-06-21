<template>
    <Select class="properties-select"
            v-model="currentValue"
            size="mini"
            filterable
            :placeholder="placeholder">
        <Option v-for="item in schemaEnum"
                :key="item.value"
                :label="item.text"
                :value="item.value" />
    </Select>
</template>
<script>
export default {
    name: 'properties-select',
    data() {
        return {
            schemaEnum: [],
            unwatch: null
        }
    },
    methods: {
        formatSchema() {
            const { schema } = this
            if (this.properties && this.properties.enum) {
                this.schemaEnum = this.properties.enum
            } else if (schema.enum) {
                this.schemaEnum = schema.enum
            } else if (schema.relation) {
                this.unwatch = this.$watch(`properties.${schema.relation}`, val => {
                    this.currentValue = ''
                    if (val) this.getData(schema, val)
                })
            } else if (schema.url) {
                this.getData(schema)
            }
        },
        async getData(schema, id) {
            console.log('async schema get data - 1: ', schema, id)
            await this.$Sleep(3000)
            this.schemaEnum = [
                { text: `${id || ''} 上 ${schema.description}`, value: 1 },
                { text: '右', value: 2 },
                { text: '下', value: 3 },
                { text: '左', value: 4 },
            ]
            console.log('async schema get data - 2: ', schema)
        },
        init() {
            this.formatSchema()
        }
    },
    created() {
        this.init()
    },
    destroyed() {
        if (this.unwatch) this.unwatch()
    }
}
</script>

<style lang="less">
.properties-select {
}
</style>
