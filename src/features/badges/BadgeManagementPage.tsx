import React, { useEffect, useState } from 'react'
import { Badge, badgeService, BadgeCreateRequest } from '../../core/api/badgeService'
import BadgeModal from './components/BadgeModal'
import './BadgeManagementPage.css'

const BadgeManagementPage: React.FC = () => {
  const [badges, setBadges] = useState<Badge[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [editingBadge, setEditingBadge] = useState<Badge | null>(null)

  const fetchBadges = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await badgeService.getAllBadges()
      setBadges(data)
    } catch (err: any) {
      console.error('Failed to fetch badges:', err)
      setError('Không thể tải danh sách huy hiệu. Vui lòng kiểm tra kết nối.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBadges()
  }, [])

  const handleOpenAddModal = () => {
    setEditingBadge(null)
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (badge: Badge) => {
    setEditingBadge(badge)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingBadge(null)
  }

  const handleSaveBadge = async (data: BadgeCreateRequest) => {
    if (editingBadge) {
      await badgeService.updateBadge(editingBadge.id, data)
    } else {
      await badgeService.createBadge(data)
    }
    await fetchBadges()
  }

  const handleDeleteBadge = async (id: number, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa huy hiệu "${name}" không?`)) {
      try {
        await badgeService.deleteBadge(id)
        setBadges(badges.filter((b) => b.id !== id))
      } catch (err: any) {
        console.error('Failed to delete badge:', err)
        alert('Xóa huy hiệu thất bại.')
      }
    }
  }

  if (loading && badges.length === 0) {
    return (
      <div className="badge-management-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang tải danh sách huy hiệu...</p>
        </div>
      </div>
    )
  }

  if (error && badges.length === 0) {
    return (
      <div className="badge-management-page">
        <div className="error-container">
          <p className="error-text">{error}</p>
          <button className="retry-btn" onClick={fetchBadges}>Thử lại</button>
        </div>
      </div>
    )
  }

  return (
    <div className="badge-management-page">
      <div className="badge-header">
        <h1 className="badge-title">Quản lý huy hiệu</h1>
        <button className="add-badge-btn" onClick={handleOpenAddModal}>
          <span>+</span> Thêm huy hiệu mới
        </button>
      </div>

      {badges.length === 0 ? (
        <div className="empty-container">
          <div className="empty-text">Chưa có huy hiệu nào trong hệ thống.</div>
          <button className="add-badge-btn" onClick={handleOpenAddModal}>Tạo huy hiệu đầu tiên</button>
        </div>
      ) : (
        <div className="badge-grid">
          {badges.map((badge) => (
            <div key={badge.id} className="badge-card">
              <div className="badge-icon-container">
                <img 
                  src={badge.imageUrl} 
                  alt={badge.name} 
                  className="badge-icon" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://cdn-icons-png.flaticon.com/512/1071/1071064.png'
                  }}
                />
              </div>
              <div className="badge-info">
                <h3 className="badge-name">{badge.name}</h3>
                <div className="badge-criteria">
                  {badge.criteriaType} : {badge.criteriaValue}
                </div>
                <p className="badge-desc">{badge.description}</p>
              </div>
              <div className="badge-actions">
                <button className="btn-action btn-edit" onClick={() => handleOpenEditModal(badge)}>
                  Sửa
                </button>
                <button className="btn-action btn-delete" onClick={() => handleDeleteBadge(badge.id, badge.name)}>
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <BadgeModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveBadge} 
        initialData={editingBadge} 
      />
    </div>
  )
}

export default BadgeManagementPage
