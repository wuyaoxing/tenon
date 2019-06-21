<template>
    <div class="rect-panel">
        <ul class="f f-fw-w">
            <li class="w-percent-50"
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
    name: 'RectPanel',
    mixins: [PanelMixin]
}
</script>
