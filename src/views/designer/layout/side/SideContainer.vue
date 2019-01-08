<template>
  <div class="side-container"
       :class="{ collapse }">
    <ul class="side-menu">
      <li class="side-handle"
          @click="collapseEvent">
        <i class="el-icon-arrow-left"></i>
      </li>
      <li v-for="item in menu"
          :key="item.fields">
        <router-link :to="{ name: item.name }"><i :class="item.icon"></i></router-link>
      </li>
    </ul>
    <div class="side-content">
      <router-view :componentId.sync="currentComponentId"
                   :project="project"></router-view>
    </div>
  </div>
</template>
<script>
import { sideRouter } from 'pages/designer/router'

export default {
    name: 'SideContainer',
    props: {
        componentId: String,
        project: Object
    },
    data() {
        return {
            menu: sideRouter,
            collapse: false
        }
    },
    computed: {
        currentComponentId: {
            get() {
                return this.componentId
            },
            set(val) {
                this.$emit('update:componentId', val)
            }
        }
    },
    watch: {
        $route() {
            this.expandHandler()
        }
    },
    methods: {
        collapseEvent() {
            this.collapse = !this.collapse
        },
        expandHandler() {
            this.collapse = false
        }
    }
}
</script>
<style lang="less">
@import "~styles/variables";

.side {
  &-container {
    position: relative;
    transition: width 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    &.collapse {
      width: 45px;
      .side-handle {
        transform: rotate(180deg);
      }
    }
  }
  &-menu {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    width: 45px;
    text-align: center;
    box-shadow: 1px 0 3px 0 rgba(0, 0, 0, 0.4);
    background: @primary-color;
    overflow: hidden;
    a {
      display: inline-block;
      width: 45px;
      height: 45px;
      line-height: 45px;
      color: #bbdaef;
      &:hover {
        color: @white-color;
      }
      &.active {
        color: @white-color;
        background: @primary-dark-color;
      }
    }
    li:first-of-type {
      i {
        width: 45px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        color: @primary-light-color;
        cursor: pointer;
        &:hover {
          color: @white-color;
        }
      }
    }
  }
  &-content {
    position: absolute;
    right: 0;
    width: calc(100% - 45px);
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>
