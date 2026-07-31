import { useEffect, useState } from 'react'
import { api } from '../../lib/api'

type ReservationItem = {
  id: string
  checkIn: string
  checkOut: string
  nights: number
  totalPrice: number
  status: string
  room: { name: string }
  user: { fullName: string; email: string }
}

export default function Admin() {
  const [reservations, setReservations] = useState<ReservationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.allReservations()
      .then(data => setReservations(data.reservations))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="p-10 text-center">Chargement...</p>
  if (error) return <p className="p-10 text-center text-red-500">{error}</p>

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Toutes les réservations</h1>
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Chambre</th>
                <th className="px-4 py-3">Arrivée</th>
                <th className="px-4 py-3">Départ</th>
                <th className="px-4 py-3">Nuits</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(r => (
                <tr key={r.id} className="border-t">
                  <td className="px-4 py-3">{r.user?.fullName}</td>
                  <td className="px-4 py-3">{r.user?.email}</td>
                  <td className="px-4 py-3">{r.room?.name}</td>
                  <td className="px-4 py-3">{new Date(r.checkIn).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{new Date(r.checkOut).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{r.nights}</td>
                  <td className="px-4 py-3">{r.totalPrice} €</td>
                  <td className="px-4 py-3">
                    <span className={r.status === 'confirmed' ? 'text-green-600' : 'text-red-500'}>
                      {r.status === 'confirmed' ? 'Confirmée' : 'Annulée'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
