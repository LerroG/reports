<script setup lang="ts">
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
import { useI18n } from 'vue-i18n'
import PieChart from './PieChart.vue'

const { t } = useI18n()
const props = defineProps<{
	serviceInfoGraph: IServiceInfoGraph[]
}>()

const serviceTitles = computed(() => [
	t('Service'),
	t('Number of tickets'),
	t('Number of tickets in percent')
])
const labels = computed(() =>
	props.serviceInfoGraph.map(service => service.serviceName)
)
const data = computed(() => props.serviceInfoGraph.map(data => data.taskCount))
</script>

<template>
	<div class="w-1/2 bg-white rounded-lg shadow-md py-4 flex items-center mb-10">
		<div class="w-7/12 flex flex-col items-center justify-center">
			<div class="font-bold text-center text-xl mb-6">
				{{ $t('Tickets issued by service') }}
			</div>
			<div class="rounded-xl border">
				<Table>
					<TableHeader>
						<TableRow class="table_header bg-sky-200 hover:bg-sky-300">
							<TableHead
								class="text-center font-bold text-black max-w-36"
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
		</div>
		<div class="flex justify-center items-center w-5/12 h-5/6">
			<PieChart :labels="labels" :data="data" />
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
