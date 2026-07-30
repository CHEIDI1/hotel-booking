
interface RoomCardProps {
  id: string
  nom: string
  prix: number
  image: string
  onReserve: () => void
}

export default function RoomCard({ nom, prix, image, onReserve }: RoomCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img src={image} alt={nom} className="w-full h-52 object-cover" />
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-[#0D2137]">{nom}</h2>
        <p className="text-[#C9A84C] font-bold mt-1">{prix.toLocaleString()} FCFA / nuit</p>
        <button onClick={onReserve} className="mt-4 w-full rounded-lg bg-[#0D2137] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#C9A84C] hover:text-[#0D2137]">Réserver cette chambre</button>
      </div>
    </div>
  )
}
