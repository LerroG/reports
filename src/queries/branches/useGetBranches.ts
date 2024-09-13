import { branchService } from '@/services/branches.service'
import { useQuery } from '@tanstack/vue-query'

export const useGetBranches = () => {
	const { data: branchesList } = useQuery({
		queryKey: ['get list branches'],
		queryFn: () => branchService.getListBranches()
	})

	return { branchesList }
}
