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
	<div>
		<div class="border rounded-2xl mb-6">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead
							class="text-center max-w-[100px]"
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

			<div
				v-if="
					serviceWaitTimeInfo &&
					serviceWaitTimeInfo.serviceWaitInfo.length > Number(pageSize)
				"
				class="flex justify-center my-4"
			>
				<Pagination
					:pagination-info="serviceWaitTimeInfo.serviceWaitInfo"
					v-model:pagination-page="page"
					v-model:pagination-page-size="pageSize"
				/>
			</div>
		</div>
		<h2 class="font-bold text-center text-xl mb-6">
			{{ $t('General information about remote controls') }}
		</h2>
		<div class="grid grid-cols-9 gap-4">
			<InfoCell v-for="(info, idx) in generalData" :key="idx" :info="info" />
		</div>
	</div>
</template>
