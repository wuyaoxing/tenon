export default class Undo {
    constructor() {
        this.undos = []
        this.undoIndex = 0
    }

    get isFirstUndo() {
        return this.undoIndex === 0
    }

    get isLastUndo() {
        return this.undoIndex === this.undos.length - 1
    }

    get currentUndo() {
        return JSON.parse(JSON.stringify(this.undos[this.undoIndex]))
    }

    undo(callback) {
        if (this.undoIndex > 0) {
            this.undoIndex -= 1
            callback(this.currentUndo)
        }
    }

    redo(callback) {
        if (this.undoIndex < this.undos.length - 1) {
            this.undoIndex += 1
            callback(this.currentUndo)
        }
    }

    addUndo(data) {
        if (this.undoIndex !== this.undos.length - 1) {
            this.undos = this.undos.slice(0, this.undoIndex + 1)
        }

        this.undos.push(JSON.parse(JSON.stringify(data)))
        this.undoIndex = this.undos.length - 1
    }
}
