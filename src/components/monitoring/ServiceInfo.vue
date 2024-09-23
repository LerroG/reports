<script setup lang="ts">
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

import { IServiceInfo } from '@/types/monitoring.interface'
import Pagination from '../Pagination.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BarChart from './BarChart.vue'

const { t } = useI18n()

const props = defineProps<{ serviceInfo: IServiceInfo[] }>()
const page = ref(1)
const pageSize = ref('5')

const paginatedData = computed(() => {
	const start = (page.value - 1) * Number(pageSize.value)
	const end = start + Number(pageSize.value)
	return props.serviceInfo
		.map(service => ({
			serviceName: service.serviceName,
			taskCount: service.taskCount,
			avgWaitTime: service.avgWaitTime,
			avgAdminTime: service.avgAdminTime
		}))
		.slice(start, end)
})

const tableHeaders = computed(() => [
	t('Service'),
	t('Number of operations'),
	t('Average waiting time'),
	t('Average service time')
])

const labels = computed(() =>
	props.serviceInfo.map(service => service.serviceName)
)

const data = computed(() => props.serviceInfo.map(data => data.taskCount))
</script>

<template>
	<div class="w-full flex max-md:flex-col gap-4 2xl:flex">
		<div
			class="flex flex-col rounded-lg justify-center shadow-md items-center bg-white px-6 pt-4 pb-6 2xl:mb-10 mb-6 w-full 2xl:w-1/2"
		>
			<h2 class="font-bold text-center text-xl mb-6">
				{{ $t('Information on services') }}
			</h2>
			<div class="border rounded-2xl overflow-auto w-full">
				<Table>
					<TableHeader>
						<TableRow class="table_header bg-sky-200 hover:bg-sky-300">
							<TableHead
								class="text-center font-bold text-black max-w-36"
								v-for="item in tableHeaders"
							>
								{{ item }}
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow v-for="(service, idx) in paginatedData" :key="idx">
							<TableCell class="text-center" v-for="item in service">
								{{ item }}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
			<div class="flex justify-center mt-4">
				<Pagination
					:pagination-info="serviceInfo"
					v-model:pagination-page="page"
					v-model:pagination-page-size="pageSize"
				/>
			</div>
		</div>
		<div
			class="flex flex-col rounded-lg justify-center shadow-md items-center bg-white px-6 pt-4 pb-6 mb-10 w-full 2xl:w-1/2"
		>
			<h2 class="font-bold text-center text-xl mb-6">
				{{ $t('Information on services') }}
			</h2>
			<div class="w-full h-full min-h-80">
				<BarChart :labels="labels" :data="data" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.table_header :first-child {
	@apply rounded-tl-lg;
}

.table_header :last-child {
	@apply rounded-tr-lg;
}
</style>
