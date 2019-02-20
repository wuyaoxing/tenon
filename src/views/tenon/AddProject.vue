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
                            minHeight: '100%',
                            padding: '8px'
                        },
                        style: ''
                    },
                    children: [],
                    layout: 'nestedLayout'
                },
                2: {
                    id: '6e04a6dc-47ee-4e2e-952e-1586ecf5fa51',
                    name: 'NestedLayoutContainer',
                    properties: { name: 'NestedLayoutContainer', css: { minHeight: '100%', padding: '' }, style: '' },
                    children: [{
                        id: '2e32f1df-d33c-4a64-af9a-a0dd9b0ed31b',
                        name: 'NestedLayoutContainer',
                        properties: {
                            name: 'Start Project',
                            css: {
                                padding: '8px 15px', minHeight: '', height: '50px', lineHeight: '', display: 'flex', alignItems: 'center'
                            },
                            style: '',
                            title: 'Tenon'
                        },
                        children: [{
                            id: '87d4b52c-3efb-46d9-8fd7-b85389d077b1',
                            name: 'Text',
                            properties: {
                                name: 'Text', css: { fontSize: '2rem', width: '', display: 'inline' }, style: '', label: 'h1', text: 'Start Project'
                            },
                            layout: 'nestedLayout'
                        }],
                        layout: 'nestedLayout'
                    }, {
                        id: 'f92f1c00-cfb4-4bc3-9783-ea752fc97e9c',
                        name: 'NestedLayoutContainer',
                        properties: {
                            name: '所见即所得',
                            css: {
                                padding: '10rem', minHeight: '150px', background: 'url(http://www.ypppt.com/uploads/allimg/181014/1-1Q014121J1-50.jpg) no-repeat center center', backgroundSize: 'cover'
                            },
                            style: '',
                            title: 'Tenon'
                        },
                        children: [{
                            id: 'c25264e3-634a-4cbf-8ae0-98aa6881d285',
                            name: 'NestedLayoutContainer',
                            properties: {
                                name: 'NestedLayoutContainer',
                                css: {
                                    padding: '5rem', minHeight: '150px', textAlign: 'center', color: '#FFFFFF'
                                },
                                style: '',
                                title: 'Tenon'
                            },
                            children: [{
                                id: '8a31f19c-2649-4333-bfbd-ba4947191a34',
                                name: 'Text',
                                properties: {
                                    name: 'Text',
                                    css: {
                                        fontSize: '3rem', fontWeight: '300', textAlign: 'center', color: '#FFFFFF'
                                    },
                                    style: '',
                                    label: 'h2',
                                    text: '全可视化操作，所见即所得'
                                },
                                layout: 'nestedLayout'
                            }, {
                                id: '124bd95d-f61d-4ae0-b5dd-ee4fdec58fd4',
                                name: 'Text',
                                properties: {
                                    name: 'Text',
                                    css: {
                                        fontSize: '6rem', color: '#FFFFFF', textAlign: 'center', fontWeight: '300'
                                    },
                                    style: '',
                                    label: 'h1',
                                    text: 'what you see is what you get'
                                },
                                layout: 'nestedLayout'
                            }, {
                                id: '6c27b5f2-4075-431f-ba9f-69da9bd17621',
                                name: 'Text',
                                properties: {
                                    name: 'Text', css: { fontSize: '3rem', fontWeight: '300' }, style: '', label: 'h2', text: '内容可配置，页面结构可配置，逻辑可配置'
                                },
                                layout: 'nestedLayout'
                            }],
                            layout: 'nestedLayout'
                        }],
                        layout: 'nestedLayout'
                    }],
                    layout: 'nestedLayout'
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
