import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const AsyncComp = pagePath => () => import(`views/${pagePath}`)

const routes = [
    {
        name: 'viewer',
        path: '/projects/:id',
        component: AsyncComp('viewer/Viewer'),
        fields: 'viewer',
    },
    {
        name: '404',
        path: '/404',
        component: AsyncComp('404'),
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
