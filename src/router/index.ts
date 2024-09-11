import { createRouter, createWebHistory } from 'vue-router'
import { loadLayoutMiddleware } from '@/router/middleware/loadLayout.middleware'
import { RouteNamesEnum } from '@/router/router.types'
import { AppLayoutsEnum } from '@/layouts/layouts.types'

const routes = [
	{
		path: '/',
		name: RouteNamesEnum.home,
		component: () => import('@/pages/home.vue')
	},
	{
		path: '/monitoring',
		name: RouteNamesEnum.monitoring,
		component: () => import('@/pages/monitoring.vue')
	},
	{
		path: '/operators',
		name: RouteNamesEnum.operators,
		component: () => import('@/pages/operators.vue')
	},
	{
		path: '/services',
		name: RouteNamesEnum.services,
		component: () => import('@/pages/services.vue')
	},
	{
		path: '/tickets',
		name: RouteNamesEnum.tickets,
		component: () => import('@/pages/tickets.vue')
	},
	{
		path: '/branches',
		name: RouteNamesEnum.branches,
		component: () => import('@/pages/branches.vue')
	},
	{
		path: '/auth',
		name: RouteNamesEnum.auth,
		component: () => import('@/pages/auth.vue'),
		meta: {
			layout: AppLayoutsEnum.auth
		}
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach(loadLayoutMiddleware)

export default router
