import { useState, useEffect } from 'react'
import './ModerationNoteModal.css'

interface ModerationNoteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (note: string) => void
  title: string
  confirmText: string
  confirmColor: 'approve' | 'reject'
  placeholder?: string
  initialNote?: string
}

function ModerationNoteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmText,
  confirmColor,
  placeholder = 'Nhập ghi chú tại đây...',
  initialNote = '',
}: ModerationNoteModalProps) {
  const [note, setNote] = useState(initialNote)

  useEffect(() => {
    if (isOpen) {
      setNote(initialNote)
    }
  }, [isOpen, initialNote])

  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm(note)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <textarea
            className="modal-textarea"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={placeholder}
            autoFocus
          />
        </div>
        <div className="modal-footer">
          <button className="modal-btn modal-btn--secondary" onClick={onClose}>
            Hủy
          </button>
          <button
            className={`modal-btn modal-btn--${confirmColor}`}
            onClick={handleConfirm}
            disabled={confirmColor === 'reject' && !note.trim()}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModerationNoteModal
