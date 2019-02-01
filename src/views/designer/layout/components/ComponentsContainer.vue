<template>
    <div class="components-container">
        <ul class="components-list"
            v-for="(value, key) in componentCategory"
            :key="key">
            <li class="components-list-title">{{key}}</li>
            <li class="components-list-item"
                v-for="name in value"
                :key="name"
                draggable
                @dragstart="e => ondragstart(e, name)"
                @dragend="ondragend">{{name}}</li>
        </ul>
    </div>
</template>
<script>
import { componentCategory } from '../../components/config'
import asyncLoadDefaultDataMixins from './asyncLoadDefaultData'

export default {
    name: 'ComponentsContainer',
    mixins: [asyncLoadDefaultDataMixins],
    data() {
        return {
            componentCategory
        }
    },
    methods: {
        ondragstart(e, name) {
            e.target.classList.add('drag')
            const defaultData = this.asyncLoadDefaultData(name)
            const dragData = {
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
                dragData.properties.css = {
                    padding: '8px',
                    minHeight: '150px'
                }
            }
            e.dataTransfer.setData('Text', JSON.stringify(dragData))
        },
        ondragend(e) {
            e.target.classList.remove('drag')
        }
    }
}
</script>
<style lang="less">
@import "~styles/variables";

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
