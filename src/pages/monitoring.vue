<script setup lang="ts">
import BranchesSelect from '@/components/monitoring/BranchesSelect.vue'
import { IBranch } from '@/types/branches.interface'
import { computed, ref, watch } from 'vue'
import Heading from '@/components/Heading.vue'
import { useGetBranches } from '@/queries/branches/useGetBranches'
import { useRoute, useRouter } from 'vue-router'
import { RouteNamesEnum } from '@/router/router.types'
import { useGetMonitoringInfo } from '@/queries/monitoring/useGetMonitoringInfo'
import DeskInfoTable from '@/components/monitoring/DeskInfoTable.vue'
import { useQueryClient } from '@tanstack/vue-query'
import ServiceInfo from '@/components/monitoring/ServiceInfo.vue'
import Chart from '@/components/monitoring/Chart.vue'
import ServiceWaitTimeInfo from '@/components/monitoring/ServiceWaitTimeInfo.vue'
import WaitingClients from '@/components/monitoring/WaitingClients.vue'
import { debounce } from 'lodash'
import { VueSpinner } from 'vue3-spinners'
import BaseInfoGroup from '@/components/monitoring/BaseInfoGroup.vue'

const router = useRouter()
const route = useRoute()
const queryClient = useQueryClient()
const hasFetched = ref(false)
const loading = ref(false)
const selectedBranches = ref<IBranch[]>()
const { branchesList, isBranchesListSuccess } = useGetBranches()
const { monitoringInfo, refetchMonitoringInfo, isMonitoringInfoPending } =
	useGetMonitoringInfo()

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
	<div class="pt-3 px-3 sm:px-6">
		<!-- Select -->
		<div class="max-w-96 mb-6">
			<BranchesSelect
				:branches-group="branchesList || []"
				v-model="selectedBranches"
			/>
		</div>
		<!-- Select -->
		<Heading class="mb-6" :title="$t('Monitoring')" />

		<!-- If not selectedBranches -->
		<h1 class="font-bold text-xl text-center" v-if="!selectedBranches?.length">
			{{ $t('Select branches to display information') }}
		</h1>
		<!-- If not selectedBranches -->

		<!-- Loading -->
		<div
			class="flex justify-center mt-20"
			v-else-if="loading || isMonitoringInfoPending"
		>
			<VueSpinner size="50" color="#3b82f6" />
		</div>
		<!-- Loading -->

		<div v-else class="flex flex-col items-center">
			<!-- Cells -->
			<BaseInfoGroup :cells-info="monitoringInfo" />
			<!-- Cells -->

			<!-- ServiceInfo -->
			<ServiceInfo :serviceInfo="monitoringInfo?.serviceInfo || []" />
			<!-- ServiceInfo -->

			<!-- Chart -->
			<Chart :service-info-graph="monitoringInfo?.serviceInfoGraph || []" />
			<!-- Chart -->

			<!-- WaitingClients -->
			<WaitingClients :waitingClients="monitoringInfo?.waitingClients || []" />
			<!-- WaitingClients -->

			<!-- DeskInfo -->
			<DeskInfoTable :deskInfo="monitoringInfo?.deskInfo || []" />
			<!-- DeskInfo -->

			<!-- ServiceWaitTimeInfo -->
			<ServiceWaitTimeInfo
				:serviceWaitTimeInfo="monitoringInfo?.serviceWaitTimeInfo"
			/>
			<!-- ServiceWaitTimeInfo -->
		</div>
	</div>
</template>
