import type { UserItem, UserState } from '../types'

type SegmentSummaryGridProps = {
  grouped: Record<UserState, UserItem[]>
  stateTitle: Record<UserState, string>
  stateAction: Record<UserState, string>
}

function SegmentSummaryGrid({ grouped, stateTitle, stateAction }: SegmentSummaryGridProps) {
  return (
    <div className="segment-grid">
      <article className="segment-item segment-item--active">
        <p className="segment-name">{stateTitle.active}</p>
        <p className="segment-count">{grouped.active.length} users</p>
        <p className="segment-action">{stateAction.active}</p>
      </article>
      <article className="segment-item segment-item--risk">
        <p className="segment-name">{stateTitle['at-risk']}</p>
        <p className="segment-count">{grouped['at-risk'].length} users</p>
        <p className="segment-action">{stateAction['at-risk']}</p>
      </article>
      <article className="segment-item segment-item--lapsed">
        <p className="segment-name">{stateTitle.lapsed}</p>
        <p className="segment-count">{grouped.lapsed.length} users</p>
        <p className="segment-action">{stateAction.lapsed}</p>
      </article>
      <article className="segment-item segment-item--churned">
        <p className="segment-name">{stateTitle.churned}</p>
        <p className="segment-count">{grouped.churned.length} users</p>
        <p className="segment-action">{stateAction.churned}</p>
      </article>
    </div>
  )
}

export default SegmentSummaryGrid
