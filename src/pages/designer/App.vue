<template>
    <div id="app">
        <AppLayout>
            <router-view></router-view>
        </AppLayout>
    </div>
</template>
<script>
import AppLayout from 'components/layout/AppLayout'

export default {
    name: 'app',
    components: {
        AppLayout
    }
}
</script>
<style lang="less">
@import "~styles/variables";
</style>
