import React, { useState, useEffect } from 'react'
import type { Badge, BadgeCreateRequest } from '../../../core/api/badgeService'
import './BadgeModal.css'

interface BadgeModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: BadgeCreateRequest) => Promise<void>
  initialData?: Badge | null
}

const CRITERIA_TYPES = [
  { value: 'WATER_INTAKE', label: '💧 Uống nước' },
  { value: 'STREAK', label: '🔥 Chuỗi ngày' },
  { value: 'NUTRITION_LOG', label: '🥗 Nhật ký ăn uống' },
  { value: 'WORKOUT_CALORIES', label: '💪 Calo tập luyện' },
  { value: 'SURVEY_COMPLETED', label: '📋 Hoàn thành khảo sát' },
  { value: 'CHALLENGE_COMPLETED', label: '🏆 Hoàn thành thử thách' },
  { value: 'COMMUNITY_POST', label: '👥 Đăng bài cộng đồng' },
]

const PRESET_ICONS = [
  // Streaks / Activity
  { url: 'https://cdn-icons-png.flaticon.com/512/6198/6198527.png', label: 'Năng nổ' },
  { url: 'https://cdn-icons-png.flaticon.com/512/6198/6198550.png', label: 'Tuần vàng' },
  { url: 'https://cdn-icons-png.flaticon.com/512/6198/6198520.png', label: 'Bền bỉ' },
  // Water
  { url: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png', label: 'Hydration' },
  { url: 'https://cdn-icons-png.flaticon.com/512/824/824239.png', label: 'Đại dương' },
  { url: 'https://cdn-icons-png.flaticon.com/512/685/685862.png', label: 'Nước lọc' },
  // Nutrition
  { url: 'https://cdn-icons-png.flaticon.com/512/3412/3412862.png', label: 'Ăn uống' },
  { url: 'https://cdn-icons-png.flaticon.com/512/2515/2515263.png', label: 'Rau củ' },
  { url: 'https://cdn-icons-png.flaticon.com/512/1135/1135504.png', label: 'Lành mạnh' },
  // Workout
  { url: 'https://cdn-icons-png.flaticon.com/512/2964/2964514.png', label: 'Workout' },
  { url: 'https://cdn-icons-png.flaticon.com/512/3043/3043985.png', label: 'Chạy bộ' },
  { url: 'https://cdn-icons-png.flaticon.com/512/2936/2936886.png', label: 'Yoga' },
  // Achievements / Community
  { url: 'https://cdn-icons-png.flaticon.com/512/3884/3884851.png', label: 'Cộng đồng' },
  { url: 'https://cdn-icons-png.flaticon.com/512/3112/3112946.png', label: 'Thử thách' },
  { url: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png', label: 'Cúp vàng' },
  { url: 'https://cdn-icons-png.flaticon.com/512/2583/2583344.png', label: 'Huy chương' },
  { url: 'https://cdn-icons-png.flaticon.com/512/1484/1484560.png', label: 'Ngôi sao' },
  { url: 'https://cdn-icons-png.flaticon.com/512/3652/3652191.png', label: 'Vương miện' },
]

const formatCriteria = (type: string, value: number) => {
  switch (type) {
    case 'WATER_INTAKE':
      return `💧 Uống nước: ${value} ml`
    case 'STREAK':
      return `🔥 Chuỗi ngày hoạt động: ${value} ngày`
    case 'NUTRITION_LOG':
      return `🥗 Ghi nhật ký ăn uống: ${value} lần`
    case 'WORKOUT_CALORIES':
      return `💪 Đốt calo tập luyện: ${value} kcal`
    case 'SURVEY_COMPLETED':
      return `📋 Hoàn thành khảo sát: ${value} lần`
    case 'CHALLENGE_COMPLETED':
      return `🏆 Hoàn thành thử thách: ${value} lần`
    case 'COMMUNITY_POST':
      return `👥 Đăng bài cộng đồng: ${value} lần`
    default:
      return `${type}: ${value}`
  }
}

const BadgeModal: React.FC<BadgeModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<BadgeCreateRequest>({
    name: '',
    description: '',
    imageUrl: '',
    criteriaType: 'WATER_INTAKE',
    criteriaValue: 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          name: initialData.name,
          description: initialData.description,
          imageUrl: initialData.imageUrl,
          criteriaType: initialData.criteriaType,
          criteriaValue: initialData.criteriaValue,
        })
      } else {
        setFormData({
          name: '',
          description: '',
          imageUrl: '',
          criteriaType: 'WATER_INTAKE',
          criteriaValue: 0,
        })
      }
    }
  }, [isOpen, initialData])

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'criteriaValue' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSave(formData)
      onClose()
    } catch (error) {
      console.error('Error saving badge', error)
      alert('Đã xảy ra lỗi khi lưu huy hiệu. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{initialData ? 'Chỉnh sửa huy hiệu' : 'Thêm huy hiệu mới'}</h2>
          <button className="btn-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body badge-modal-grid">
            {/* Left Column: Form Details */}
            <div className="modal-col-left">
              <div className="form-group">
                <label htmlFor="name">Tên huy hiệu</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Ví dụ: Cá Voi Xanh"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Mô tả</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Cách để đạt được huy hiệu..."
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="criteriaType">Loại điều kiện</label>
                <select
                  id="criteriaType"
                  name="criteriaType"
                  className="form-control"
                  value={formData.criteriaType}
                  onChange={handleChange}
                >
                  {CRITERIA_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="criteriaValue">Mốc giá trị</label>
                <input
                  type="number"
                  id="criteriaValue"
                  name="criteriaValue"
                  className="form-control"
                  value={formData.criteriaValue}
                  onChange={handleChange}
                  required
                  min="0"
                  step="any"
                />
              </div>
            </div>

            {/* Right Column: Icon Picker & Real-time Preview */}
            <div className="modal-col-right">
              <label className="form-label-section">Xem trước hiển thị</label>
              <div className="badge-live-preview">
                <div className="badge-card-preview">
                  <div className="badge-icon-container-preview">
                    <img 
                      src={formData.imageUrl || 'https://cdn-icons-png.flaticon.com/512/1071/1071064.png'} 
                      alt="Preview" 
                      className="badge-icon-preview"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://cdn-icons-png.flaticon.com/512/1071/1071064.png'
                      }}
                    />
                  </div>
                  <div className="badge-info-preview">
                    <h3 className="badge-name-preview">{formData.name || 'Tên huy hiệu'}</h3>
                    <div className="badge-criteria-preview">
                      {formatCriteria(formData.criteriaType, formData.criteriaValue)}
                    </div>
                    <p className="badge-desc-preview">{formData.description || 'Mô tả điều kiện đạt được...'}</p>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label-section" style={{ marginTop: '12px' }}>Chọn biểu tượng</label>
                <div className="icon-picker-grid">
                  {PRESET_ICONS.map((icon) => (
                    <button
                      type="button"
                      key={icon.url}
                      className={`icon-picker-item ${formData.imageUrl === icon.url ? 'selected' : ''}`}
                      onClick={() => setFormData((prev) => ({ ...prev, imageUrl: icon.url }))}
                      title={icon.label}
                    >
                      <img 
                        src={icon.url} 
                        alt={icon.label} 
                        onError={(e) => (e.currentTarget.style.display = 'none')} 
                      />
                      <span>{icon.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={isSubmitting}>
              Hủy
            </button>
            <button type="submit" className="btn-submit" disabled={isSubmitting || !formData.imageUrl}>
              {isSubmitting ? 'Đang lưu...' : 'Lưu huy hiệu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BadgeModal
