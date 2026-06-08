import { useEffect, useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend,
  PieChart,
  Pie,
} from 'recharts'
import { dashboardService } from '../../core/api/dashboardService'
import type { DashboardSummary, GrowthData, PieData } from '../../core/api/dashboardService'
import './DashboardPage.css'
import LoadingSpinner from '../../shared/components/LoadingSpinner'


// Helper to get colors for Moderation Stats
const getModerationColor = (name: string) => {
  if (name.includes('Đã duyệt')) return '#34d399'
  if (name.includes('Chờ duyệt')) return '#fbbf24'
  if (name.includes('Từ chối')) return '#ef4444'
  return '#94a3b8'
}

// Helper to get colors for Engagement Analysis
const getEngagementColor = (name: string) => {
  if (name.includes('Đang duy trì tốt')) return '#10b981'
  if (name.includes('Sắp mất nhịp')) return '#facc15'
  if (name.includes('Cần quay lại')) return '#f97316'
  if (name.includes('Đã bỏ cuộc')) return '#ef4444'
  return '#94a3b8'
}

function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [growthData, setGrowthData] = useState<GrowthData[]>([])
  const [moderationData, setModerationData] = useState<PieData[]>([])
  const [engagementData, setEngagementData] = useState<PieData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        console.log('Starting to fetch dashboard data...')
        const [summaryRes, growthRes, moderationRes, engagementRes] = await Promise.all([
          dashboardService.getSummary().catch(e => { console.error('Summary API fail:', e); throw e }),
          dashboardService.getUserGrowth().catch(e => { console.error('Growth API fail:', e); throw e }),
          dashboardService.getModerationStats().catch(e => { console.error('Moderation API fail:', e); throw e }),
          dashboardService.getUserEngagement().catch(e => { console.error('Engagement API fail:', e); throw e }),
        ])

        console.log('Dashboard data fetched successfully:', { summaryRes, growthRes, moderationRes, engagementRes })
        const engagementOrder = ['Đang duy trì tốt', 'Sắp mất nhịp', 'Cần quay lại', 'Đã bỏ cuộc']
        const sortedEngagement = engagementRes.sort((a, b) => {
          return engagementOrder.indexOf(a.name) - engagementOrder.indexOf(b.name)
        })

        setSummary(summaryRes)
        setGrowthData(growthRes)
        setModerationData(moderationRes)
        setEngagementData(sortedEngagement)
        setError(null)
      } catch (err: any) {
        console.error('Final Dashboard Error:', err)
        setError(`Lỗi: ${err.message || 'Không thể kết nối đến Server'}. Vui lòng kiểm tra lại Backend tại port 8080.`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="dashboard-content dashboard-loading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <LoadingSpinner message="Đang tải dữ liệu tổng quan..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-content dashboard-error">
        <div className="error-message">⚠️ {error}</div>
      </div>
    )
  }

  return (
    <div className="dashboard-content">
      {/* Stats row */}
      <div className="stats-grid">
        <div className="stat-card stat-card--teal">
          <div className="stat-icon">🥦</div>
          <div>
            <p className="stat-value">{summary?.totalFoods || 0}</p>
            <p className="stat-label">Tổng thực phẩm</p>
          </div>
        </div>
        <div className="stat-card stat-card--blue">
          <div className="stat-icon">👥</div>
          <div>
            <p className="stat-value">{summary?.totalUsers || 0}</p>
            <p className="stat-label">Tổng người dùng</p>
          </div>
        </div>
        <div className="stat-card stat-card--green">
          <div className="stat-icon">✅</div>
          <div>
            <p className="stat-value">{summary?.activeToday || 0}</p>
            <p className="stat-label">Hoạt động hôm nay</p>
          </div>
        </div>
        <div className="stat-card stat-card--orange">
          <div className="stat-icon">⏳</div>
          <div>
            <p className="stat-value">{summary?.pendingApprovals || 0}</p>
            <p className="stat-label">Chờ phê duyệt</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        {/* User Growth Chart */}
        <div className="chart-container area-chart-card">
          <h3>📈 Tăng trưởng người dùng mới (7 ngày qua)</h3>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Engagement Pie Chart */}
        <div className="chart-container pie-chart-card">
          <h3>🎯 Phân tích mức độ gắn bó</h3>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getEngagementColor(entry.name)} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Food Status Bar Chart */}
        <div className="chart-container bar-chart-card">
          <h3>📋 Trạng thái kiểm duyệt hệ thống</h3>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={moderationData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="#94a3b8" width={80} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" name="Số lượng" radius={[0, 10, 10, 0]} barSize={35}>
                  {moderationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getModerationColor(entry.name)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
