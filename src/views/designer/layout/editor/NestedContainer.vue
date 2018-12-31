<template>
  <div class="nested-container"
       :class="{ selected }"
       @click.stop="clickEvent">
    <div class="nested-container-widget"
         v-if="selected">
      <i class="el-icon-caret-top"
         v-if="showUp"
         @click="upEvent"></i>
      <i class="el-icon-caret-bottom"
         v-if="showDown"
         @click="downEvent"></i>
      <i class="el-icon-delete"></i>
    </div>
    NestedConatiner
    <slot></slot>
  </div>
</template>
<script>
export default {
    name: 'NestedContainer',
    props: {
        selected: Boolean,
        showUp: Boolean,
        showDown: Boolean
    },
    methods: {
        clickEvent(e) {
            this.$emit('click', e)
        },
        upEvent(e) {
            this.$emit('up', e)
        },
        downEvent(e) {
            this.$emit('down', e)
        },
    }
}
</script>
<style lang="less">
.nested-container {
  position: relative;
  padding: 5px;
  border: 1px solid #000;
  &.selected {
    outline: 1px dashed #2c6a95;
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
}
</style>
