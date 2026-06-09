type ModerationHeaderProps = {
  pendingCount: number
  totalCount: number
}

function ModerationHeader({ pendingCount, totalCount }: ModerationHeaderProps) {
  return (
    <div className="content-card-header moderation-header">
      <h2 className="content-card-title">Kiểm duyệt thực phẩm</h2>
      <div className="moderation-badges">
        <span className="count-pill count-pill--pending">Chờ duyệt {pendingCount}</span>
        <span className="count-pill">Tổng {totalCount}</span>
      </div>
    </div>
  )
}

export default ModerationHeader
