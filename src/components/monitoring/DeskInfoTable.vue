<script setup lang="ts">
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

import { IDeskInfo } from '@/types/monitoring.interface'
import Pagination from '../Pagination.vue'
import { computed, ref } from 'vue'

const props = defineProps<{ deskInfo: IDeskInfo[] }>()
const page = ref(1)
const pageSize = ref('10')

const paginatedData = computed(() => {
	const start = (page.value - 1) * Number(pageSize.value)
	const end = start + Number(pageSize.value)
	return props.deskInfo.slice(start, end)
})

const tableHeaders = [
	'Оператор',
	'Название пульта',
	'Номер пульта',
	'Номер билета',
	'Название группы услуг',
	'Услуга',
	'Состояние',
	'Продолжительность состояния'
]
</script>

<template>
	<Table class="mb-4">
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
			<template v-if="deskInfo.length">
				<TableRow v-for="(desk, idx) in paginatedData" :key="idx">
					<TableCell class="text-center" v-for="item in desk">
						{{ item }}
					</TableCell>
				</TableRow>
			</template>
			<template v-else>
				<TableRow v-for="(_, idx) in 10" :key="idx">
					<TableCell class="text-center" v-for="_ in 8"> Пусто </TableCell>
				</TableRow>
			</template>
		</TableBody>
	</Table>
	<div class="flex justify-center">
		<Pagination
			:pagination-info="deskInfo"
			v-model:pagination-page="page"
			v-model:pagination-page-size="pageSize"
			v-if="deskInfo.length > Number(pageSize) || deskInfo.length === 0"
		/>
	</div>
</template>
