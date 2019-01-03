<template>
  <div class="position-container"
       :class="{ selected }"
       @click.stop="clickEvent">
    PositionConatiner
    <slot></slot>
  </div>
</template>
<script>
import scrollIntoViewMixins from './scrollIntoView'

export default {
    name: 'PositionContainer',
    mixins: [scrollIntoViewMixins],
    props: {
        selected: Boolean
    },
    methods: {
        clickEvent(e) {
            this.$emit('click', e)
        },
    }
}
</script>
<style lang="less">
.position-container {
  padding: 5px;
  &.selected {
    outline: 1px dashed #2c6a95;
  }
}
</style>
