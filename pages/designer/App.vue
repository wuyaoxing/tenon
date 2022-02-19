<template>
    <AppLayout>
        <router-view></router-view>
    </AppLayout>
</template>
<script>
import AppLayout from '@/components/layout/AppLayout.vue'

export default {
    name: 'App',
    components: {
        AppLayout
    }
}
</script>
