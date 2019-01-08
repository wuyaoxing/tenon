<template>
  <MainLayout class="tenon">
    <header class="tenon-header">
      Tenon
    </header>
    <div class="tenon-projects f-f-1 f f-fw-w f-ac-fs">
      <div class="tenon-project-card f f-fd-c f-jc-sb"
           v-for="item in projects"
           :key="item.id">
        <h2 class="tenon-project-title">{{item.name}}</h2>
        <div class="tenon-project-action f f-jc-sb">
          <a :href="`/designer/#/projects/${item.id}`">Designer</a>
          <a :href="`/viewer/#/projects/${item.id}`">Viewer</a>
        </div>
      </div>
      <div class="tenon-project-add"
           @click="visiable = true">
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <AddProject :visiable.sync="visiable"
                @confirm="addProject"></AddProject>
  </MainLayout>
</template>
<script>
import MainLayout from 'components/layout/MainLayout'
import AddProject from './AddProject'

export default {
    name: 'tenon',
    components: {
        MainLayout,
        AddProject
    },
    data() {
        return {
            visiable: false,
            currentProjectId: '',
            projects: []
        }
    },
    methods: {
        addProject(data) {
            this.projects.push(data)
            this.currentProjectId = data.id
            this.saveProjects()
            this.visiable = false
        },
        saveProjects() {
            localStorage.setItem('Tenon-projects', JSON.stringify(this.projects))
            console.log('Tenon save projects: ', localStorage.getItem('Tenon-projects'))
        },
        fetchProjects() {
            const data = localStorage.getItem('Tenon-projects')
            this.projects = data ? JSON.parse(data) : []
        },
    },
    created() {
        this.fetchProjects()
    // for (let i = 0; i < 10; i++) {
    //     const data = {
    //         name: `Tenon ${i}`
    //     }
    //     this.addProject(data)
    // }
    }
}
</script>
<style lang="less">
@import "~styles/variables";

.tenon {
  background: #e6e8ec;
  &-header {
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    font-size: 18px;
    font-weight: 700;
    color: @white-color;
    background-color: @primary-color;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  }
  &-projects {
    padding: 30px 60px;
    overflow-y: auto;
  }
  &-project {
    &-card {
      width: 180px;
      height: 150px;
      margin: 10px 5px;
      padding: 10px;
      border-radius: 3px;
      color: #464c59;
      background: @white-color;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.15);
      transition-timing-function: ease-in-out;
      transition-duration: 0.2s;
      transition-property: transform, box-shadow;
      &:hover {
        box-shadow: 0 5px 6px 0 rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
      }
    }
    &-title {
      padding: 0 8px;
      font-size: 15px;
      font-weight: 600;
      color: @dark-text-color;
    }
    &-action {
      a {
        padding: 8px;
        color: @primary-text-color;
        transition-timing-function: ease-in-out;
        transition-duration: 0.2s;
        transition-property: transform;
        &:hover {
          color: @accent-color;
          transform: translateY(-4px);
        }
      }
    }
    &-add {
      width: 180px;
      height: 150px;
      line-height: 150px;
      margin: 10px 5px;
      padding: 10px;
      text-align: center;
      border-radius: 3px;
      color: @primary-text-color;
      background: @white-color;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.15);
      cursor: pointer;
      &:hover {
        color: @white-color;
        background: @accent-color;
      }
      i {
        font-size: 40px;
      }
    }
  }
}
</style>
