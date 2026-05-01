
export default function Facilities() {
  const facilities = [
    { title: "THE GYM", img: "public/GYM.jpg" },
    { title: "POOLSIDE BAR", img: "public/POOLSIDE.jpg" },
    { title: "THE SPA", img: "public/SPA.jpg" },
    { title: "SWIMMING POOL", img: "public/SWIM.jpg" },
    { title: "RESTAURANT", img: "public/RESTO.jpg" },
    { title: "LAUNDRY", img: "public/LUANDRY.jpg" },
  ];

  return (
    <div>
    <section className="p-4 space-y-10">

      <div className="relative h-200 flex items-center justify-center text-center text-white">
        <img src="public/hotel.facil.jpg" alt="" className="absolute w-full h-full object-cover"/>

        <div className="absolute w-50 h-50 bg-black/10"></div>

        <div className="relative">
          <h1 className="text-4xl">Bienvenue à</h1>
          <h1 className="text-6xl font-bold">LUXURY</h1>
          <h2 className="text-lg">Hotel</h2>
        </div>

      </div>

      
      <div className="text-center">
        <h1 className="text-2xl font-bold">INSTALLATIONS</h1>
        <p className="text-gray-600">
          Nous souhaitons que votre séjour soit inoubliable.
        </p>
      </div>

      
      <div className="h-screen overflow-y-scroll flex flex-col gap-4">
        {facilities.map((item, index) => (
          <div key={index} className="relative w-250 h-250">

            <img
              src={item.img}
              alt=""
              className="w-250 h-250 object-cover p-15"
            />

           <h1 className="absolute bottom-20 left-30 text-white font-bold bg-black/50 px-5">
            {item.title}
            </h1>

          </div>
        ))}
      </div>

    </section>
    </div>
  );
}

