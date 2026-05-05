import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface Reservation {
  id: number
  hotel: string
  chambre: string
  dateArrivee: string
  dateDepart: string
  prix: number
  statut: 'En cours' | 'Confirmée' | 'Annulée'
}

const mockReservations: Reservation[] = [
  { id: 1, hotel: 'Luxury Hotel Dakar', chambre: 'Suite Royale', dateArrivee: '2025-05-10', dateDepart: '2025-05-15', prix: 250000, statut: 'Confirmée' },
  { id: 2, hotel: 'Luxury Hotel Dakar', chambre: 'Double Room', dateArrivee: '2025-06-01', dateDepart: '2025-06-03', prix: 80000, statut: 'En cours' },
]

const mockHistorique: Reservation[] = [
  { id: 3, hotel: 'Luxury Hotel Dakar', chambre: 'Single Room', dateArrivee: '2025-03-05', dateDepart: '2025-03-07', prix: 60000, statut: 'Annulée' },
  { id: 4, hotel: 'Luxury Hotel Dakar', chambre: 'Twins Room', dateArrivee: '2025-01-20', dateDepart: '2025-01-25', prix: 250000, statut: 'Confirmée' },
]

const lineData = [
  { month: 'Jan', current: 120, last: 80 },
  { month: 'Fév', current: 180, last: 120 },
  { month: 'Mar', current: 150, last: 140 },
  { month: 'Avr', current: 210, last: 160 },
  { month: 'Mai', current: 170, last: 190 },
  { month: 'Jun', current: 250, last: 200 },
  { month: 'Jul', current: 200, last: 210 },
]

const donutData = [
  { name: 'Suite', value: 52, color: '#C9A84C' },
  { name: 'Double', value: 28, color: '#2d2b4e' },
  { name: 'Single', value: 13, color: '#e8734a' },
  { name: 'Twins', value: 7, color: '#a0aec0' },
]

type Tab = 'overview' | 'reservations' | 'historique' | 'profil'

