export interface IMonitoringInfoResponse {
	Code: number
	Msg: 'Success'

	givenTickets: number
	servedTaskCount: number
	missingClients: number
	waitingClientsCount: number
	avgWaitTime: string
	avgAdminTime: string
	waitingClientsMoreX: number
	serviceLevelPerc: string
	deskInfo: IDeskInfo[]
	serviceInfo: IServiceInfo[]
	serviceInfoGraph: IServiceInfoGraph[]
	serviceWaitTimeInfo: IServiceWaitTimeInfo
	waitingClients: IWaitingClients[]
}

export interface IDeskInfo {
	deskNumber: string
	deskName: string
	serviceGroupName: string
	clerkName: string
	currentState: string
	stateTime: string
	currentTaskTicketNumber: string
	currentTaskTicketService: string
}
export interface IServiceInfo {
	serviceName: string
	taskCount: number
	avgWaitTime: string
	avgAdminTime: string
}

export interface IServiceInfoGraph {
	serviceName: string
	taskCount: number
	taskCountPercent: string
}

export interface IServiceWaitTimeInfo {
	serviceWaitInfo: IServiceWaitInfo[]
	total_0_15: number
	total_0_15_percent: string
	total_15_30: number
	total_15_30_percent: string
	total_30_45: number
	total_30_45_percent: string
	total_45: number
	total_45_percent: string
	total_total: number
}

export interface IServiceWaitInfo {
	serviceName: string
	interval_0_15: number
	interval_0_15_percent: string
	interval_15_30: number
	interval_15_30_percent: string
	interval_30_45: number
	interval_30_45_percent: string
	interval_45: number
	interval_45_percent: string
	total: number
	total_percent: string
}

export interface IWaitingClients {
	ticketNumber: string
	serviceName: string
	ticketType: string
	arriveTime: string
	waitingTime: string
	callsCount: number
	availableDesks: string[]
}
