export default class ResizeEvent {
    constructor() {
        this.resizeStack = {}
    }

    resize = e => {
        console.log('!!! resize event: ', e, e.target, e.target.resizeId)
        const id = e.target.resizeId
        if (!this.resizeStack[id]) return
        const {
            el, callback, width: oldWidth, height: oldHeight, timer, delay
        } = this.resizeStack[id]

        if (timer) clearTimeout(timer)
        this.resizeStack[id].timer = setTimeout(() => {
            const width = el.offsetWidth
            const height = el.offsetHeight

            if (oldWidth !== width || oldHeight !== height) {
                callback(e)
                this.resizeStack[id].width = width
                this.resizeStack[id].height = height
            }
        }, delay)
    }

    register(id, option) {
        this.dispose(id)
        const { el, callback, delay = 50 } = option
        const iframe = document.createElement('iframe')

        Object.assign(iframe.style, {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            padding: 0,
            margin: 0,
            visibility: 'hidden'
        })

        el.appendChild(iframe)
        iframe.contentWindow.resizeId = id
        iframe.contentWindow.addEventListener('resize', this.resize, false)

        this.resizeStack[id] = {
            id,
            el,
            callback,
            iframe,
            width: el.offsetWidth,
            height: el.offsetHeight,
            timer: '',
            delay
        }
    }

    dispose(id) {
        if (this.resizeStack[id]) {
            const { iframe, el } = this.resizeStack[id]
            iframe.contentWindow.removeEventListener('resize', this.resize, false)
            el.removeChild(iframe)

            delete this.resizeStack[id]
        }
    }

    destroy() {
        Object.keys(this.resizeStack).forEach(id => {
            this.dispose(id)
        })
    }
}
