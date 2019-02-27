export default {
    data() {
        return {
            highlightBox: {
                target: null,
                tagName: '',
                style: {}
            },
        }
    },
    methods: {
        mousemove(e) {
            if (!this.$el.contains(e.target)) {
                this.highlightBox = {
                    target: null,
                    tagName: '',
                    style: {
                        display: 'none'
                    }
                }
                return
            }
            const targetNode = this.findSpecifyNodeByClassName(e.target, 'layout-container')
            if (!targetNode) return

            if (this.highlightBox.target === targetNode) return

            this.highlightBox.target = targetNode
            this.highlightBox.tagName = targetNode.dataset.componentName

            this.repaintHighlightBox()
        },
        repaintHighlightBox() {
            if (!this.highlightBox.target) return
            this.$nextTick(() => {
                const container = this.$el
                const rect = this.highlightBox.target.getBoundingClientRect()
                this.highlightBox.style = {
                    display: 'block',
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                    top: `${container.scrollTop - container.offsetTop + rect.top}px`,
                    left: `${container.scrollLeft - container.offsetLeft + rect.left}px`
                }
            })
        },
    },
    created() {
        this.$EventStack.register('highlight-box', 'mousemove', this.mousemove)
    },
    destroy() {
        this.$EventStack.dispose('highlight-box', 'mousemove')
    }
}
