<script>
export default {
    render(h) {
        return h(this.label, {
            class: {
                text: true
            }
        }, this.text)
    },
    props: {
        label: {
            type: String,
            default: 'h1'
        },
        text: String
    }
}

</script>
<style lang="less">
.text {
}
</style>
