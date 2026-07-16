
import React from "react";

const About = () => {
  const stats = [
    { number: "50+", label: "Projects Delivered" },
    { number: "99%", label: "Client Satisfaction" },
    { number: "10+", label: "Expert Developers" },
    { number: "24/7", label: "Dedicated Support" },
  ];

  const coreValues = [
    {
      emoji: "🚀",
      title: "Innovation First",
      description:
        "We push the boundaries of technology to craft futuristic digital solutions that stand out.",
    },
    {
      emoji: "⚡",
      title: "High Performance",
      description:
        "Speed, efficiency, and scalability are baked into every line of code we write.",
    },
    {
      emoji: "🛡️",
      title: "Uncompromised Quality",
      description:
        "Rigorous testing and modern architecture ensure secure, robust, and reliable products.",
    },
    {
      emoji: "🤝",
      title: "Client-Centric",
      description:
        "Your vision drives our development. We collaborate closely to turn ideas into reality.",
    },
  ];

  return (
    <section className="min-h-screen bg-[#050A0A] text-white py-24 px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-24">
        
        {/* Header Section */}
        <div className="text-center">
          <span className="px-4 py-2 rounded-full border border-cyan-400 text-cyan-400 tracking-widest text-sm uppercase">
            ABOUT EVO CODES
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6 leading-tight">
            Evolving Ideas Into
            <span className="block text-cyan-400">Digital Reality</span>
          </h1>

          <p className="mt-5 text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            At EVO CODES, we are a collective of passionate developers, designers, and innovators. 
            We engineer high-impact digital experiences that help businesses evolve and dominate the modern tech landscape.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#0B1112] border border-cyan-400/20 rounded-2xl p-6 text-center hover:border-cyan-400 transition duration-300"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-cyan-400">
                {stat.number}
              </h3>
              <p className="text-gray-400 mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mission & Vision Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <div className="bg-[#0B1112] border border-cyan-400/20 rounded-3xl p-8 backdrop-blur-lg flex flex-col justify-between hover:border-cyan-400/40 transition duration-300">
            <div>
              <span className="text-3xl">🎯</span>
              <h2 className="text-3xl font-bold mt-4 mb-4">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                To empower startups, enterprises, and visionary creators by engineering cut-throat, 
                scalable, and user-centered software solutions that drive real-world transformation and growth.
              </p>
            </div>
          </div>

          <div className="bg-[#0B1112] border border-cyan-400/20 rounded-3xl p-8 backdrop-blur-lg flex flex-col justify-between hover:border-cyan-400/40 transition duration-300">
            <div>
              <span className="text-3xl">👁️</span>
              <h2 className="text-3xl font-bold mt-4 mb-4">Our Vision</h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                To become a global catalyst for software evolution, establishing industry standards 
                for modern web architectures, intuitive user interfaces, and flawless execution.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Driven By <span className="text-cyan-400">Core Values</span>
            </h2>
            <p className="text-gray-400 mt-3">
              The foundational principles guiding everything we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => (
              <ValueCard key={idx} {...value} />
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-[#0B1112] border border-cyan-400/30 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden backdrop-blur-lg">
          <div className="absolute inset-0 bg-cyan-500/5 pointer-events-none"></div>
          <h2 className="text-3xl md:text-5xl font-bold relative z-10">
            Ready to Evolve Your Digital Presence?
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto relative z-10 text-lg">
            Let's collaborate to build something extraordinary. Get in touch with our engineering team today.
          </p>
          <div className="mt-8 relative z-10 flex justify-center">
            <a
              href="/contact"
              className="bg-cyan-400 text-black font-semibold px-8 py-4 rounded-xl hover:shadow-[0_0_25px_rgba(0,255,255,.45)] transition-all duration-300 hover:scale-105 inline-block"
            >
              Get In Touch →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

const ValueCard = ({ emoji, title, description }) => {
  return (
    <div className="bg-[#0B1112] border border-cyan-400/20 rounded-2xl p-6 hover:border-cyan-400 transition duration-300 flex flex-col justify-between">
      <div>
        <div className="w-14 h-14 rounded-xl bg-cyan-400/10 flex items-center justify-center text-2xl mb-5">
          {emoji}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default About;
