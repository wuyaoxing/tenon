<template>
    <AppLayout>
        <Tenon></Tenon>
    </AppLayout>
</template>
<script>
import AppLayout from 'components/layout/AppLayout'
import Tenon from 'views/tenon/Tenon'

export default {
    name: 'App',
    components: {
        AppLayout,
        Tenon
    }
}
</script>
