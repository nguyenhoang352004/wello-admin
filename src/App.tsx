import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLoginPage from './pages/Login/AdminLoginPage'
import MainPage from './pages/Main/MainPage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import FoodModerationPage from './pages/FoodModeration/FoodModerationPage'
import UserSegmentationPage from './pages/UserSegmentation/UserSegmentationPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLoginPage />} />
      <Route path="/home" element={<MainPage />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="food" element={<FoodModerationPage />} />
        <Route path="users" element={<UserSegmentationPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
