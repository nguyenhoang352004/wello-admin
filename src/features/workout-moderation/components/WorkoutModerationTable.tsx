import type { ReviewStatus, WorkoutContribution } from '../../food-moderation/types'
import { statusLabel } from '../../food-moderation/foodModerationData'

type WorkoutModerationTableProps = {
  items: WorkoutContribution[]
  onUpdateStatus: (id: number, status: ReviewStatus) => void
}

function WorkoutModerationTable({ items, onUpdateStatus }: WorkoutModerationTableProps) {
  return (
    <div className="moderation-table-wrap">
      <table className="moderation-table">
        <thead>
          <tr>
            <th>Bài tập</th>
            <th className="col-center">Chỉ số MET</th>
            <th>Cung cấp bởi</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <p className="food-name">{item?.exerciseName || 'Không rõ tên'}</p>
                <p className="food-note">{item?.adminNote || 'Không có ghi chú'}</p>
              </td>
              <td className="col-center">{item?.metValue || 0}</td>
              <td>
                <p className="requester-email">{item?.requester?.email || 'N/A'}</p>
              </td>
              <td>
                <span className={`status-pill status-pill--${item?.status?.toLowerCase() || 'pending'}`}>
                  {statusLabel(item?.status || 'PENDING')}
                </span>
              </td>
              <td>
                <div className="action-group">
                  <button
                    type="button"
                    onClick={() => onUpdateStatus(item.id, 'APPROVED')}
                    className="action-btn action-btn--approve"
                    disabled={item.status !== 'PENDING'}
                  >
                    <span className="action-btn__icon">✓</span>
                    <span>Duyệt</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateStatus(item.id, 'REJECTED')}
                    className="action-btn action-btn--reject"
                    disabled={item.status !== 'PENDING'}
                  >
                    <span className="action-btn__icon">✕</span>
                    <span>Từ chối</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WorkoutModerationTable
