import axiosInstance from './axiosInstance'

export interface Badge {
  id: number
  name: string
  description: string
  imageUrl: string
  criteriaType:
    | 'WATER_INTAKE'
    | 'STREAK'
    | 'NUTRITION_LOG'
    | 'WORKOUT_CALORIES'
    | 'SURVEY_COMPLETED'
    | 'CHALLENGE_COMPLETED'
    | 'COMMUNITY_POST'
  criteriaValue: number
}

export type BadgeCreateRequest = Omit<Badge, 'id'>

const BADGE_BASE = '/admin/badges'

export const badgeService = {
  getAllBadges: async (): Promise<Badge[]> => {
    const response = await axiosInstance.get<Badge[]>(BADGE_BASE)
    return response.data
  },

  createBadge: async (data: BadgeCreateRequest): Promise<Badge> => {
    const response = await axiosInstance.post<Badge>(BADGE_BASE, data)
    return response.data
  },

  updateBadge: async (id: number, data: BadgeCreateRequest): Promise<Badge> => {
    const response = await axiosInstance.put<Badge>(`${BADGE_BASE}/${id}`, data)
    return response.data
  },

  deleteBadge: async (id: number): Promise<void> => {
    await axiosInstance.delete(`${BADGE_BASE}/${id}`)
  },
}
