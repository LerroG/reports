<script setup lang="ts">
import Sidebar from './default-layout/sidebar/Sidebar.vue'
import Header from './default-layout/header/Header.vue'
</script>

<template>
	<div class="flex flex-col min-h-screen bg-gray-100">
		<Header />
		<div class="flex flex-1">
			<Sidebar />

			<main class="ml-64 mt-3 flex-1">
				<slot />
			</main>
		</div>
	</div>
</template>

<style scoped></style>
