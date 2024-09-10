<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
</script>

<template>
	<div
		class="flex flex-col justify-center w-1/4 h-72 bg-gray-200 rounded-xl px-6"
	>
		<div class="text-center font-bold text-3xl mb-7">Вход</div>
		<div class="flex flex-col items-center justify-center space-y-5">
			<Input placeholder="Имя пользователя" class="w-4/5" />
			<Input placeholder="Пароль" class="w-4/5" />
			<Button class="w-1/3">Войти</Button>
		</div>
	</div>
</template>
