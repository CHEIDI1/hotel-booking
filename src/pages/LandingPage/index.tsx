import Navbar from '../../components/Navbar'
import Hero from './hero'
import Sections from './Sections.tsx'
import Footer from '../../components/Footer'

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Sections />
      <Footer />
    </div>
  )
}