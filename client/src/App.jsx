import ParticleBackground from './components/ParticleBackground.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Services from './components/Services.jsx'
import DevWorkflow from './components/DevWorkflow.jsx'
import Projects from './components/Projects.jsx'
import Testimonials from './components/Testimonials.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'
import Contact from "./Components/Contact/Contact.jsx"
import Pricing from './Components/Pricing.jsx'
import About from './Components/About.jsx'
export default function App() {
  return (
    // overflow-x:hidden lives on body (see index.css) — NOT here.
    // Putting overflow-x:hidden on a div forces the browser to silently
    // compute overflow-y as 'auto', which turns this div into its own scroll
    // container, breaking every position:sticky child (Navbar, DevWorkflow)
    // and causing Framer Motion's window-based useScroll to always read 0.
    <div className="min-h-screen">
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <DevWorkflow />
        <Projects />
        <Testimonials />
        <CTA />
        <Pricing/>
        <Contact/>
        <About/>
      </main>
      <Footer />
    </div>
  )
}