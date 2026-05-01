export default function MapSection() {
  return (
    <section className="bg-stone-950 py-20 px-4">

      
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-2">
          LOCALISATION
        </h2>
        <p className="text-stone-400">
          Dakar, Sénégal
        </p>
      </div>

      
      <div className="max-w-5xl mx-auto overflow-hidden">
        <iframe
          title="Localisation"
          src="https://www.google.com/maps?q=Dakar&output=embed"
          className="w-full h-80 md:h-96"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>

    </section>
  );
}

