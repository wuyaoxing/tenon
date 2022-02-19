<template>
    <AppLayout>
        <Tenon></Tenon>
    </AppLayout>
</template>
<script>
import AppLayout from '@/components/layout/AppLayout.vue'
import Tenon from '@/views/tenon/Tenon.vue'

export default {
    name: 'App',
    components: {
        AppLayout,
        Tenon
    }
}
</script>
