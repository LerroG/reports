<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { loadLocaleMessages } from '@/lib/i18n'
import { useI18n } from 'vue-i18n'
import ChangeLanguage from '@/components/ChangeLanguage.vue'

// Функция для смены языка
const { locale } = useI18n()

const changeLanguage = async (lang: string) => {
	if (locale.value !== lang) {
		await loadLocaleMessages(lang)
		locale.value = lang
	}
}
</script>

<template>
	<ChangeLanguage />
	<main class="h-screen w-full flex justify-center items-center">
		<slot />
	</main>
</template>
