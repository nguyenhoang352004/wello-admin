import { NavLink, Outlet, useLocation } from 'react-router-dom'
import './MainPage.css'

function MainPage() {
  const { pathname } = useLocation()
  const isFoodPage = pathname.startsWith('/home/food')

  return (
    <div className="main-page">
      {/* Sidebar */}
      <aside className="main-sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">🥗</div>
          <div>
            <span className="sidebar-title">Wello Admin</span>
            <span className="sidebar-subtitle">Hệ thống quản trị</span>
          </div>
        </div>

        <div className="sidebar-divider" />

        <nav>
          <p className="menu-section-label">Quản lý</p>
          <ul className="menu-list">
            <li>
              <NavLink to="/home/food" className={({ isActive }) => `menu-item menu-link${isActive ? ' active' : ''}`}>
                <span className="menu-icon">🥦</span>
                Quản lí thực phẩm
              </NavLink>
            </li>
            <li>
              <NavLink to="/home/users" className={({ isActive }) => `menu-item menu-link${isActive ? ' active' : ''}`}>
                <span className="menu-icon">👥</span>
                Quản lí người dùng
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-card">
            <div className="admin-avatar">A</div>
            <div>
              <p className="admin-name">Admin</p>
              <p className="admin-role">Quản trị viên</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Right side */}
      <div className="main-right">
        {/* Topbar */}
        <header className="topbar">
          <div>
            <h1 className="topbar-title">
              {isFoodPage ? 'Quản lí thực phẩm' : 'Quản lí người dùng'}
            </h1>
            <p className="topbar-breadcrumb">
              Wello Admin › {isFoodPage ? 'Thực phẩm' : 'Người dùng'}
            </p>
          </div>
          <div className="topbar-actions">
            <span className="notif-btn" role="button" aria-label="Thông báo">🔔</span>
          </div>
        </header>

        {/* Content */}
        <main className="main-content">
          {/* Stats row */}
          <div className="stats-grid">
            <div className="stat-card stat-card--teal">
              <div className="stat-icon">🥦</div>
              <div>
                <p className="stat-value">128</p>
                <p className="stat-label">Tổng thực phẩm</p>
              </div>
            </div>
            <div className="stat-card stat-card--blue">
              <div className="stat-icon">👥</div>
              <div>
                <p className="stat-value">342</p>
                <p className="stat-label">Tổng người dùng</p>
              </div>
            </div>
            <div className="stat-card stat-card--green">
              <div className="stat-icon">✅</div>
              <div>
                <p className="stat-value">56</p>
                <p className="stat-label">Hoạt động hôm nay</p>
              </div>
            </div>
            <div className="stat-card stat-card--orange">
              <div className="stat-icon">⏳</div>
              <div>
                <p className="stat-value">12</p>
                <p className="stat-label">Chờ phê duyệt</p>
              </div>
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainPage
