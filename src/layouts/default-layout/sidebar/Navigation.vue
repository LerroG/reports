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

const routes: IMenuItem[] = [
	{
		icon: SquareActivity,
		link: ROUTE_URL.monitoring(),
		value: 'Мониторинг'
	},
	{
		icon: Headset,
		link: ROUTE_URL.operators(),
		value: 'Отчеты по операторам'
	},
	{
		icon: Handshake,
		link: ROUTE_URL.services(),
		value: 'Отчеты по услугам'
	},
	{
		icon: Ticket,
		link: ROUTE_URL.tickets(),
		value: 'Отчеты по билетам'
	},
	{
		icon: Building,
		link: ROUTE_URL.branches(),
		value: 'Отчеты по филиалам'
	}
]
</script>

<template>
	<nav class="flex flex-col w-full space-y-3">
		<RouterLink
			:to="route.link"
			v-for="route in routes"
			:key="route.link"
			active-class="text-blue-500 bg-blue-200/20 hover:bg-blue-200/20 hover:text-blue-500"
			class="flex items-center gap-x-3 text-slate-500 font-medium py-2.5 rounded-lg hover:bg-blue-200/20 hover:text-blue-500 hover:drop-shadow-sm bg-transparent transition-all duration-200"
		>
			<component :is="route.icon" />
			{{ route.value }}
		</RouterLink>
	</nav>
</template>
