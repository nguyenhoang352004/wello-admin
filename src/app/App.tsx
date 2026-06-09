import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLoginPage } from '../features/auth'
import { MainPage } from '../features/main'
import { DashboardPage } from '../features/dashboard'
import { FoodModerationPage } from '../features/food-moderation'
import { WorkoutModerationPage } from '../features/workout-moderation'
import { UserSegmentationPage } from '../features/user-segmentation'
import { BadgeManagementPage } from '../features/badges'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLoginPage />} />
      <Route path="/home" element={<MainPage />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="food" element={<FoodModerationPage />} />
        <Route path="workout" element={<WorkoutModerationPage />} />
        <Route path="users" element={<UserSegmentationPage />} />
        <Route path="badges" element={<BadgeManagementPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
