<template>
    <div class="tree-container">
        <Tree :data="[project.components]"
              :props="defaultProps"
              :default-expand-all="true"
              :expand-on-click-node="false"
              @node-click="nodeClick"></Tree>
    </div>
</template>
<script>
export default {
    name: 'TreeContainer',
    props: {
        componentId: String,
        project: Object
    },
    data() {
        return {
            defaultProps: {
                children: 'children',
                label: 'name'
            }
        }
    },
    methods: {
        nodeClick(data, node) {
            this.$emit('update:componentId', data.id)
            console.log(data, node)
        }
    }
}
</script>
<style lang="less">
.tree-container {
    .el-tree-node {
        &__label {
            min-width: 180px;
        }
        &__children {
            overflow: visible;
        }
    }
}
</style>
