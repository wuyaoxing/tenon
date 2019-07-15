<template>
    <div class="properties-container">
        <div class="properties-content"
             v-if="componentId">
            <div class="properties-line f f-ai-c">
                <span class="f-fs-0 mr-10">{{$i18n(`designer.properties.name`)}}</span>
                <InputText class="properties-name"
                           :value="originData.name"
                           size="mini"
                           :placeholder="$i18n(`designer.properties.name`)"
                           @input="val => change('name', val)" />
            </div>
            <RectPanel class="properties-panel"
                       :schema="formatSchemas.rect"
                       :data="originData.css"
                       @change="changeStyle"
                       v-if="formatSchemas.rect.display !== false"></RectPanel>
            <Collapse class="properties-collapse"
                      v-model="actives">
                <template v-for="schema in formatSchemas.schemas">
                    <CollapseItem :name="schema.title"
                                  :key="schema.title"
                                  v-if="schema.display !== false">
                        <template slot="title">
                            {{$i18n(`designer.properties.title.${schema.title}`)}}
                        </template>
                        <component class="properties-panel"
                                   :is="asyncLoadPanel(schema.format)"
                                   :schema="schema"
                                   :data="originData.css"
                                   @change="changeStyle"></component>
                    </CollapseItem>
                </template>
                <CollapseItem name="custom"
                              v-if="components.length === 1 && Object.keys(componentSchema.properties).length > 0">
                    <template slot="title">
                        {{$i18n(`designer.properties.title.custom`)}}
                    </template>
                    <ul class="properties-item">
                        <li v-for="(item, key) in componentSchema.properties"
                            :key="key">
                            <span>{{$i18n(`designer.properties.custom.${key}`)}}</span>
                            <component class="f-f-1"
                                       :is="asyncLoadComponent(item.format)"
                                       :schema="item"
                                       :component="components[0]"
                                       :value="originData[key]"
                                       @change="value => change(key, value)"></component>
                        </li>
                    </ul>
                </CollapseItem>
            </Collapse>
            <p style="text-align: center;padding: 15px;">
                ~ 分割线 ~
            </p>
            <Collapse v-model="actives">
                <CollapseItem :name="styleSchema.title"
                              v-for="styleSchema in styleSchemas"
                              :key="styleSchema.title">
                    <template slot="title">
                        {{styleSchema.title}}
                    </template>
                    <ul class="properties-item">
                        <li v-for="(item, key) in styleSchema.properties"
                            :key="key">
                            <span>{{key}}</span>
                            <component class="f-f-1"
                                       :is="asyncLoadComponent(item.format)"
                                       :schema="item"
                                       :readonly="item.readonly"
                                       :properties="component.properties"
                                       :value.sync="component.properties.css[key]"></component>
                        </li>
                    </ul>
                </CollapseItem>
                <CollapseItem name="style">
                    <template slot="title">
                        style
                    </template>
                    <Code :value.sync="style"></Code>
                </CollapseItem>
                <CollapseItem name="custom">
                    <template slot="title">
                        custom
                    </template>
                    <ul class="properties-item">
                        <li v-for="(item, key) in componentSchema.properties"
                            :key="key">
                            <span>{{key}}</span>
                            <component class="f-f-1"
                                       :is="asyncLoadComponent(item.format)"
                                       :component="component"
                                       :schema="item"
                                       :properties="component.properties"
                                       :value.sync="component.properties[key]"></component>
                        </li>
                    </ul>
                </CollapseItem>
            </Collapse>
        </div>
        <div v-else>请选择组件</div>
    </div>
</template>
<script>
import commonSchemas, {
    commonSchema,
    styleSchemas
} from '../../components/config/common-schema'
// import schema from '../../components/config/common-schema'

import asyncLoadSchemaMixins from './asyncLoadSchema'
import asyncLoadComponentMixins from './asyncLoadComponent'

import Code from './components/code'
import RectPanel from './layout/RectPanel'

// TODO
// 增加确认操作，或者输入框回车生效。避免实时生效带来的性能问题。
// 声明临时数据承载用户编辑，保存后循环赋值。
// 对属性定制UI视图

