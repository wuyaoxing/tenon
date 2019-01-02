<template>
  <div class="components-container">
    <ul class="components-list"
        v-for="(value, key) in config"
        :key="key">
      <li class="components-list-title">{{key}}</li>
      <li class="components-list-item"
          v-for="name in value"
          :key="name"
          draggable
          @dragstart="e => ondragstart(e, name)">{{name}}</li>
    </ul>
  </div>
</template>
<script>
import config from './config'

export default {
    name: 'ComponentsContainer',
    data() {
        return {
            config
        }
    },
    methods: {
        ondragstart(e, name) {
            const dragData = {
                id: this.$uuid(),
                name,
                properties: { test: '123' },
                children: []
            }
            e.dataTransfer.setData('Text', JSON.stringify(dragData))
        },
    }
}
</script>
<style lang="less">
@import "~styles/variables";

.components {
  &-container {
  }
  &-list {
    li {
      height: 30px;
      line-height: 30px;
    }
    &-title {
      padding: 0 10px;
      font-size: 18px;
    }
    &-item {
      padding: 0 20px;
      cursor: pointer;
      &:hover {
        color: @white-color;
        background: @accent-color;
      }
    }
  }
}
</style>
