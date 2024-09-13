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
</script>

<template>
	<Table class="mb-4">
		<TableHeader>
			<TableRow>
				<TableHead class="text-center"> Оператор </TableHead>
				<TableHead class="text-center">Название пульта</TableHead>
				<TableHead class="text-center">Номер пульта</TableHead>
				<TableHead class="text-center">Номер билета</TableHead>
				<TableHead class="text-center">Название группы услуг</TableHead>
				<TableHead class="text-center">Услуга</TableHead>
				<TableHead class="text-center">Состояние</TableHead>
				<TableHead class="text-center w-[100px]">
					Продолжительность состояния
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
	<div class="flex justify-center">
		<Pagination
			:pagination-info="deskInfo"
			v-model:pagination-page="page"
			v-model:pagination-page-size="pageSize"
			v-if="deskInfo.length > Number(pageSize)"
		/>
	</div>
</template>
