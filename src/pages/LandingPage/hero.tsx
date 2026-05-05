import { Link } from 'react-router-dom'
import heroImg from '../../assets/hero4.png'

export default function Hero() {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 px-6 md:px-20 text-white w-full max-w-2xl">
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#C9A84C] mb-3">
          Bienvenue à
        </p>
        <h1 className="text-5xl md:text-8xl font-bold leading-none mb-2">
          LUXURY
        </h1>
        <h2 className="text-xl md:text-4xl tracking-[0.4em] font-light mb-4">
          HOTELS
        </h2>
        <p className="text-xs md:text-base text-gray-300 mb-8 max-w-xs md:max-w-none">
          Réservez votre séjour et profitez d'un luxe redéfini aux tarifs les plus abordables.
        </p>
        <Link
          to="/register"
          className="inline-block bg-[#C9A84C] text-[#061d35] px-6 md:px-8 py-3 md:py-4 font-bold text-xs md:text-sm tracking-widest uppercase hover:opacity-90 transition"
        >
          RÉSERVER MAINTENANT
        </Link>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-center">
        <p className="text-sm tracking-widest mb-2">scroll</p>
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center mx-auto animate-bounce text-sm"
        >
          ↓
        </button>
      </div>
    </section>
  )
}
