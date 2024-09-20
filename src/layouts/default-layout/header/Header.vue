<script setup lang="ts">
import ChangeLanguage from '@/components/ChangeLanguage.vue'
import Button from '@/components/ui/button/Button.vue'
import { authService } from '@/services/auth.service'
</script>

<template>
	<header
		class="h-[70px] bg-white border-b flex items-center shadow-sm justify-end pr-7 gap-3 ml-72 mt-4 rounded-2xl w-5/6"
	>
		<ChangeLanguage />
		<Button variant="outline" @click="authService.logout()">{{
			$t('Log out')
		}}</Button>
	</header>
</template>
