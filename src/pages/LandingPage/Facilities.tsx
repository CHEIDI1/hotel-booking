export default function Facilities() {
  const facilities = [
    { title: "THE GYM", img: "/GYM.jpg" },
    { title: "POOLSIDE BAR", img: "/POOLSIDE.jpg" },
    { title: "THE SPA", img: "/SPA.jpg" },
    { title: "SWIMMING POOL", img: "/SWIM.jpg" },
    { title: "RESTAURANT", img: "/RESTO.jpg" },
    { title: "LAUNDRY", img: "/LUANDRY.jpg" },
  ]

  return (
    <section id="facilities" className="py-16 px-6 md:px-20 bg-white">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-2">Ce que nous offrons</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0D2137]">INSTALLATIONS</h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Nous souhaitons que votre séjour soit inoubliable. Profitez de nos équipements de classe mondiale.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {facilities.map((item, index) => (
          <div key={index} className="relative h-56 overflow-hidden group rounded">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-4">
              <h3 className="text-white font-bold tracking-widest text-sm">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
