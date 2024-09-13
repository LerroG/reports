import { monitoringService } from '@/services/monitoring.service'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

export const useGetMonitoringInfo = () => {
	const route = useRoute()
	const query = ref(route.query as { branchIds: string })

	const { data: monitoringInfo, isLoading: isMonitoringInfoLoading } = useQuery(
		{
			queryKey: ['get monitoring info'],
			queryFn: () => monitoringService.getMonitoringInfo(query.value.branchIds)
		}
	)

	return { monitoringInfo, isMonitoringInfoLoading }
}
