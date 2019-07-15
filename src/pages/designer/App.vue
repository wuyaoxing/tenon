<template>
    <AppLayout>
        <router-view></router-view>
    </AppLayout>
</template>
<script>
import AppLayout from 'components/layout/AppLayout'

export default {
    name: 'App',
    components: {
        AppLayout
    }
}
</script>
