<template>
    <div class="background-panel">
        <ul class="f f-fw-w">
            <li :class="{ 'w-percent-100': item.format === 'slider' }"
                v-for="(item, key) in schema.properties"
                :key="key">
                <div class="f f-ai-c"
                     v-if="item.format === 'slider'">
                    <span class="mr-15">{{$i18n(`designer.properties.${key}`)}}</span>
                    <Slider class="f-f-1"
                            :value="data[key]"
                            :min="0"
                            :max="1"
                            :step="0.1"
                            @change="val => change(key, val)" />
                </div>
                <component :is="asyncLoadComponent(item.format)"
                           :title="$i18n(`designer.properties.${key}`)"
                           :placeholder="$i18n(`designer.properties.${key}`)"
                           :schema="item"
                           :value="data[key]"
                           @change="val => change(key, val)"
                           v-else />
            </li>
        </ul>
    </div>
</template>
<script>
import PanelMixin from './panelMixin'

export default {
    name: 'BackgroundPanel',
    mixins: [PanelMixin]
}
</script>
<style lang="less">
.background-panel {
    > ul > li {
        padding: 4px;
    }
    .properties-select {
        width: 75px;
    }
}
</style>
