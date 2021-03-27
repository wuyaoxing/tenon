<template>
    <div class="marquee">
        <span :style="animateStyle">
            {{ text }}
        </span>
    </div>
</template>
<script>
export default {
    name: 'Marquee',
    props: {
        text: String,
        duration: Number,
    },
    data() {
        return {
            animateStyle: {}
        }
    },
    watch: {
        text: 'getAnimateStyle',
        duration: 'getAnimateStyle',
    },
    mounted() {
        this.$nextTick(() => {
            this.getAnimateStyle()
        })
    },
    methods: {
        getAnimateStyle() {
            this.$nextTick(() => {
                this.animateStyle = {
                    animation: `marquee ${this.duration}ms linear 1s infinite normal`
                }
            })
        }
    }
}
</script>
<style lang="less">
.marquee {
    display: flex;
    align-items: center;
    overflow: hidden;
    span {
        padding-left: 100%;
        white-space: pre;
    }
}

@keyframes marquee {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(-100%, 0);
    }
}
</style>
