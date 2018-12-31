<template>
  <div class="properties-container">
    Properties
    {{component}}
  </div>
</template>
<script>
export default {
    name: 'PropertiesContainer',
    props: {
        componentId: String,
        project: Object
    },
    data() {
        return {
            component: {}
        }
    },
    methods: {

        showProperties(data) {
            this.component = data
        }
    },
    created() {
        this.$root.$on('show-properties', this.showProperties)
    },
    destroyed() {
        this.$root.$off('show-properties', this.showProperties)
    },
}
</script>
