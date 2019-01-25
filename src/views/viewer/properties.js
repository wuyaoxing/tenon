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
            handler(val) {
                console.log(val)
                this.repaint()
            },
            deep: true
        }
    },
    methods: {
        repaint() {
            console.log('repaint: ', this)
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
