import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const AsyncComp = pagePath => () => import(`views/${pagePath}`)

export const sideRouter = [
    {
        name: 'tree',
        path: 'tree',
        component: AsyncComp('designer/layout/tree/TreeContainer'),
        fields: 'tree',
        icon: 'icon-tree',
    },
    {
        name: 'components',
        path: 'components',
        component: AsyncComp('designer/layout/components/ComponentsContainer'),
        fields: 'components',
        icon: 'icon-components',
    },
    {
        name: 'properties',
        path: 'properties',
        component: AsyncComp('designer/layout/properties/PropertiesContainer'),
        fields: 'properties',
        icon: 'icon-edit',
    },
]

const routes = [
    {
        name: 'designer',
        path: '/projects/:id',
        redirect: { name: 'components' },
        component: AsyncComp('designer/Designer'),
        fields: 'designer',
        children: sideRouter,
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
