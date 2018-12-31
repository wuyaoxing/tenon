<template>
  <div id="app">
    <AppLayout>
      <Tenon></Tenon>
    </AppLayout>
  </div>
</template>
<script>
import AppLayout from 'components/layout/AppLayout'
import Tenon from 'views/tenon/Tenon'

export default {
    components: {
        AppLayout,
        Tenon
    }
}
</script>
