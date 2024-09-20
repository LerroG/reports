<script setup lang="ts">
import ChangeLanguage from '@/components/ChangeLanguage.vue'
import Button from '@/components/ui/button/Button.vue'
import { authService } from '@/services/auth.service'
import { Menu, LogOut } from 'lucide-vue-next'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Navigation from '../sidebar/Navigation.vue'
</script>

<template>
	<header class="xl:ml-64 gap-2 flex justify-center px-3 sm:px-6">
		<Sheet>
			<SheetTrigger as-child
				><Button
					class="h-[70px] w-[70px] mt-4 rounded-xl bg-white xl:hidden"
					variant="secondary"
					><Menu color="gray" :size="50" /></Button
			></SheetTrigger>
			<SheetContent side="left" class="max-sm:w-full">
				<Navigation />
			</SheetContent>
		</Sheet>

		<div
			class="h-[70px] bg-white border-b flex items-center gap-3 shadow-sm justify-end pr-7 mt-4 rounded-2xl w-full"
		>
			<ChangeLanguage />
			<Button class="px-3" variant="outline" @click="authService.logout()">
				<span class="max-sm:hidden">{{ $t('Log out') }}</span>
				<LogOut class="sm:ml-2" />
			</Button>
		</div>
	</header>
</template>
