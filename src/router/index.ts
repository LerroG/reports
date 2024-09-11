import { createRouter, createWebHistory } from 'vue-router'
import { loadLayoutMiddleware } from '@/router/middleware/loadLayout.middleware'
import { RouteNamesEnum } from '@/router/router.types'
import { AppLayoutsEnum } from '@/layouts/layouts.types'
import { ROUTE_URL } from '@/config/url.config'

const routes = [
	{
		path: '/',
		name: RouteNamesEnum.home,
		component: () => import('@/pages/home.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/monitoring',
		name: RouteNamesEnum.monitoring,
		component: () => import('@/pages/monitoring.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/operators',
		name: RouteNamesEnum.operators,
		component: () => import('@/pages/operators.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/services',
		name: RouteNamesEnum.services,
		component: () => import('@/pages/services.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/tickets',
		name: RouteNamesEnum.tickets,
		component: () => import('@/pages/tickets.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/branches',
		name: RouteNamesEnum.branches,
		component: () => import('@/pages/branches.vue'),
		meta: { requiresAuth: true }
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
router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('token')

	// Если маршрут требует аутентификации
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (token) {
			next() // Пропустить, если токен есть
		} else {
			next(ROUTE_URL.auth()) // Перенаправить на страницу логина
		}
	} else {
		next() // Пропустить, если маршрут не требует аутентификации
	}
})

export default router
