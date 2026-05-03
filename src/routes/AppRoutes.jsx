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
import Chats from '../features/dashboard/studio/pages/Chats'
import Knowledge from '../features/dashboard/knowledge/pages/Knowledge'
import Tickets from '../features/dashboard/tickets/pages/Tickets'
import FocusArea from '../features/dashboard/tickets/pages/FocusArea'
import FormsList from '../features/dashboard/forms/pages/Forms'
import CreateForm from '../features/dashboard/forms/pages/CreateForm'
import Results from '../features/dashboard/forms/pages/Results'
import Leads from '../features/dashboard/leads/pages/Leads'

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
          <Route path="chats" element={<Chats />} />
          <Route path="editor" element={<CreateAgent />} />
          <Route path="editor/:id" element={<CreateAgent />} />
        </Route>
        <Route path="knowledge" element={<Knowledge />} />
        <Route path="tickets">
          <Route index element={<Tickets />} />
          <Route path="focus-area" element={<FocusArea />} />
        </Route>
        <Route path="forms">
          <Route index element={<FormsList />} />
          <Route path="create" element={<CreateForm />} />
          <Route path="edit/:id" element={<CreateForm />} />
          <Route path="results" element={<Results />} />
        </Route>
        <Route path="leads" element={<Leads />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes