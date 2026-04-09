import type { FoodContribution, ReviewStatus } from './types'

export const statusLabel = (status: ReviewStatus): string => {
  if (status === 'APPROVED') return 'Đã duyệt'
  if (status === 'REJECTED') return 'Từ chối'
  return 'Chờ duyệt'
}

export const seedData: FoodContribution[] = [
  {
    id: 1,
    foodName: 'Bánh mì thịt nướng',
    calories: 350,
    protein: 12,
    carbs: 45,
    fat: 10,
    servingSize: 1,
    servingUnit: 'cái',
    status: 'PENDING',
    requester: { idUser: 1, email: 'user1@example.com' },
    createdAt: '2024-04-08T15:00:00',
    adminNote: null,
  },
  {
    id: 2,
    foodName: 'Phở bò',
    calories: 450,
    protein: 20,
    carbs: 60,
    fat: 15,
    servingSize: 1,
    servingUnit: 'tô',
    status: 'PENDING',
    requester: { idUser: 2, email: 'user2@example.com' },
    createdAt: '2024-04-08T15:10:00',
    adminNote: null,
  },
]
