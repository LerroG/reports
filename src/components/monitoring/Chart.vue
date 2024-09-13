<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart-donut'
import { IServiceInfoGraph } from '@/types/monitoring.interface'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

defineProps<{ serviceInfoGraph: IServiceInfoGraph[]; mock?: boolean }>()

const serviceTitles = ['Услуга', 'Кол-во билетов', 'Кол-во билетов в процентах']

const data = [
	{
		name: 'Jan',
		total: Math.floor(Math.random() * 2000) + 500,
		predicted: Math.floor(Math.random() * 2000) + 500
	},
	{
		name: 'Feb',
		total: Math.floor(Math.random() * 2000) + 500,
		predicted: Math.floor(Math.random() * 2000) + 500
	},
	{
		name: 'Mar',
		total: Math.floor(Math.random() * 2000) + 500,
		predicted: Math.floor(Math.random() * 2000) + 500
	},
	{
		name: 'Apr',
		total: Math.floor(Math.random() * 2000) + 500,
		predicted: Math.floor(Math.random() * 2000) + 500
	}
]
</script>

<template>
	<div class="flex justify-center">
		<div>
			<div class="font-bold text-center text-xl mb-4">
				Выданные билеты по услугам
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead
							class="text-center max-w-[150px]"
							v-for="item in serviceTitles"
						>
							{{ item }}
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<template v-if="serviceInfoGraph.length">
						<TableRow v-for="(item, idx) in serviceInfoGraph" :key="idx">
							<TableCell class="text-center" v-for="itemInner in item">
								{{ itemInner }}
							</TableCell>
						</TableRow>
					</template>
					<template v-else>
						<TableRow v-for="(_, idx) in 4" :key="idx">
							<TableCell class="text-center" v-for="_ in 3"> Пусто </TableCell>
						</TableRow>
					</template>
				</TableBody>
			</Table>
		</div>
		<div class="chart_pie flex justify-center items-center">
			<DonutChart
				v-if="mock"
				index="name"
				:category="'total'"
				:data="data"
				:type="'pie'"
			/>
			<DonutChart
				v-else
				index="serviceName"
				:category="'taskCount'"
				:data="serviceInfoGraph"
				:type="'pie'"
			/>
		</div>
	</div>
</template>

<style scoped>
.chart_pie > div {
	@apply h-72;
}
</style>
