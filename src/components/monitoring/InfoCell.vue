<script setup lang="ts">
defineProps<{ info: { title: string; value?: string | number } }>()
</script>

<template>
	<div class="bg-white rounded-lg shadow-md flex flex-col flex-1 py-1">
		<div class="text-center h-1/2">{{ info.title }}</div>
		<div class="text-center font-bold text-sky-600 text-3xl h-1/2">
			{{ info.value }}
		</div>
	</div>
</template>
