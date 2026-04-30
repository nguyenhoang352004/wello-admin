import { useEffect, useState } from 'react'
import './UserSegmentationPage.css'
import SegmentSummaryGrid from './components/SegmentSummaryGrid'
import SegmentTabs from './components/SegmentTabs'
import UserSegmentTable from './components/UserSegmentTable'
import type { UserState, SegmentedUser } from './types'
import { stateTitle, stateAction } from './userSegmentationData'
import { engagementService } from '../../core/api/engagementService'

function UserSegmentationPage() {
  const [stats, setStats] = useState<Record<UserState, number>>({
    active: 0,
    'at-risk': 0,
    lapsed: 0,
    churned: 0
  })
  
  const [activeTab, setActiveTab] = useState<UserState>('active')
  const [tableUsers, setTableUsers] = useState<SegmentedUser[]>([])
  const [loadingTable, setLoadingTable] = useState(false)
  const [performedActions, setPerformedActions] = useState<Record<number, boolean>>({})

  const [loading, setLoading] = useState(true)
  const [loadingAction, setLoadingAction] = useState<Record<UserState, boolean>>({
    active: false,
    'at-risk': false,
    lapsed: false,
    churned: false
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  useEffect(() => {
    fetchUsersForTab(activeTab)
  }, [activeTab])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const data = await engagementService.getStats()
      setStats({
        active: data.ACTIVE || 0,
        'at-risk': data.WARNING || 0,
        lapsed: data.INACTIVE || 0,
        churned: data.CHURN || 0
      })
      setError(null)
    } catch (err: any) {
      console.error('Error fetching engagement stats:', err)
      setError('Không thể lấy dữ liệu phân loại người dùng')
    } finally {
      setLoading(false)
    }
  }

  const fetchUsersForTab = async (tab: UserState) => {
    const stateMap: Record<UserState, string> = {
      active: 'ACTIVE',
      'at-risk': 'WARNING',
      lapsed: 'INACTIVE',
      churned: 'CHURN'
    }
    try {
      setLoadingTable(true)
      const data = await engagementService.getUsersByGroup(stateMap[tab])
      // data looks like { id, email, name, lastOpenDays }
      const mapped = data.map((u: any) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        lastOpenDays: u.lastOpenDays,
        state: tab
      }))
      setTableUsers(mapped)
    } catch (err) {
      console.error('Error fetching users for group:', err)
      setTableUsers([])
    } finally {
      setLoadingTable(false)
    }
  }

  const handleNotifyGroup = async (state: UserState) => {
    const stateMap: Record<UserState, string> = {
      active: 'ACTIVE',
      'at-risk': 'WARNING',
      lapsed: 'INACTIVE',
      churned: 'CHURN'
    }
    
    const group = stateMap[state]
    
    try {
      setLoadingAction(prev => ({ ...prev, [state]: true }))
      const response = await engagementService.notifyGroup(group)
      if (response.success) {
        alert(`Thành công! Đã gửi cho ${response.sentCount} người dùng.`)
      }
    } catch (err) {
      console.error('Error notifying group:', err)
      alert('Có lỗi xảy ra khi gửi chiến dịch.')
    } finally {
      setLoadingAction(prev => ({ ...prev, [state]: false }))
    }
  }

  const handlePerformIndividualAction = async (id: number, state: UserState, name: string) => {
    const stateMap: Record<UserState, string> = {
      active: 'ACTIVE',
      'at-risk': 'WARNING',
      lapsed: 'INACTIVE',
      churned: 'CHURN'
    }
    const group = stateMap[state]

    try {
      setPerformedActions(prev => ({ ...prev, [id]: true }))
      const response = await engagementService.notifyUser(id, group)
      if (response.success) {
        // Optional: show a small toast or just let the button state indicate success
      }
    } catch (err) {
      console.error('Error notifying user:', err)
      alert(`Có lỗi xảy ra khi gửi cho ${name}.`)
      setPerformedActions(prev => ({ ...prev, [id]: false }))
    }
  }

  return (
    <section className="content-card user-seg-card" aria-label="Phân loại người dùng">
      <div className="content-card-header" style={{ marginBottom: '24px' }}>
        <div>
          <h2 className="content-card-title" style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Phân loại & Gắn kết người dùng</h2>
          <p style={{ color: '#64748b', marginTop: '8px' }}>Quản lý và thực hiện chiến dịch cho các nhóm người dùng khác nhau</p>
        </div>
      </div>

      <div className="user-seg-body">
        {error && <div className="error-message" style={{ color: '#dc2626', backgroundColor: '#fef2f2', padding: '12px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #fecaca' }}>{error}</div>}
        
        {loading && !error ? (
          <div className="loading-spinner" style={{ textAlign: 'center', padding: '40px', color: '#64748b', fontSize: '16px' }}>Đang tải dữ liệu người dùng...</div>
        ) : (
          <>
            <SegmentSummaryGrid 
              stats={stats} 
              stateTitle={stateTitle} 
              stateAction={stateAction} 
              onNotify={handleNotifyGroup}
              loadingAction={loadingAction}
            />

            <div style={{ marginTop: '40px', padding: '24px', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}>
              <div className="segment-table-wrap" style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100%', minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <SegmentTabs
                    activeTab={activeTab}
                    onChange={setActiveTab}
                    stats={stats}
                    stateTitle={stateTitle}
                  />
                  <button 
                    className="btn-add" 
                    style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', boxShadow: '0 4px 6px -1px rgb(59 130 246 / 0.5)' }}
                    onClick={() => handleNotifyGroup(activeTab)}
                    disabled={loadingAction[activeTab] || stats[activeTab] === 0}
                  >
                    {loadingAction[activeTab] ? 'Đang gửi...' : `Gửi chiến dịch toàn bộ nhóm`}
                  </button>
                </div>
                
                {loadingTable ? (
                  <div style={{ textAlign: 'center', padding: '60px', color: '#64748b', fontSize: '16px', backgroundColor: '#fff', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>Đang tải danh sách...</div>
                ) : (
                  <UserSegmentTable
                    rows={tableUsers}
                    stateTitle={stateTitle}
                    stateAction={stateAction}
                    performedActions={performedActions}
                    onPerformAction={handlePerformIndividualAction}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default UserSegmentationPage
