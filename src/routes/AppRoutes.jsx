import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../features/auth/pages/Login'
import SignUp from '../features/auth/pages/SignUp'
import Dashboard from '../features/dashboard/home/pages/Dashboard'

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes