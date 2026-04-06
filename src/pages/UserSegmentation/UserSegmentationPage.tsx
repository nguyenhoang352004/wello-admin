import { useMemo, useState } from 'react'
import './UserSegmentationPage.css'
import SegmentSummaryGrid from './components/SegmentSummaryGrid'
import SegmentTabs from './components/SegmentTabs'
import UserSegmentTable from './components/UserSegmentTable'
import type { SegmentTab, UserItem, UserState } from './types'
import { getUserState, stateAction, stateTitle, users } from './userSegmentationData'

function UserSegmentationPage() {
  const [activeTab, setActiveTab] = useState<SegmentTab>('all')
  const [performedActions, setPerformedActions] = useState<Record<number, boolean>>({})

  const grouped = useMemo(() => {
    return users.reduce<Record<UserState, UserItem[]>>(
      (acc, user) => {
        const state = getUserState(user.lastOpenDays)
        acc[state].push(user)
        return acc
      },
      { active: [], 'at-risk': [], lapsed: [], churned: [] },
    )
  }, [])

  const rows = useMemo(() => {
    return users.map((user) => ({ ...user, state: getUserState(user.lastOpenDays) }))
  }, [])

  const filteredRows = useMemo(() => {
    if (activeTab === 'all') {
      return rows
    }

    return rows.filter((user) => user.state === activeTab)
  }, [activeTab, rows])

  const handlePerformAction = (id: number, state: UserState, name: string) => {
    if (performedActions[id]) {
      return
    }

    setPerformedActions((prev) => ({ ...prev, [id]: true }))
    window.alert(`Da thuc hien: ${stateAction[state]} cho ${name}.`)
  }

  return (
    <section className="content-card user-seg-card" aria-label="Phan loai nguoi dung">
      <div className="content-card-header">
        <h2 className="content-card-title">Phân loại người dùng</h2>
        <button type="button" className="btn-add">Gửi chiến dịch</button>
      </div>

      <div className="user-seg-body">
        <SegmentSummaryGrid grouped={grouped} stateTitle={stateTitle} stateAction={stateAction} />

        <div className="segment-table-wrap">
          <SegmentTabs
            activeTab={activeTab}
            onChange={setActiveTab}
            grouped={grouped}
            totalCount={rows.length}
            stateTitle={stateTitle}
          />

          <UserSegmentTable
            rows={filteredRows}
            stateTitle={stateTitle}
            stateAction={stateAction}
            performedActions={performedActions}
            onPerformAction={handlePerformAction}
          />
        </div>
      </div>
    </section>
  )
}

export default UserSegmentationPage
