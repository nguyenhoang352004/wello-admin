import type { SegmentedUser, UserState } from '../types'
import { stateActionButtonLabel } from '../userSegmentationData'

type UserSegmentTableProps = {
  rows: SegmentedUser[]
  stateTitle: Record<UserState, string>
  stateAction: Record<UserState, string>
  performedActions: Record<number, boolean>
  onPerformAction: (id: number, state: UserState, name: string) => void
}

function UserSegmentTable({
  rows,
  stateTitle,
  stateAction,
  performedActions,
  onPerformAction,
}: UserSegmentTableProps) {
  return (
    <table className="segment-table">
      <thead>
        <tr>
          <th>Người dùng</th>
          <th>Không mở app</th>
          <th>Nhóm</th>
          <th>Hành động đề xuất</th>
          <th>Thực thi</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((user) => (
          <tr key={user.id}>
            <td>
              <p className="user-name">{user.name}</p>
              <p className="user-email">{user.email}</p>
            </td>
            <td>{user.lastOpenDays} ngày</td>
            <td>
              <span className={`state-pill state-pill--${user.state}`}>
                {stateTitle[user.state]}
              </span>
            </td>
            <td className="segment-action-cell">
              <p className="segment-row-action-text">{stateAction[user.state]}</p>
            </td>
            <td className="segment-exec-cell">
              <button
                type="button"
                className={`segment-action-btn segment-action-btn--${user.state}`}
                onClick={() => onPerformAction(user.id, user.state, user.name)}
                disabled={performedActions[user.id]}
              >
                {performedActions[user.id] ? 'Da thuc hien' : stateActionButtonLabel[user.state]}
              </button>
            </td>
          </tr>
        ))}
        {rows.length === 0 ? (
          <tr>
            <td colSpan={5} className="segment-empty-row">Không có người dùng ở trạng thái này.</td>
          </tr>
        ) : null}
      </tbody>
    </table>
  )
}

export default UserSegmentTable
