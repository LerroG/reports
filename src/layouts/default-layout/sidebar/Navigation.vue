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
	<nav class="flex flex-col w-full space-y-2 mt-6">
		<RouterLink
			:to="route.link"
			v-for="route in routes"
			:key="route.link"
			class="flex items-center overflow-hidden text-slate-500 font-medium max-sm:text-xl gap-x-2 py-2.5 rounded-lg hover:bg-sky-200/20 hover:text-sky-500 hover:drop-shadow-sm bg-transparent transition-all duration-200"
			active-class="active_class"
		>
			<component :is="route.icon" />
			<span>{{ route.value }}</span>
		</RouterLink>
	</nav>
</template>

<style scoped>
.active_class {
	@apply text-sky-500 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-500;
}
</style>
