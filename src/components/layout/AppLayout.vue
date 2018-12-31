<template>
    <div class="app-layout">
        <div class="app-layout-header">
            <slot name="header"></slot>
        </div>
        <div class="app-layout-content">
            <slot></slot>
        </div>
        <div class="app-layout-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<style lang="less">
.app-layout {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    display: flex;
    flex-direction: column;
    &-header {
        z-index: 3;
        flex: none;
    }
    &-footer {
        z-index: 2;
        flex: none;
    }
    &-content {
        position: relative;
        z-index: 1;
        flex: 1;
    }
}
</style>
