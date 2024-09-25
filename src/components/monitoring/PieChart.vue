<script setup lang="ts">
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	CategoryScale,
	LinearScale,
	ArcElement,
	Legend
} from 'chart.js'
import { computed, ref } from 'vue'
import { Pie } from 'vue-chartjs'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ labels: string[]; data: number[] }>()
ChartJS.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

const { t } = useI18n()

const hoveredIndex = ref<number | null>(null)

const modifiedData = computed(() =>
	props.data.map(value => (value === 0 ? 0.1 : value))
)

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

const chartData = computed(() => {
	return {
		labels: props.labels,
		datasets: [
			{
				label: t('Number of tickets'),
				data: modifiedData.value,
				backgroundColor:
					hoveredIndex.value !== null
						? modifiedData.value.map((_, index) =>
								index !== hoveredIndex.value
									? colors[index].replace(/,\s*\d?\.?\d*?\)$/, ', 0.5)')
									: colors[index]
						  )
						: colors,
				borderColor: colors,
				borderWidth: 1,
				weight: 800
			}
		]
	}
})

const options = {
	maintainAspectRatio: false,
	plugins: {
		tooltip: {
			callbacks: {
				label: (tooltipItem: any) => {
					const index = tooltipItem.dataIndex
					const value = modifiedData.value[index]
					return value === 0.1
						? `${t('Number of tickets')}: 0`
						: `${t('Number of tickets')}: ${value}`
				}
			}
		},
		interaction: {
			mode: 'nearest',
			intersect: true
		}
	},
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
	<Pie :data="chartData" :options="options" />
</template>
