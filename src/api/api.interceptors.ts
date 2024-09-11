import axios, { type CreateAxiosDefaults } from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL

const options: CreateAxiosDefaults = {
	baseURL
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(
	config => {
		const token = localStorage.getItem('token')

		if (token) {
			const url = new URL(
				`/ReportingService/json${config.url!}`,
				config.baseURL
			)
			url.searchParams.set('token', token)

			config.url = url.toString()
		}

		return config
	},
	error => {
		if (error?.response?.Code === -3 && localStorage.getItem('token'))
			localStorage.removeItem('token')

		return Promise.reject(error)
	}
)

export { axiosClassic, axiosWithAuth }
