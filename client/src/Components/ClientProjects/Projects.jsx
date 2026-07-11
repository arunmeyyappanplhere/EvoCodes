import {
  Globe,
  ExternalLink,
  Code2,
  ArrowUpRight,
} from "lucide-react";

import Projects from "./Projects.json";

export default function ClientProjects() {
  return (
    <section className="min-h-screen bg-[#050A0A] py-20 px-6">
      <div className="max-w-7xl mx-auto">

        

        <div className="text-center mb-16">

          <span className="inline-flex items-center gap-2 border border-cyan-400/20 bg-cyan-400/10 text-cyan-400 rounded-full px-5 py-2 text-sm">
            <Globe size={16} />
            Our Portfolio
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-white mt-6">
            Client
            <span className="text-cyan-400"> Projects</span>
          </h1>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto leading-8">
            We build high-quality websites that combine beautiful design,
            performance and modern technologies for businesses across different
            industries.
          </p>
        </div>

        

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {Projects.map((project) => (

            <div
              key={project.id}
              className="group rounded-2xl overflow-hidden bg-[#0B1112] border border-cyan-400/20 hover:border-cyan-400 transition duration-500 hover:shadow-[0_0_40px_rgba(34,211,238,.25)] flex flex-col"
            >

              

              <div className="relative overflow-hidden">

                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050A0A] via-transparent"></div>

                <span className="absolute top-4 left-4 bg-cyan-400/20 text-cyan-400 px-4 py-1 rounded-full text-xs border border-cyan-400/30">
                  {project.category}
                </span>

              </div>

             

              <div className="p-6">

                <h2 className="text-2xl font-semibold text-white mb-3">
                  {project.title}
                </h2>

                <p className="text-gray-400 leading-7 line-clamp-3 min-h-[84px]">
                  {project.description}
                </p>

                <div className="flex gap-4 mt-auto pt-8">

                  <a
                    href={project.live}
                    className="flex-1 flex justify-center items-center gap-2 py-3 rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition"
                  >
                    Live Demo
                    <ArrowUpRight size={18} />
                  </a>

               
                </div>

              </div>

            </div>

          ))}

        </div>

   

        <div className="mt-20 text-center">

          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-cyan-400 text-black px-8 py-4 rounded-xl font-semibold hover:bg-cyan-300 transition"
          >
            Need a site
            <ExternalLink size={18} />
          </a>

        </div>

      </div>
    </section>
  );
}