<script setup lang="ts">
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	CategoryScale,
	LinearScale,
	ArcElement
} from 'chart.js'
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ labels: string[]; data: number[] }>()

ChartJS.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip)
const { t } = useI18n()
const chartData = computed(() => ({
	labels: props.labels,
	datasets: [
		{
			label: t('Number of tickets'),
			// data: props.data,
			data: [1, 3, 4, 2],
			backgroundColor: [
				'rgba(255, 99, 132)',
				'rgba(255, 159, 64)',
				'rgba(255, 205, 86)',
				'rgba(75, 192, 192)',
				'rgba(54, 162, 235)',
				'rgba(153, 102, 255)',
				'rgba(201, 203, 207)'
			],
			borderColor: [
				'rgb(255, 99, 132)',
				'rgb(255, 159, 64)',
				'rgb(255, 205, 86)',
				'rgb(75, 192, 192)',
				'rgb(54, 162, 235)',
				'rgb(153, 102, 255)',
				'rgb(201, 203, 207)'
			],
			borderWidth: 1,
			weight: 800
		}
	]
}))
</script>

<template>
	<Pie :data="chartData" />
</template>
