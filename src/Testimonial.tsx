export default function Testimonial(){

  const data = [
    {
      nom: "Awa",
      message: "Très bon service, j’ai aimé mon séjour.",
      note: 4,
      image: "public/client1.jpg" 
    },
    {
      nom: "Rima",
      message: "Hôtel propre et personnel accueillant.",
      note: 5,
      image: "public/client2.jpg"
    }
  ];

  return (
    <section id="testimonial" className="py-10 px-5 bg-gray-100">
      
      <h2 className="text-2xl font-bold text-center mb-8">
        Avis clients
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {data.map((item, index) => (
          <div 
            key={index} 
            className="bg-white p-5 rounded-xl shadow-md">

            <img 
              src={item.image} 
              alt={item.nom}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />

            
            <h3 className="text-lg font-semibold text-center">
              {item.nom}
            </h3>

            
            <p className="text-gray-600 text-center mt-2">
              {item.message}
            </p>

            
            <div className="text-center mt-3 text-yellow-500 text-xl">
              {"⭐".repeat(item.note)}
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

 




