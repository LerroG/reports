<script setup lang="ts">
import {
	Pagination,
	PaginationEllipsis,
	PaginationFirst,
	PaginationLast,
	PaginationList,
	PaginationListItem,
	PaginationNext,
	PaginationPrev
} from '@/components/ui/pagination'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

defineProps<{ paginationInfo: Array<Object> }>()

const paginationPage = defineModel<number>('paginationPage')
const paginationPageSize = defineModel<string>('paginationPageSize')
const pageSizeVariants = ['5', '10', '20']
</script>

<template>
	<div class="flex justify-center gap-6">
		<Pagination
			v-slot="{ page }"
			:total="paginationInfo.length"
			:sibling-count="2"
			show-edges
			:default-page="1"
			v-model:page="paginationPage"
			:items-per-page="Number(paginationPageSize)"
		>
			<PaginationList v-slot="{ items }" class="flex items-center gap-1">
				<PaginationFirst />
				<PaginationPrev />

				<template v-for="(item, index) in items">
					<PaginationListItem
						v-if="item.type === 'page'"
						:key="index"
						:value="item.value"
						as-child
					>
						<Button
							class="w-10 h-10 p-0"
							:variant="item.value === page ? 'default' : 'outline'"
						>
							{{ item.value }}
						</Button>
					</PaginationListItem>
					<PaginationEllipsis v-else :key="item.type" :index="index" />
				</template>

				<PaginationNext />
				<PaginationLast />
			</PaginationList>
		</Pagination>
		<div class="flex items-center gap-2">
			<span class="text-nowrap">Показывать на странице:</span>
			<Select v-model="paginationPageSize">
				<SelectTrigger class="w-16">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem
						v-for="(pageSize, idx) in pageSizeVariants"
						:key="idx"
						:value="pageSize"
					>
						{{ pageSize }}
					</SelectItem>
				</SelectContent>
			</Select>
			<span>записей</span>
		</div>
	</div>
</template>
