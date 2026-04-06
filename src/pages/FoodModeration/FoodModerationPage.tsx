import { useMemo, useState } from 'react'
import './FoodModerationPage.css'
import FoodModerationTable from './components/FoodModerationTable'
import ModerationHeader from './components/ModerationHeader'
import ModerationToolbar from './components/ModerationToolbar'
import { seedData } from './foodModerationData'
import type { FilterValue, FoodContribution, ReviewStatus } from './types'

function FoodModerationPage() {
  const [items, setItems] = useState<FoodContribution[]>(seedData)
  const [keyword, setKeyword] = useState('')
  const [filter, setFilter] = useState<FilterValue>('all')

  const pendingCount = useMemo(
    () => items.filter((item) => item.status === 'pending').length,
    [items],
  )

  const filteredItems = useMemo(() => {
    const keywordMatch = keyword.trim().toLowerCase()

    return items.filter((item) => {
      const matchedKeyword =
        item.name.toLowerCase().includes(keywordMatch) ||
        item.submittedBy.toLowerCase().includes(keywordMatch)

      if (filter === 'all') {
        return matchedKeyword
      }

      return matchedKeyword && item.status === filter
    })
  }, [items, keyword, filter])

  const updateStatus = (id: number, status: ReviewStatus) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)))
  }

  return (
    <section className="content-card moderation-card" aria-label="Kiem duyet thuc pham">
      <ModerationHeader pendingCount={pendingCount} totalCount={items.length} />

      <div className="moderation-body">
        <ModerationToolbar
          keyword={keyword}
          filter={filter}
          onKeywordChange={setKeyword}
          onFilterChange={setFilter}
        />

        <FoodModerationTable items={filteredItems} onUpdateStatus={updateStatus} />

        {filteredItems.length === 0 ? (
          <p className="moderation-empty">Không có dữ liệu phù hợp.</p>
        ) : null}
      </div>
    </section>
  )
}

export default FoodModerationPage
