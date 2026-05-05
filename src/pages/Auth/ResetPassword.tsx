import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !email.includes('@')) { setError('Veuillez entrer un email valide'); return }
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-[#2d2b4e] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex overflow-hidden" style={{ minHeight: '400px' }}>

        <div className="flex-1 p-10 flex flex-col justify-center">
          <div className="mb-6">
            <p className="text-xs text-gray-400 mb-1">Votre logo ici</p>
            <p className="text-sm text-gray-500">Pas de panique !</p>
            <h1 className="text-3xl font-bold text-gray-800 mt-1">Mot de passe oublié</h1>
          </div>

          {sent ? (
            <div className="text-center py-6">
              <p className="text-4xl mb-3">✉️</p>
              <p className="text-lg font-bold text-[#C9A84C]">Email envoyé !</p>
              <p className="text-gray-400 text-sm mt-2">Vérifiez votre boîte mail.</p>
              <Link to="/login" className="mt-5 inline-block text-[#C9A84C] hover:underline text-sm font-semibold">← Retour à la connexion</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Email</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="test@gmail.com"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-gray-50"
                />
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button type="submit" className="w-full bg-[#C9A84C] text-white py-3 rounded-lg font-bold text-sm tracking-widest uppercase hover:opacity-90 transition">
                Envoyer le lien
              </button>
              <p className="text-center text-xs text-gray-400 mt-2">
                <Link to="/login" className="text-[#C9A84C] hover:underline">← Retour à la connexion</Link>
              </p>
            </form>
          )}
        </div>

        <div className="hidden md:flex flex-1 bg-[#fdf3e7] items-center justify-center p-10">
          <div className="text-center">
            <svg viewBox="0 0 200 180" className="w-44 mx-auto mb-4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="30" y="60" width="140" height="90" rx="8" fill="#C9A84C" opacity="0.15" />
              <rect x="30" y="60" width="140" height="90" rx="8" stroke="#C9A84C" strokeWidth="2" />
              <path d="M30 68 L100 115 L170 68" stroke="#C9A84C" strokeWidth="2" fill="none" />
              <circle cx="100" cy="40" r="22" fill="#fdf3e7" stroke="#C9A84C" strokeWidth="2" />
              <text x="88" y="47" fontSize="18" fill="#C9A84C">?</text>
            </svg>
            <p className="text-[#C9A84C] font-bold text-lg tracking-widest">LUXURY HOTEL</p>
            <p className="text-gray-400 text-xs mt-1">On vous aide à récupérer votre accès</p>
          </div>
        </div>

      </div>
    </div>
  )
}
