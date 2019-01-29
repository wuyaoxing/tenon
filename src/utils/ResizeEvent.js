export default class ResizeEvent {
    constructor(el, callback) {
        this.el = el
        this.callback = callback

        this.width = el.offsetWidth
        this.height = el.offsetHeight

        this.iframe = null
        this.timer = ''
        this.delay = 50

        this.resize()
    }

    resized = e => {
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            const width = this.el.offsetWidth
            const height = this.el.offsetHeight

            if (width !== this.width || height !== this.height) {
                this.callback()
                this.width = width
                this.height = height
            }
            console.log('resize event: ', e)
        }, this.delay)
    }

    resize() {
        const iframe = document.createElement('iframe')

        Object.assign(iframe.style, {
            position: 'absolute',
            width: '100%',
            height: '100%',
            visibility: 'hidden',
            padding: 0,
            margin: 0
        })

        this.el.appendChild(iframe)

        this.iframe = iframe

        this.iframe.contentWindow.addEventListener('resize', this.resized, false)
    }

    destroy() {
        this.iframe.contentWindow.removeEventListener('resize', this.resized, false)
        this.el.removeChild(this.iframe)
    }
}
