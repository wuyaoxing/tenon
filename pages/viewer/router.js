import Vue from 'vue'
import VueRouter from 'vue-router'
import Viewer from '@/views/viewer/Viewer.vue'
import NotFound from '@/views/404/index.vue'

Vue.use(VueRouter)

const routes = [
    {
        name: 'viewer',
        path: '/projects/:id',
        component: Viewer,
        fields: 'viewer',
    },
    {
        name: '404',
        path: '/404',
        component: NotFound,
        fields: 404,
    },
    {
        path: '*',
        redirect: '404',
    },
]

export default new VueRouter({
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
})
