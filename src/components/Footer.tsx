import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#0D2137] text-white py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo + description */}
        <div>
          <h2 className="text-2xl font-bold text-[#C9A84C] tracking-widest mb-4">
            LUXURY HOTEL
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Profitez d'une expérience hôtelière unique alliant confort, élégance et service irréprochable.
          </p>
        </div>

        {/* Liens rapides */}
        <div>
          <h3 className="text-[#C9A84C] font-bold tracking-widest text-sm uppercase mb-4">
            Liens rapides
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-[#C9A84C] transition">Accueil</Link></li>
            <li><Link to="/contact" className="hover:text-[#C9A84C] transition">Contact</Link></li>
            <li><Link to="/login" className="hover:text-[#C9A84C] transition">Connexion</Link></li>
            <li><Link to="/register" className="hover:text-[#C9A84C] transition">Réserver</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[#C9A84C] font-bold tracking-widest text-sm uppercase mb-4">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>📍 123 Avenue du Palais, Dakar</li>
            <li>📞 +221 77 853 52 93</li>
            <li>📩 contact@luxuryhotel.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
        © 2025 Luxury Hotel. Tous droits réservés.
      </div>
    </footer>
  )
}