<script setup lang="ts">
import BranchesSelect from '@/components/monitoring/BranchesSelect.vue'
import { IBranch } from '@/types/branches.interface'
import { computed, ref, watch, watchEffect } from 'vue'
import Heading from '@/components/Heading.vue'
import { useGetBranches } from '@/queries/branches/useGetBranches'
import { useRoute, useRouter } from 'vue-router'
import { RouteNamesEnum } from '@/router/router.types'
import { useGetMonitoringInfo } from '@/queries/monitoring/useGetMonitoringInfo'
import InfoCell from '@/components/monitoring/InfoCell.vue'
import DeskInfoTable from '@/components/monitoring/DeskInfoTable.vue'
import { useQueryClient } from '@tanstack/vue-query'
import ServiceInfo from '@/components/monitoring/ServiceInfo.vue'
import Chart from '@/components/monitoring/Chart.vue'

const router = useRouter()
const route = useRoute()
const queryClient = useQueryClient()
const hasFetched = ref(0)
const selectedBranches = ref<IBranch[]>()
const { branchesList } = useGetBranches()
const { monitoringInfo, refetchMonitoringInfo } = useGetMonitoringInfo()
const cellsInfo = computed(() => [
	{
		title: 'Выдано билетов',
		value: monitoringInfo.value?.givenTickets
	},
	{
		title: 'Завершено операций',
		value: monitoringInfo.value?.servedTaskCount
	},
	{
		title: 'Потеряно билетов',
		value: monitoringInfo.value?.missingClients
	},
	{
		title: 'Ожидающих клиентов ',
		value: monitoringInfo.value?.waitingClientsCount
	},
	{
		title: 'Среднее время ожидания',
		value: monitoringInfo.value?.avgWaitTime
	},
	{
		title: 'Среднее время обслуживания',
		value: monitoringInfo.value?.avgAdminTime
	},
	{
		title: 'Клиентов ожидающих более 30 мин.',
		value: monitoringInfo.value?.waitingClientsMoreX
	},
	{
		title: 'Уровень обслуживания (%)',
		value: monitoringInfo.value?.serviceLevelPerc
	}
])
const cellsInfoEmpty = cellsInfo.value.map(item => ({
	title: item.title,
	value: 'Пусто'
}))

// Methods
// Установка в селект данных если есть ID в роуте
const setSelectedBranches = () => {
	if (!route.query.branchIds) return
	const ids = (route.query.branchIds as string)
		.split(',')
		.map(id => parseInt(id))
	const result = branchesList.value?.flatMap(group =>
		group.branches.filter(branch => ids.includes(branch.BranchId))
	)
	selectedBranches.value = result
	return result
}

const branchIds = computed(
	() => selectedBranches.value?.map(branch => branch.BranchId) || []
)

watchEffect(() => {
	if (hasFetched.value < 2 && route.query.branchIds) setSelectedBranches()
	hasFetched.value++
})

watch(selectedBranches, async () => {
	await router.replace({
		name: RouteNamesEnum.monitoring,
		query: selectedBranches.value?.length
			? { branchIds: branchIds?.value.toString() }
			: {}
	})

	if (!selectedBranches.value?.length)
		queryClient.removeQueries({
			queryKey: ['get monitoring info'],
			exact: true
		})

	refetchMonitoringInfo()
})
</script>

<template>
	<div class="pt-3 px-6">
		<Heading title="Мониторинг" />
		<div>
			<!-- Select -->
			<div class="mb-6 max-w-80">
				<BranchesSelect
					:branches-group="branchesList || []"
					v-model="selectedBranches"
				/>
			</div>
			<!-- Select -->

			<div class="flex mb-8 w-full">
				<!-- Cells -->
				<div class="w-1/2">
					<div class="grid grid-cols-3 gap-4" v-if="monitoringInfo?.Code === 0">
						<InfoCell
							v-for="cellInfo in cellsInfo"
							:key="cellInfo.title"
							:info="cellInfo"
						/>
					</div>
					<div class="grid grid-cols-3 gap-4" v-else>
						<InfoCell
							v-for="cellInfo in cellsInfoEmpty"
							:key="cellInfo.title"
							:info="cellInfo"
						/>
					</div>
					<!-- Cells -->
				</div>
				<!-- Chart -->
				<div class="w-1/2">
					<!-- <Chart
							v-if="monitoringInfo?.Code === 0"
							:service-info-graph="monitoringInfo?.serviceInfoGraph || []"
						/> -->
					<Chart
						:mock="true"
						:service-info-graph="monitoringInfo?.serviceInfoGraph || []"
					/>
				</div>
				<!-- Chart -->
			</div>

			<!-- DeskInfo -->
			<h2 class="font-bold text-center text-xl mb-6">Информация о пультах</h2>
			<div class="mb-10 border rounded-2xl">
				<DeskInfoTable
					:deskInfo="monitoringInfo?.deskInfo || []"
					v-if="monitoringInfo?.Code === 0"
				/>
				<DeskInfoTable :deskInfo="monitoringInfo?.deskInfo || []" v-else />
			</div>
			<!-- DeskInfo -->

			<!-- ServiceInfo -->
			<h2 class="font-bold text-center text-xl mb-6">Информация по услугам</h2>
			<div class="mb-10 border rounded-2xl">
				<ServiceInfo :serviceInfo="monitoringInfo?.serviceInfo || []" />
			</div>
			<!-- ServiceInfo -->
		</div>
	</div>
</template>
