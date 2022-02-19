import Vue from 'vue'
import VueRouter from 'vue-router'
import Designer from '@/views/designer/Designer.vue'
import TreeContainer from '@/views/designer/layout/tree/TreeContainer.vue'
import ComponentsContainer from '@/views/designer/layout/components/ComponentsContainer.vue'
import PropertiesContainer from '@/views/designer/layout/properties/PropertiesContainer.vue'
import NotFound from '@/views/404/index.vue'

Vue.use(VueRouter)

export const sideRouter = [
    {
        name: 'tree',
        path: 'tree',
        component: TreeContainer,
        fields: 'tree',
        icon: 'icon-tree',
    },
    {
        name: 'components',
        path: 'components',
        component: ComponentsContainer,
        fields: 'components',
        icon: 'icon-components',
    },
    {
        name: 'properties',
        path: 'properties',
        component:PropertiesContainer,
        fields: 'properties',
        icon: 'icon-edit',
    },
]

const routes = [
    {
        name: 'designer',
        path: '/projects/:id',
        redirect: { name: 'components' },
        component: Designer,
        fields: 'designer',
        children: sideRouter,
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
