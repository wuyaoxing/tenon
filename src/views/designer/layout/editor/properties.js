export default {
    props: {
        properties: Object,
    },
    data() {
        return {
            propertiesData: {
                width: '',
                height: '',
                minWidth: '',
                minHeight: '',
                x: 10, // X轴偏移量
                y: 10, // y轴偏移量
                z: 1, // z轴偏移量
                css: {},
                template: '',
                dragindex: 0, // 拖拽元素z序
                draggable: true, // 是否可被拖动
                resizable: true, // 是否可改变大小
                zoom: 1, // 缩放
                disable: false, // 禁用
                constraint: {}, // 约束
            },
        }
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
                if (this.develop) {
                    const arr = ['position', 'top', 'right', 'bottom', 'left', 'zIndex', 'margin', 'width', 'height', 'minWidth', 'minHeight']
                    if (arr.indexOf(key) > -1) {
                        this.$el.style[key] = this.style[key]
                    } else {
                        this.$el.lastChild.style[key] = this.style[key]
                    }
                    this.$el.lastChild.style.width = '100%'
                    this.$el.lastChild.style.height = '100%'
                } else {
                    this.$el.style[key] = this.style[key]
                }
            })
        }
    },
    mounted() {
        this.$nextTick(() => {
            setTimeout(() => {
                this.repaint()
            }, 50)
        })
    },
}
