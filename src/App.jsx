import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import FeatureBar from './components/FeatureBar.jsx'
import BookingForm from './components/BookingForm.jsx'
import MapSection from './components/MapSection.jsx'
import Services from './components/Services.jsx'
import WhyChooseUs from './components/WhyChooseUs.jsx'
import Fleet from './components/Fleet.jsx'
import AreasServed from './components/AreasServed.jsx'
import Testimonials from './components/Testimonials.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <FeatureBar />
        <BookingForm />
        <MapSection />
        <Services />
        <WhyChooseUs />
        <Fleet />
        <AreasServed />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
