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
} from 'recharts'
import './DashboardPage.css'

const userGrowthData = [
  { name: 'Thứ 2', users: 400 },
  { name: 'Thứ 3', users: 450 },
  { name: 'Thứ 4', users: 380 },
  { name: 'Thứ 5', users: 590 },
  { name: 'Thứ 6', users: 680 },
  { name: 'Thứ 7', users: 850 },
  { name: 'Chủ nhật', users: 920 },
]

const foodStatusData = [
  { name: 'Đã duyệt', value: 85, color: '#34d399' },
  { name: 'Chờ duyệt', value: 12, color: '#fbbf24' },
  { name: 'Từ chối', value: 31, color: '#ef4444' },
]

function DashboardPage() {
  return (
    <div className="dashboard-content">
      {/* Stats row moved from MainPage */}
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

      <div className="charts-grid">
        {/* User Growth Chart */}
        <div className="chart-container area-chart-card">
          <h3>Tăng trưởng người dùng mới (7 ngày qua)</h3>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
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

        {/* Food Status Bar Chart */}
        <div className="chart-container bar-chart-card">
          <h3>Phân bổ trạng thái phê duyệt thực phẩm</h3>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={foodStatusData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Legend />
                <Bar dataKey="value" name="Số lượng" radius={[0, 10, 10, 0]} barSize={40}>
                  {foodStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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
