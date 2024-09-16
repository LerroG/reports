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
	'Состояние',
	'Номер билета',
	'Услуга',
	'Название пульта',
	'Номер пульта',
	'Название группы услуг',
	'Продолжительность состояния'
]
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
			<TableRow v-for="(desk, idx) in paginatedData" :key="idx">
				<TableCell class="text-center" v-for="item in desk">
					{{ item }}
				</TableCell>
			</TableRow>
		</TableBody>
	</Table>
	<div
		v-if="deskInfo.length > Number(pageSize)"
		class="flex justify-center my-4"
	>
		<Pagination
			:pagination-info="deskInfo"
			v-model:pagination-page="page"
			v-model:pagination-page-size="pageSize"
		/>
	</div>
</template>
