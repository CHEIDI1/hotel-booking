import RoomCard from '../../components/RoomCard'

const rooms = [
  { nom: "Single Room", prix: 30000, image: "/singleroom.jpg" },
  { nom: "Double Room", prix: 40000, image: "/Doubleroom.jpg" },
  { nom: "Twins Room",  prix: 50000, image: "/twinsroom.webp" },
]

export default function RoomsAndRates() {
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
          <RoomCard key={index} nom={room.nom} prix={room.prix} image={room.image} />
        ))}
      </div>
    </section>
  )
}
