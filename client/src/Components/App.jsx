import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParticleBackground from "./components/ParticleBackground.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import Services from "./components/Services.jsx";
import DevWorkflow from "./components/DevWorkflow.jsx";
import Spotlight from "./components/Spotlight.jsx";
import Testimonials from "./components/Testimonials.jsx";
import CTA from "./components/CTA.jsx";
import Footer from "./components/Footer.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Pricing from "./Components/Pricing.jsx";
import About from "./Components/About.jsx";
import Projects from "./Components/Projects.jsx";
import Blogs from "./Components/Blogs.jsx";

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Spotlight />
      <DevWorkflow />
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
      <AnimatePresence>
        {showIntro && <IntroLoader onDone={() => setShowIntro(false)} />}
      </AnimatePresence>
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
