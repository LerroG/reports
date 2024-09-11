export const ROUTE_URL = {
	root: (url = '') => `${url ? url : ''}`,

	home: () => ROUTE_URL.root('/'),
	auth: () => ROUTE_URL.root('/auth'),
	monitoring: () => ROUTE_URL.root('/monitoring'),
	operators: () => ROUTE_URL.root('/operators'),
	services: () => ROUTE_URL.root('/services'),
	tickets: () => ROUTE_URL.root('/tickets'),
	branches: () => ROUTE_URL.root('/branches')
}
