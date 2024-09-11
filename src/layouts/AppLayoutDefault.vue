<script setup lang="ts">
import Sidebar from './default-layout/sidebar/Sidebar.vue'
import Header from './default-layout/header/Header.vue'
</script>

<template>
	<Sidebar />

	<Header />
	<main class="pl-64 py-[70px] bg-white">
		<slot />
	</main>
</template>

<style scoped></style>
