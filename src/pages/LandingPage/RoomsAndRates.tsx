import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoomCard from '../../components/RoomCard'
import ReservationModal from '../../components/ReservationModal'
import { hasSession } from '../../lib/api'
import { api } from '../../lib/api'

type Room = { id: string; name: string; price: number; capacity: number; image: string }

export default function RoomsAndRates() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [loadError, setLoadError] = useState('')
  const navigate = useNavigate()
  useEffect(() => { api.rooms().then(result => setRooms(result.rooms)).catch(() => setLoadError('Les chambres sont indisponibles pour le moment.')) }, [])
  const startReservation = (room: Room) => {
    if (!hasSession()) {
      navigate('/login', { state: { redirectTo: '/' } })
      return
    }
    setSelectedRoom(room)
  }
  return (
    <section className="py-16 px-6 md:px-20 bg-gray-50">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-2">Nos hébergements</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0D2137]">CHAMBRES & TARIFS</h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Chacune de nos chambres est conçue pour votre confort avec un design moderne et une vue exceptionnelle.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {rooms.map((room, index) => (
          <RoomCard key={room.id} id={room.id} nom={room.name} prix={room.price} image={room.image} onReserve={() => startReservation(room)} />
        ))}
      </div>
      {loadError && <p className="mt-6 text-center text-sm text-red-600">{loadError}</p>}
      {selectedRoom && <ReservationModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />}
    </section>
  )
}
