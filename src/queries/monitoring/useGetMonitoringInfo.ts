import { monitoringService } from '@/services/monitoring.service'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export const useGetMonitoringInfo = () => {
	const route = useRoute()
	const query = computed(() => route.query.branchIds as string)

	const { data: monitoringInfo, refetch: refetchMonitoringInfo, isPending: isMonitoringInfoPending } = useQuery({
		queryKey: ['get monitoring info'],
		queryFn: () => monitoringService.getMonitoringInfo(query.value),
		refetchInterval: 10000
	})

	return {
		monitoringInfo,
		refetchMonitoringInfo,
		isMonitoringInfoPending
	}
}
