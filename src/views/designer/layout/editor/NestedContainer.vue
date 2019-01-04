<template>
  <div class="nested-container"
       :class="{ selected }"
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
    <div class="hint">{{hint}}</div>
  </div>
</template>
<script>
import scrollIntoViewMixins from './scrollIntoView'

export default {
    name: 'NestedContainer',
    mixins: [scrollIntoViewMixins],
    props: {
        name: String,
        selected: Boolean,
        showUp: Boolean,
        showDown: Boolean,
        showDelete: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        hint() {
            let hint = ''
            if (this.name === 'NestedLayoutContainer') {
                hint = '插入 NestedLayoutContainer 内部'
            } else if (this.name === 'PositionLayoutContainer') {
                hint = '插入 PositionLayoutContainer 内部'
            } else {
                hint = `插入 ${this.name} 下方`
            }
            return hint
        }
    },
    methods: {
        ondrop(e) {
            e.preventDefault()
            this.$el.classList.remove('dragover')
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
  border: 1px solid #000;
  &.selected,
  &.dragover {
    outline: 1px dashed #2c6a95;
  }
  &.dragover {
    background: purple;
    & > .hint {
      display: block;
    }
  }
  &-widget {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    width: 30px;
    border-radius: 2px;
    overflow: hidden;
    i {
      padding: 8px;
      color: #bbdaef;
      background: #1f5c87;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
  .hint {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    color: @white-color;
    background: #1f5c87;
  }
}
</style>
