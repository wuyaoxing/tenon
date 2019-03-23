export default {
    data() {
        return {
            highlightBox: {
                target: null,
                tagName: '',
                style: {},
                actionsStyle: {}
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
                const top = Math.floor(rect.top) - Math.floor(containerRect.top) + 1
                const left = Math.floor(rect.left) - Math.floor(containerRect.left) + 1
                this.highlightBox.style = {
                    display: 'block',
                    width: `${Math.floor(rect.width) - 2}px`,
                    height: `${Math.floor(rect.height) - 2}px`,
                    top: `${top}px`,
                    left: `${left}px`
                }
                this.highlightBox.actionsStyle = top < 30 ? { top: 0 } : {}
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
