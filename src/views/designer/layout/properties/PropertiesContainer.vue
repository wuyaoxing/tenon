<template>
    <div class="properties-container">
        <Collapse v-model="actives"
                  v-if="componentId">
            <CollapseItem name="name">
                <template slot="title">
                    name
                </template>
                <ul class="properties-item">
                    <li>
                        <span>ClassName</span>
                        <component class="f-f-1"
                                   :is="asyncLoadComponent('text')"
                                   :readonly="true"
                                   :properties="component.properties"
                                   :value.sync="component.name"></component>
                    </li>
                    <li>
                        <span>name</span>
                        <component class="f-f-1"
                                   :is="asyncLoadComponent('text')"
                                   :properties="component.properties"
                                   :value.sync="component.properties.name"></component>
                    </li>
                </ul>
            </CollapseItem>
            <CollapseItem name="size">
                <template slot="title">
                    {{schema.sizeSchema.title}}
                </template>
                <ul class="properties-item">
                    <li v-for="(item, key) in schema.sizeSchema.properties"
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
            <CollapseItem name="position">
                <template slot="title">
                    {{schema.positionSchema.title}}
                </template>
                <ul class="properties-item">
                    <li v-for="(item, key) in schema.positionSchema.properties"
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
            <CollapseItem name="margin">
                <template slot="title">
                    {{schema.marginSchema.title}}
                </template>
                <ul class="properties-item">
                    <li v-for="(item, key) in schema.marginSchema.properties"
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
            <CollapseItem name="padding">
                <template slot="title">
                    {{schema.paddingSchema.title}}
                </template>
                <ul class="properties-item">
                    <li v-for="(item, key) in schema.paddingSchema.properties"
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
            <CollapseItem name="font">
                <template slot="title">
                    {{schema.fontSchema.title}}
                </template>
                <ul class="properties-item">
                    <li v-for="(item, key) in schema.fontSchema.properties"
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
            <CollapseItem name="shadow">
                <template slot="title">
                    {{schema.shadowSchema.title}}
                </template>
                <ul class="properties-item">
                    <li v-for="(item, key) in schema.shadowSchema.properties"
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
            <CollapseItem name="border">
                <template slot="title">
                    {{schema.borderSchema.title}}
                </template>
                <ul class="properties-item">
                    <li v-for="(item, key) in schema.borderSchema.properties"
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
            <CollapseItem name="background">
                <template slot="title">
                    {{schema.backgroundSchema.title}}
                </template>
                <ul class="properties-item">
                    <li v-for="(item, key) in schema.backgroundSchema.properties"
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
            <CollapseItem name="display">
                <template slot="title">
                    {{schema.displaySchema.title}}
                </template>
                <ul class="properties-item">
                    <li v-for="(item, key) in schema.displaySchema.properties"
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
            <CollapseItem name="properties">
                <template slot="title">
                    properties
                </template>
                <ul class="properties-item">
                    <li v-for="(item, key) in schema.commonSchema.properties"
                        :key="key">
                        <span>{{key}}</span>
                        <component class="f-f-1"
                                   :is="asyncLoadComponent(item.format)"
                                   :schema="item"
                                   :readonly="item.readonly"
                                   :properties="component.properties"
                                   :value.sync="component.properties[key]"></component>
                    </li>
                </ul>
            </CollapseItem>
            <CollapseItem name="data">
                <template slot="title">
                    data
                </template>
                <div>

                    {{asyncSchema[component.name]}}

                    {{component}}
                </div>
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
        <div v-else>请选择组件</div>
    </div>
</template>
<script>
import schema from '../../components/config/common-schema'

import asyncLoadSchemaMixins from './asyncLoadSchema'
import asyncLoadComponentMixins from './asyncLoadComponent'

import Code from './components/code'

export default {
    name: 'PropertiesContainer',
    mixins: [asyncLoadSchemaMixins, asyncLoadComponentMixins],
    props: {
        componentId: String,
        project: Object
    },
    components: {
        Code
    },
    provide() {
        return {
            project: this.project
        }
    },
    data() {
        return {
            schema,
            // ['name', 'width', 'height', 'border', 'display', 'position', 'custom']
            actives: ['name', 'style', 'custom'],
            component: {}
        }
    },
    computed: {
        componentSchema() {
            return this.asyncSchema[this.component.name] || {}
        },
        style: {
            get() {
                return JSON.stringify(this.component.properties.css, null, 2)
            },
            set(val) {
                this.component.properties.css = JSON.parse(val)
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
                &:hover {
                    color: @white-color;
                    background: @accent-color;
                }
            }
            &-item__arrow {
                line-height: 30px;
            }
            &-item__content {
                padding-bottom: 0;
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
