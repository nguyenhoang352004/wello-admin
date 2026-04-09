import type { FilterValue } from '../types'

type ModerationToolbarProps = {
  keyword: string
  filter: FilterValue
  onKeywordChange: (value: string) => void
  onFilterChange: (value: FilterValue) => void
}

function ModerationToolbar({ keyword, filter, onKeywordChange, onFilterChange }: ModerationToolbarProps) {
  return (
    <div className="moderation-toolbar">
      <input
        type="search"
        value={keyword}
        onChange={(event) => onKeywordChange(event.target.value)}
        placeholder="Tìm món ăn"
        className="moderation-search"
      />
      <div className="moderation-filter-wrap">
        <select
          value={filter}
          onChange={(event) => onFilterChange(event.target.value as FilterValue)}
          className="moderation-filter"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="PENDING">Chờ duyệt</option>
          <option value="APPROVED">Đã duyệt</option>
          <option value="REJECTED">Từ chối</option>
        </select>
        <span className="moderation-filter-caret" aria-hidden="true" />
      </div>
    </div>
  )
}

export default ModerationToolbar
