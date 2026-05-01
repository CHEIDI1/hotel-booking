export default function Contact() {
  return (<div>
    <section id="Contact" className="px-4 py-12 bg-gray-100">
        <div className="bg-blue-600 text-white text-center py-4 rounded-t-2xl">
  <h1 className="text-xl md:text-2xl font-bold">
    Contactez-nous
  </h1>
  <p className="text-sm opacity-90">
    Nous sommes disponibles pour vous répondre
  </p>
</div>
      
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        

        
        <form className="space-y-5">

          
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Nom</label>
            <input
              type="text"
              placeholder="Votre nom"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Adresse Email</label>
            <input
              type="email"
              placeholder="Votre email"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Message</label>
            <textarea
              placeholder="Votre message"
    
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            ></textarea>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Date</label>
            <input
              type="date"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition duration-300"
          >
            Envoyer
          </button>

        </form>
      </div>

    </section>
    </div>
  );
}

