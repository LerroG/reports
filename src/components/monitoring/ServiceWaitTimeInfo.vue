<script setup lang="ts">
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

import { IServiceWaitTimeInfo } from '@/types/monitoring.interface'
import Pagination from '../Pagination.vue'
import { computed, ref } from 'vue'
import InfoCell from './InfoCell.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps<{ serviceWaitTimeInfo?: IServiceWaitTimeInfo }>()
const page = ref(1)
const pageSize = ref('10')

const tableHeaders = computed(() => [
	t('Service'),
	`0 - 15 ${t('Min')}`,
	`0 - 15 ${t('Min %')}`,
	`15 - 30 ${t('Min')}`,
	`15 - 30 ${t('Min %')}`,
	`30 - 45 ${t('Min')}`,
	`30 - 45 ${t('Min %')}`,
	`> 45 ${t('Min')}`,
	`> 45 ${t('Min %')}`,
	t('General'),
	t('General %')
])

const paginatedData = computed(() => {
	const start = (page.value - 1) * Number(pageSize.value)
	const end = start + Number(pageSize.value)
	return props.serviceWaitTimeInfo?.serviceWaitInfo
		.map(service => ({
			serviceName: service.serviceName,
			interval_0_15: service.interval_0_15,
			interval_0_15_percent: service.interval_0_15_percent,
			interval_15_30: service.interval_15_30,
			interval_15_30_percent: service.interval_15_30_percent,
			interval_30_45: service.interval_30_45,
			interval_30_45_percent: service.interval_30_45_percent,
			interval_45: service.interval_45,
			interval_45_percent: service.interval_45_percent,
			total: service.total,
			total_percent: service.total_percent
		}))
		.slice(start, end)
})

const generalData = computed(() => {
	if (props.serviceWaitTimeInfo) {
		const { serviceWaitInfo, ...items } = props.serviceWaitTimeInfo
		return Object.entries(items).map(([_, value], idx) => ({
			title: tableHeaders.value[idx + 1],
			value: value
		}))
	}
})
</script>

<template>
	<div class="mb-10 w-9/12">
		<div class="mb-10">
			<h2 class="font-bold text-center text-xl mb-6">
				{{ $t('General information about remote controls') }}
			</h2>
			<div class="flex gap-3">
				<InfoCell v-for="(info, idx) in generalData" :key="idx" :info="info" />
			</div>
		</div>
		<div
			class="flex flex-col rounded-lg justify-center shadow-md items-center bg-white px-4 pt-4 pb-6 mb-6"
		>
			<h2 class="font-bold text-center text-xl mb-6">
				{{ $t('Waiting time by service') }}
			</h2>
			<div class="border rounded-2xl">
				<Table>
					<TableHeader>
						<TableRow class="table_header bg-sky-200 hover:bg-sky-300">
							<TableHead
								class="text-center font-bold text-black max-w-48"
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
			<div
				v-if="
					serviceWaitTimeInfo &&
					serviceWaitTimeInfo.serviceWaitInfo.length > Number(pageSize)
				"
				class="flex justify-center mt-4"
			>
				<Pagination
					:pagination-info="serviceWaitTimeInfo.serviceWaitInfo"
					v-model:pagination-page="page"
					v-model:pagination-page-size="pageSize"
				/>
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
