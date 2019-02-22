export default {
    data() {
        return {
            componentSelectedStack: [],
            isMove: false, // 是否移动
            direction: '', // 移动方向
            mouseProperties: {}, // 鼠标属性
            componentsPropertiesStack: {}, // 组件属性堆栈
        }
    },
    methods: {
        findComponentById(componentId) {
            let targetComponent = null
            const recursion = (component, id) => {
                if (component.id === id) {
                    targetComponent = component
                    return
                }
                if (component.children) {
                    for (let i = 0; i < component.children.length; i++) {
                        const data = component.children[i]
                        recursion(data, id)
                        if (data.id === id) {
                            break
                        }
                    }
                }
            }
            recursion(this.project.components, componentId)
            return targetComponent
        },
        mousedownEvent(e) {
            if (!this.$refs.positionSelectHandle || !this.$refs.positionSelectHandle.contains(e.target)) {
                return
            }

            this.direction = e.target.dataset.direction || 'move'

            this.mouseProperties = {
                clientX: e.clientX,
                clientY: e.clientY,
            }

            this.componentSelectedStack.forEach(id => {
                const component = this.findComponentById(id)

                const componentProperties = JSON.parse(JSON.stringify(component.properties))

                this.$set(this.componentsPropertiesStack, id, componentProperties)
            })

            this.isMove = true
        },
        mouseupEvent() {
            this.isMove = false
            this.mouseProperties = {}
            this.componentsPropertiesStack = {}
            this.direction = ''
        },
        mousemoveEvent(e) {
            if (!this.isMove) return

            this.componentSelectedStack.forEach(id => {
                const component = this.findComponentById(id)

                // 存储改变的属性值
                const cacheProperties = {}

                // 移动距离
                const moveDistance = {
                    x: e.clientX - this.mouseProperties.clientX,
                    y: e.clientY - this.mouseProperties.clientY
                }

                const top = parseInt(this.componentsPropertiesStack[id].css.top) + moveDistance.y
                const left = parseInt(this.componentsPropertiesStack[id].css.left) + moveDistance.x

                const width = parseInt(this.componentsPropertiesStack[id].css.width || 0)
                const height = parseInt(this.componentsPropertiesStack[id].css.height || 0)

                const forwardDirection = {
                    width: width + moveDistance.x,
                    height: height + moveDistance.y,
                }

                const reverseDirection = {
                    width: width - moveDistance.x,
                    height: height - moveDistance.y,
                }

                switch (this.direction) {
                    case 'move':
                        cacheProperties.top = `${top}px`
                        cacheProperties.left = `${left}px`
                        break
                    case 'top-left':
                        cacheProperties.width = `${reverseDirection.width}px`
                        cacheProperties.height = `${reverseDirection.height}px`
                        cacheProperties.top = `${top}px`
                        cacheProperties.left = `${left}px`
                        break
                    case 'top':
                        cacheProperties.height = `${reverseDirection.height}px`
                        cacheProperties.top = `${top}px`
                        break
                    case 'top-right':
                        cacheProperties.width = `${forwardDirection.width}px`
                        cacheProperties.height = `${reverseDirection.height}px`
                        cacheProperties.top = `${top}px`
                        break
                    case 'bottom-left':
                        cacheProperties.width = `${reverseDirection.width}px`
                        cacheProperties.height = `${forwardDirection.height}px`
                        cacheProperties.left = `${left}px`
                        break
                    case 'bottom':
                        cacheProperties.height = `${forwardDirection.height}px`
                        break
                    case 'bottom-right':
                        cacheProperties.width = `${forwardDirection.width}px`
                        cacheProperties.height = `${forwardDirection.height}px`
                        break
                    case 'left':
                        cacheProperties.width = `${reverseDirection.width}px`
                        cacheProperties.left = `${left}px`
                        break
                    case 'right':
                        cacheProperties.width = `${forwardDirection.width}px`
                        break
                    default:
                        console.log('mousemove direction is undefined: ', this.direction)
                }
                // 对改变的属性赋值
                Object.keys(cacheProperties).forEach(key => {
                    component.properties.css[key] = cacheProperties[key]
                })
                this.repaintSelectBox()
            })

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
