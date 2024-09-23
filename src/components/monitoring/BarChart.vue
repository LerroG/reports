<script setup lang="ts">
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ labels: string[]; data: number[] }>()

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const { t } = useI18n()

const chartData = computed(() => ({
	labels: props.labels,
	datasets: [
		{
			barPercentage: 0.7,
			label: t('Number of operations'),
			// data: props.data.length ? props.data : [1, 2, 3, 4],
			data: [1, 3, 4, 2, 1, 3, 4, 2],
			backgroundColor: [
				'rgba(254, 99, 131, 1)', // #fe6383
				'rgba(255, 159, 64, 1)', // #ff9f40
				'rgba(255, 204, 86, 1)', // #ffcc56
				'rgba(74, 192, 192, 1)', // #4ac0c0
				'rgba(54, 162, 235, 1)', // #36a2eb
				'rgba(153, 102, 255, 1)', // #9966ff
				'rgba(68, 75, 207, 1)', // #444bcf
				'rgba(166, 200, 255, 1)', // #a6c8ff
				'rgba(255, 94, 87, 1)', // #ff5e57
				'rgba(255, 179, 179, 1)', // #ffb3b3
				'rgba(255, 223, 110, 1)', // #ffdf6e
				'rgba(107, 227, 224, 1)' // #6be3e0
			]
		}
	]
}))
</script>

<template>
	<Bar
		:data="chartData"
		:options="{ maintainAspectRatio: false, responsive: true }"
	/>
</template>
