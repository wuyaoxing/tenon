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
            const targetNode = e.target.closest('.layout-container')
            if (!targetNode) {
                this.highlightBox = {
                    target: null,
                    tagName: '',
                    style: {
                        display: 'none'
                    }
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
                this.highlightBox.style = {
                    display: 'block',
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                    top: `${this.$el.scrollTop - containerRect.top + rect.top}px`,
                    left: `${this.$el.scrollLeft - containerRect.left + rect.left}px`
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
