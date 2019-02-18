<template>
    <Autocomplete v-model="currentValue"
                  :readonly="readonly"
                  size="mini"
                  placeholder="请输入内容"
                  :fetch-suggestions="querySearch"></Autocomplete>
</template>
<script>
export default {
    data() {
        return {
            schemaEnum: []
        }
    },
    methods: {
        querySearch(queryString, cb) {
            const results = queryString ? this.schemaEnum.filter(this.createFilter(queryString)) : this.schemaEnum
            // 调用 callback 返回建议列表的数据
            cb(results)
        },
        createFilter(queryString) {
            return option => (option.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        },
        init() {
            this.schemaEnum = this.schema.enum
        }
    },
    created() {
        this.init()
    }
}
</script>
