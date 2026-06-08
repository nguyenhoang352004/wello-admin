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
    const response = await axiosInstance.get<any[]>(BADGE_BASE)
    return response.data.map(mapToBadge)
  },

  createBadge: async (data: BadgeCreateRequest): Promise<Badge> => {
    const payload = {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      criteriaType: data.criteriaType,
      criteriaValue: data.criteriaValue
    }
    const response = await axiosInstance.post<any>(BADGE_BASE, payload)
    return mapToBadge(response.data)
  },

  updateBadge: async (id: number, data: BadgeCreateRequest): Promise<Badge> => {
    const payload = {
      idBadge: id,
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      criteriaType: data.criteriaType,
      criteriaValue: data.criteriaValue
    }
    const response = await axiosInstance.put<any>(`${BADGE_BASE}/${id}`, payload)
    return mapToBadge(response.data)
  },

  deleteBadge: async (id: number): Promise<void> => {
    await axiosInstance.delete(`${BADGE_BASE}/${id}`)
  },
}

function mapToBadge(data: any): Badge {
  return {
    id: data.badgeId,
    name: data.name,
    description: data.description,
    imageUrl: data.iconUrl,
    criteriaType: data.criteriaType,
    criteriaValue: data.criteriaValue,
  }
}
