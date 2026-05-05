interface RoomCardProps {
  nom: string
  prix: number
  image: string
}

export default function RoomCard({ nom, prix, image }: RoomCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img src={image} alt={nom} className="w-full h-52 object-cover" />
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-[#0D2137]">{nom}</h2>
        <p className="text-[#C9A84C] font-bold mt-1">{prix.toLocaleString()} FCFA / nuit</p>
      </div>
    </div>
  )
}
