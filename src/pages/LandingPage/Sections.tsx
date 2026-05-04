import heroImg from '../../assets/hero.png'
import hero1Img from '../../assets/hero1.png'
import { Link } from 'react-router-dom'

export default function Sections() {
  return (
    <div>
      {/* Section 1 */}
      <section className="flex flex-col md:flex-row items-center py-16 px-6 md:px-20 gap-10">
        <div className="flex-1">
          <div className="border-l-4 border-[#C9A84C] pl-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D2137] mb-4">
              Luxury redefined
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Nos chambres sont conçues pour vous transporter dans un environnement fait pour la détente. 
            Oubliez le quotidien et trouvez votre paradis privé.
          </p>
          <Link
            to="/register"
            className="inline-block bg-[#C9A84C] text-white px-6 py-3 text-sm font-bold tracking-widest uppercase hover:opacity-90 transition"
          >
            EXPLORER
          </Link>
        </div>
        <div className="flex-1">
          <img src={heroImg} alt="Luxury room" className="w-full h-72 object-cover rounded" />
        </div>
      </section>

      {/* Section 2 */}
      <section className="flex flex-col md:flex-row-reverse items-center py-16 px-6 md:px-20 gap-10 bg-gray-50">
        <div className="flex-1">
          <div className="border-l-4 border-[#C9A84C] pl-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D2137] mb-4">
              Leave your worries in the sand
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Nous aimons la vie à la plage. Être proche de l'océan avec accès à une plage de sable sans fin 
            garantit un état d'esprit relaxant.
          </p>
          <Link
            to="/register"
            className="inline-block bg-[#C9A84C] text-white px-6 py-3 text-sm font-bold tracking-widest uppercase hover:opacity-90 transition"
          >
            EXPLORER
          </Link>
        </div>
        <div className="flex-1">
          <img src={hero1Img} alt="Beach" className="w-full h-72 object-cover rounded" />
        </div>
      </section>
    </div>
  )
}