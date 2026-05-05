import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ nom: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.nom || !form.email || !form.password || !form.confirm) { setError('Tous les champs sont requis'); return }
    if (!form.email.includes('@')) { setError('Email invalide'); return }
    if (form.password.length < 6) { setError('Mot de passe trop court (min. 6 caractères)'); return }
    if (form.password !== form.confirm) { setError('Les mots de passe ne correspondent pas'); return }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#2d2b4e] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex overflow-hidden" style={{ minHeight: '520px' }}>

        {/* Gauche — formulaire */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <div className="mb-6">
            <p className="text-xs text-gray-400 mb-1">Votre logo ici</p>
            <p className="text-sm text-gray-500">Rejoignez-nous !</p>
            <h1 className="text-3xl font-bold text-gray-800 mt-1">Inscription</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Nom complet', name: 'nom', type: 'text', placeholder: 'Votre nom' },
              { label: 'Email', name: 'email', type: 'email', placeholder: 'test@gmail.com' },
              { label: 'Mot de passe', name: 'password', type: 'password', placeholder: '••••••••' },
              { label: 'Confirmer le mot de passe', name: 'confirm', type: 'password', placeholder: '••••••••' },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">{f.label}</label>
                <input
                  name={f.name} type={f.type} placeholder={f.placeholder}
                  value={form[f.name as keyof typeof form]} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-gray-50"
                />
              </div>
            ))}
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button type="submit" className="w-full bg-[#C9A84C] text-white py-3 rounded-lg font-bold text-sm tracking-widest uppercase hover:opacity-90 transition">
              S'inscrire
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-[#C9A84C] font-semibold hover:underline">Se connecter</Link>
          </p>
          <p className="text-center mt-2">
            <Link to="/" className="text-xs text-gray-300 hover:text-gray-400">← Retour à l'accueil</Link>
          </p>
        </div>

        {/* Droite — illustration */}
        <div className="hidden md:flex flex-1 bg-[#fdf3e7] items-center justify-center p-10">
          <div className="text-center">
            <svg viewBox="0 0 200 220" className="w-48 mx-auto mb-4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="100" cy="210" rx="40" ry="6" fill="#e0d5c5" />
              <rect x="115" y="155" width="35" height="28" rx="4" fill="#C9A84C" />
              <rect x="122" y="150" width="20" height="8" rx="3" fill="#a07830" />
              <line x1="115" y1="168" x2="150" y2="168" stroke="#a07830" strokeWidth="1.5" />
              <circle cx="118" cy="183" r="3" fill="#555" />
              <circle cx="147" cy="183" r="3" fill="#555" />
              <rect x="88" y="175" width="10" height="30" rx="5" fill="#2d2b4e" />
              <rect x="102" y="175" width="10" height="30" rx="5" fill="#2d2b4e" />
              <ellipse cx="93" cy="205" rx="8" ry="4" fill="#1a1a2e" />
              <ellipse cx="107" cy="205" rx="8" ry="4" fill="#1a1a2e" />
              <rect x="82" y="130" width="36" height="50" rx="10" fill="#e8734a" />
              <rect x="68" y="132" width="16" height="10" rx="5" fill="#e8734a" />
              <rect x="116" y="150" width="16" height="10" rx="5" fill="#e8734a" />
              <circle cx="100" cy="118" r="18" fill="#f5cba7" />
              <ellipse cx="100" cy="103" rx="18" ry="8" fill="#2d2b4e" />
              <circle cx="94" cy="116" r="2" fill="#333" />
              <circle cx="106" cy="116" r="2" fill="#333" />
              <path d="M94 123 Q100 128 106 123" stroke="#c0825a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <text x="30" y="80" fontSize="14" fill="#C9A84C" opacity="0.6">★</text>
              <text x="155" y="60" fontSize="10" fill="#C9A84C" opacity="0.4">★</text>
            </svg>
            <p className="text-[#C9A84C] font-bold text-lg tracking-widest">LUXURY HOTEL</p>
            <p className="text-gray-400 text-xs mt-1">Votre séjour de rêve vous attend</p>
          </div>
        </div>

      </div>
    </div>
  )
}
