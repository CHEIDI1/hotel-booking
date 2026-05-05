import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import MapSection from './MapSection'

export default function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', message: '', date: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      <Navbar />
      <div className="pt-24 pb-16 px-6 md:px-20 bg-gray-50 min-h-screen">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-2">Nous joindre</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0D2137]">CONTACTEZ-NOUS</h1>
          <p className="text-gray-500 mt-2">Nous sommes disponibles pour vous répondre</p>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          {submitted ? (
            <div className="text-center py-10">
              <p className="text-2xl text-[#C9A84C] font-bold mb-2">✓ Message envoyé !</p>
              <p className="text-gray-500">Nous vous répondrons dans les plus brefs délais.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-[#0D2137]">Nom</label>
                <input
                  name="nom" type="text" required placeholder="Votre nom"
                  value={form.nom} onChange={handleChange}
                  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-[#0D2137]">Email</label>
                <input
                  name="email" type="email" required placeholder="Votre email"
                  value={form.email} onChange={handleChange}
                  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-[#0D2137]">Message</label>
                <textarea
                  name="message" required placeholder="Votre message" rows={4}
                  value={form.message} onChange={handleChange}
                  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-[#0D2137]">Date souhaitée</label>
                <input
                  name="date" type="date"
                  value={form.date} onChange={handleChange}
                  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#C9A84C] text-white py-3 rounded-lg font-bold tracking-widest uppercase hover:opacity-90 transition"
              >
                Envoyer
              </button>
            </form>
          )}
        </div>

        <MapSection />
      </div>
      <Footer />
    </div>
  )
}
