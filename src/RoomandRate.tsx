
export default function Room() {
  const rooms = [
    { nom: "Single Room", Prix: 30000, image: "public/singleroom.jpg" },
    { nom: "Double Room", Prix: 40000, image: "public/Doubleroom.jpg" },
    { nom: "Twins Room", Prix: 50000, image: "public/twinsroom.webp" }
  ];

  return (
  <div>
    <section className="space-y-10">
      <div className="relative h-96 flex items-center justify-center text-center text-white">

        <img
          src="public/hotel.facil.jpg"
          alt=""
          className="absolute w-full h-full object-cover"
        />

    
        <div className="absolute w-full h-full bg-black/50"></div>

    
        <div className="relative">
          <h1 className="text-xl">Bienvenue à</h1>
          <h1 className="text-4xl md:text-5xl font-bold">LUXURY</h1>
          <h2 className="text-lg">Hotel</h2>
          <p className="text-sm mt-2">
            ici de la joie et de la paix du coeur
          </p>
        </div>
      </div>

      
      <div className="text-center px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          ROOMS AND RATES
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Chacune de nos chambres est conçue pour votre confort avec un design moderne
          et une vue exceptionnelle.
        </p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">

        {rooms.map((room, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">

            
            <img
              src={room.image}
              alt={room.nom}
              className="w-100 h-100 object-cover"
            />

        
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">{room.nom}</h2>
              <p className="text-yellow-600 font-bold mt-1">
                {room.Prix} FCFA 
              </p>
            </div>

          </div>
        ))}

      </div>

    </section>
    </div>
  );
}
