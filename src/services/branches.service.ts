import { axiosWithAuth } from '@/api/api.interceptors'
import { IGroupBranches } from '@/types/branches.interface'
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()

class BranchService {
	async getListBranches() {
		try {
			const { data } = await axiosWithAuth<IGroupBranches[]>({
				url: '/GetListBranches',
				method: 'GET'
			})

			if (data.length === 0) {
				toast({
					title: 'Произошла ошибка',
					description: 'Не удалось получить список филиалов, либо список пуст',
					variant: 'destructive'
				})
			}

			return data
		} catch (error) {
			toast({
				title: 'Произошла ошибка',
				variant: 'destructive'
			})
		}
	}
}

export const branchService = new BranchService()
