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
import { computed } from 'vue'

const props = defineProps<{
	serviceInfoGraph: IServiceInfoGraph[]
}>()

const serviceTitles = ['Услуга', 'Кол-во билетов', 'Кол-во билетов в процентах']

const formetedData = computed(() =>
	props.serviceInfoGraph.map(service => ({
		name: service.serviceName,
		taskCount: service.taskCount > 0 ? service.taskCount : 10,
		taskCountPercent: service.taskCountPercent
	}))
)
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
					<TableRow v-for="(item, idx) in serviceInfoGraph" :key="idx">
						<TableCell class="text-center" v-for="itemInner in item">
							{{ itemInner }}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
		<div class="chart_pie flex justify-center items-center">
			<DonutChart
				index="name"
				:category="'taskCount'"
				:data="formetedData"
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
