export default class EventStack {
    constructor(el) {
        this.options = []
        this.el = el || document
        // this.options.forEach(item => {
        //     if (!this[`${item}Stack`]) this[`${item}Stack`] = []

        //     this.on(item, this.executeStack)
        // })
    }

    executeStack = e => {
        this[`${e.type}Stack`].forEach(stack => {
            stack.fn(e)
        })
    }

    register(id, eventType, fn) {
        if (this.options.indexOf(eventType) < 0) {
            this.on(eventType, this.executeStack)
            this.options.push(eventType)
        }
        if (!this[`${eventType}Stack`]) this[`${eventType}Stack`] = []
        this[`${eventType}Stack`].push({
            id,
            eventType,
            fn,
        })
    }

    dispose(id, eventType) {
        const index = this[`${eventType}Stack`].findIndex(item => item.id === id)
        if (index > -1) this[`${eventType}Stack`].splice(index, 1)
    }

    on(eventType, fn) {
        this.el.addEventListener(eventType, fn, false)
    }

    off(eventType, fn) {
        this.el.removeEventListener(eventType, fn, false)
    }

    destroy() {
        this.options.forEach(item => {
            this.off(item, this.executeStack)
        })
    }
}
