import type { FoodContribution, ReviewStatus } from '../types'
import { statusLabel } from '../foodModerationData'

type FoodModerationTableProps = {
  items: FoodContribution[]
  onUpdateStatus: (id: number, status: ReviewStatus) => void
}

function FoodModerationTable({ items, onUpdateStatus }: FoodModerationTableProps) {
  return (
    <div className="moderation-table-wrap">
      <table className="moderation-table">
        <thead>
          <tr>
            <th>Món ăn</th>
            <th className="col-center">Khẩu phần</th>
            <th className="col-center">Kcal</th>
            <th className="col-center">P</th>
            <th className="col-center">C</th>
            <th className="col-center">F</th>
            <th>User</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <p className="food-name">{item?.foodName || 'Không rõ tên'}</p>
                <p className="food-note">{item?.adminNote || 'Không có ghi chú'}</p>
              </td>
              <td className="col-center">{`${item?.servingSize || 0} ${item?.servingUnit || ''}`}</td>
              <td className="col-center">{item?.calories || 0}</td>
              <td className="col-center">{item?.protein || 0}g</td>
              <td className="col-center">{item?.carbs || 0}g</td>
              <td className="col-center">{item?.fat || 0}g</td>
              <td>{item?.requester?.email || 'N/A'}</td>
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

export default FoodModerationTable
