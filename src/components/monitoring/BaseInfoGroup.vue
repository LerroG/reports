<script setup lang="ts">
import { IMonitoringInfoResponse } from '@/types/monitoring.interface'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{ cellsInfo?: IMonitoringInfoResponse | null }>()

const cellsInfo = computed(() => [
	{
		title: `${t('Tickets issued')}`,
		value: props.cellsInfo?.givenTickets
	},
	{
		title: `${t('Completed operations')}`,
		value: props.cellsInfo?.servedTaskCount
	},
	{
		title: `${t('Waiting clients')}`,
		value: props.cellsInfo?.waitingClientsCount
	},
	{
		title: `${t('Lost tickets')}`,
		value: props.cellsInfo?.missingClients
	},
	{
		title: `${t('Clients waiting more than 30 min')}`,
		value: props.cellsInfo?.waitingClientsMoreX
	},
	{
		title: `${t('Average waiting time')}`,
		value: props.cellsInfo?.avgWaitTime
	},
	{
		title: `${t('Average service time')}`,
		value: props.cellsInfo?.avgAdminTime
	},
	{
		title: `${t('Service level')}`,
		value: props.cellsInfo?.serviceLevelPerc
	}
])
</script>

<template>
	<div class="flex justify-between gap-2 mb-10">
		<div
			v-for="cell in cellsInfo"
			:key="cell.title"
			class="bg-white rounded-lg shadow-md flex flex-col py-1 px-2 min-h-24"
		>
			<div class="text-center font-bold text-sky-600 text-3xl h-1/2">
				{{ cell.value }}
			</div>
			<div class="text-center leading-5 h-1/2">{{ cell.title }}</div>
		</div>
	</div>
</template>
