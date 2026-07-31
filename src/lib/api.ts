const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
const TOKEN_KEY = 'hotel-booking-token'

type ApiErrorPayload = { error?: string }

export function hasSession() {
  return Boolean(localStorage.getItem(TOKEN_KEY))
}

export function setSession(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
}

async function request<T>(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem(TOKEN_KEY)
  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })
  } catch {
    throw new Error('Le backend est arrêté. Lancez « npm run server » après avoir configuré backend/.env.')
  }
  let payload: T & ApiErrorPayload
  try {
    payload = await response.json() as T & ApiErrorPayload
  } catch {
    throw new Error('Le serveur est indisponible. Lancez aussi « npm run server » dans un second terminal.')
  }
  if (!response.ok) throw new Error(payload.error || 'Une erreur est survenue.')
  return payload
}

export const api = {
  register: (name: string, email: string, password: string) => request<{ token: string }>('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
  login: (email: string, password: string) => request<{ token: string }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  rooms: () => request<{ rooms: Array<{ id: string; name: string; price: number; capacity: number; image: string }> }>('/rooms'),
  reserve: (roomId: string, checkIn: string, checkOut: string, guests: number) => request<{ reservation: { id: string } }>('/reservations', { method: 'POST', body: JSON.stringify({ roomId, checkIn, checkOut, guests }) }),
  cancelReservation: (id: string) => request<{ reservation: { id: string } }>(`/reservations/${id}/cancel`, { method: 'PATCH' }),
  dashboard: () => request<{ statistics: { reservations: number; totalNights: number; totalSpent: number }; reservations: Array<{ id: string; checkIn: string; checkOut: string; nights: number; totalPrice: number; status: string; room: { name: string; image?: string; price?: number } }> }>('/reservations/dashboard'),
  allReservations: () => request<{ reservations: Array<{ id: string; checkIn: string; checkOut: string; nights: number; totalPrice: number; status: string; room: { name: string }; user: { fullName: string; email: string } }> }>('/reservations/all'),
  me: () => request<{ user: { id: number; name: string; email: string; createdAt: string } }>('/auth/me'),
  updateProfile: (name: string, email: string) => request<{ user: { id: number; name: string; email: string } }>('/auth/me', { method: 'PATCH', body: JSON.stringify({ name, email }) }),
  changePassword: (currentPassword: string, newPassword: string) => request<{ message: string }>('/auth/password', { method: 'PATCH', body: JSON.stringify({ currentPassword, newPassword }) }),
  deleteAccount: (password: string) => request<{ message: string }>('/auth/me', { method: 'DELETE', body: JSON.stringify({ password }) }),
}
