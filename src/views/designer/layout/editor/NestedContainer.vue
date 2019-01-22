<template>
    <div class="nested-container"
         :class="{ selected, dragover: isDragover }"
         @drop.stop="ondrop"
         @click.stop="clickEvent">
        <div class="nested-container-widget"
             v-if="selected">
            <i class="el-icon-caret-top"
               v-if="showUp"
               @click="upEvent"></i>
            <i class="el-icon-caret-bottom"
               v-if="showDown"
               @click="downEvent"></i>
            <i class="el-icon-delete"
               v-if="showDelete"
               @click="deleteEvent"></i>
        </div>
        NestedConatiner
        <slot></slot>
        <div class="hint"
             v-if="isDragover">{{hint}}</div>
    </div>
</template>
<script>
import scrollIntoViewMixins from './scrollIntoView'

export default {
    name: 'NestedContainer',
    mixins: [scrollIntoViewMixins],
    props: {
        selected: Boolean,
        showUp: Boolean,
        showDown: Boolean,
        showDelete: {
            type: Boolean,
            default: true
        },
        isDragover: Boolean,
        hint: String
    },
    methods: {
        ondrop(e) {
            e.preventDefault()
            this.$emit('drop', e)
        },
        clickEvent(e) {
            this.$emit('click', e)
        },
        upEvent(e) {
            this.$emit('up', e)
        },
        downEvent(e) {
            this.$emit('down', e)
        },
        deleteEvent(e) {
            this.$emit('delete', e)
        }
    }
}
</script>
<style lang="less">
@import "~styles/variables";

.nested-container {
    position: relative;
    padding: 5px;
    //   border: 1px solid #000;
    &.selected,
    &.dragover {
        outline: 1px dashed @primary-color;
    }
    &.dragover {
        background: @primary-light-color;
    }
    &-widget {
        position: absolute;
        top: -26px;
        right: -1px;
        z-index: 10;
        border-radius: 3px 3px 0px 0px;
        overflow: hidden;
        i {
            padding: 6px;
            color: @primary-light-color;
            background: @primary-color;
            cursor: pointer;
            &:hover {
                color: @white-color;
            }
        }
    }
    .hint {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        text-align: center;
        color: @white-color;
        background: @primary-color;
    }
}
</style>
