<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ChangeLanguage from '@/components/ChangeLanguage.vue'
import { ref } from 'vue'
import { authService } from '@/services/auth.service'
import { useRouter } from 'vue-router'
import { ROUTE_URL } from '@/config/url.config'

const router = useRouter()

const form = ref({
	Username: '',
	Password: ''
})
const loading = ref(false)

const handleSubmit = async () => {
	try {
		loading.value = true
		await authService.login(form.value)
		router.push(ROUTE_URL.home())
	} catch (error) {
		console.log(error)
	} finally {
		loading.value = false
	}
}
</script>

<template>
	<div
		class="flex flex-col w-5/6 md:w-2/4 lg:w-2/5 2xl:w-1/4 h-96 bg-gray-300 rounded-xl p-6"
	>
		<div class="flex justify-end mb-6 2xl:mb-10">
			<ChangeLanguage />
		</div>
		<div class="font-bold text-5xl mb-7 2xl:ml-11">{{ $t('Entrance') }}</div>
		<form
			@submit.prevent="handleSubmit"
			class="flex flex-col items-center justify-center space-y-5"
		>
			<Input
				type="text"
				id="username"
				required
				:placeholder="`${$t('Username')}`"
				class="2xl:w-4/5"
				v-model="form.Username"
			/>
			<Input
				type="password"
				id="password"
				required
				:placeholder="`${$t('Password')}`"
				class="2xl:w-4/5"
				v-model="form.Password"
			/>
			<Button :disabled="loading" type="submit" class="w-1/3">{{
				$t('Login')
			}}</Button>
		</form>
	</div>
</template>
