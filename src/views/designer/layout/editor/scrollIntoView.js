export default {
    props: {
        selected: Boolean,
        isScroll: Boolean,
    },
    watch: {
        selected: {
            handler: 'scrollIntoView',
            immediate: true,
        },
    },
    methods: {
        scrollIntoView(val) {
            if (!val) return
            if (!this.isScroll) {
                this.$emit('update:isScroll', true)
                return
            }
            this.$nextTick(() => {
                this.$el.scrollIntoView()
            })
        },
    },
}
