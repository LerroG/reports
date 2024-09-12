import { axiosWithAuth } from '@/api/api.interceptors'
import { useToast } from '@/components/ui/toast/use-toast'
import { IMonitoringInfoResponse } from '@/types/monitoring.interface'
const { toast } = useToast()

class MonitoringService {
	async getMonitoringInfo(branchIds: number[]) {
		try {
			const response = await axiosWithAuth<IMonitoringInfoResponse>({
				url: '/GetMonitoringInfo',
				method: 'GET',
				params: {
					branchIds: branchIds.toString()
				}
			})

			if (response.data.Code < 0) {
				toast({
					title: 'Произошла ошибка',
					description: response.data.Msg,
					variant: 'destructive'
				})
			}

			return response
		} catch (error: any) {
			toast({
				title: 'Произошла ошибка',
				variant: 'destructive',
				description: error
			})
		}
	}
}

export const monitoringService = new MonitoringService()
