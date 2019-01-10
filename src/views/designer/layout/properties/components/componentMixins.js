export default {
    props: {
        value: [String, Number],
        readonly: Boolean,
        properties: Object,
        schema: {
            type: Object,
            default() {
                return {}
            }
        },
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
        }
    },
}
