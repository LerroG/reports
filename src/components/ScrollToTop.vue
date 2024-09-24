<script setup lang="ts">
import { ArrowUp } from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
	if (window.scrollY > 300) {
		isVisible.value = true
	} else {
		isVisible.value = false
	}
}

onMounted(() => {
	window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
	<Transition>
		<a
			v-if="isVisible"
			href="#"
			class="fixed bottom-4 right-4 bg-white text-sky-500 p-2 rounded-full"
		>
			<ArrowUp />
		</a>
	</Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
	@apply transition-opacity duration-500 ease-out;
}

.v-enter-from,
.v-leave-to {
	@apply opacity-0;
}
</style>
