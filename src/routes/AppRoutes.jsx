import { Route, Routes } from 'react-router-dom'
import Login from '../features/auth/pages/Login'
import SignUp from '../features/auth/pages/SignUp'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useEffect } from 'react'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from '../features/dashboard/home/pages/Dashboard'
import Agents from '../features/dashboard/studio/pages/Agents'
import CreateAgent from '../features/dashboard/studio/pages/CreateAgent'
import Analytics from '../features/dashboard/studio/pages/Analytics'
import Playground from '../features/dashboard/studio/pages/Playground'
import Knowledge from '../features/dashboard/knowledge/pages/Knowledge'
import Tickets from '../features/dashboard/tickets/pages/Tickets'

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
          <Route path="analytics" element={<Analytics />} />
          <Route path="playground" element={<Playground />} />
          <Route path="editor" element={<CreateAgent />} />
          <Route path="editor/:id" element={<CreateAgent />} />
        </Route>
        <Route path="knowledge" element={<Knowledge />} />
        <Route path="tickets" element={<Tickets />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes