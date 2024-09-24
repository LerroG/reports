import { createRouter, createWebHistory } from 'vue-router'
import { loadLayoutMiddleware } from '@/router/middleware/loadLayout.middleware'
import { RouteNamesEnum } from '@/router/router.types'
import { AppLayoutsEnum } from '@/layouts/layouts.types'
import type { RouteLocationNormalized } from 'vue-router'
import { ROUTE_URL } from '@/config/url.config'
import i18n from '@/lib/i18n'
import { watch } from 'vue'

const routes = [
	{
		path: '/',
		name: RouteNamesEnum.home,
		component: () => import('@/pages/home.vue'),
		meta: { requiresAuth: true, titleKey: 'Home' }
	},
	{
		path: '/monitoring',
		name: RouteNamesEnum.monitoring,
		component: () => import('@/pages/monitoring.vue'),
		meta: { requiresAuth: true, titleKey: 'Monitoring' }
	},
	{
		path: '/operators',
		name: RouteNamesEnum.operators,
		component: () => import('@/pages/operators.vue'),
		meta: { requiresAuth: true, titleKey: 'Operator reports' }
	},
	{
		path: '/services',
		name: RouteNamesEnum.services,
		component: () => import('@/pages/services.vue'),
		meta: { requiresAuth: true, titleKey: 'Service reports' }
	},
	{
		path: '/tickets',
		name: RouteNamesEnum.tickets,
		component: () => import('@/pages/tickets.vue'),
		meta: { requiresAuth: true, titleKey: 'Ticket reports' }
	},
	{
		path: '/branches',
		name: RouteNamesEnum.branches,
		component: () => import('@/pages/branches.vue'),
		meta: { requiresAuth: true, titleKey: 'Branch reports' }
	},
	{
		path: '/auth',
		name: RouteNamesEnum.auth,
		component: () => import('@/pages/auth.vue'),
		meta: {
			layout: AppLayoutsEnum.auth,
			titleKey: 'Entrance'
		}
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach(loadLayoutMiddleware)

router.beforeEach(to => {
	const titleKey = to.meta.titleKey as string
	document.title = i18n.global.t(titleKey)
})
router.beforeEach((to, _, next) => {
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

router.afterEach(() => {
	window.scrollTo(0, 0)
})

const setTitle = (route: RouteLocationNormalized) => {
	const titleKey = route.meta.titleKey as string
	document.title = i18n.global.t(titleKey)
}

watch(
	() => i18n.global.locale,
	() => {
		const currentRoute = router.currentRoute.value
		setTitle(currentRoute)
	}
)

export default router
