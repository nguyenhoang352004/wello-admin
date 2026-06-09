import axiosInstance from './axiosInstance'

export interface EngagementStats {
  ACTIVE: number
  WARNING: number
  INACTIVE: number
  CHURN: number
}

export interface NotifyResponse {
  success: boolean
  message: string
  sentCount: number
}

const ENGAGEMENT_BASE = '/admin/engagement'

export const engagementService = {
  getStats: async (): Promise<EngagementStats> => {
    const response = await axiosInstance.get<EngagementStats>(`${ENGAGEMENT_BASE}/stats`)
    return response.data
  },

  getUsersByGroup: async (group: string): Promise<any[]> => {
    const response = await axiosInstance.get<any[]>(`${ENGAGEMENT_BASE}/users/${group}`)
    return response.data
  },

  notifyGroup: async (group: string): Promise<NotifyResponse> => {
    const response = await axiosInstance.post<NotifyResponse>(`${ENGAGEMENT_BASE}/notify/${group}`)
    return response.data
  },

  notifyUser: async (userId: number, group: string): Promise<NotifyResponse> => {
    const response = await axiosInstance.post<NotifyResponse>(`${ENGAGEMENT_BASE}/notify/user/${userId}/${group}`)
    return response.data
  },
}
