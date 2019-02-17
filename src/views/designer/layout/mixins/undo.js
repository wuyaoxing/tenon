export default {
    data() {
        return {
            undos: [],
            undoIndex: 0,
            enabled: true,
        }
    },
    computed: {
        isFirstUndo() {
            return this.undoIndex === 0
        },
        isLastUndo() {
            return this.undoIndex === this.undos.length - 1
        },
    },
    methods: {
        addUndo(data) {
            if (this.addUndo.undoIndex !== this.undos.length - 1) {
                this.undos = this.undos.slice(0, this.undoIndex + 1)
            }
            this.undos.push(JSON.parse(JSON.stringify(data)))
            this.undoIndex = this.undos.length - 1
        },
        undo() {
            if (this.undoIndex > 0) {
                this.enabled = false
                this.undoIndex -= 1
                this.updateProject()
            }
        },
        redo() {
            if (this.undoIndex < this.undos.length - 1) {
                this.enabled = false
                this.undoIndex += 1
                this.updateProject()
            }
        },
        updateProject() {
            this.componentId = ''
            this.project = JSON.parse(JSON.stringify(this.undos[this.undoIndex]))
        },
    },
}
