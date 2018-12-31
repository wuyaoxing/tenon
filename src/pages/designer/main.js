import Vue from 'vue'

import 'styles/app.less'

import uuid from 'utils/uuid'
import components from 'components'
import ElementUI from 'element'
import router from './router'
import App from './App.vue'

Vue.use(components)
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$uuid = uuid

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
