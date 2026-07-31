import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { hasSession } from '../lib/api'

interface ReservationModalProps {
  room: { id: string; name: string; price: number; capacity: number }
  onClose: () => void
}

export default function ReservationModal({ room, onClose }: ReservationModalProps) {
  const navigate = useNavigate()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [error, setError] = useState('')

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!hasSession()) {
      navigate('/login')
      return
    }
    if (!checkIn || !checkOut) {
      setError('Veuillez choisir les dates.')
      return
    }
    navigate('/payment', { state: { room, checkIn, checkOut, guests } })
  }

  return (
    <div className="fixed inset-0 z-[60] bg-[#08192b]/70 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="reservation-title">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-[#C9A84C]">Réservation</p>
            <h2 id="reservation-title" className="text-xl font-bold text-[#0D2137]">{room.name}</h2>
            <p className="text-sm text-gray-500">{room.price.toLocaleString()} FCFA / nuit</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl" aria-label="Fermer">×</button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm font-medium text-[#0D2137]">Arrivée<input required min={new Date().toISOString().slice(0, 10)} type="date" value={checkIn} onChange={event => setCheckIn(event.target.value)} className="mt-1 w-full rounded-lg border p-2.5" /></label>
            <label className="text-sm font-medium text-[#0D2137]">Départ<input required min={checkIn || new Date().toISOString().slice(0, 10)} type="date" value={checkOut} onChange={event => setCheckOut(event.target.value)} className="mt-1 w-full rounded-lg border p-2.5" /></label>
          </div>
          <label className="block text-sm font-medium text-[#0D2137]">Voyageurs<select value={guests} onChange={event => setGuests(Number(event.target.value))} className="mt-1 w-full rounded-lg border p-2.5">{Array.from({ length: room.capacity }, (_, index) => index + 1).map(count => <option key={count} value={count}>{count} voyageur{count > 1 ? 's' : ''}</option>)}</select></label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {!hasSession() && <p className="text-sm text-gray-500">Connectez-vous pour confirmer votre réservation.</p>}
          <button className="w-full rounded-lg bg-[#C9A84C] py-3 text-sm font-bold uppercase tracking-wider text-[#0D2137]">
            {hasSession() ? 'Continuer vers le paiement' : 'Se connecter pour réserver'}
          </button>
        </form>
      </div>
    </div>
  )
}
