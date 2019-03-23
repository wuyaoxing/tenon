export default class Components {
    constructor(components) {
        this.components = components
    }

    findParentComponentById(id) {
        if (!id) return {}
        let targetComponent = null
        if (this.components.id === id) {
            targetComponent = this.components
        } else {
            const recursion = (component, componentId) => {
                if (component.id === componentId) {
                    return
                }
                if (component.children) {
                    for (let i = 0; i < component.children.length; i++) {
                        const data = component.children[i]
                        recursion(data, componentId)
                        if (data.id === componentId) {
                            targetComponent = component
                            break
                        }
                    }
                }
            }
            recursion(this.components, id)
        }

        return targetComponent
    }

    findComponentById(id) {
        let targetComponent = null
        const parentComponent = this.findParentComponentById(id)
        if (parentComponent.id === id) {
            targetComponent = parentComponent
        } else {
            targetComponent = parentComponent.children.find(item => item.id === id)
        }
        return targetComponent
    }

    componentInsertAbove(newComponent, targetComponentId) {
        const parentComponent = this.findParentComponentById(targetComponentId)
        const index = parentComponent.children.findIndex(item => item.id === targetComponentId)
        parentComponent.children.splice(index, 0, newComponent)
    }

    componentInsertBelow(newComponent, targetComponentId) {
        const parentComponent = this.findParentComponentById(targetComponentId)
        const index = parentComponent.children.findIndex(item => item.id === targetComponentId)
        parentComponent.children.splice(index + 1, 0, newComponent)
    }

    componentInsertInto(newComponent, targetComponentId) {
        const targetComponent = this.findComponentById(targetComponentId)
        targetComponent.children.push(newComponent)
    }

    componentUp(id) {
        const parentComponent = this.findParentComponentById(id)
        const arr = parentComponent.children
        const index = arr.findIndex(item => item.id === id)
        arr.splice(index - 1, 0, arr.splice(index, 1)[0])
    }

    componentDown(id) {
        const parentComponent = this.findParentComponentById(id)
        const arr = parentComponent.children
        const index = arr.findIndex(item => item.id === id)
        arr.splice(index + 1, 0, arr.splice(index, 1)[0])
    }

    componentRemove(id) {
        console.log('Editor componentRemove: ', this)
        const parentComponent = this.findParentComponentById(id)
        const arr = parentComponent.children
        const index = arr.findIndex(item => item.id === id)
        arr.splice(index, 1)
    }
}
