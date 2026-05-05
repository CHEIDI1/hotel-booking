export default function MapSection() {
  return (
    <div className="mt-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#0D2137]">LOCALISATION</h2>
        <p className="text-gray-500">Dakar, Sénégal</p>
      </div>
      <div className="overflow-hidden rounded-xl shadow">
        <iframe
          title="Localisation Luxury Hotel"
          src="https://www.google.com/maps?q=Dakar+Senegal&output=embed"
          className="w-full h-80 md:h-96"
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>
    </div>
  )
}
