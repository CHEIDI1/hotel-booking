import Navbar from '../../components/Navbar'
import Hero from './Hero'
import Facilities from './Facilities'
import RoomsAndRates from './RoomsAndRates'
import Testimonials from './Testimonials'
import Footer from '../../components/Footer'

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Facilities />
      <RoomsAndRates />
      <Testimonials />
      <Footer />
    </div>
  )
}
