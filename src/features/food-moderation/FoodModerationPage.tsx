import { useEffect, useMemo, useState } from 'react'
import './FoodModerationPage.css'
import FoodModerationTable from './components/FoodModerationTable'
import ModerationHeader from './components/ModerationHeader'
import ModerationToolbar from './components/ModerationToolbar'
import { contributionService } from '../../core/api/contributionService'
import { statusLabel } from './foodModerationData'
import type { FilterValue, FoodContribution, ReviewStatus } from './types'

import ModerationNoteModal from './components/ModerationNoteModal'

function FoodModerationPage() {
  const [items, setItems] = useState<FoodContribution[]>([])
  const [keyword, setKeyword] = useState('')
  const [filter, setFilter] = useState<FilterValue>('all')
  const [isLoading, setIsLoading] = useState(true)

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentAction, setCurrentAction] = useState<{ id: number; status: ReviewStatus } | null>(null)

  const fetchItems = async () => {
    setIsLoading(true)
    try {
      const data = await contributionService.getFoodContributions()
      setItems(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Lỗi khi tải danh sách thực phẩm:', error)
      setItems([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const pendingCount = useMemo(
    () => (Array.isArray(items) ? items.filter((item) => item?.status === 'PENDING').length : 0),
    [items],
  )

  const filteredItems = useMemo(() => {
    const keywordMatch = keyword.trim().toLowerCase()

    return (items || []).filter((item) => {
      const matchedKeyword =
        (item?.foodName?.toLowerCase() || '').includes(keywordMatch) ||
        (item?.requester?.email?.toLowerCase() || '').includes(keywordMatch)

      if (filter === 'all') {
        return matchedKeyword
      }

      return matchedKeyword && item.status === filter
    })
  }, [items, keyword, filter])

  const handleActionClick = (id: number, status: ReviewStatus) => {
    setCurrentAction({ id, status })
    setIsModalOpen(true)
  }

  const handleConfirmModeration = async (note: string) => {
    if (!currentAction) return

    const { id, status } = currentAction
    try {
      if (status === 'APPROVED') {
        await contributionService.approveFood(id, note || 'Đã được duyệt bởi Admin')
      } else if (status === 'REJECTED') {
        await contributionService.rejectFood(id, note)
      }
      
      await fetchItems()
      alert(`Đã ${statusLabel(status)} thành công!`)
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error)
      alert('Có lỗi xảy ra khi cập nhật trạng thái.')
    }
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

        {isLoading ? (
          <div className="moderation-loading">Đang tải dữ liệu...</div>
        ) : (
          <>
            <FoodModerationTable items={filteredItems} onUpdateStatus={handleActionClick} />
            {filteredItems.length === 0 && (
              <p className="moderation-empty">Không có dữ liệu phù hợp.</p>
            )}
          </>
        )}
      </div>

      <ModerationNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmModeration}
        title={currentAction?.status === 'APPROVED' ? 'Duyệt thực phẩm' : 'Từ chối thực phẩm'}
        confirmText={currentAction?.status === 'APPROVED' ? 'Xác nhận duyệt' : 'Xác nhận từ chối'}
        confirmColor={currentAction?.status === 'APPROVED' ? 'approve' : 'reject'}
        placeholder={
          currentAction?.status === 'APPROVED'
            ? 'Thêm ghi chú duyệt (tùy chọn)...'
            : 'Nhập lý do từ chối (bắt buộc)...'
        }
      />
    </section>
  )
}

export default FoodModerationPage
