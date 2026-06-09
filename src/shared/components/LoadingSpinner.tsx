
type LoadingSpinnerProps = {
  message?: string
  minHeight?: string
}

export default function LoadingSpinner({
  message = 'Đang tải dữ liệu...',
  minHeight = '300px',
}: LoadingSpinnerProps) {
  return (
    <div className="loading-container" style={{ minHeight }}>
      <div className="loading-spinner"></div>
      <p className="loading-text">{message}</p>
    </div>
  )
}
