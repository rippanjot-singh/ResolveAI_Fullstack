import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  const { user, loading } = useSelector(state => state.auth)

  if (loading && !user) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50">
            <div className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-900 rounded animate-spin"></div>
        </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute