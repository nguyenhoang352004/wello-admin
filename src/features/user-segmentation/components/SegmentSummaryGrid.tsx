import type { UserState } from '../types'

type SegmentSummaryGridProps = {
  stats: Record<UserState, number>
  stateTitle: Record<UserState, string>
  stateAction: Record<UserState, string>
  onNotify: (state: UserState) => void
  loadingAction: Record<UserState, boolean>
}

function SegmentSummaryGrid({ stats, stateTitle, stateAction, onNotify, loadingAction }: SegmentSummaryGridProps) {
  const cardStyle = {
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    padding: '16px',
    boxSizing: 'border-box' as const
  }

  const btnStyle = {
    width: '100%',
    marginTop: 'auto', // Pushes button to bottom
    padding: '10px',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    boxSizing: 'border-box' as const
  }

  return (
    <div className="segment-grid" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <article className="segment-item segment-item--active" style={{ ...cardStyle, border: '1px solid #10b98120', boxShadow: '0 4px 12px #10b98110' }}>
        <p className="segment-name" style={{ fontSize: '16px', fontWeight: 'bold', color: '#059669', margin: 0 }}>{stateTitle.active}</p>
        <p className="segment-count" style={{ fontSize: '24px', margin: '8px 0', color: '#10b981', fontWeight: 'bold' }}>{stats.active} <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 'normal' }}>người dùng</span></p>
        <p className="segment-action" style={{ fontSize: '13px', color: '#475569', marginBottom: '20px' }}>{stateAction.active}</p>
        <button 
          style={{ ...btnStyle, backgroundColor: '#10b981', opacity: (loadingAction.active || stats.active === 0) ? 0.6 : 1, cursor: (loadingAction.active || stats.active === 0) ? 'not-allowed' : 'pointer' }}
          onClick={() => onNotify('active')}
          disabled={loadingAction.active || stats.active === 0}
        >
          {loadingAction.active ? 'Đang gửi...' : 'Gửi chiến dịch'}
        </button>
      </article>

      <article className="segment-item segment-item--risk" style={{ ...cardStyle, border: '1px solid #f59e0b20', boxShadow: '0 4px 12px #f59e0b10' }}>
        <p className="segment-name" style={{ fontSize: '16px', fontWeight: 'bold', color: '#d97706', margin: 0 }}>{stateTitle['at-risk']}</p>
        <p className="segment-count" style={{ fontSize: '24px', margin: '8px 0', color: '#f59e0b', fontWeight: 'bold' }}>{stats['at-risk']} <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 'normal' }}>người dùng</span></p>
        <p className="segment-action" style={{ fontSize: '13px', color: '#475569', marginBottom: '20px' }}>{stateAction['at-risk']}</p>
        <button 
          style={{ ...btnStyle, backgroundColor: '#f59e0b', opacity: (loadingAction['at-risk'] || stats['at-risk'] === 0) ? 0.6 : 1, cursor: (loadingAction['at-risk'] || stats['at-risk'] === 0) ? 'not-allowed' : 'pointer' }}
          onClick={() => onNotify('at-risk')}
          disabled={loadingAction['at-risk'] || stats['at-risk'] === 0}
        >
          {loadingAction['at-risk'] ? 'Đang gửi...' : 'Gửi chiến dịch'}
        </button>
      </article>

      <article className="segment-item segment-item--lapsed" style={{ ...cardStyle, border: '1px solid #f9731620', boxShadow: '0 4px 12px #f9731610' }}>
        <p className="segment-name" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ea580c', margin: 0 }}>{stateTitle.lapsed}</p>
        <p className="segment-count" style={{ fontSize: '24px', margin: '8px 0', color: '#f97316', fontWeight: 'bold' }}>{stats.lapsed} <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 'normal' }}>người dùng</span></p>
        <p className="segment-action" style={{ fontSize: '13px', color: '#475569', marginBottom: '20px' }}>{stateAction.lapsed}</p>
        <button 
          style={{ ...btnStyle, backgroundColor: '#f97316', opacity: (loadingAction.lapsed || stats.lapsed === 0) ? 0.6 : 1, cursor: (loadingAction.lapsed || stats.lapsed === 0) ? 'not-allowed' : 'pointer' }}
          onClick={() => onNotify('lapsed')}
          disabled={loadingAction.lapsed || stats.lapsed === 0}
        >
          {loadingAction.lapsed ? 'Đang gửi...' : 'Gửi chiến dịch'}
        </button>
      </article>

      <article className="segment-item segment-item--churned" style={{ ...cardStyle, border: '1px solid #ef444420', boxShadow: '0 4px 12px #ef444410' }}>
        <p className="segment-name" style={{ fontSize: '16px', fontWeight: 'bold', color: '#dc2626', margin: 0 }}>{stateTitle.churned}</p>
        <p className="segment-count" style={{ fontSize: '24px', margin: '8px 0', color: '#ef4444', fontWeight: 'bold' }}>{stats.churned} <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 'normal' }}>người dùng</span></p>
        <p className="segment-action" style={{ fontSize: '13px', color: '#475569', marginBottom: '20px' }}>{stateAction.churned}</p>
        <button 
          style={{ ...btnStyle, backgroundColor: '#ef4444', opacity: (loadingAction.churned || stats.churned === 0) ? 0.6 : 1, cursor: (loadingAction.churned || stats.churned === 0) ? 'not-allowed' : 'pointer' }}
          onClick={() => onNotify('churned')}
          disabled={loadingAction.churned || stats.churned === 0}
        >
          {loadingAction.churned ? 'Đang gửi...' : 'Gửi chiến dịch'}
        </button>
      </article>
    </div>
  )
}

export default SegmentSummaryGrid
