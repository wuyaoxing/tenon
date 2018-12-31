import Vue from 'vue'

import 'styles/app.less'

import uuid from 'utils/uuid'

import ElementUI from 'element'

import App from './App.vue'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$uuid = uuid

new Vue({
    render: h => h(App),
}).$mount('#app')
