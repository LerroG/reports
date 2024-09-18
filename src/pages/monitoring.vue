<script setup lang="ts">
import BranchesSelect from '@/components/monitoring/BranchesSelect.vue'
import { IBranch } from '@/types/branches.interface'
import { computed, ref, watch } from 'vue'
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
import ServiceWaitTimeInfo from '@/components/monitoring/ServiceWaitTimeInfo.vue'
import WaitingClients from '@/components/monitoring/WaitingClients.vue'
import { debounce } from 'lodash'
import { VueSpinner } from 'vue3-spinners'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()
const route = useRoute()
const queryClient = useQueryClient()
const hasFetched = ref(false)
const loading = ref(false)
const selectedBranches = ref<IBranch[]>()
const { branchesList, isBranchesListSuccess } = useGetBranches()
const { monitoringInfo, refetchMonitoringInfo, isMonitoringInfoPending } =
	useGetMonitoringInfo()

const cellsInfo = computed(() => [
	{
		title: `${t('Tickets issued')}`,
		value: monitoringInfo.value?.givenTickets
	},
	{
		title: `${t('Completed operations')}`,
		value: monitoringInfo.value?.servedTaskCount
	},
	{
		title: `${t('Lost tickets')}`,
		value: monitoringInfo.value?.missingClients
	},
	{
		title: `${t('Waiting clients')}`,
		value: monitoringInfo.value?.waitingClientsCount
	},
	{
		title: `${t('Average waiting time')}`,
		value: monitoringInfo.value?.avgWaitTime
	},
	{
		title: `${t('Average service time')}`,
		value: monitoringInfo.value?.avgAdminTime
	},
	{
		title: `${t('Clients waiting more than 30 min')}`,
		value: monitoringInfo.value?.waitingClientsMoreX
	},
	{
		title: `${t('Service level (%)')}`,
		value: monitoringInfo.value?.serviceLevelPerc
	}
])

// Methods
// Установка в селект данных если есть ID в роуте
const setSelectedBranches = (query: string) => {
	const ids = query.split(',').map(id => parseInt(id))
	const result = branchesList.value?.flatMap(group =>
		group.branches.filter(branch => ids.includes(branch.BranchId))
	)
	selectedBranches.value = result
}

const branchIds = computed(
	() => selectedBranches.value?.map(branch => branch.BranchId) || []
)

const refetchData = debounce(() => {
	refetchMonitoringInfo().finally(() => {
		loading.value = false
	})
}, 500)

watch(isBranchesListSuccess, () => {
	const queryParams = (route.query.branchIds as string) || ''
	if (!hasFetched.value && queryParams) setSelectedBranches(queryParams)
	hasFetched.value = true
})

watch(selectedBranches, async () => {
	loading.value = true
	await router
		.replace({
			name: RouteNamesEnum.monitoring,
			query: selectedBranches.value?.length
				? { branchIds: branchIds?.value.toString() }
				: {}
		})
		.then(() => {
			if (selectedBranches.value) {
				refetchData()
			}

			if (!selectedBranches.value?.length)
				queryClient.removeQueries({
					queryKey: ['get monitoring info'],
					exact: true
				})
		})
})
</script>

<template>
	<div class="pt-3 px-6">
		<Heading :title="$t('Monitoring')" />
		<!-- Select -->
		<div class="mb-6 max-w-80">
			<BranchesSelect
				:branches-group="branchesList || []"
				v-model="selectedBranches"
			/>
		</div>
		<!-- Select -->

		<!-- If not selectedBranches -->
		<h1 class="font-bold text-xl text-center" v-if="!selectedBranches?.length">
			{{ $t('Select branches to display information') }}
		</h1>
		<!-- If not selectedBranches -->

		<!-- If not selectedBranches -->
		<div
			class="flex justify-center mt-20"
			v-else-if="loading || isMonitoringInfoPending"
		>
			<VueSpinner size="50" color="#3b82f6" />
		</div>
		<!-- If not selectedBranches -->

		<div v-else>
			<div class="flex mb-8 w-full">
				<!-- Cells -->
				<div class="w-1/2">
					<div class="grid grid-cols-3 gap-4">
						<InfoCell
							v-for="cellInfo in cellsInfo"
							:key="cellInfo.title"
							:info="cellInfo"
						/>
					</div>
					<!-- Cells -->
				</div>
				<!-- Chart -->
				<div class="w-1/2">
					<Chart :service-info-graph="monitoringInfo?.serviceInfoGraph || []" />
				</div>
				<!-- Chart -->
			</div>

			<!-- DeskInfo -->
			<h2 class="font-bold text-center text-xl mb-6">
				{{ $t('Information about remote controls') }}
			</h2>
			<div class="mb-10 border rounded-2xl">
				<DeskInfoTable :deskInfo="monitoringInfo?.deskInfo || []" />
			</div>
			<!-- DeskInfo -->

			<!-- ServiceInfo -->
			<h2 class="font-bold text-center text-xl mb-6">
				{{ $t('Information on services') }}
			</h2>
			<div class="mb-10 border rounded-2xl">
				<ServiceInfo :serviceInfo="monitoringInfo?.serviceInfo || []" />
			</div>
			<!-- ServiceInfo -->

			<!-- ServiceWaitTimeInfo -->
			<h2 class="font-bold text-center text-xl mb-6">
				{{ $t('Waiting time by service') }}
			</h2>
			<div class="mb-10">
				<ServiceWaitTimeInfo
					:serviceWaitTimeInfo="monitoringInfo?.serviceWaitTimeInfo"
				/>
			</div>
			<!-- ServiceWaitTimeInfo -->

			<!-- WaitingClients -->
			<h2 class="font-bold text-center text-xl mb-6">
				{{ $t('Waiting clients') }}
			</h2>
			<div class="mb-10 border rounded-2xl">
				<WaitingClients :waitingClients="monitoringInfo?.waitingClients || []" />
			</div>
			<!-- WaitingClients -->
		</div>
	</div>
</template>
