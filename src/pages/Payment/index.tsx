import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { api } from '../../lib/api'

type RoomInfo = { id: string; name: string; price: number }
type PaymentState = { room: RoomInfo; checkIn: string; checkOut: string; guests: number }

const METHODS = [
  { id: 'wave', label: 'Wave', icon: '💙', bg: '#E8F4FD', ring: '#1DA1F2' },
  { id: 'orange', label: 'Orange Money', icon: '🟠', bg: '#FFF1E0', ring: '#FF7900' },
  { id: 'paypal', label: 'PayPal', icon: '🅿️', bg: '#E8ECF7', ring: '#003087' },
  { id: 'card', label: 'Carte bancaire', icon: '💳', bg: '#EFEFF2', ring: '#0D2137' },
]

export default function Payment() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as PaymentState | undefined

  const [method, setMethod] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    api.me().then(data => setUserName(data.user.name)).catch(() => {})
  }, [])

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2d2b4e]">
        <div className="bg-white rounded-2xl p-10 text-center max-w-md">
          <p className="text-gray-700 mb-4">Aucune réservation en attente de paiement.</p>
          <button onClick={() => navigate('/')} className="bg-[#C9A84C] text-white px-6 py-3 rounded-lg font-bold">Retour à l'accueil</button>
        </div>
      </div>
    )
  }

  const { room, checkIn, checkOut, guests } = state
  const nights = Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
  const total = nights * room.price

  const handlePayment = async () => {
    if (!method) { setError('Choisissez un moyen de paiement.'); return }
    setError('')
    setLoading(true)
    try {
      await api.reserve(room.id, checkIn, checkOut, guests)
      setTimeout(() => {
        setLoading(false)
        setDone(true)
      }, 1200)
    } catch (cause) {
      setLoading(false)
      setError(cause instanceof Error ? cause.message : 'Paiement impossible.')
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2d2b4e] px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="text-green-600 text-5xl mb-3">✓</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Paiement reçu !</h1>
          <p className="text-sm text-gray-500 mb-6">Votre réservation est confirmée</p>
          <div className="text-left bg-gray-50 rounded-lg p-4 space-y-2 text-sm mb-6">
            <p><span className="text-gray-500">Client :</span> <span className="font-semibold">{userName}</span></p>
            <p><span className="text-gray-500">Chambre :</span> <span className="font-semibold">{room.name}</span></p>
            <p><span className="text-gray-500">Arrivée :</span> {new Date(checkIn).toLocaleDateString()}</p>
            <p><span className="text-gray-500">Départ :</span> {new Date(checkOut).toLocaleDateString()}</p>
            <p><span className="text-gray-500">Nuits :</span> {nights}</p>
            <p><span className="text-gray-500">Voyageurs :</span> {guests}</p>
            <p><span className="text-gray-500">Moyen de paiement :</span> {METHODS.find(m => m.id === method)?.label}</p>
            <p className="font-bold text-[#0D2137] pt-2 border-t">Total payé : {total.toLocaleString()} FCFA</p>
          </div>
          <div className="text-left bg-[#fdf3e7] rounded-lg p-4 mb-6">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-wide mb-2">Services inclus avec votre séjour</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>🧖 Accès Spa</li>
              <li>🏋️ Salle de sport</li>
              <li>🧺 Service de laverie</li>
              <li>🍽️ Restaurant</li>
              <li>🏊 Piscine</li>
              <li>🍸 Bar</li>
            </ul>
          </div>
          <button onClick={() => navigate('/dashboard')} className="w-full bg-[#C9A84C] text-white py-3 rounded-lg font-bold uppercase text-sm tracking-widest">
            Voir mon tableau de bord
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#2d2b4e] flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Paiement</h1>
        <p className="text-sm text-gray-500 mb-6">Finalisez votre réservation</p>

        <div className="bg-gray-50 rounded-lg p-4 space-y-1 text-sm mb-6">
          <p className="font-semibold text-gray-800">{room.name}</p>
          <p className="text-gray-500">{new Date(checkIn).toLocaleDateString()} → {new Date(checkOut).toLocaleDateString()} ({nights} nuit{nights > 1 ? 's' : ''})</p>
          <p className="text-gray-500">{guests} voyageur{guests > 1 ? 's' : ''}</p>
          <p className="font-bold text-[#0D2137] pt-1">Total : {total.toLocaleString()} FCFA</p>
        </div>

        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Moyen de paiement</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {METHODS.map(m => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMethod(m.id)}
              style={{
                backgroundColor: method === m.id ? m.bg : '#fff',
                borderColor: method === m.id ? m.ring : '#e5e7eb',
              }}
              className="border-2 rounded-xl py-4 flex flex-col items-center gap-1.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300"
            >
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{ backgroundColor: m.bg }}
              >
                {m.icon}
              </span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-[#C9A84C] text-white py-3 rounded-lg font-bold text-sm tracking-widest uppercase hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? 'Traitement en cours...' : 'Payer maintenant'}
        </button>
      </div>
    </div>
  )
}