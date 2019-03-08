export default {
    props: {
        properties: Object,
    },
    computed: {
        style() {
            return this.properties.css
        },
    },
    watch: {
        style: {
            handler() {
                this.repaint()
            },
            deep: true
        }
    },
    methods: {
        repaint() {
            // console.log('properties repaint: ', this)
            Object.keys(this.style).forEach(key => {
                this.$el.style[key] = this.style[key]
            })
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.repaint()
        })
    },
}
