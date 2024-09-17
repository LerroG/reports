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

const { t } = useI18n()

const props = defineProps<{ serviceInfo: IServiceInfo[] }>()
const page = ref(1)
const pageSize = ref('10')

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
</script>

<template>
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
		v-if="serviceInfo.length > Number(pageSize)"
		class="flex justify-center my-4"
	>
		<Pagination
			:pagination-info="serviceInfo"
			v-model:pagination-page="page"
			v-model:pagination-page-size="pageSize"
		/>
	</div>
</template>
