<template>
  <MainLayout class="tenon-designer">
    <header class="tenon-designer-header f f-ai-c f-jc-sb">
      <h1>Tenon</h1>
      {{project.name}} Designer projectId: {{projectId}}
      <ul class="tenon-designer-header-action f">
        <li @click="fullScreen"><i class="icon-full-screen"></i></li>
        <li @click="save"><i class="icon-save"></i></li>
        <li @click="view"><i class="icon-preview"></i></li>
      </ul>
    </header>
    <div class="tenon-designer-main f-f-1 f">
      <SideContainer class="tenon-designer-side"
                     :componentId.sync="componentId"
                     :project="project" />
      <EditorContainer class="tenon-designer-editor f-f-1"
                       :componentId.sync="componentId"
                       :project="project" />
      <!-- <Handle direction="right"
              :handle.sync="handleVisiable">
        <SideContainer class="tenon-designer-side" />
      </Handle> -->
    </div>
  </MainLayout>
</template>
<script>
import MainLayout from 'components/layout/MainLayout'
import EditorContainer from './layout/editor/EditorContainer'
import SideContainer from './layout/side/SideContainer'

export default {
    name: 'tenon-designer',
    components: {
        MainLayout,
        EditorContainer,
        SideContainer
    },
    data() {
        return {
            handleVisiable: true,
            componentId: '',
            project: {}
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
        view() {
            window.location = `/viewer/#/projects/${this.projectId}`
        },
        fetchProject() {
            const data = localStorage.getItem('Tenon-projects')
            const projects = data ? JSON.parse(data) : []
            this.project = projects.find(item => item.id === this.projectId) || {}
        },
    },
    created() {
        this.fetchProject()
    }
}
</script>
<style lang="less">
@import "~styles/variables";

.tenon-designer {
  &-header {
    height: 50px;
    line-height: 50px;
    background-color: @primary-color;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
    overflow: hidden;
    z-index: 10;
    h1 {
      padding: 0 15px;
      color: @white-color;
      font-size: 18px;
      font-weight: 700;
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
      }
    }
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
  }
}
</style>
