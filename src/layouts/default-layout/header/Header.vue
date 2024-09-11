<script setup lang="ts">
import ChangeLanguage from '@/components/ChangeLanguage.vue'
import Button from '@/components/ui/button/Button.vue'
import { authService } from '@/services/auth.service'
</script>

<template>
	<header
		class="h-[70px] lg:pl-64 fixed inset-y-0 w-full z-[49] bg-white border-b flex items-center justify-end px-7 gap-3"
	>
		<ChangeLanguage />
		<Button variant="outline" @click="authService.logout()">Выйти</Button>
	</header>
</template>
