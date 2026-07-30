import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, clearSession } from '../lib/api'

export default function Account() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({ name: '', email: '' })
  const [passwords, setPasswords] = useState({ current: '', next: '' })
  const [deletePassword, setDeletePassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api.me().then(({ user }) => setProfile({ name: user.name, email: user.email })).catch(() => { clearSession(); navigate('/login', { replace: true }) })
  }, [navigate])

  const handle = async (action: () => Promise<{ message?: string }>) => {
    setMessage(''); setError('')
    try { const result = await action(); setMessage(result.message || 'Modifications enregistrées.') } catch (cause) { setError(cause instanceof Error ? cause.message : 'Action impossible.') }
  }

  return <main className="min-h-screen bg-gray-50 px-4 py-12"><div className="mx-auto max-w-2xl space-y-6">
    <Link to="/dashboard" className="text-sm font-medium text-[#0D2137] hover:text-[#C9A84C]">← Retour au tableau de bord</Link>
    <div><p className="text-xs uppercase tracking-[.2em] text-[#C9A84C]">Espace client</p><h1 className="text-3xl font-bold text-[#0D2137]">Mon compte</h1></div>
    {message && <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">{message}</p>}{error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <form onSubmit={event => { event.preventDefault(); void handle(() => api.updateProfile(profile.name, profile.email)) }} className="rounded-2xl bg-white p-6 shadow-sm space-y-4"><h2 className="text-lg font-bold text-[#0D2137]">Informations personnelles</h2><label className="block text-sm font-medium">Nom<input required value={profile.name} onChange={event => setProfile({ ...profile, name: event.target.value })} className="mt-1 w-full rounded-lg border p-2.5" /></label><label className="block text-sm font-medium">Email<input required type="email" value={profile.email} onChange={event => setProfile({ ...profile, email: event.target.value })} className="mt-1 w-full rounded-lg border p-2.5" /></label><button className="rounded-lg bg-[#0D2137] px-4 py-2.5 text-sm font-semibold text-white">Enregistrer</button></form>
    <form onSubmit={event => { event.preventDefault(); void handle(() => api.changePassword(passwords.current, passwords.next).then(result => { setPasswords({ current: '', next: '' }); return result })) }} className="rounded-2xl bg-white p-6 shadow-sm space-y-4"><h2 className="text-lg font-bold text-[#0D2137]">Changer le mot de passe</h2><input required type="password" placeholder="Mot de passe actuel" value={passwords.current} onChange={event => setPasswords({ ...passwords, current: event.target.value })} className="w-full rounded-lg border p-2.5" /><input required minLength={6} type="password" placeholder="Nouveau mot de passe (6 caractères minimum)" value={passwords.next} onChange={event => setPasswords({ ...passwords, next: event.target.value })} className="w-full rounded-lg border p-2.5" /><button className="rounded-lg bg-[#0D2137] px-4 py-2.5 text-sm font-semibold text-white">Mettre à jour</button></form>
    <form onSubmit={event => { event.preventDefault(); if (confirm('Supprimer définitivement votre compte et vos réservations ?')) void handle(() => api.deleteAccount(deletePassword).then(result => { clearSession(); navigate('/'); return result })) }} className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm space-y-4"><h2 className="text-lg font-bold text-red-700">Supprimer mon compte</h2><p className="text-sm text-gray-500">Cette action supprime aussi vos réservations.</p><input required type="password" placeholder="Confirmez votre mot de passe" value={deletePassword} onChange={event => setDeletePassword(event.target.value)} className="w-full rounded-lg border p-2.5" /><button className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white">Supprimer définitivement</button></form>
  </div></main>
}
