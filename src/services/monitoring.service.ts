import { axiosWithAuth } from '@/api/api.interceptors'
import { useToast } from '@/components/ui/toast/use-toast'
import { IMonitoringInfoResponse } from '@/types/monitoring.interface'
const { toast } = useToast()

class MonitoringService {
	async getMonitoringInfo(branchIds: string) {
		try {
			const { data } = await axiosWithAuth<IMonitoringInfoResponse>({
				url: '/GetMonitoringInfo',
				method: 'GET',
				params: {
					branchIds: branchIds
				}
			})

			if (data.Code < 0) {
				toast({
					title: 'Произошла ошибка',
					description: data.Msg,
					variant: 'destructive'
				})
			}

			return data
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
