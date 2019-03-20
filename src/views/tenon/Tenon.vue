<template>
    <MainLayout class="tenon">
        <header class="tenon-header f f-jc-sb">
            <h1>Tenon</h1>
            <ul>
                <li>
                    <a href="https://github.com/wuyaoxing/tenon"
                       target="blank"
                       title="github">
                        <i class="icon-github"></i>
                    </a>
                </li>
            </ul>
        </header>
        <div class="tenon-projects f-f-1 f f-fw-w f-ac-fs">
            <div class="tenon-project-card f f-fd-c f-jc-sb"
                 v-for="item in projects"
                 :key="item.id">
                <div class="tenon-project-title f f-ai-b f-jc-sb">
                    <h2 class="ellipsis-line-clamp-3">
                        {{item.name}}
                    </h2>
                    <Dropdown trigger="click"
                              size="medium"
                              @command="c => moreEvent(c, item.id)">
                        <i class="el-icon-more"
                           title="More"></i>
                        <DropdownMenu class="tenon-project-more"
                                      slot="dropdown">
                            <DropdownItem :command="item.value"
                                          v-for="item in moreList"
                                          :key="item.value">
                                <i :class="`icon-${item.value}`"
                                   :title="item.text"></i>
                                {{item.text}}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="tenon-project-action f f-jc-sb">
                    <a :href="getProjectLink(item.id).editor">Designer</a>
                    <a :href="getProjectLink(item.id).viewer">Viewer</a>
                </div>
            </div>
            <div class="tenon-project-add"
                 @click="addEvent">
                <i class="el-icon-plus"></i>
            </div>
        </div>
        <ProjectForm :visiable.sync="visiable"
                     :edit="edit"
                     :project="project"
                     @confirm="confirm"></ProjectForm>
    </MainLayout>
</template>
<script>
import MainLayout from 'components/layout/MainLayout'
import ProjectForm from './ProjectForm'

export default {
    name: 'tenon',
    components: {
        MainLayout,
        ProjectForm
    },
    data() {
        return {
            visiable: false,
            edit: false,
            project: {
                name: '',
                resolution: {
                    width: 1920,
                    height: 1080
                }
            },
            projects: [],
            moreList: [
                {
                    text: 'Share',
                    value: 'share'
                },
                {
                    text: 'Edit',
                    value: 'edit'
                },
                {
                    text: 'Duplicate',
                    value: 'duplicate'
                },
                {
                    text: 'Remove',
                    value: 'delete'
                },
            ]
        }
    },
    methods: {
        confirm(data) {
            this.edit ? this.updateProject(data) : this.addProject(data)
        },
        addProject(data) {
            this.projects.push(data)
            this.saveProjects()
            this.visiable = false
            this.reset()
        },
        updateProject(data) {
            const index = this.projects.findIndex(item => item.id === data.id)
            this.projects.splice(index, 1, data)
            this.saveProjects()
            this.visiable = false
            this.edit = false
            this.reset()
        },
        reset() {
            this.project = {
                name: '',
                resolution: {
                    width: 1920,
                    height: 1080
                }
            }
        },
        addEvent() {
            this.reset()
            this.visiable = true
        },
        editProject(id) {
            const project = this.projects.find(item => item.id === id)
            this.project = JSON.parse(JSON.stringify(project))
            this.edit = true
            this.visiable = true
        },
        removeProject(id) {
            const index = this.projects.findIndex(item => item.id === id)
            this.projects.splice(index, 1)
            this.saveProjects()
        },
        shareProject(id) {
            const link = this.getProjectLink(id).viewer
            const text = `${window.location.origin}${window.location.pathname}${link}`.replace(/(\/)\1+/g, '/')
            this.$copyText(text).then(e => {
                console.log(e)
                this.$Message.success('clipboard')
            }, e => {
                this.$Message.success('unclipboard')
                console.log(e)
            })
        },
        duplicateProject(id) {
            const project = this.projects.find(item => item.id === id)
            const duplicateProject = JSON.parse(JSON.stringify(project))
            duplicateProject.id = this.$uuid()
            duplicateProject.name = `Duplicate ${duplicateProject.name}`
            this.projects.push(duplicateProject)
            this.saveProjects()
        },
        moreEvent(key, id) {
            switch (key) {
                case 'share':
                    this.shareProject(id)
                    break
                case 'edit':
                    this.editProject(id)
                    break
                case 'duplicate':
                    this.duplicateProject(id)
                    break
                case 'delete':
                    this.removeProject(id)
                    break
                default:
                    break
            }
        },
        saveProjects() {
            localStorage.setItem('Tenon-projects', JSON.stringify(this.projects))
            console.log('Tenon save projects: ', localStorage.getItem('Tenon-projects'))
        },
        fetchProjects() {
            const data = localStorage.getItem('Tenon-projects')
            this.projects = data ? JSON.parse(data) : []
        },
        getProjectLink(id) {
            return {
                editor: `/tenon/designer#/projects/${id}`,
                viewer: `/tenon/viewer#/projects/${id}`
            }
        }
    },
    created() {
        this.fetchProjects()
    }
}
</script>
<style lang="less">
@import "~styles/variables";

.tenon {
    background: #e6e8ec;
    &-header {
        height: 50px;
        line-height: 50px;
        background-color: @primary-color;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
        h1 {
            color: @white-color;
            font-size: 18px;
            font-weight: 700;
            margin-left: 45px;
        }
        i {
            display: inline-block;
            width: 50px;
            text-align: center;
            color: @primary-light-color;
            font-size: 16px;
            &:hover {
                color: @white-color;
            }
        }
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
            padding: 8px;
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
            h2 {
                padding: 0 8px;
                font-size: 15px;
                font-weight: 600;
                color: @dark-text-color;
            }
            i {
                padding: 8px;
                transform: rotate(90deg);
                cursor: pointer;
                &:hover {
                    color: @accent-color;
                }
            }
        }
        &-more {
            li {
                i {
                    margin-right: 6px;
                }
            }
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
