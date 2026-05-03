import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#08192b77] text-white px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#C9A84C] tracking-widest">
          LUXURY HOTEL
        </Link>

        {/* Menu desktop */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          <li><Link to="/" className="hover:text-[#C9A84C] transition">Accueil</Link></li>
          <li><Link to="/contact" className="hover:text-[#C9A84C] transition">Contact</Link></li>
          <li><Link to="/dashboard" className="hover:text-[#C9A84C] transition">Mon espace</Link></li>
        </ul>

        {/* Boutons auth */}
        <div className="hidden md:flex gap-3">
          <Link to="/login" className="border border-[#C9A84C] text-[#C9A84C] px-4 py-2 text-sm rounded hover:bg-[#C9A84C] hover:text-[#0D2137] transition">
            Connexion
          </Link>
          <Link to="/register" className="bg-[#C9A84C] text-[#0D2137] px-4 py-2 text-sm rounded font-bold hover:opacity-90 transition">
            Réserver
          </Link>
        </div>

        {/* Burger mobile */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 px-4 pb-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-[#C9A84C]">Accueil</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-[#C9A84C]">Contact</Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-[#C9A84C]">Mon espace</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-[#C9A84C]">Connexion</Link>
          <Link to="/register" onClick={() => setMenuOpen(false)} className="hover:text-[#C9A84C]">Réserver</Link>
        </div>
      )}
    </nav>
  )
} 
