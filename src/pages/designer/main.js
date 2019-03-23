import Vue from 'vue'

import 'styles/app.less'

import uuid from 'utils/uuid'
import sleep from 'utils/sleep'
import EventStack from 'utils/EventStack'
import ResizeEvent from 'utils/ResizeEvent'
import loadLocaleData from 'utils/loadLocaleData'

import components from 'components'
import ElementUI from 'element'

import router from './router'
import App from './App.vue'

Vue.use(components)
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$uuid = uuid
Vue.prototype.$sleep = sleep
Vue.prototype.$EventBus = new Vue()
Vue.prototype.$EventStack = new EventStack()
Vue.prototype.$ResizeEvent = new ResizeEvent()

loadLocaleData(Vue, 'designer').then(() => {
    new Vue({
        router,
        render: h => h(App),
    }).$mount('#app')
})
