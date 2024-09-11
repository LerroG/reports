<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
	<Toaster />
	<AppLayout>
		<RouterView />
	</AppLayout>
</template>
