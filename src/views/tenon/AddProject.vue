<template>
  <Dialog title="新建项目"
          width="500px"
          :append-to-body="true"
          :visible.sync="currentVisiable">
    项目名称： <Input v-model="project.name" />
    <ul>
      <li v-for="item in template"
          :key="item.name"></li>
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
            templateId: 1,
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
