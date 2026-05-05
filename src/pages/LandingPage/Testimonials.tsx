const testimonials = [
  { nom: "Awa Diallo", message: "Très bon service, j'ai adoré mon séjour. Personnel attentionné et chambres magnifiques.", note: 4, image: "/client1.jpg" },
  { nom: "Rima Sow",   message: "Hôtel propre et personnel très accueillant. Je recommande vivement à tous.", note: 5, image: "/client2.jpg" },
]

export default function Testimonials() {
  return (
    <section className="py-16 px-6 md:px-20 bg-[#0D2137]">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-2">Ce qu'ils disent</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">AVIS CLIENTS</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {testimonials.map((item, index) => (
          <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <img
              src={item.image}
              alt={item.nom}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-[#C9A84C]"
            />
            <h3 className="text-white font-semibold text-lg">{item.nom}</h3>
            <p className="text-gray-400 mt-2 text-sm leading-relaxed">{item.message}</p>
            <div className="mt-3 text-[#C9A84C] text-xl">
              {'★'.repeat(item.note)}{'☆'.repeat(5 - item.note)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
