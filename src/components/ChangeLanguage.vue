<script setup lang="ts">
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { loadLocaleMessages } from '@/lib/i18n'
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'

// Функция для смены языка
const { locale } = useI18n()

const isOpen = ref(false)

type LanguageType = 'ru' | 'uz'

const langValue = computed(() => {
	return locale.value as LanguageType
})
const changeLanguage = async (lang: string) => {
	isOpen.value = false
	if (locale.value !== lang) {
		await loadLocaleMessages(lang)
		locale.value = lang
	}
}

const languageInfo: Record<
	LanguageType,
	{ value: string; title: string; icon: string }
> = {
	ru: {
		value: 'ru',
		title: 'Русский',
		icon: 'russia.svg'
	},
	uz: {
		value: 'uz',
		title: "O'zbek",
		icon: 'uzbekistan.svg'
	}
}
</script>

<template>
	<div>
		<Popover v-model:open="isOpen">
			<PopoverTrigger as-child>
				<Button
					variant="outline"
					class="w-32 flex items-center justify-between px-5"
				>
					<span>{{ languageInfo[langValue].title }}</span>
					<div class="w-6 h-6 bg-cover rounded-full overflow-hidden border">
						<img
							class="w-full h-full object-cover"
							:src="`src/assets/flags/${languageInfo[langValue].icon}`"
							:alt="languageInfo[langValue].title"
						/>
					</div>
				</Button>
			</PopoverTrigger>
			<PopoverContent class="flex flex-col w-32 p-0">
				<Button
					class="flex items-center justify-between px-5"
					:class="{
						'bg-gray-200  hover:bg-gray-200': lang.value === langValue
					}"
					variant="ghost"
					v-for="lang in languageInfo"
					:key="lang.value"
					@click="changeLanguage(lang.value)"
					><span>{{ lang.title }}</span>
					<div class="w-6 h-6 bg-cover rounded-full overflow-hidden border">
						<img
							class="w-full h-full object-cover"
							:src="`src/assets/flags/${lang.icon}`"
							:alt="languageInfo[langValue].title"
						/></div
				></Button>
			</PopoverContent>
		</Popover>
	</div>
</template>
