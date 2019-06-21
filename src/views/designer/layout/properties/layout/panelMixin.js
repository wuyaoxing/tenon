export default {
    props: {
        schema: Object,
        data: Object
    },
    inject: ['asyncLoadComponent'],
    methods: {
        change(key, value) {
            this.$emit('change', key, value)
        }
    }
}
