<script setup lang="ts">
import BranchesSelect from '@/components/monitoring/BranchesSelect.vue'
import { branchService } from '@/services/branches.service'
import { IBranch, IGroupBranches } from '@/types/branches.interface'
import { onMounted, ref, watch } from 'vue'
import Heading from '@/components/Heading.vue'
import { monitoringService } from '@/services/monitoring.service'

const selectedBranches = ref<IBranch[]>()
const listGroupBranches = ref<IGroupBranches[]>()

// Methods
const getListGrougBranches = async () => {
	const response = await branchService.getListBranches()

	listGroupBranches.value = response?.data
}

const getMonitoringInfo = async () => {
	const branchIds = selectedBranches.value?.map(branch => branch.BranchId)

	if (branchIds) await monitoringService.getMonitoringInfo(branchIds)
}

// OnMounted
onMounted(async () => {
	await getListGrougBranches()
})

// watch(selectedBranches, newValue => {
// 	console.log(newValue)
// })
</script>

<template>
	<div class="pt-3 px-6">
		<Heading title="Мониторинг" />
		<div class="flex">
			<div>
				<BranchesSelect
					:branches-group="listGroupBranches || []"
					v-model="selectedBranches"
				/>
			</div>
		</div>
		<button @click="getMonitoringInfo">qweqwe</button>
	</div>
</template>
