export default {
    data() {
        return {
            selectBox: {
                target: null,
                layout: 'nestedLayout',
                style: {},
            },
        }
    },
    computed: {
        selectBoxVisiable() {
            const visiable = {
                showRecombination: false,
                showSelectParent: false,
                showUp: false,
                showDown: false,
                showDelete: false,
            }
            if (this.component.children) {
                const index = this.component.children.findIndex(item => item.id === this.currentComponentId)
                if (index > -1) {
                    // visiable.showRecombination = this.project.components.id !== this.currentComponentId
                    visiable.showSelectParent = true
                    visiable.showUp = index > 0
                    visiable.showDown = this.component.children.length > 0 && index !== this.component.children.length - 1
                    visiable.showDelete = this.project.components.id !== this.currentComponentId
                }
            }
            return visiable
        },
    },
    methods: {
        repaintSelectBox() {
            if (!this.currentComponentId) {
                this.selectBox = {
                    target: null,
                    tagName: '',
                    style: {
                        display: 'none',
                    },
                }
                return
            }
            this.$nextTick(() => {
                const target = document.querySelector(`[data-component-id="${this.currentComponentId}"]`)
                const containerRect = this.getContainerRect()
                const rect = target.getBoundingClientRect()
                this.selectBox.layout = target.dataset.componentLayout
                const { scrollTop, scrollLeft } = this.$el
                const top = Math.floor(rect.top - containerRect.top + scrollTop)
                const left = Math.floor(rect.left - containerRect.left + scrollLeft)
                this.selectBox.style = {
                    display: 'block',
                    width: `${Math.floor(rect.width)}px`,
                    height: `${Math.floor(rect.height)}px`,
                    top: `${top}px`,
                    left: `${left}px`,
                }
                this.registerResizeEvent(this.currentComponentId, { el: target, callback: this.resize })
            })
        },
        recombinationComponentEvent() {
            this.$Prompt('name：', 'Recombination component', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /\S/,
                inputErrorMessage: '请输入 name',
            })
                .then(({ value }) => {
                    const data = localStorage.getItem('Tenon-recombination-components')
                    const recombinationComponent = data ? JSON.parse(data) : []
                    const currentComponent = this.component.children.find(item => item.id === this.currentComponentId)

                    const formatComponent = JSON.parse(JSON.stringify(currentComponent))
                    formatComponent.properties.name = value
                    recombinationComponent.push({
                        id: this.$uuid(),
                        name: value,
                        data: formatComponent,
                    })
                    localStorage.setItem('Tenon-recombination-components', JSON.stringify(recombinationComponent))
                    console.log('RecombinationComponent: ', recombinationComponent)
                    this.$message({
                        type: 'success',
                        message: `Recombination component: ${value}`,
                    })
                })
                .catch(() => {})
        },
        selectParentComponentEvent() {
            const recursion = (component, id) => {
                if (component.id === id) {
                    return
                }
                if (component.children) {
                    for (let i = 0; i < component.children.length; i++) {
                        const data = component.children[i]
                        recursion(data, id)
                        if (data.id === id) {
                            this.currentComponentId = component.id
                            break
                        }
                    }
                }
            }
            recursion(this.project.components, this.currentComponentId)
        },
        upEvent() {
            this.emitEvent('componentUp', this.currentComponentId)
            this.repaintSelectBox()
            this.emitEvent('snapshotProject')
        },
        downEvent() {
            this.emitEvent('componentDown', this.currentComponentId)
            this.repaintSelectBox()
            this.$EventBus.$emit('snapshotProject')
        },
        deleteEvent() {
            this.currentComponentId = ''
            this.emitEvent('componentRemove', this.currentComponentId)
            this.$EventBus.$emit('snapshotProject')
        },
    },
}
