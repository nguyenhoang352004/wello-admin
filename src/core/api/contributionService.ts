import axiosInstance from './axiosInstance'
import type { FoodContribution, WorkoutContribution } from '../../features/food-moderation/types'

const BASE_URL = '/admin/contributions'

export interface ModerationRequest {
  adminNote?: string
}

export const contributionService = {
  // Food APIs
  getFoodContributions: async (status?: string): Promise<FoodContribution[]> => {
    const response = await axiosInstance.get<FoodContribution[]>(`${BASE_URL}/food`, {
      params: { status },
    })
    return response.data
  },

  approveFood: async (id: number, adminNote?: string): Promise<void> => {
    await axiosInstance.put(`${BASE_URL}/food/${id}/approve`, { adminNote })
  },

  rejectFood: async (id: number, adminNote: string): Promise<void> => {
    await axiosInstance.put(`${BASE_URL}/food/${id}/reject`, { adminNote })
  },

  // Workout APIs
  getWorkoutContributions: async (status?: string): Promise<WorkoutContribution[]> => {
    const response = await axiosInstance.get<WorkoutContribution[]>(`${BASE_URL}/workout`, {
      params: { status },
    })
    return response.data
  },

  approveWorkout: async (id: number, adminNote?: string): Promise<void> => {
    await axiosInstance.put(`${BASE_URL}/workout/${id}/approve`, { adminNote })
  },

  rejectWorkout: async (id: number, adminNote: string): Promise<void> => {
    await axiosInstance.put(`${BASE_URL}/workout/${id}/reject`, { adminNote })
  },
}
