<template>
    <div class="handle"
         :class="[`handle-${direction}`, {
             collapse: !handle
         }]"
         :style="style"
         ref="handle">
        <span class="handle-bar"
              @click="handleEvent"><i class="el-icon-arrow-left"></i></span>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        handle: Boolean,
        direction: {
            type: String,
            default: 'left'
        },
        offset: {
            type: [String, Number],
            default: 45
        }
    },
    data() {
        return {
            style: {}
        }
    },
    watch: {
        handle() {
            this.repaint()
        }
    },
    methods: {
        handleEvent() {
            this.$emit('update:handle', !this.handle)
        },
        repaint() {
            const offset = this.handle ? 0 : this.offset - this.$refs.handle.offsetWidth
            if (this.direction === 'left') {
                this.style = {
                    marginLeft: `${offset}px`,
                    transition: 'margin-left 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
                }
            } else if (this.direction === 'right') {
                this.style = {
                    marginRight: `${offset}px`,
                    transition: 'margin-right 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                }
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.repaint()
        })
    }
}
</script>

<style lang="less">
@import "~styles/variables";

.handle {
    position: relative;
    &-bar {
        position: absolute;
        top: 50%;
        z-index: 10;
        width: 12px;
        height: 50px;
        line-height: 50px;
        color: #bbdaef;
        background: #2c6a95;
        margin-top: -25px;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
        transition: left 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    }
    &-left {
        // margin-right: 12px;
        .handle-bar {
            right: -11px;
        }
    }
    &-right {
        // margin-left: 12px;
        .handle-bar {
            left: -11px;
            transform: rotate(180deg);
        }
    }
    &-left.collapse .handle-bar i {
        transform: rotate(180deg);
    }
    &-right.collapse .handle-bar i {
        transform: rotate(180deg);
    }
}
</style>
