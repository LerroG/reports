<script setup lang="ts">
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

import { IDeskInfo } from '@/types/monitoring.interface'
import Pagination from '../Pagination.vue'
import { computed, ref } from 'vue'

const props = defineProps<{ deskInfo: IDeskInfo[] }>()
const page = ref(1)
const pageSize = ref('10')

const tableHeaders = computed(() => [
	t('Operator'),
	t('Remote control number'),
	t('Remote control name'),
	t('Service'),
	t('Service group name'),
	t('Ticket number'),
	t('State'),
	t('Duration of the condition')
])

const paginatedData = computed(() => {
	const start = (page.value - 1) * Number(pageSize.value)
	const end = start + Number(pageSize.value)
	return props.deskInfo
		?.map(desk => ({
			clerkName: desk.clerkName,
			deskNumber: desk.deskNumber,
			deskName: desk.deskName,
			currentTaskTicketService: desk.currentTaskTicketService,
			serviceGroupName: desk.serviceGroupName,
			currentTaskTicketNumber: desk.currentTaskTicketNumber,
			currentState: desk.currentState,
			stateTime: desk.stateTime
		}))
		.slice(start, end)
})
</script>

<template>
	<div
		class="flex flex-col rounded-lg justify-center shadow-md items-center bg-white px-6 pt-4 pb-6 mb-10 w-full 2xl:w-9/12"
	>
		<h2 class="font-bold text-center text-xl mb-6">
			{{ $t('Information about remote controls') }}
		</h2>
		<div class="border rounded-2xl overflow-auto w-full">
			<Table>
				<TableHeader>
					<TableRow class="table_header bg-sky-200 hover:bg-sky-300">
						<TableHead
							class="text-center font-bold text-black max-w-44"
							v-for="item in tableHeaders"
						>
							{{ item }}
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow v-for="(desk, idx) in paginatedData" :key="idx">
						<TableCell class="text-center" v-for="item in desk">
							{{ item }}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
		<div
			v-if="deskInfo.length > Number(pageSize)"
			class="flex justify-center mt-4"
		>
			<Pagination
				:pagination-info="deskInfo"
				v-model:pagination-page="page"
				v-model:pagination-page-size="pageSize"
			/>
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
