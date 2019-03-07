export default {
    data() {
        return {
            timer: '',
            delay: 200,
        }
    },
    methods: {
        registerResizeEvent(id, option) {
            // option: el, callback
            this.$ResizeEvent.register(id, option)
        },
        disposeResizeEvent(id) {
            this.$ResizeEvent.dispose(id)
        },
        resize(e) {
            if (this.timer) clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.repaintHighlightBox()
                this.repaintSelectBox()
                console.log('resize: ', e)
            }, this.delay)
        }
    },
    created() {
        window.addEventListener('resize', this.resize, false)
    },
    mounted() {
        this.$nextTick(() => {
            const option = {
                el: this.$el,
                callback: this.resize
            }
            this.registerResizeEvent('EditorContainer', option)
        })
    },
    destroyed() {
        this.$ResizeEvent.destroy()
        window.removeEventListener('resize', this.resize, false)
    }
}
