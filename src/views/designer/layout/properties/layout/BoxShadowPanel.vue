<template>
    <div class="box-shadow-panel">
        <ul class="f f-fw-w">
            <li class="w-percent-30">
                <ColorPicker :value="boxShadow.color"
                             size="small"
                             recommend
                             @change="val => change('color', val)" />
            </li>
            <li class="w-percent-50">
                <ISwitch size="small"
                         :value="boxShadow.inset"
                         @change="val => change('inset', val)" />（inset）
            </li>
            <li class="w-percent-25"
                v-for="(val, index) in boxShadow.vars"
                :key="index">
                <InputText type="number"
                           :value="val"
                           size="mini"
                           :placeholder="$i18n(`designer.properties.shadow.${index}`)"
                           style="width: auto"
                           @change="val => change('vars', val, index)" />
                <p style="margin-top: 10px;text-align: center;">{{$i18n(`designer.properties.shadow.${index}`)}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
import PanelMixin from './panelMixin'

export default {
    name: 'BoxShadowPanel',
    mixins: [PanelMixin],
    computed: {
        boxShadow() {
            const { boxShadow } = this.data
            const vars = [0, 0, 0, 0]
            if (!boxShadow) {
                return {
                    color: '#000',
                    inset: false,
                    vars
                }
            }
            const inset = /inset/.test(boxShadow)
            const splitVal = boxShadow.replace('inset ', '').split(' ')
            const last = splitVal.length - 1
            const color = splitVal[last]
            for (let i = 0; i < last; i++) {
                vars[i] = parseInt(splitVal[i], 10)
            }

            return {
                color,
                inset,
                vars
            }
        }
    },
    methods: {
        change(key, value, index) {
            if (value === '' || value === undefined || value === null) return
            const vars = this.boxShadow.vars.slice()
            let newVal = value
            if (key === 'vars') {
                vars[index] = value
                newVal = vars
            }
            const boxShadow = {
                ...this.boxShadow,
                [key]: newVal
            }
            this.$emit('change', 'boxShadow', `${boxShadow.inset ? 'inset ' : ''}${vars[0]}px ${vars[1]}px ${vars[2]}px ${vars[3]}px ${boxShadow.color}`)
        }
    },
}
</script>
<style lang="less">
.box-shadow-panel {
    > ul {
        > li {
            padding: 4px;
        }
    }
}
</style>
