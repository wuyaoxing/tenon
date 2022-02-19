<template>
    <div class="tenon-viewer">
        <RenderNestedLayoutCompiler :component="project.components" />
    </div>
</template>
<script>
import RenderNestedLayoutCompiler from '@/views/designer/compiler/RenderNestedLayoutCompiler.vue'
import asyncLoadComponentMixins from '@/views/designer/compiler/asyncLoadComponent.js'

export default {
    name: 'tenon-viewer',
    mixins: [asyncLoadComponentMixins],
    components: {
        RenderNestedLayoutCompiler
    },
    provide() {
        return {
            asyncLoadComponent: this.asyncLoadComponent,
            project: this.project
        }
    },
    data() {
        return {
            project: {}
        }
    },
    computed: {
        projectId() {
            return this.$route.params.id
        }
    },
    methods: {
        fetchProject() {
            const data = localStorage.getItem('Tenon-projects')
            const projects = data ? JSON.parse(data) : []
            this.project = projects.find(item => item.id === this.projectId) || {}
        },
    },
    created() {
        this.fetchProject()
    }
}
</script>
<style lang="less">
.tenon {
    &-viewer {
        width: 100%;
        height: 100%;
        overflow: auto;
    }
}
</style>
