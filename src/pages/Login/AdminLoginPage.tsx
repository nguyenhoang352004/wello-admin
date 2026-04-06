import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../api/authService'
import './AdminLoginPage.css'
import loginHealthGif from '../../assets/img/download.gif'

function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await authService.login(email, password)
      if (response.success) {
        navigate('/home')
      } else {
        setError(response.message || 'Email hoặc mật khẩu không đúng')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.')
    } finally {
      setLoading(false)
    }
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
                {error && <div className="error-banner">{error}</div>}

                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@wello.vn"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label htmlFor="password">Mật khẩu</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <label className="remember-row" htmlFor="rememberMe">
                  <input id="rememberMe" type="checkbox" defaultChecked />
                  <span>Duy trì đăng nhập</span>
                </label>

                <button type="submit" disabled={loading}>
                  {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>

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

