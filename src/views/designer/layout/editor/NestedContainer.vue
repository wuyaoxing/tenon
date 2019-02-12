<template>
    <div class="nested-container"
         @click.stop="clickEvent">
        <!-- NestedConatiner -->
        <slot></slot>
    </div>
</template>
<script>
import scrollIntoViewMixins from './scrollIntoView'
import propertiesMixins from './properties'

export default {
    name: 'NestedContainer',
    mixins: [scrollIntoViewMixins, propertiesMixins],
    data() {
        return {
            develop: true
        }
    },
    methods: {
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
}
</style>
