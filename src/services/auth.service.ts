import { axiosClassic, axiosWithAuth } from '@/api/api.interceptors'
import { ROUTE_URL } from '@/config/url.config'
import router from '@/router'
import { IAuthForm, IAuthResponse } from '@/types/auth.interface'

class AuthService {
	async login(data: IAuthForm) {
		const response = await axiosClassic<IAuthResponse>({
			url: '/Login',
			method: 'POST',
			data
		})

		if (response.data.Token) localStorage.setItem('token', response.data.Token)

		return response
	}

	async logout() {
		const response = await axiosWithAuth<Omit<IAuthResponse, 'Token'>>({
			url: '/Logout'
		}).finally(() => {
			localStorage.removeItem('token')
			router.push(ROUTE_URL.auth())
		})

		return response
	}
}

export const authService = new AuthService()
