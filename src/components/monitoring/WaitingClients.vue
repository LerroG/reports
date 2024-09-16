<script setup lang="ts">
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

import { IWaitingClients } from '@/types/monitoring.interface'
import Pagination from '../Pagination.vue'
import { computed, ref } from 'vue'

const props = defineProps<{ waitingClients?: IWaitingClients[] }>()
const page = ref(1)
const pageSize = ref('10')

const tableHeaders = [
	'Услуга',
	'Номер билета',
	'Тип билета',
	'Время прибытия',
	'Время ожидания',
	'Количество вызовов',
	'Доступные пульты'
]

const paginatedData = computed(() => {
	const start = (page.value - 1) * Number(pageSize.value)
	const end = start + Number(pageSize.value)
	return props.waitingClients
		?.map(client => ({
			serviceName: client.serviceName,
			ticketNumber: client.ticketNumber,
			ticketType: client.ticketType,
			arriveTime: client.arriveTime,
			waitingTime: client.waitingTime,
			callsCount: client.callsCount,
			availableDesks: client.availableDesks.join(', ')
		}))
		.slice(start, end)
})
</script>

<template>
	<div>
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
				<template v-if="paginatedData?.length">
					<TableRow v-for="(client, idx) in paginatedData" :key="idx">
						<TableCell
							class="text-center max-w-60 text-wrap"
							v-for="item in client"
						>
							{{ item }}
						</TableCell>
					</TableRow>
				</template>
				<TableRow v-else
					><TableCell colspan="7" class="text-center text-lg">
						Ожидающих клиентов нет
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>

		<div
			v-if="waitingClients && waitingClients.length > Number(pageSize)"
			class="flex justify-center my-4"
		>
			<Pagination
				:pagination-info="waitingClients"
				v-model:pagination-page="page"
				v-model:pagination-page-size="pageSize"
			/>
		</div>
	</div>
</template>
