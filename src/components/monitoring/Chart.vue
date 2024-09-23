<script setup lang="ts">
import { IServiceInfoGraph } from '@/types/monitoring.interface'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PieChart from './PieChart.vue'
import Pagination from '../Pagination.vue'

const { t } = useI18n()
const props = defineProps<{
	serviceInfoGraph: IServiceInfoGraph[]
}>()

const page = ref(1)
const pageSize = ref('5')

const paginatedData = computed(() => {
	const start = (page.value - 1) * Number(pageSize.value)
	const end = start + Number(pageSize.value)
	return props.serviceInfoGraph
		?.map(serviceInfo => ({
			serviceName: serviceInfo.serviceName,
			taskCount: serviceInfo.taskCount,
			taskCountPercent: serviceInfo.taskCountPercent
		}))
		.slice(start, end)
})

const serviceTitles = computed(() => [
	t('Service'),
	t('Number of tickets'),
	t('Number of tickets in percent')
])
const labels = computed(() =>
	props.serviceInfoGraph.map(service => service.serviceName)
)
const data = computed(() => props.serviceInfoGraph.map(data => data.taskCount))
</script>

<template>
	<div class="w-full flex max-md:flex-col gap-4 2xl:flex">
		<div
			class="flex flex-col rounded-lg justify-center shadow-md items-center bg-white px-6 pt-4 pb-6 2xl:mb-10 mb-6 w-full 2xl:w-1/2"
		>
			<h2 class="font-bold text-center text-xl mb-6">
				{{ $t('Tickets issued by service') }}
			</h2>
			<div class="border rounded-2xl overflow-auto w-full">
				<Table>
					<TableHeader>
						<TableRow class="table_header bg-sky-200 hover:bg-sky-300">
							<TableHead
								class="text-center font-bold text-black max-w-36"
								v-for="item in serviceTitles"
							>
								{{ item }}
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow v-for="(item, idx) in paginatedData" :key="idx">
							<TableCell class="text-center" v-for="itemInner in item">
								{{ itemInner }}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
			<div
				v-if="serviceInfoGraph.length > Number(pageSize)"
				class="flex justify-center mt-4"
			>
				<Pagination
					:pagination-info="serviceInfoGraph"
					v-model:pagination-page="page"
					v-model:pagination-page-size="pageSize"
				/>
			</div>
		</div>
		<div
			class="flex flex-col rounded-lg justify-center shadow-md items-center bg-white px-6 pt-4 pb-6 mb-10 w-full 2xl:w-1/2"
		>
			<h2 class="font-bold text-center text-xl mb-6">
				{{ $t('Tickets issued by service') }}
			</h2>
			<div class="w-full h-full">
				<PieChart :labels="labels" :data="data" />
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
