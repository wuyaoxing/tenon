<template>
  <div class="tenon-viewer">
    Viewer projectId: {{projectId}}
  </div>
</template>
<script>
export default {
    name: 'tenon-viewer',
    computed: {
        projectId() {
            return this.$route.params.id
        }
    }
}
</script>
