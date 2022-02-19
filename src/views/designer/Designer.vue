<template>
    <MainLayout class="tenon-designer">
        <header class="tenon-designer-header f-fs-0 f f-ai-c f-jc-sb">
            <h1>
                <img :src="require('@/assets/images/logo.png')"
                     alt="logo">
                Tenon
            </h1>
            <ul class="tenon-designer-header-action f">
                <li @click="emitEvent('undo')"
                    :class="{ disabled: isFirstUndo }"
                    title="undo">
                    <i class="icon-undo"></i>
                </li>
                <li @click="emitEvent('redo')"
                    :class="{ disabled: isLastUndo }"
                    title="redo">
                    <i class="icon-undo"
                       style="transform:scaleX(-1)"></i>
                </li>
                <li @click="fullScreen"
                    title="full screen">
                    <i class="icon-full-screen"></i>
                </li>
                <li @click="save"
                    title="save">
                    <i class="icon-save"></i>
                </li>
                <li @click="preview"
                    title="preview">
                    <i class="icon-preview"></i>
                </li>
            </ul>
        </header>
        <div class="tenon-designer-main f-f-1 f">
            <SideContainer class="tenon-designer-side"
                           :componentId.sync="componentId"
                           :project="project" />
            <EditorContainer class="tenon-designer-editor f-f-1"
                             :componentId.sync="componentId"
                             :project="project" />
            <Handle direction="right"
                    :offset="0"
                    :visiable.sync="handleVisiable">
                <PropertiesContainer class="tenon-designer-properties"
                                     :componentId.sync="componentId"
                                     :project="project"></PropertiesContainer>
            </Handle>
        </div>
    </MainLayout>
</template>
<script>
import MainLayout from '@/components/layout/MainLayout.vue'
import EditorContainer from './layout/editor/EditorContainer.vue'
import SideContainer from './layout/side/SideContainer.vue'
import PropertiesContainer from './layout/properties/PropertiesContainer.vue'

import editorMixins from './core/Editor'

export default {
    name: 'tenon-designer',
    mixins: [editorMixins],
    components: {
        MainLayout,
        EditorContainer,
        SideContainer,
        PropertiesContainer
    },
    provide() {
        return {
            emitEvent: this.emitEvent
        }
    },
    data() {
        return {
            handleVisiable: true,
            componentId: ''
        }
    },
    computed: {
        projectId() {
            return this.$route.params.id
        }
    },
    methods: {
        fullScreen() {
            if (document.documentElement.requestFullScreen) {
                if (document.FullScreenElement) { document.exitFullScreen() } else { document.documentElement.requestFullScreen() }
            } else if (document.documentElement.mozRequestFullScreen) {
                // mozilla
                if (document.mozFullScreenElement) { document.mozCancelFullScreen() } else { document.documentElement.mozRequestFullScreen() }
            } else if (document.documentElement.webkitRequestFullScreen) {
                // webkit
                if (document.webkitFullscreenElement) { document.webkitExitFullscreen() } else { document.documentElement.webkitRequestFullScreen() }
            } else if (document.documentElement.msRequestFullscreen) {
                // ie
                if (document.msFullScreenElement) { document.msExitFullscreen() } else { document.documentElement.msRequestFullscreen() }
            }
        },
        save() {
            const data = localStorage.getItem('Tenon-projects')
            const projects = data ? JSON.parse(data) : []

            const index = projects.findIndex(item => item.id === this.project.id)
            projects.splice(index, 1, this.project)

            localStorage.setItem('Tenon-projects', JSON.stringify(projects))
            console.log('Tenon save projects: ', localStorage.getItem('Tenon-projects'))
            this.$Message.success('Save Success!')
        },
        preview() {
            window.open(`/tenon/viewer#/projects/${this.projectId}`)
        },
        fetchProject() {
            const data = localStorage.getItem('Tenon-projects')
            const projects = data ? JSON.parse(data) : []
            this.project = projects.find(item => item.id === this.projectId) || {}
            this.init()
            this.emitEvent('snapshotProject')
        },
        emitEvent(eventName, ...values) {
            this.$EventBus.$emit(eventName, ...values)
        }
    },
    created() {
        this.fetchProject()
    }
}
</script>
<style lang="less">
.tenon-designer {
    background: #e6e8ec;
    &-header {
        height: 50px;
        line-height: 50px;
        background-color: @primary-color;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
        overflow: hidden;
        z-index: 10;
        h1 {
            color: @white-color;
            font-size: 18px;
            font-weight: 700;
        }
        img {
            width: 45px;
            height: 45px;
            padding: 8px;
        }
        &-action {
            text-align: center;
            li {
                width: 50px;
                color: @primary-light-color;
                border-left: 1px solid @primary-dark-color;
                cursor: pointer;
                &:hover {
                    color: @white-color;
                }
                &.disabled {
                    pointer-events: none;
                    color: @disabled-color;
                }
                i {
                    display: block;
                }
            }
        }
    }
    &-main {
        overflow: hidden;
    }
    &-side {
        width: 300px;
        height: 100%;
        border-right: 1px solid @dark-border-color;
    }
    &-editor {
        // border-left: 1px solid @dark-border-color;
        // border-right: 1px solid @dark-border-color;
    }
    &-properties {
        width: 250px;
        height: 100%;
        border-left: 1px solid @dark-border-color;
        overflow: auto;
    }
}
</style>
