<template>
  <div class="code">
    <!-- codemirror -->
    <codemirror v-model="code"
                :options="cmOption"></codemirror>
  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror'

import 'codemirror/lib/codemirror.css'
// language
import 'codemirror/mode/css/css.js'
// theme css
import 'codemirror/theme/darcula.css'
// require active-line.js
import 'codemirror/addon/selection/active-line.js'

export default {
    props: {
        value: String
    },
    components: {
        codemirror
    },
    data() {
        return {
            cmOption: {
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                line: true,
                mode: 'text/css',
                theme: 'darcula'
            }
        }
    },
    computed: {
        code: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('update:value', val)
            }
        }
    }
}
</script>
