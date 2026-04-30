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
    <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#fff', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
      <table className="segment-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <tr>
            <th style={{ padding: '16px', color: '#475569', fontWeight: '600' }}>Người dùng</th>
            <th style={{ padding: '16px', color: '#475569', fontWeight: '600' }}>Không mở app</th>
            <th style={{ padding: '16px', color: '#475569', fontWeight: '600' }}>Hành động đề xuất</th>
            <th style={{ padding: '16px', color: '#475569', fontWeight: '600', textAlign: 'center' }}>Thực thi</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.2s' }}>
              <td style={{ padding: '16px' }}>
                <p className="user-name" style={{ fontWeight: '600', color: '#1e293b', margin: 0 }}>{user.name}</p>
                <p className="user-email" style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{user.email}</p>
              </td>
              <td style={{ padding: '16px', color: '#334155' }}>{user.lastOpenDays} ngày</td>
              <td className="segment-action-cell" style={{ padding: '16px', color: '#475569' }}>
                <p className="segment-row-action-text" style={{ margin: 0 }}>{stateAction[user.state]}</p>
              </td>
              <td className="segment-exec-cell" style={{ padding: '16px', textAlign: 'center' }}>
                <button
                  type="button"
                  className={`segment-action-btn segment-action-btn--${user.state}`}
                  style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: performedActions[user.id] ? 'not-allowed' : 'pointer', opacity: performedActions[user.id] ? 0.6 : 1, fontWeight: '500' }}
                  onClick={() => onPerformAction(user.id, user.state, user.name)}
                  disabled={performedActions[user.id]}
                >
                  {performedActions[user.id] ? 'Đã gửi' : `${stateActionButtonLabel[user.state]}`}
                </button>
              </td>
            </tr>
          ))}
          {rows.length === 0 ? (
            <tr>
              <td colSpan={4} className="segment-empty-row" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                Không có người dùng nào ở nhóm này.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  )
}

export default UserSegmentTable
