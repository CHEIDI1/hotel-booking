export default function Home() {
  return (
   
  
    <div>
      <section id="Home" className="w-full"> 
        <div className="relative w-full h-screen">
          <img
            src="public/hotel.acc.jpg"
            alt="hotel"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-4">

            <h1 className="text-2xl md:text-4xl font-light">Bienvenue à</h1>
            <h1 className="text-5xl md:text-7xl font-bold text-yellow-400">
              LUXURY
            </h1>
            <h2 className="text-3xl md:text-5xl font-semibold">Hotel</h2>

            <p className="mt-4 text-lg md:text-xl max-w-2xl">
              Ici de la joie et de la paix du cœur
            </p>

          </div>
        </div>

      
        <div className="py-16 px-6 bg-gray-50">

          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">

            
            <div className="flex-1 text-center md:text-left">

              <p className="text-lg mb-4">
                Tous nos types de chambres incluent le petit-déjeuner gratuit
              </p>

              <h1 className="text-3xl font-bold">Luxury Hotel</h1>

              <p className="text-gray-600 mt-4">
                Vivez une expérience unique de confort, d’élégance et de tranquillité.
                Profitez de chambres raffinées, d’un service premium et d’un séjour inoubliable.
              </p>

              <button className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition">
                Réserver
              </button>

            </div>

            
            <div className="flex-1">
              <img
                src="public/chambre0.jpg"
                alt="hotel room"
                className="w-full rounded-xl shadow-lg"
              />
            </div>

          </div>
        </div>

    
        <div className="py-16 px-6 bg-white">

          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">

            
            <div className="flex-1 text-center md:text-left">

              <h1 className="text-3xl font-bold mb-4">
                Laisse tes soucis dans le sable
              </h1>

              <p className="text-gray-600">
                Laisse tes soucis dans le sable et profite pleinement de la sérénité de l’océan.
                Ici, chaque instant est une invitation à la détente.
              </p>

              <button className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition">
                Réserver
              </button>

            </div>

            
            <div className="flex-1">
              <img
                src="public/plage.jpg"
                alt="plage"
                className="w-full rounded-xl shadow-lg"
              />
            </div>

          </div>
        </div>

      </section>

    </div>
  );

  
}

