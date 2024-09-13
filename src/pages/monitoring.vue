<script setup lang="ts">
import BranchesSelect from '@/components/monitoring/BranchesSelect.vue'
import { IBranch } from '@/types/branches.interface'
import { computed, ref, watch } from 'vue'
import Heading from '@/components/Heading.vue'
import { useGetBranches } from '@/queries/branches/useGetBranches'
import { useRoute, useRouter } from 'vue-router'
import { RouteNamesEnum } from '@/router/router.types'
import { useGetMonitoringInfo } from '@/queries/monitoring/useGetMonitoringInfo'
import { useQueryClient } from '@tanstack/vue-query'
import InfoCell from '@/components/monitoring/InfoCell.vue'
import DeskInfoTable from '@/components/monitoring/DeskInfoTable.vue'

const testData = {
	Code: 0,
	Msg: 'Success',

	givenTickets: 10,
	servedTaskCount: 5,
	missingClients: 0,
	waitingClientsCount: 5,
	avgWaitTime: '00:56:09',
	avgAdminTime: '00:15:41',
	waitingClientsMoreX: 5,
	serviceLevelPerc: '0 %',

	deskInfo: [
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		},
		{
			deskNumber: 'Усмонова С - 3 хона',
			deskName: 'Усмонова С - 3 хона',
			serviceGroupName: '-',
			clerkName: '-',
			currentState: 'Не вошел',
			stateTime: '-',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-'
		},
		{
			clerkName: '-',
			currentState: 'Не вошел',
			currentTaskTicketNumber: '-',
			currentTaskTicketService: '-',
			deskName: 'Регистратура 4',
			deskNumber: '04',
			serviceGroupName: '-',
			stateTime: '-'
		},
		{
			clerkName: 'Салохиддинова Н',
			currentState: 'Обслуживание клиента',
			currentTaskTicketNumber: 'SN2',
			currentTaskTicketService: 'Салохиддинова Н (4-хона)',
			deskName: 'Салохиддинова Н (4-хона)',
			deskNumber: 'Салохиддинова Н (4-хона)',
			serviceGroupName: 'Салохиддинова Н (4-хона)',
			stateTime: '00:06:47'
		}
	],

	serviceInfo: [
		{
			serviceName: 'РЕГИСТРАТУРА',
			taskCount: 4,
			avgWaitTime: '00:49:10',
			avgAdminTime: '00:19:35'
		},
		{
			avgAdminTime: '00:00:07',
			avgWaitTime: '01:24:06',
			serviceName: 'Салохиддинова Н (4-хона)',
			taskCount: 1
		},
		{
			serviceName: 'Общее',
			avgAdminTime: '00:00:01',
			avgWaitTime: '00:00:12',
			taskCount: 4
		}
	],

	serviceInfoGraph: [
		{
			serviceName: 'РЕГИСТРАТУРА',
			taskCount: 4,
			taskCountPercent: '80 %'
		},
		{
			serviceName: 'Салохиддинова Н (4-хона)',
			taskCount: 1,
			taskCountPercent: '20 %'
		}
	],

	serviceWaitTimeInfo: {
		serviceWaitInfo: [
			{
				serviceName: "RO'YXATXONA",
				interval_0_15: 1,
				interval_0_15_percent: '25 %',
				interval_15_30: 1,
				interval_15_30_percent: '25 %',
				interval_30_45: 0,
				interval_30_45_percent: '0 %',
				interval_45: 2,
				interval_45_percent: '50 %',
				total: 4,
				total_percent: '80 %'
			},
			{
				interval_0_15: 0,
				interval_0_15_percent: '0 %',
				interval_15_30: 0,
				interval_15_30_percent: '0 %',
				interval_30_45: 0,
				interval_30_45_percent: '0 %',
				interval_45: 1,
				interval_45_percent: '100 %',
				serviceName: 'Салохиддинова Н (4-хона)',
				total: 1,
				total_percent: '20 %'
			}
		],

		total_0_15: 1,
		total_0_15_percent: '20 %',
		total_15_30: 1,
		total_15_30_percent: '20 %',
		total_30_45: 0,
		total_30_45_percent: '0 %',
		total_45: 3,
		total_45_percent: '60 %',
		total_total: 5
	},

	waitingClients: [
		{
			ticketNumber: 'SN2',
			serviceName: 'Салохиддинова Н (4-хона)',
			ticketType: 'Обычный',
			arriveTime: '10:57:36',
			waitingTime: '01:31:44',
			callsCount: 1,
			availableDesks: ['Салохиддинова Н (4-хона)'],
			waitColor: 1
		},
		{
			arriveTime: '10:57:38',
			availableDesks: ['Салохиддинова Н (4-хона)'],
			callsCount: 0,
			serviceName: 'Салохиддинова Н (4-хона)',
			ticketNumber: 'SN3',
			ticketType: 'Обычный',
			waitColor: 1,
			waitingTime: '01:31:42'
		},
		{
			arriveTime: '10:57:41',
			availableDesks: ['Салохиддинова Н (4-хона)'],
			callsCount: 0,
			serviceName: 'Салохиддинова Н (4-хона)',
			ticketNumber: 'SN4',
			ticketType: 'Обычный',
			waitColor: 1,
			waitingTime: '01:31:39'
		}
	]
}

