import { Navigate, useLocation } from 'react-router-dom'
import { hasSession } from '../lib/api'

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  return hasSession() ? children : <Navigate to="/login" replace state={{ redirectTo: location.pathname }} />
}
