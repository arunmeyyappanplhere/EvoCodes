import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParticleBackground from "./Components/ParticleBackground.jsx";
import Navbar from "./Components/Navbar.jsx";
import Hero from "./Components/Hero.jsx";
import Stats from "./Components/Stats.jsx";
import Services from "./Components/Services.jsx";
import DevWorkflow from "./Components/DevWorkflow.jsx";
import ProjectsonHome from "./Components/ProjectsOnHome.jsx";
import Testimonials from "./Components/Testimonials.jsx";
import CTA from "./Components/CTA.jsx";
import Footer from "./Components/Footer.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Pricing from "./Components/Pricing.jsx";
import About from "./Components/About.jsx";
import ServicesOnHome from "./Components/ServicesOnHome.jsx";
import Projects from "./Components/Projects.jsx";
import Blogs from "./Components/Blogs.jsx";

function Home() {
  document.title = "EVO CODES | Home"
  return (
    <>
      <Hero />
      <Stats />
      <ServicesOnHome/>
      <DevWorkflow />
      <ProjectsonHome/>
      <Testimonials />
      <CTA />
    </>
  );
}

function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
