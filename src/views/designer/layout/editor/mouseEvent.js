export default {
    data() {
        return {
            componentSelectedStack: [],
            isMove: false, // 是否移动
            direction: '', // 移动方向
            mouseProperties: {}, // 鼠标属性
            originComponentPropertiesStack: {}, // 组件属性堆栈
            containerProperties: {}, // 组件容器堆栈
            componentStack: {}, // 组件堆栈
        }
    },
    methods: {
        findComponentById(componentId) {
            let targetComponent = null
            const parentComponent = this.findParentComponentById(componentId)
            if (parentComponent && parentComponent.children) targetComponent = parentComponent.children.find(item => item.id === componentId)
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
                const parentComponent = this.findParentComponentById(id)
                const parentDom = document.querySelector(`[data-component-id="${parentComponent.id}"]`)
                const containerProperties = parentDom.getBoundingClientRect()

                const component = this.findComponentById(id)
                const originComponentProperties = JSON.parse(JSON.stringify(component.properties))
                originComponentProperties.mouseOffsetX = e.clientX - containerProperties.x - parseInt(originComponentProperties.css.left)
                originComponentProperties.mouseOffsetY = e.clientY - containerProperties.y - parseInt(originComponentProperties.css.top)

                this.$set(this.containerProperties, id, containerProperties)
                this.$set(this.originComponentPropertiesStack, id, originComponentProperties)
            })

            this.isMove = true
        },
        mouseupEvent() {
            this.isMove = false
            this.direction = ''
            this.mouseProperties = {}
            this.originComponentPropertiesStack = {}
            this.containerProperties = {}
            this.componentStack = {}
        },
        mousemoveEvent(e) {
            if (!this.isMove) return

            this.componentSelectedStack.forEach(id => {
                let component = null
                if (this.componentStack[id]) {
                    component = this.componentStack[id]
                } else {
                    component = this.findComponentById(id)
                    this.$set(this.componentStack, id, component)
                }

                const componentProperties = component.properties.css
                const containerProperties = this.containerProperties[id]
                const { mouseOffsetX, mouseOffsetY, css: elementProperties } = this.originComponentPropertiesStack[id]

                let { clientX, clientY } = e

                const combineProperties = elementProperties

                // 存储改变的属性值
                const cacheProperties = {}

                // 约束条件
                // 移动边界
                if (this.direction === 'move') {
                    // 向左移动，x减小
                    if (clientX - mouseOffsetX < containerProperties.x) {
                        clientX = containerProperties.x + mouseOffsetX
                    }
                    // 向右移动，x增加
                    if (clientX - mouseOffsetX + parseInt(combineProperties.width) > containerProperties.x + containerProperties.width) {
                        clientX = containerProperties.x + containerProperties.width - (parseInt(combineProperties.width) - mouseOffsetX)
                    }
                    // 向上移动，y减小
                    if (clientY - mouseOffsetY < containerProperties.y) {
                        clientY = containerProperties.y + mouseOffsetY
                    }
                    // 向下移动，y增加
                    if (clientY - mouseOffsetY + parseInt(combineProperties.height) > containerProperties.y + containerProperties.height) {
                        clientY = containerProperties.y + containerProperties.height - (parseInt(combineProperties.height) - mouseOffsetY)
                    }
                }
                if (this.direction.indexOf('bottom') > -1) {
                    if (clientY - mouseOffsetY + parseInt(combineProperties.height) > containerProperties.y + containerProperties.height) {
                        clientY = containerProperties.y + containerProperties.height - (parseInt(combineProperties.height) - mouseOffsetY)
                    }
                }
                if (this.direction.indexOf('left') > -1) {
                    if (clientX - mouseOffsetX < containerProperties.x) {
                        clientX = containerProperties.x + mouseOffsetX
                    }
                }
                if (this.direction.indexOf('right') > -1) {
                    if (clientX - mouseOffsetX + parseInt(combineProperties.width) > containerProperties.x + containerProperties.width) {
                        clientX = containerProperties.x + containerProperties.width - (parseInt(combineProperties.width) - mouseOffsetX)
                    }
                }
                if (this.direction.indexOf('top') > -1) {
                    if (clientY - mouseOffsetY < containerProperties.y) {
                        clientY = containerProperties.y + mouseOffsetY
                    }
                }

                // 移动距离
                const moveDistance = {
                    x: clientX - this.mouseProperties.clientX,
                    y: clientY - this.mouseProperties.clientY
                }

                let top = parseInt(elementProperties.top) + moveDistance.y
                let left = parseInt(elementProperties.left) + moveDistance.x

                const width = parseInt(elementProperties.width || 0)
                const height = parseInt(elementProperties.height || 0)

                const forwardDirection = {
                    width: width + moveDistance.x,
                    height: height + moveDistance.y,
                }

                const reverseDirection = {
                    width: width - moveDistance.x,
                    height: height - moveDistance.y,
                }

                // 最大、最小宽高约束
                const constraint = {
                    minWidth: componentProperties.minWidth || 30,
                    minHeight: componentProperties.minHeight || 30,
                    maxWidth: componentProperties.maxWidth || containerProperties.width,
                    maxHeight: componentProperties.maxHeight || containerProperties.height,
                }

                if (forwardDirection.width < constraint.minWidth) forwardDirection.width = constraint.minWidth
                if (forwardDirection.height < constraint.minHeight) forwardDirection.height = constraint.minHeight
                if (reverseDirection.width < constraint.minWidth) reverseDirection.width = constraint.minWidth
                if (reverseDirection.height < constraint.minHeight) reverseDirection.height = constraint.minHeight

                if (forwardDirection.width > constraint.maxWidth) forwardDirection.width = constraint.maxWidth
                if (forwardDirection.height > constraint.maxHeight) forwardDirection.height = constraint.maxHeight
                if (reverseDirection.width > constraint.maxWidth) reverseDirection.width = constraint.maxWidth
                if (reverseDirection.height > constraint.maxHeight) reverseDirection.height = constraint.maxHeight

                // 坐标约束
                if (this.direction !== 'move') {
                    if (parseInt(elementProperties.left) + parseInt(elementProperties.width) - constraint.minWidth < left) left = parseInt(elementProperties.left) + parseInt(elementProperties.width) - constraint.minWidth
                    if (parseInt(elementProperties.top) + parseInt(elementProperties.height) - constraint.minHeight < top) top = parseInt(elementProperties.top) + parseInt(elementProperties.height) - constraint.minHeight

                    if (parseInt(elementProperties.left) + parseInt(elementProperties.width) - constraint.maxWidth > left) left = parseInt(elementProperties.left) + parseInt(elementProperties.width) - constraint.maxWidth
                    if (parseInt(elementProperties.top) + parseInt(elementProperties.height) - constraint.maxHeight > top) top = parseInt(elementProperties.top) + parseInt(elementProperties.height) - constraint.maxHeight
                }
                console.log(containerProperties, elementProperties, top, left, moveDistance, mouseOffsetX, mouseOffsetY)

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