const statutColor: Record<Reservation['statut'], string> = {
  'Confirmée': 'bg-green-100 text-green-700',
  'En cours': 'bg-yellow-100 text-yellow-700',
  'Annulée': 'bg-red-100 text-red-600',
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [reservations, setReservations] = useState(mockReservations)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const totalNuits = [...reservations, ...mockHistorique].reduce((acc, r) =>
    acc + (new Date(r.dateDepart).getTime() - new Date(r.dateArrivee).getTime()) / 86400000, 0)

  const totalDepenses = [...reservations, ...mockHistorique]
    .filter(r => r.statut !== 'Annulée')
    .reduce((acc, r) => acc + r.prix, 0)

  const annuler = (id: number) => {
    if (confirm("Confirmer l'annulation ?")) {
      setReservations(reservations.map(r => r.id === id ? { ...r, statut: 'Annulée' as const } : r))
    }
  }

  const navItems: { key: Tab; label: string; icon: string }[] = [
    { key: 'overview', label: 'Overview', icon: '◈' },
    { key: 'reservations', label: 'Réservations', icon: '🏨' },
    { key: 'historique', label: 'Historique', icon: '📋' },
    { key: 'profil', label: 'Profil', icon: '👤' },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 fixed md:static z-40
        w-56 min-h-screen bg-[#0D2137] text-white flex flex-col
        transition-transform duration-300
      `}>
        <div className="px-6 py-7 border-b border-white/10">
          <p className="text-[10px] text-gray-400 tracking-widest uppercase mb-0.5">◈ ByteWind</p>
          <h2 className="text-base font-bold text-[#C9A84C] tracking-wider">LUXURY HOTEL</h2>
        </div>

        <nav className="flex-1 px-3 py-4">
          <p className="text-[9px] text-gray-500 uppercase tracking-widest px-3 mb-2">Dashboards</p>
          {navItems.map(item => (
            <button key={item.key}
              onClick={() => { setActiveTab(item.key); setSidebarOpen(false) }}
              className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 flex items-center gap-3 text-sm transition
                ${activeTab === item.key ? 'bg-[#C9A84C] text-[#0D2137] font-semibold' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}

          <p className="text-[9px] text-gray-500 uppercase tracking-widest px-3 mt-5 mb-2">Pages</p>
          <Link to="/" className="w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white transition">
            <span>🏠</span> Accueil
          </Link>
          <Link to="/contact" className="w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white transition">
            <span>✉️</span> Contact
          </Link>
        </nav>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">

        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-gray-600 text-xl" onClick={() => setSidebarOpen(true)}>☰</button>
            <div className="hidden md:flex gap-4 text-sm text-gray-400">
              <span className="text-gray-300">Dashboards</span>
              <span>/</span>
              <span className="font-semibold text-gray-700 capitalize">{activeTab}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input placeholder="Rechercher..."
              className="hidden md:block border border-gray-200 rounded-lg px-3 py-1.5 text-xs w-44 focus:outline-none focus:ring-1 focus:ring-[#C9A84C]" />
            <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center text-white text-sm font-bold">A</div>
          </div>
        </header>

        <div className="p-6 flex-1">

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-bold text-gray-800">Overview</h1>
                <span className="text-xs text-gray-400 border border-gray-200 rounded px-3 py-1">Today ▾</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Réservations', value: reservations.filter(r => r.statut !== 'Annulée').length, change: '+11.01%', up: true },
                  { label: 'Nuits réservées', value: totalNuits, change: '-0.03%', up: false },
                  { label: 'Nouveaux clients', value: 3, change: '+15.05%', up: true },
                  { label: 'Total dépensé', value: `${(totalDepenses / 1000).toFixed(0)}k`, change: '+6.08%', up: true },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                    <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                    <p className={`text-xs mt-1 font-medium ${s.up ? 'text-green-500' : 'text-red-400'}`}>
                      {s.change} {s.up ? '↑' : '↓'}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Line Chart */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-gray-700">Réservations / mois</p>
                    <div className="flex gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#C9A84C] inline-block" />Cette année
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />Année dernière
                      </span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={lineData}>
                      <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#999' }} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip contentStyle={{ fontSize: 11 }} />
                      <Line type="monotone" dataKey="current" stroke="#C9A84C" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="last" stroke="#d1d5db" strokeWidth={2} dot={false} strokeDasharray="4 4" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Donut Chart */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <p className="text-sm font-semibold text-gray-700 mb-4">Répartition par chambre</p>
                  <div className="flex items-center gap-4">
                    <PieChart width={100} height={100}>
                      <Pie data={donutData} cx={45} cy={45} innerRadius={28} outerRadius={45} dataKey="value" strokeWidth={0}>
                        {donutData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                    <div className="space-y-1">
                      {donutData.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                          {s.name} — {s.value}%
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RÉSERVATIONS */}
          {activeTab === 'reservations' && (
            <div>
              <h1 className="text-xl font-bold text-gray-800 mb-6">Réservations en cours</h1>
              <div className="space-y-4">
                {reservations.map(r => (
                  <div key={r.id} className="bg-white rounded-xl shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-[#0D2137]">{r.hotel}</h3>
                      <p className="text-gray-500 text-sm">{r.chambre}</p>
                      <p className="text-gray-400 text-xs mt-1">🗓 {r.dateArrivee} → {r.dateDepart}</p>
                      <p className="text-[#C9A84C] font-bold mt-1 text-sm">{r.prix.toLocaleString()} FCFA</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statutColor[r.statut]}`}>{r.statut}</span>
                      {r.statut !== 'Annulée' && (
                        <button onClick={() => annuler(r.id)}
                          className="px-4 py-1.5 text-xs bg-red-50 text-red-500 border border-red-200 rounded-lg hover:bg-red-100 transition">
                          Annuler
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HISTORIQUE */}
          {activeTab === 'historique' && (
            <div>
              <h1 className="text-xl font-bold text-gray-800 mb-6">Historique</h1>
              <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
                    <tr>
                      {['Hôtel', 'Chambre', 'Arrivée', 'Départ', 'Prix', 'Statut'].map(h => (
                        <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {mockHistorique.map(r => (
                      <tr key={r.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 font-medium text-gray-800">{r.hotel}</td>
                        <td className="px-4 py-3 text-gray-500">{r.chambre}</td>
                        <td className="px-4 py-3 text-gray-500">{r.dateArrivee}</td>
                        <td className="px-4 py-3 text-gray-500">{r.dateDepart}</td>
                        <td className="px-4 py-3 text-[#C9A84C] font-bold">{r.prix.toLocaleString()} FCFA</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statutColor[r.statut]}`}>{r.statut}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PROFIL */}
          {activeTab === 'profil' && (
            <div>
              <h1 className="text-xl font-bold text-gray-800 mb-6">Mon Profil</h1>
              <div className="bg-white rounded-xl shadow-sm p-6 max-w-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#C9A84C] flex items-center justify-center text-white text-2xl font-bold shadow">A</div>
                  <div>
                    <p className="font-bold text-[#0D2137] text-lg">Ahmed Diallo</p>
                    <p className="text-gray-400 text-sm">ahmed.diallo@email.com</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Membre depuis', val: 'Janvier 2025' },
                    { label: 'Réservations totales', val: reservations.length + mockHistorique.length },
                    { label: 'Nuits réservées', val: totalNuits },
                    { label: 'Statut', val: '⭐ Client Gold' },
                  ].map((row, i) => (
                    <div key={i} className={`flex justify-between py-2 ${i < 3 ? 'border-b border-gray-100' : ''}`}>
                      <span className="text-gray-400">{row.label}</span>
                      <span className={`font-semibold ${row.label === 'Statut' ? 'text-[#C9A84C]' : 'text-gray-700'}`}>{row.val}</span>
                    </div>
                  ))}
                </div>
                <Link to="/login"
                  className="mt-6 block text-center w-full bg-red-50 text-red-500 border border-red-100 py-2.5 rounded-lg text-sm font-medium hover:bg-red-100 transition">
                  Se déconnecter
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}