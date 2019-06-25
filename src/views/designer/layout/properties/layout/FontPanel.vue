<template>
    <div class="font-panel">
        <ul class="f f-fw-w f-ai-fe">
            <li :class="{ 'w-percent-50': ['select', 'cssunit'].includes(item.format) }"
                v-for="(item, key) in schema.properties"
                :key="key">
                <RadioGroup :value="data[key]"
                            size="mini"
                            @input="val => change(key, val)"
                            v-if="item.format === 'radio'">
                    <RadioButton v-for="item in item.enum"
                                 :key="item.value"
                                 :label="item.value">
                        <!-- <i :class="`icon-${key}-${item.value}`" /> -->
                    </RadioButton>
                </RadioGroup>
                <InputText :value="data[key]"
                           :readonly="item.readonly"
                           size="mini"
                           @input="val => change(key, val)"
                           v-else-if="key === 'fontFamily'">
                    <template slot="prepend">{{$i18n(`designer.properties.${key}`)}}</template>
                </InputText>
                <component :is="asyncLoadComponent(item.format)"
                           :title="$i18n(`designer.properties.${key}`)"
                           :placeholder="$i18n(`designer.properties.${key}`)"
                           :schema="item"
                           :value="data[key]"
                           @change="val => change(key, val)"
                           v-else></component>
            </li>
        </ul>
    </div>
</template>
<script>
import PanelMixin from './panelMixin'

export default {
    name: 'FontPanel',
    mixins: [PanelMixin]
}
</script>
<style lang="less">
.font-panel {
    .el-radio-button__inner {
        padding: 7px 8px;
    }
}
</style>
