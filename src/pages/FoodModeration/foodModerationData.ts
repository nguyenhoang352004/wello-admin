import type { FoodContribution, ReviewStatus } from './types'

export const seedData: FoodContribution[] = [
  {
    id: 1,
    name: 'Bún gà xào nấm',
    calories: 465,
    protein: 28,
    carbs: 52,
    fat: 16,
    serving: '350 g',
    submittedBy: 'ngocanh91',
    note: 'Món này em đã cân thực phẩm bằng cân điện tử tại nhà.',
    status: 'pending',
  },
  {
    id: 2,
    name: 'Cơm sườn nướng mật ong',
    calories: 598,
    protein: 31,
    carbs: 68,
    fat: 22,
    serving: '420 g',
    submittedBy: 'duclong.fit',
    note: 'Dữ liệu lấy từ nhận định dinh dưỡng và công thức nấu ăn.',
    status: 'pending',
  },
  {
    id: 3,
    name: 'Sữa chua Hy Lạp mix hạt',
    calories: 240,
    protein: 15,
    carbs: 18,
    fat: 12,
    serving: '220 g',
    submittedBy: 'tram.ng',
    note: 'Món ăn phụ cho chế độ giảm cân.',
    status: 'approved',
  },
]

export const statusLabel = (status: ReviewStatus): string => {
  if (status === 'approved') return 'Đã duyệt'
  if (status === 'rejected') return 'Từ chối'
  return 'Chờ duyệt'
}
