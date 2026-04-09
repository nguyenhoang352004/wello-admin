import { useEffect, useMemo, useState } from 'react'
import '../food-moderation/FoodModerationPage.css'
import { contributionService } from '../../core/api/contributionService'
import { statusLabel } from '../food-moderation/foodModerationData'
import type { FilterValue, ReviewStatus, WorkoutContribution } from '../food-moderation/types'
import WorkoutModerationTable from './components/WorkoutModerationTable'
import ModerationToolbar from '../food-moderation/components/ModerationToolbar'

import ModerationNoteModal from '../food-moderation/components/ModerationNoteModal'

function WorkoutModerationPage() {
  const [items, setItems] = useState<WorkoutContribution[]>([])
  const [keyword, setKeyword] = useState('')
  const [filter, setFilter] = useState<FilterValue>('all')
  const [isLoading, setIsLoading] = useState(true)

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentAction, setCurrentAction] = useState<{ id: number; status: ReviewStatus } | null>(null)

  const fetchItems = async () => {
    setIsLoading(true)
    try {
      const data = await contributionService.getWorkoutContributions()
      setItems(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Lỗi khi tải danh sách bài tập:', error)
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
        (item?.workoutName?.toLowerCase() || '').includes(keywordMatch) ||
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
        await contributionService.approveWorkout(id, note || 'Đã được duyệt bởi Admin')
      } else if (status === 'REJECTED') {
        await contributionService.rejectWorkout(id, note)
      }
      
      await fetchItems()
      alert(`Đã ${statusLabel(status)} bài tập thành công!`)
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error)
      alert('Có lỗi xảy ra khi cập nhật trạng thái.')
    }
  }

  return (
    <section className="content-card moderation-card" aria-label="Kiem duyet bai tap">
      <div className="content-card-header moderation-header">
        <h2 className="content-card-title">Kiểm duyệt bài tập</h2>
        <div className="moderation-badges">
          <span className="count-pill count-pill--pending">Chờ duyệt {pendingCount}</span>
          <span className="count-pill">Tổng {items.length}</span>
        </div>
      </div>

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
            <WorkoutModerationTable items={filteredItems} onUpdateStatus={handleActionClick} />
            {filteredItems.length === 0 && (
              <p className="moderation-empty">Không có bài tập nào phù hợp.</p>
            )}
          </>
        )}
      </div>

      <ModerationNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmModeration}
        title={currentAction?.status === 'APPROVED' ? 'Duyệt bài tập' : 'Từ chối bài tập'}
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

export default WorkoutModerationPage
