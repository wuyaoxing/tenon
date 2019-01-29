<template>
    <Dialog title="新建项目"
            width="500px"
            :append-to-body="true"
            :visible.sync="currentVisiable"
            class="project-add">
        项目名称： <Input v-model="project.name" />
        项目分辨率：
        <div class="f f-ai-c">
            <Input v-model="project.resolution.width" /> X <Input v-model="project.resolution.height" />
        </div>
        <ul class="project-template f">
            <li v-for="(item, key) in template"
                :key="key"
                :class="{ active: key === templateId }"
                @click="templateId = key">{{key}}</li>
        </ul>
        <span slot="footer"
              class="dialog-footer">
            <Button @click="currentVisiable = false">取消</Button>
            <Button type="primary"
                    @click="confirm">确定</Button>
        </span>
    </Dialog>
</template>
<script>
export default {
    props: {
        visiable: Boolean
    },
    data() {
        return {
            project: {
                name: '',
                resolution: {
                    width: 1920,
                    height: 1080
                }
            },
            templateId: '1',
            template: {
                1: {
                    name: 'NestedLayoutContainer',
                    properties: {
                        name: 'NestedLayoutContainer',
                        css: {
                            minHeight: '100%'
                        },
                        style: ''
                    },
                    children: []
                },
                2: {
                    name: 'NestedLayoutContainer',
                    properties: {
                        name: 'NestedLayoutContainer',
                        css: {
                            minHeight: '100%',
                            fontFamily: 'Raleway,sans-serif',
                            fontSize: '1rem'
                        },
                        style: ''
                    },
                    children: [{
                        name: 'NestedLayoutContainer',
                        properties: {
                            name: 'NestedLayoutContainer',
                            css: {
                                background: 'url(http://digibird.com.cn/areas/admin/static/article/201707/21/1540111742.png) no-repeat center bottom', height: '80%', backgroundSize: 'cover', minHeight: '', display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
                            },
                            style: '',
                            title: 'Tenon'
                        },
                        children: [{
                            name: 'Header',
                            properties: {
                                name: 'Header',
                                css: {
                                    background: 'none', position: 'absolute', top: 0, right: 0, left: 0
                                },
                                style: '',
                                title: 'Tenon'
                            }
                        }, {
                            name: 'NestedLayoutContainer',
                            properties: {
                                name: 'NestedLayoutContainer',
                                css: {
                                    width: '', padding: '10px', textAlign: 'center', color: '#333333', fontWeight: '', lineHeight: '2', borderColor: null, margin: '0 0 80px'
                                },
                                style: '',
                                title: 'Tenon'
                            },
                            children: [{
                                name: 'Text',
                                properties: {
                                    name: 'Text', css: { fontSize: '6rem', fontWeight: '300', borderColor: null }, style: '', label: 'h1', text: '全可视化操作，所见即所得'
                                }
                            }, {
                                name: 'Text',
                                properties: {
                                    name: 'Text', css: { fontWeight: '300', fontSize: '3rem' }, style: '', label: 'h2', text: '通过视频、音频、环境的可视化操作，让用户所见即所得，让系统更易用、更可靠。'
                                }
                            }]
                        }]
                    }, {
                        name: 'NestedLayoutContainer',
                        properties: {
                            name: 'NestedLayoutContainer',
                            css: {
                                backgroundSize: 'cover', background: 'url(http://digibird.com.cn/images/dmis-6-1.jpg) no-repeat center bottom', height: '60%', backgroundColor: null, padding: '50px 0 0'
                            },
                            style: '',
                            title: 'Tenon'
                        },
                        children: [{
                            name: 'NestedLayoutContainer',
                            properties: {
                                name: 'NestedLayoutContainer',
                                css: {
                                    textAlign: 'center', padding: '10px', marginTop: 0, margin: '', lineHeight: '2'
                                },
                                style: '',
                                title: 'Tenon'
                            },
                            children: [{
                                name: 'Text',
                                properties: {
                                    name: 'Text', css: { fontSize: '4rem', fontWeight: '300' }, style: '', label: 'h2', text: '模块化设计，按需灵活配置'
                                }
                            }, {
                                name: 'Text',
                                properties: {
                                    name: 'Text', css: { fontSize: '2rem', fontWeight: '300' }, style: '', label: 'h3', text: 'DMIS系统包含管理平台、视频处理模块、音频处理模块、环境控制模块以及操作交互终端，可随需灵活配置。'
                                }
                            }]
                        }]
                    }, {
                        name: 'NestedLayoutContainer',
                        properties: {
                            name: 'NestedLayoutContainer', css: { height: '100%' }, style: '', title: 'Tenon'
                        },
                        children: []
                    }]
                }
            }
        }
    },
    computed: {
        currentVisiable: {
            get() {
                return this.visiable
            },
            set(val) {
                this.$emit('update:visiable', val)
            }
        }
    },
    methods: {
        confirm() {
            const id = this.$uuid()
            const project = {
                id,
                ...this.project,
                components: {
                    id,
                    ...this.formatComponents(this.template[this.templateId])
                }
            }
            this.$emit('confirm', project)
            this.reset()
        },
        reset() {
            this.project.name = ''
        },
        formatComponents(data) {
            const recursion = children => children.map(item => {
                if (item.children) item.children = recursion(item.children)
                console.log(item)
                return {
                    ...item,
                    id: this.$uuid()
                }
            })

            const children = recursion(data.children)

            return {
                ...data,
                children
            }
        }
    }
}
</script>
<style lang="less">
@import "~styles/variables";

.project {
    &-template {
        padding: 15px 0;
        li {
            padding: 8px 10px;
            cursor: pointer;
        }
        .active {
            color: @white-color;
            background: @accent-color;
        }
    }
}
</style>
