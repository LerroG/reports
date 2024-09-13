<script setup lang="ts">
defineProps<{ info: { title: string; value?: string | number } }>()
</script>

<template>
	<div class="bg-gray-200 rounded-lg py-3 flex flex-col justify-center h-24">
		<div class="text-center text-lg">{{ info.title }}</div>
		<div class="text-center font-bold text-xl">
			{{ info.value }}
		</div>
	</div>
</template>
