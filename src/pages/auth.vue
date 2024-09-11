<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ChangeLanguage from '@/components/ChangeLanguage.vue'
</script>

<template>
	<div class="flex flex-col w-1/4 h-96 bg-gray-300 rounded-xl p-6 mt-60">
		<div class="flex justify-end mb-10">
			<ChangeLanguage />
		</div>
		<div class="font-bold text-5xl mb-7 ml-11">Вход</div>
		<div class="flex flex-col items-center justify-center space-y-5">
			<Input placeholder="Имя пользователя" class="w-4/5" />
			<Input placeholder="Пароль" class="w-4/5" />
			<Button class="w-1/3">{{ $t('login') }}</Button>
		</div>
	</div>
</template>
