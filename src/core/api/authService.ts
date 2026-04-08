import axiosInstance from './axiosInstance'

export interface LoginResponse {
  success: boolean
  message: string
  adminId: number
  token: string
  role: string
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>('/admin/login', {
      email,
      password,
    })

    if (response.data.success) {
      localStorage.setItem('adminToken', response.data.token)
      localStorage.setItem('adminId', response.data.adminId.toString())
      localStorage.setItem('adminRole', response.data.role)
    }

    return response.data
  },

  logout: () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminId')
    localStorage.removeItem('adminRole')
  },

  isLoggedIn: () => {
    return !!localStorage.getItem('adminToken')
  },
}
