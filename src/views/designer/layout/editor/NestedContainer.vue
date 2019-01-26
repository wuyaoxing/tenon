<template>
    <div class="nested-container"
         :class="{ dragover: isDragover }"
         @drop.stop="ondrop"
         @click.stop="clickEvent">
        <!-- NestedConatiner -->
        <div class="hint"
             v-if="isDragover">{{hint}}</div>
        <slot></slot>
    </div>
</template>
<script>
import scrollIntoViewMixins from './scrollIntoView'
import propertiesMixins from './properties'

export default {
    name: 'NestedContainer',
    mixins: [scrollIntoViewMixins, propertiesMixins],
    props: {
        isDragover: Boolean,
        hint: String
    },
    data() {
        return {
            develop: true
        }
    },
    methods: {
        ondrop(e) {
            e.preventDefault()
            this.$emit('drop', e)
        },
        clickEvent(e) {
            this.$emit('click', e)
        }
    }
}
</script>
<style lang="less">
@import "~styles/variables";

.nested-container {
    position: relative;
    // padding: 0 8px;
    //   border: 1px solid #000;
    &.dragover {
        outline: 1px dashed @primary-color;
        background: @primary-light-color;
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
