import Vue from 'vue'

import 'styles/app.less'

import uuid from 'utils/uuid'
import loadLocaleData from 'utils/loadLocaleData'

import ElementUI from 'element'
import VueClipboard from 'vue-clipboard2'

import App from './App.vue'

Vue.use(VueClipboard)

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$uuid = uuid

loadLocaleData(Vue, 'projects').then(() => {
    new Vue({
        render: h => h(App),
    }).$mount('#app')
})
