import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminLoginPage.css'
import loginHealthGif from '../../assets/img/download.gif'

function AdminLoginPage() {
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/home')
  }

  return (
    <main className="login-page">
      <div className="ambient ambient-1" aria-hidden="true" />
      <div className="ambient ambient-2" aria-hidden="true" />

      <section className="admin-shell" aria-label="Admin login">
        <article className="hero-body">
          <aside className="brand-panel">
            <h2>Nền tảng hỗ trợ và phân tích sức khỏe người dùng</h2>
            <p className="brand-copy">
              Theo dõi dữ liệu quan trọng, phát hiện bất thường và quản lý tài khoản.
            </p>

            <div className="feature-list">
              <p>Phân tích thời gian thực</p>
              <p>Quản trị tập trung</p>
              <p>Giám sát cảnh báo</p>
            </div>

            <div className="preview-media" aria-hidden="true">
              <img src={loginHealthGif} alt="" className="brand-gif" loading="lazy" />
            </div>
          </aside>

          <section className="login-panel">
            <h3>Admin Login</h3>
            <div className="login-center">
              <p className="panel-subtitle">Sử dụng tài khoản được cấp để truy cập hệ thống.</p>

              <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="admin@wello.vn" autoComplete="email" />

                <label htmlFor="password">Mật khẩu</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  autoComplete="current-password"
                />

                <label className="remember-row" htmlFor="rememberMe">
                  <input id="rememberMe" type="checkbox" defaultChecked />
                  <span>Duy trì đăng nhập</span>
                </label>

                <button type="submit">Đăng nhập</button>

                <a href="#" className="help-link">
                  Quên mật khẩu?
                </a>
              </form>
            </div>
          </section>
        </article>
      </section>
    </main>
  )
}

export default AdminLoginPage
