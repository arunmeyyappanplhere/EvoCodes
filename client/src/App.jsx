import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Services from './components/Services.jsx'
import DevWorkflow from './components/DevWorkflow.jsx'
import Projects from './components/Projects.jsx'
import Testimonials from './components/Testimonials.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    // overflow-y-visible is explicit on purpose: setting overflow-x
    // without overflow-y makes the browser silently compute overflow-y
    // as "auto", turning this div into its own scroll container and
    // breaking every position:sticky element inside it (Navbar, and
    // the DevWorkflow pin). Declaring both axes explicitly avoids that.
    <div className="min-h-screen bg-rich-black overflow-x-hidden overflow-y-visible">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <DevWorkflow />
        <Projects />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}