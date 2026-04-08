export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface Requester {
  idUser: number
  email: string
}

export interface FoodContribution {
  id: number
  foodName: string
  calories: number
  protein: number
  carbs: number
  fat: number
  servingSize: number
  servingUnit: string
  status: ReviewStatus
  requester: Requester
  createdAt: string
  adminNote: string | null
}

export interface WorkoutContribution {
  id: number
  workoutName: string
  caloriesBurned: number
  duration: number
  intensity: string
  status: ReviewStatus
  requester: Requester
  createdAt: string
  adminNote: string | null
}

export type FilterValue = 'all' | ReviewStatus
