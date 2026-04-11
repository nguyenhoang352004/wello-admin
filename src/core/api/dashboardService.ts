import axiosInstance from './axiosInstance'

export interface DashboardSummary {
  totalFoods: number
  totalUsers: number
  activeToday: number
  pendingApprovals: number
}

export interface GrowthData {
  name: string // YYYY-MM-DD
  users: number
}

export interface PieData {
  name: string
  value: number
}

const DASHBOARD_BASE = '/admin/dashboard'

export const dashboardService = {
  getSummary: async (): Promise<DashboardSummary> => {
    const response = await axiosInstance.get<DashboardSummary>(`${DASHBOARD_BASE}/summary`)
    return response.data
  },

  getUserGrowth: async (): Promise<GrowthData[]> => {
    const response = await axiosInstance.get<GrowthData[]>(`${DASHBOARD_BASE}/user-growth`)
    return response.data
  },

  getModerationStats: async (): Promise<PieData[]> => {
    const response = await axiosInstance.get<PieData[]>(`${DASHBOARD_BASE}/moderation-stats`)
    return response.data
  },

  getUserEngagement: async (): Promise<PieData[]> => {
    const response = await axiosInstance.get<PieData[]>(`${DASHBOARD_BASE}/user-engagement`)
    return response.data
  },
}
