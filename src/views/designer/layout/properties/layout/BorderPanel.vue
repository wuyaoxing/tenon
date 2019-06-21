<template>
    <div class="border-panel">
        <ul class="f f-fw-w">
            <li :class="{ 'w-percent-50': item.format === 'cssunit' }"
                v-for="(item, key) in schema.properties"
                :key="key">
                <component :is="asyncLoadComponent(item.format)"
                           :title="$i18n(`designer.properties.${key}`)"
                           :schema="item"
                           :value="data[key]"
                           @change="val => change(key, val)"></component>
            </li>
        </ul>
    </div>
</template>
<script>
import PanelMixin from './panelMixin'

export default {
    name: 'BorderPanel',
    mixins: [PanelMixin]
}
</script>

<style lang="less">
.border-panel {
    .properties-select {
        width: 80px;
    }
}
</style>
