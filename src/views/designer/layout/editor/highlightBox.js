export default {
    data() {
        return {
            highlightBox: {
                target: null,
                tagName: '',
                style: {},
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
                        display: 'none',
                    },
                }
                return
            }
            const targetNode = e.target.closest('.layout-container')
            if (!targetNode) {
                this.highlightBox = {
                    target: null,
                    tagName: '',
                    style: {
                        display: 'none',
                    },
                }
                return
            }

            if (this.highlightBox.target === targetNode) return

            this.highlightBox.target = targetNode
            this.highlightBox.tagName = targetNode.dataset.componentName

            this.repaintHighlightBox()
        },
        repaintHighlightBox() {
            if (!this.highlightBox.target) return
            this.$nextTick(() => {
                const containerRect = this.getContainerRect()
                const rect = this.highlightBox.target.getBoundingClientRect()
                const { scrollTop, scrollLeft } = this.$el
                const top = Math.floor(rect.top - containerRect.top + scrollTop)
                const left = Math.floor(rect.left - containerRect.left + scrollLeft)
                this.highlightBox.style = {
                    display: 'block',
                    width: `${Math.floor(rect.width)}px`,
                    height: `${Math.floor(rect.height)}px`,
                    top: `${top}px`,
                    left: `${left}px`,
                }
            })
        },
    },
    created() {
        this.$EventStack.register('highlight-box', 'mousemove', this.mousemove)
    },
    destroy() {
        this.$EventStack.dispose('highlight-box', 'mousemove')
    },
}
