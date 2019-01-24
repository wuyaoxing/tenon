<template>
    <Dialog title="新建项目"
            width="500px"
            :append-to-body="true"
            :visible.sync="currentVisiable"
            class="project-add">
        项目名称： <Input v-model="project.name" />
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
            },
            templateId: '1',
            template: {
                1: {
                    name: 'NestedLayoutContainer',
                    properties: {
                        minHeight: '100%'
                    },
                    children: [
                        {
                            name: 'Header',
                            properties: {},
                            children: []
                        },
                        {
                            name: 'NestedLayoutContainer',
                            properties: {},
                            children: [
                                {
                                    name: 'NestedLayoutContainer',
                                    properties: {},
                                    children: [
                                        {
                                            name: 'NestedLayoutContainer',
                                            properties: {},
                                            children: []
                                        },
                                        {
                                            name: 'PositionLayoutContainer',
                                            properties: {
                                            },
                                            children: [
                                                {
                                                    name: 'Button',
                                                    properties: {},
                                                    children: []
                                                },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'NestedLayoutContainer',
                                    properties: {},
                                    children: []
                                },
                                {
                                    name: 'PositionLayoutContainer',
                                    properties: {
                                    },
                                    children: [
                                        {
                                            name: 'Button',
                                            properties: {},
                                            children: []
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'PositionLayoutContainer',
                            properties: {
                            },
                            children: [
                                {
                                    name: 'Button',
                                    properties: {},
                                    children: []
                                },
                            ]
                        }
                    ],
                },
                2: {
                    name: 'NestedLayoutContainer',
                    properties: {
                        name: 'NestedLayoutContainer',
                        css: {
                            minHeight: '100%',
                        },
                        style: ''
                    },
                    children: []
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
                    id: this.$uuid(),
                    ...item
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
