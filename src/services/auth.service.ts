import { axiosClassic, axiosWithAuth } from '@/api/api.interceptors'
import { ROUTE_URL } from '@/config/url.config'
import router from '@/router'
import { IAuthForm, IAuthResponse } from '@/types/auth.interface'
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()

class AuthService {
	async login(data: IAuthForm) {
		try {
			const response = await axiosClassic<IAuthResponse>({
				url: '/Login',
				method: 'POST',
				data
			})

			if (response.data.Token)
				localStorage.setItem('token', response.data.Token)

			if (response.data.Code < 0) {
				toast({
					title: 'Произошла ошибка',
					variant: 'destructive',
					description: response.data.Msg
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

	async logout() {
		try {
			const response = await axiosWithAuth<Omit<IAuthResponse, 'Token'>>({
				url: '/Logout'
			}).finally(() => {
				localStorage.removeItem('token')
				router.push(ROUTE_URL.auth())
			})

			if (response.data.Code < 0) {
				toast({
					title: 'Произошла ошибка',
					variant: 'destructive',
					description: response.data.Msg
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

export const authService = new AuthService()