const cellsInfo = [
	{
		title: 'Выдано билетов',
		value: testData.givenTickets
	},
	{
		title: 'Завершено операций',
		value: testData.servedTaskCount
	},
	{
		title: 'Потеряно билетов',
		value: testData.missingClients
	},
	{
		title: 'Ожидающих клиентов ',
		value: testData.waitingClientsCount
	},
	{
		title: 'Среднее время ожидания',
		value: testData.avgWaitTime
	},
	{
		title: 'Среднее время обслуживания',
		value: testData.avgAdminTime
	},
	{
		title: 'Клиентов ожидающих более 30 мин.',
		value: testData.waitingClientsMoreX
	},
	{
		title: 'Уровень обслуживания (%)',
		value: testData.serviceLevelPerc
	}
]

const router = useRouter()
const route = useRoute()
const queryClient = useQueryClient()

const selectedBranches = ref<IBranch[]>()
// const { branchesList } = useGetBranches()
// const { monitoringInfo } = useGetMonitoringInfo()

// const test = () => {
// 	const ids = query.split(',').map(id => parseInt(id))
// 	const result = data.flatMap(group =>
// 		group.branches.filter(branch => ids.includes(branch.BranchId))
// 	)
// 	return result
// }
// if (route.query.branchIds) {
// 	branchesList.value?.map((branchGroup) => branchGroup.branches.map((branch) => branch))
// }
// const test = branchesList.value?.flatMap()
// Methods
const branchIds = computed(
	() => selectedBranches.value?.map(branch => branch.BranchId) || []
)

watch(selectedBranches, () => {
	if (selectedBranches.value?.length) {
		router.replace({
			name: RouteNamesEnum.monitoring,
			query: { branchIds: branchIds?.value.toString() }
		})
	} else {
		router.replace({
			path: RouteNamesEnum.monitoring,
			query: {}
		})
	}
	queryClient.invalidateQueries({
		queryKey: ['get monitoring info']
	})
})
</script>

<template>
	<div class="pt-3 px-6">
		<Heading title="Мониторинг" />
		<div>
			<!-- Select -->
			<div class="mb-6">
				<BranchesSelect
					:branches-group="branchesList || []"
					v-model="selectedBranches"
				/>
			</div>
			<!-- Select -->

			<!-- Cells -->
			<div class="grid grid-cols-4 gap-4 mb-8">
				<InfoCell
					v-for="cellInfo in cellsInfo"
					:key="cellInfo.title"
					:info="cellInfo"
				/>
			</div>
			<!-- Cells -->

			<!-- DeskInfo -->
			<h2 class="font-bold text-center text-xl mb-6">Информация о пультах</h2>
			<DeskInfoTable :deskInfo="testData.deskInfo" />
			<!-- DeskInfo -->
		</div>
	</div>
</template>
