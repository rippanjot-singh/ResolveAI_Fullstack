import { Route, Routes } from 'react-router-dom'
import Login from '../features/auth/pages/Login'
import SignUp from '../features/auth/pages/SignUp'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useEffect } from 'react'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from '../features/dashboard/home/pages/Dashboard'
import Agents from '../features/dashboard/studio/pages/Agents'
import CreateAgent from '../features/dashboard/studio/pages/CreateAgent'

const AppRoutes = () => {

  const { fetchMe } = useAuth();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='/dashboard' element={<ProtectedRoute />} >
        <Route index element={<Dashboard />} />
        <Route path="studio">
          <Route index element={<Agents />} />
          <Route path="agents" element={<Agents />} />
          <Route path="editor" element={<CreateAgent />} />
          <Route path="editor/:id" element={<CreateAgent />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes