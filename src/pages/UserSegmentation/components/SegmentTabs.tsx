import type { SegmentTab, UserItem, UserState } from '../types'

type SegmentTabsProps = {
  activeTab: SegmentTab
  onChange: (tab: SegmentTab) => void
  grouped: Record<UserState, UserItem[]>
  totalCount: number
  stateTitle: Record<UserState, string>
}

function SegmentTabs({ activeTab, onChange, grouped, totalCount, stateTitle }: SegmentTabsProps) {
  return (
    <div className="segment-tabs" role="tablist" aria-label="Loc theo trang thai">
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'all'}
        className={`segment-tab ${activeTab === 'all' ? 'segment-tab--active' : ''}`}
        onClick={() => onChange('all')}
      >
        Tất cả ({totalCount})
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'active'}
        className={`segment-tab ${activeTab === 'active' ? 'segment-tab--active' : ''}`}
        onClick={() => onChange('active')}
      >
        {stateTitle.active} ({grouped.active.length})
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'at-risk'}
        className={`segment-tab ${activeTab === 'at-risk' ? 'segment-tab--active' : ''}`}
        onClick={() => onChange('at-risk')}
      >
        {stateTitle['at-risk']} ({grouped['at-risk'].length})
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'lapsed'}
        className={`segment-tab ${activeTab === 'lapsed' ? 'segment-tab--active' : ''}`}
        onClick={() => onChange('lapsed')}
      >
        {stateTitle.lapsed} ({grouped.lapsed.length})
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'churned'}
        className={`segment-tab ${activeTab === 'churned' ? 'segment-tab--active' : ''}`}
        onClick={() => onChange('churned')}
      >
        {stateTitle.churned} ({grouped.churned.length})
      </button>
    </div>
  )
}

export default SegmentTabs
