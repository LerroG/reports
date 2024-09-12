<script setup lang="ts">
import { IBranch, IGroupBranches } from '@/types/branches.interface'
import Multiselect from 'vue-multiselect'

defineProps<{ branchesGroup: IGroupBranches[] }>()
const selectedBranches = defineModel<IBranch[]>()
</script>

<template>
	<multiselect
		multiple
		deselect-label=""
		deselectGroupLabel=""
		select-label=""
		selectedLabel=""
		selectGroupLabel=""
		:placeholder="selectedBranches?.length ? '' : 'Выберите филлиалы'"
		track-by="BranchId"
		label="BranchName"
		group-values="branches"
		v-model="selectedBranches"
		:options="branchesGroup"
		:closeOnSelect="false"
		:group-select="true"
		group-label="BranchGroupName"
		:disabled="branchesGroup.length === 0"
	>
	</multiselect>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
