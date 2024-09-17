<script setup lang="ts">
import { ROUTE_URL } from '@/config/url.config'
import { IMenuItem } from './menu.interface'
import {
	Building,
	Handshake,
	Headset,
	SquareActivity,
	Ticket
} from 'lucide-vue-next'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const routes = computed<IMenuItem[]>(() => [
	{
		icon: SquareActivity,
		link: ROUTE_URL.monitoring(),
		value: `${t('Monitoring')}`
	},
	{
		icon: Headset,
		link: ROUTE_URL.operators(),
		value: `${t('Operator reports')}`
	},
	{
		icon: Handshake,
		link: ROUTE_URL.services(),
		value: `${t('Service reports')}`
	},
	{
		icon: Ticket,
		link: ROUTE_URL.tickets(),
		value: `${t('Ticket reports')}`
	},
	{
		icon: Building,
		link: ROUTE_URL.branches(),
		value: `${t('Branch reports')}`
	}
])
</script>

<template>
	<nav class="flex flex-col w-full space-y-3">
		<RouterLink
			:to="route.link"
			v-for="route in routes"
			:key="route.link"
			class="flex items-center gap-x-3 text-slate-500 font-medium py-2.5 rounded-lg hover:bg-blue-200/20 hover:text-blue-500 hover:drop-shadow-sm bg-transparent transition-all duration-200"
			active-class="active_class"
		>
			<component :is="route.icon" />
			{{ route.value }}
		</RouterLink>
	</nav>
</template>

<style scoped>
.active_class {
	@apply text-blue-500 bg-blue-200/20 hover:bg-blue-200/20 hover:text-blue-500;
}
</style>
