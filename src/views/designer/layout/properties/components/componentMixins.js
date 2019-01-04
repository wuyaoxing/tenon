export default {
    props: {
        value: [String, Number],
        properties: Object,
        schema: Object,
        constraint: Object,
    },
    computed: {
        currentValue: {
            get() {
                return this.value
            },
            set(val) {
                const formatValue = this.schema.type === 'number' ? Number(val) : val
                this.$emit('update:value', formatValue)
            },
        },
        readonly() {
            return !!this.schema.readonly
        },
    },
}
