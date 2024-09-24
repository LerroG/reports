<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'
</script>

<template>
	<Toaster />
	<ScrollToTop />
	<AppLayout>
		<RouterView />
	</AppLayout>
</template>
