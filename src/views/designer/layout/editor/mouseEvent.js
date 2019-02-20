export default {
    data() {
        return {
            isMove: false, // 是否移动
        }
    },
    methods: {
        mousedownEvent(e) {
            if (!this.$refs.positionSelectHandle.contains(e.target)) {
                return
            }
            this.isMove = true
        },
        mouseupEvent() {
            this.isMove = false
        },
        mousemoveEvent(e) {
            if (!this.isMove) return
            console.log(e)
        }
    },
    mounted() {
        this.$EventStack.register('position-select-handle', 'mousedown', this.mousedownEvent)
        this.$EventStack.register('position-select-handle', 'mousemove', this.mousemoveEvent)
        this.$EventStack.register('position-select-handle', 'mouseup', this.mouseupEvent)
        console.log('EventStack:', this.$EventStack)
    },
    destroyed() {
        this.$EventStack.dispose('position-select-handle', 'mousedown')
        this.$EventStack.dispose('position-select-handle', 'mousemove')
        this.$EventStack.dispose('position-select-handle', 'mouseup')
    }
}
