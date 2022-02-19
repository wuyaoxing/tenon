<template>
    <div class="properties-cssunit f f-ai-c f-fw-w"
         :class="{pointerEvents: schema.readonly}">
        <span class="properties-cssunit-title f-fs-0"
              v-if="title">{{title}}</span>
        <div class="properties-cssunit-line f-fb-percent-100 f">
            <InputText class="properties-cssunit-input"
                       type="number"
                       :value="cssunit.value"
                       size="mini"
                       controls-position="right"
                       :placeholder="placeholder"
                       :min="schema.minimum"
                       :max="schema.maximum"
                       @input="val => change('value', val)" />
            <Select class="properties-cssunit-unit f-fs-0"
                    :value="cssunit.unit"
                    size="mini"
                    @change="val => change('unit', val)"
                    v-if="hasEnum">
                <Option v-for="item in schema.enum"
                        :value="item.value"
                        :key="item.value">
                    {{item.text}}
                </Option>
            </Select>
        </div>
    </div>
</template>
<script>
export default {
    name: 'properties-cssunit',
    props: {
        title: String,
        placeholder: String
    },
    computed: {
        hasEnum() {
            return !!this.schema.enum
        },
        cssunit() {
            const result = {
                value: 0,
                unit: 'px'
            }
            if (!this.value) return result
            const currentValue = String(this.value)
            result.value = Number(currentValue.replace(/[a-z|A-Z|%]+$/gi, ''))
            if (this.hasEnum) result.unit = currentValue.replace(/[-+]?[0-9]*\.?[0-9]+/gi, '')
            return result
        }
    },
    methods: {
        change(key, val) {
            const numValue = key === 'value' ? val : this.cssunit.value
            const value = key === 'value' ? `${numValue}${this.cssunit.unit}` : `${numValue}${val}`
            this.$emit('change', this.hasEnum ? value : numValue)
        }
    }
}
</script>

<style lang="less">
.properties-cssunit {
    &-title {
        height: 25px;
        line-height: 1;
    }
    &-line {
        border: 1px solid @primary-border-color;
        border-radius: 3px;
        overflow: hidden;
    }
    &-input {
        width: auto;
        border-color: transparent;
        border-radius: 0;
    }
    &-unit {
        width: 45px;
        &.el-select {
            .el-input {
                &__suffix {
                    right: 0;
                    transform: scale(0.8);
                }
            }
        }
    }
}
</style>
