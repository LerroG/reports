<script setup lang="ts">
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	BarElement,
	CategoryScale,
	LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { computed, ref } from 'vue'

const props = defineProps<{ labels: string[]; data: number[]; label: string }>()

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const modifiedData = computed(() =>
	props.data.map(value => (value === 0 ? 0.1 : value))
)

const modifiedLabels = computed(() => {
	const data = props.labels
	while (data.length < 8) {
		data.push('')
	}

	return data
})

const hoveredIndex = ref<number | null>(null)

const maxDataValue = computed(() => Math.max(...modifiedData.value))

const colors = [
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

const chartData = computed(() => ({
	labels: modifiedLabels.value,
	datasets: [
		{
			barPercentage: 0.7,
			data: modifiedData.value,
			backgroundColor:
				hoveredIndex.value !== null
					? modifiedData.value.map((_, index) =>
							index !== hoveredIndex.value
								? colors[index].replace(/,\s*\d?\.?\d*?\)$/, ', 0.5)')
								: colors[index]
					  )
					: colors
		}
	]
}))

const options = {
	maintainAspectRatio: false,
	responsive: true,
	scales: {
		y: {
			beginAtZero: true,
			max: maxDataValue.value + 2
		}
	},
	plugins: {
		legend: { display: false },
		tooltip: {
			callbacks: {
				label: (tooltipItem: any) => {
					const index = tooltipItem.dataIndex
					const value = modifiedData.value[index]
					return value === 0.1
						? `${props.label}: 0`
						: `${props.label}: ${value}`
				}
			}
		}
	},
	// interaction: {
	// 	mode: 'nearest',
	// 	intersect: true
	// },
	onHover: (event: any) => {
		const chart = event.chart // Получаем график
		const elements = chart.getElementsAtEventForMode(
			event,
			'nearest',
			{ intersect: true },
			true
		)
		hoveredIndex.value = elements.length > 0 ? elements[0].index : null // Устанавливаем индекс наведения
		chart.update() // Обновляем график
	}
}
</script>

<template>
	<Bar :data="chartData" :options="options" />
</template>