export default {
    name: 'PropertiesContainer',
    mixins: [asyncLoadSchemaMixins, asyncLoadComponentMixins],
    props: {
        componentId: String,
        project: Object
    },
    components: {
        Code,
        RectPanel
    },
    provide() {
        return {
            asyncLoadComponent: this.asyncLoadComponent,
            project: this.project
        }
    },
    data() {
        return {
            styleSchemas,
            // ['name', 'width', 'height', 'border', 'display', 'position', 'custom']
            actives: ['name', 'style'],
            component: {},
            components: [],
            defaultCssData: {
                color: '',
                opacity: 1,
                backgroundColor: '',
                borderColor: '',
                borderStyle: 'none',
                borderWidth: '0px',
                borderRadius: '0px',
            },
            componentsSchema: {}
        }
    },
    computed: {
        style: {
            get() {
                return JSON.stringify(this.component.properties.css, null, 2)
            },
            set(val) {
                this.component.properties.css = JSON.parse(val)
            }
        },


        originData() {
            if (this.components.length === 1) {
                const { properties } = this.components[0]
                return {
                    ...properties,
                    css: {
                        ...this.defaultCssData,
                        ...properties.css
                    }
                }
            }
            return {
                css: {
                    ...this.defaultCssData
                }
            }
        },
        componentSchema() {
            let arr = []
            const properties = {}
            const definitions = {}
            const schemas = []
            this.components.forEach(component => {
                this.componentsSchema[component.name] && schemas.push(this.componentsSchema[component.name])
            })
            schemas.forEach((item, index) => {
                const propertiesArr = Object.keys(item.properties)
                if (index === 0) {
                    arr = propertiesArr
                } else {
                    arr = propertiesArr.filter(key => arr.includes(key))
                }
                if (schemas.length - 1 === index) {
                    arr.forEach(key => {
                        properties[key] = item.properties[key]
                    })
                }
                Object.assign(definitions, item.definitions)
            })
            return {
                properties,
                definitions
            }
        },
        formatSchemas() {
            const schemas = {}
            const { definitions } = this.componentSchema
            const targetCommonSchemas = JSON.parse(JSON.stringify(commonSchemas))
            Object.keys(targetCommonSchemas).forEach(key => {
                schemas[key] = targetCommonSchemas[key]
                const def = definitions[key]
                if (def) {
                    if (def.display === false) {
                        schemas[key].display = false
                    }
                    if (def.properties) {
                        Object.keys(def.properties).forEach(dkey => {
                            if (schemas[key].properties[dkey]) {
                                const targetProperties = def.properties[dkey]
                                delete targetProperties.format
                                schemas[key].properties[dkey] = {
                                    ...schemas[key].properties[dkey],
                                    ...targetProperties
                                }
                            }
                        })
                    }
                }
            })
            return {
                rect: schemas.rect,
                schemas: Object.values(schemas).filter(item => item.title !== 'rect')
            }
        }
    },
    watch: {
        componentId: {
            handler: 'findComponent',
            immediate: true
        }
    },
    methods: {
        findComponent(componentId) {
            console.log(componentId)
            if (!componentId) {
                this.component = {}
                return
            }
            const recursion = (component, id) => {
                if (component.id === id) {
                    this.component = component

                    this.components = [this.component]
                    return
                }
                if (component.children) {
                    for (let i = 0; i < component.children.length; i++) {
                        const data = component.children[i]
                        recursion(data, id)
                        if (data.id === id) break
                    }
                }
            }
            recursion(this.project.components, componentId)

            this.asyncLoadSchema(this.component.name)
        },

        changeStyle(key, value) {
            this.$set(this.component.properties.css, key, value)
            console.log('style', key, value)
        },
        change(key, value) {
            this.$set(this.component.properties, key, value)
            console.log('properties', key, value)
        }
    }
}
</script>
<style lang="less">
@import "~styles/variables";
.properties {
    &-container {
        .el-collapse {
            border-top: none;
            &-item__header {
                height: 30px;
                line-height: 30px;
                padding-left: 8px;
                // color: @primary-color;
                font-weight: 600;
                font-size: 14px;
                background: @white-color;
                // &:hover {
                //     color: @white-color;
                //     background: @accent-color;
                // }
            }
            &-item__arrow {
                line-height: 30px;
            }
            &-item__wrap {
                background: transparent;
            }
            &-item__content {
                padding-bottom: 0;
            }
        }
    }
    &-content {
        padding-bottom: 150px;
    }
    &-panel {
        padding: 20px 10px 10px;
        > ul > li {
            padding: 0 6px;
            margin-bottom: 20px;
        }
    }
    &-line {
        padding: 20px 16px 0;
        i {
            font-size: @font-size-large;
            margin-left: 10px;
            cursor: pointer;
            &:hover {
                color: @white-color;
            }
            &:first-of-type {
                margin: 0;
            }
        }
    }
    &-item {
        & > li {
            display: flex;
            align-items: center;
            //   border: 1px solid #333;
            height: 30px;
            padding: 0 24px 0 16px;
            & > span {
                width: 80px;
            }
        }
    }
}
</style>
