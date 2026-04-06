import { NavLink, Outlet, useLocation } from 'react-router-dom'
import './MainPage.css'

function MainPage() {
  const { pathname } = useLocation()
  const isDashboard = pathname.endsWith('/dashboard') || pathname.endsWith('/home')
  const isFoodPage = pathname.includes('/food')
  const isUserPage = pathname.includes('/users')

  const getPageTitle = () => {
    if (isDashboard) return 'Tổng quan hệ thống'
    if (isFoodPage) return 'Quản lí thực phẩm'
    if (isUserPage) return 'Quản lý người dùng'
    return 'Wello Admin'
  }

  const getBreadcrumb = () => {
    if (isDashboard) return 'Tổng quan'
    if (isFoodPage) return 'Thực phẩm'
    if (isUserPage) return 'Người dùng'
    return ''
  }

  return (
    <div className="main-page">
      {/* Sidebar */}
      <aside className="main-sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">🥗</div>
          <div>
            <span className="sidebar-title">Wello</span>
            <span className="sidebar-subtitle">Hệ thống quản trị</span>
          </div>
        </div>

        <div className="sidebar-divider" />

        <nav>
          <p className="menu-section-label">Hệ thống</p>
          <ul className="menu-list">
            <li>
              <NavLink
                to="/home/dashboard"
                className={({ isActive }) => `menu-item menu-link${isActive ? ' active' : ''}`}
              >
                <span className="menu-icon">📊</span>
                Tổng quan
              </NavLink>
            </li>
          </ul>

          <p className="menu-section-label" style={{ marginTop: '1.2rem' }}>
            Quản lý
          </p>
          <ul className="menu-list">
            <li>
              <NavLink
                to="/home/food"
                className={({ isActive }) => `menu-item menu-link${isActive ? ' active' : ''}`}
              >
                <span className="menu-icon">🥦</span>
                Quản lí thực phẩm
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/users"
                className={({ isActive }) => `menu-item menu-link${isActive ? ' active' : ''}`}
              >
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
            <h1 className="topbar-title">{getPageTitle()}</h1>
            <p className="topbar-breadcrumb">Wello Admin › {getBreadcrumb()}</p>
          </div>
          <div className="topbar-actions">
            <span className="notif-btn" role="button" aria-label="Thông báo">
              🔔
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainPage
