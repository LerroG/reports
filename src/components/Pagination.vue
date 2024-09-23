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
	<div class="flex flex-col gap-3 justify-center items-center 2xl:gap-x-6 md:flex-row flex-wrap">
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
				<PaginationFirst class="max-sm:w-8 max-sm:h-8" />
				<PaginationPrev class="max-sm:w-8 max-sm:h-8" />

				<template v-for="(item, index) in items">
					<PaginationListItem
						v-if="item.type === 'page'"
						:key="index"
						:value="item.value"
						as-child
					>
						<Button
							class="w-10 h-10 p-0 max-sm:w-8 max-sm:h-8"
							:variant="item.value === page ? 'default' : 'outline'"
						>
							{{ item.value }}
						</Button>
					</PaginationListItem>
					<PaginationEllipsis v-else :key="item.type" :index="index" />
				</template>

				<PaginationNext class="max-sm:w-8 max-sm:h-8" />
				<PaginationLast class="max-sm:w-8 max-sm:h-8" />
			</PaginationList>
		</Pagination>
		<div class="flex items-center gap-2">
			<span class="text-nowrap">{{ $t('Show on page') }}:</span>
			<Select v-model="paginationPageSize">
				<SelectTrigger class="w-16 max-sm:h-8">
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
			<span>{{ $t('Entries') }}</span>
		</div>
	</div>
</template>
