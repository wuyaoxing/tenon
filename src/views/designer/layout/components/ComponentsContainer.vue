<template>
    <div class="components-container">
        <ul class="components-list"
            v-for="(value, key) in componentCategory"
            :key="key">
            <li class="components-list-title ellipsis">{{key}}</li>
            <li class="components-list-item ellipsis"
                v-for="name in value"
                :key="name"
                draggable
                @dragstart="e => ondragstart(e, name)"
                @dragend="ondragend">{{name}}</li>
        </ul>
        <ul class="components-list">
            <li class="components-list-title ellipsis">Recombination Components</li>
            <li class="components-list-item ellipsis"
                v-for="item in recombinationComponents"
                :key="item.id"
                draggable
                @dragstart="e => ondragstart(e, 'RecombinationLayoutContainer', item.data)"
                @dragend="ondragend">{{item.name}}</li>
        </ul>
    </div>
</template>
<script>
import { componentCategory } from '../../components/config'
import asyncLoadDefaultDataMixins from './asyncLoadDefaultData'

export default {
    name: 'ComponentsContainer',
    mixins: [asyncLoadDefaultDataMixins],
    props: {
        componentId: String
    },
    data() {
        return {
            componentCategory,
            recombinationComponents: []
        }
    },
    methods: {
        ondragstart(e, name, data) {
            this.$emit('update:componentId', '')
            e.target.classList.add('drag')
            let dragData = {}
            if (name === 'RecombinationLayoutContainer') {
                dragData = {
                    ...this.formatComponents(data)
                }
            } else {
                const defaultData = this.asyncLoadDefaultData(name)
                dragData = {
                    id: this.$uuid(),
                    name,
                    properties: {
                        name,
                        css: {},
                        style: '',
                        ...defaultData
                    }
                }
                if (name === 'NestedLayoutContainer' || name === 'PositionLayoutContainer') {
                    dragData.children = []
                }
            }
            e.dataTransfer.setData('Text', JSON.stringify(dragData))
        },
        ondragend(e) {
            e.target.classList.remove('drag')
        },
        formatComponents(data) {
            const recursion = children => children.map(item => {
                if (item.children) item.children = recursion(item.children)
                return {
                    ...item,
                    id: this.$uuid()
                }
            })
            const component = {
                ...data,
                id: this.$uuid()
            }
            if (data.children) {
                component.children = recursion(data.children)
            }

            return component
        },
        fetchRecombinationComponents() {
            const data = localStorage.getItem('Tenon-recombination-components')
            this.recombinationComponents = data ? JSON.parse(data) : []
        },
    },
    created() {
        this.fetchRecombinationComponents()
    }
}
</script>
<style lang="less">
.components {
    &-container {
    }
    &-list {
        li {
            height: 30px;
            line-height: 30px;
        }
        &-title {
            padding: 0 10px;
            font-size: 18px;
        }
        &-item {
            padding: 0 20px;
            cursor: pointer;
            &:hover {
                color: @white-color;
                background: @accent-color;
            }
            &.drag {
                opacity: 0.5;
            }
        }
    }
}
</style>
