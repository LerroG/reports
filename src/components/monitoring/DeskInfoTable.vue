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

defineProps<{ deskInfo: IDeskInfo[] }>()
</script>

<template>
	<Table>
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
			<TableRow v-for="desk in deskInfo" :key="desk.deskNumber">
				<TableCell class="text-center" v-for="item in desk">
					{{ item }}
				</TableCell>
			</TableRow>
		</TableBody>
	</Table>
</template>
