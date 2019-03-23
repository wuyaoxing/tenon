
import Components from './Components'
import Undo from './Undo'

class Editor extends Components {
    constructor(project) {
        super()
        this.project = project
        this.components = this.project.components
        this.$Undo = new Undo()
    }

    updateProject(project) {
        this.project = project
        this.components = this.project.components
    }

    snapshotProject() {
        this.$Undo.addUndo(this.project)
        console.log('Editor snapshotProject: ', this)
    }
}

const events = ['undo', 'redo', 'snapshotProject', 'componentInsertAbove', 'componentInsertBelow', 'componentInsertInto', 'componentUp', 'componentDown', 'componentRemove']

export default {
    data() {
        return {
            Editor: null,
            project: {}
        }
    },
    computed: {
        // project() {
        //     return this.Editor.project
        // },
        isFirstUndo() {
            return this.Editor.$Undo.isFirstUndo
        },
        isLastUndo() {
            return this.Editor.$Undo.isLastUndo
        },
    },
    methods: {
        componentInsertAbove(...args) {
            this.Editor.componentInsertAbove(...args)
        },
        componentInsertBelow(...args) {
            this.Editor.componentInsertBelow(...args)
        },
        componentInsertInto(...args) {
            this.Editor.componentInsertInto(...args)
        },
        componentUp(...args) {
            this.Editor.componentUp(...args)
        },
        componentDown(...args) {
            this.Editor.componentDown(...args)
        },
        componentRemove(...args) {
            this.Editor.componentRemove(...args)
        },
        updateProject(project) {
            this.project = project
            this.Editor.updateProject(project)
            console.log('Editor updateProject: ', this.Editor)
        },
        snapshotProject() {
            this.Editor.snapshotProject()
        },
        undo() {
            this.Editor.$Undo.undo(this.updateProject)
        },
        redo() {
            this.Editor.$Undo.redo(this.updateProject)
        },
        init() {
            this.Editor = new Editor(this.project)
            console.log('Editor init: ', this, this.Editor)
        },
    },
    created() {
        events.forEach(event => {
            this.$EventBus.$on(event, this[event])
            console.log('EventBus on: ', event)
        })
    },
    destroy() {
        events.forEach(event => {
            this.$EventBus.$off(event, this[event])
        })
    }
}
