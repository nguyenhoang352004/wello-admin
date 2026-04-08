export type UserState = 'active' | 'at-risk' | 'lapsed' | 'churned'

export type SegmentTab = UserState | 'all'

export type UserItem = {
  id: number
  name: string
  email: string
  lastOpenDays: number
}

export type SegmentedUser = UserItem & {
  state: UserState
}
