import type { UserState } from '../types'

type SegmentTabsProps = {
  activeTab: UserState
  onChange: (tab: UserState) => void
  stats: Record<UserState, number>
  stateTitle: Record<UserState, string>
}

function SegmentTabs({ activeTab, onChange, stats, stateTitle }: SegmentTabsProps) {
  return (
    <div className="segment-tabs" role="tablist" aria-label="Loc theo trang thai">
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'active'}
        className={`segment-tab ${activeTab === 'active' ? 'segment-tab--active' : ''}`}
        onClick={() => onChange('active')}
      >
        {stateTitle.active} ({stats.active})
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'at-risk'}
        className={`segment-tab ${activeTab === 'at-risk' ? 'segment-tab--active' : ''}`}
        onClick={() => onChange('at-risk')}
      >
        {stateTitle['at-risk']} ({stats['at-risk']})
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'lapsed'}
        className={`segment-tab ${activeTab === 'lapsed' ? 'segment-tab--active' : ''}`}
        onClick={() => onChange('lapsed')}
      >
        {stateTitle.lapsed} ({stats.lapsed})
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'churned'}
        className={`segment-tab ${activeTab === 'churned' ? 'segment-tab--active' : ''}`}
        onClick={() => onChange('churned')}
      >
        {stateTitle.churned} ({stats.churned})
      </button>
    </div>
  )
}

export default SegmentTabs
