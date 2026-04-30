import type { UserItem, UserState } from './types'

export const users: UserItem[] = [
  { id: 1, name: 'Nguyen Minh Anh', email: 'minhanh@gmail.com', lastOpenDays: 0 },
  { id: 2, name: 'Tran Le Bao', email: 'baotran@gmail.com', lastOpenDays: 2 },
  { id: 3, name: 'Pham Gia Han', email: 'giahan@gmail.com', lastOpenDays: 4 },
  { id: 4, name: 'Le Quoc Dat', email: 'quocdat@gmail.com', lastOpenDays: 6 },
  { id: 5, name: 'Do Khanh Vy', email: 'khanhvy@gmail.com', lastOpenDays: 10 },
  { id: 6, name: 'Vu Tuan Kiet', email: 'tuankiet@gmail.com', lastOpenDays: 16 },
  { id: 7, name: 'Bui Hoang Nam', email: 'hoangnam@gmail.com', lastOpenDays: 22 },
]

export const getUserState = (days: number): UserState => {
  if (days <= 2) return 'active'
  if (days <= 5) return 'at-risk'
  if (days <= 14) return 'lapsed'
  return 'churned'
}

export const stateTitle: Record<UserState, string> = {
  active: 'Đang duy trì tốt',
  'at-risk': 'Sắp mất nhịp',
  lapsed: 'Cần quay lại',
  churned: 'Đã bỏ cuộc',
}

export const stateAction: Record<UserState, string> = {
  active: 'Khen ngợi & Tặng huy hiệu',
  'at-risk': 'Nhắc nhở nhẹ nhàng',
  lapsed: 'Gửi mẹo truyền cảm hứng',
  churned: 'Khảo sát & Tặng lộ trình',
}

export const stateActionButtonLabel: Record<UserState, string> = {
  active: 'Gửi huy hiệu',
  'at-risk': 'Gửi nhắc nhở',
  lapsed: 'Gửi lời khuyên',
  churned: 'Gửi khảo sát',
}
