export type ReviewStatus = 'pending' | 'approved' | 'rejected'

export type FoodContribution = {
  id: number
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  serving: string
  submittedBy: string
  note: string
  status: ReviewStatus
}

export type FilterValue = 'all' | ReviewStatus
