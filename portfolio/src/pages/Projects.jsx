import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Full Stack", "Frontend", "Backend", "Security"];

  const projectData = [
    {
      id: 1,
      title: "Restaurant Management System",
      category: "Full Stack",
      desc: "A comprehensive solution for order tracking, inventory management, and sales analytics.",
      tech: ["React", "Django", "PostgreSQL", "JWT"],
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop",
      github: "",
      demo: "#",
    },
    {
      id: 2,
      title: "Secure Auth Provider",
      category: "Security",
      desc: "RBAC-based authentication system with JWT security and role control.",
      tech: ["Python", "Django", "Redis"],
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
      github: "",
      demo: "#",
    },
    {
      id: 3,
      title: "Bank Demat Automator",
      category: "Backend",
      desc: "Backend automation system for processing financial and account records.",
      tech: ["Python", "Django", "PostgreSQL"],
      image:
        "https://images.unsplash.com/photo-1550565118-3d143c61582b?q=80&w=1000&auto=format&fit=crop",
      github: "",
      demo: "#",
    },
    {
      id: 4,
      title: "Task Management System",
      category: "Full Stack",
      desc: "Simple productivity tool for managing tasks with authentication system.",
      tech: ["React", "Django", "API"],
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop",
      github: "",
      demo: "#",
    },
  ];

  const filteredProjects =
    filter === "All"
      ? projectData
      : projectData.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-24">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Featured <span className="text-blue-500">Projects</span>
        </h2>

        <p className="text-slate-400 max-w-2xl mx-auto">
          My real-world development work in backend systems, APIs, and full-stack applications.
        </p>
      </div>

      {/* FILTER */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold border transition-all ${
              filter === cat
                ? "bg-blue-600 border-blue-500 text-white"
                : "bg-slate-900/50 border-slate-700 text-slate-400 hover:border-blue-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PROJECT GRID */}
      <motion.div layout className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden hover:border-blue-500 transition"
            >

              {/* IMAGE */}
              <div className="h-64 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-80" />

                <span className="absolute bottom-4 left-4 bg-blue-600 text-xs px-3 py-1 rounded">
                  {project.category}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-8">

                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400">
                  {project.title}
                </h3>

                <p className="text-slate-400 mb-6">
                  {project.desc}
                </p>

                {/* TECH */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* LINKS */}
                <div className="flex gap-6 border-t border-slate-800 pt-6">

                  <a
                    href={project.github}
                    className="flex items-center gap-2 text-sm text-slate-300 hover:text-white"
                  >
                    <Github size={18} className="text-blue-500" />
                    Code
                  </a>

                  <a
                    href={project.demo}
                    className="flex items-center gap-2 text-sm text-slate-300 hover:text-white"
                  >
                    <ExternalLink size={18} className="text-blue-500" />
                    Live
                  </a>

                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>

      </motion.div>

      {/* CTA */}
      <div className="mt-24 text-center">
        <div className="bg-blue-600/10 border border-blue-500/20 p-12 rounded-3xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Have a project idea?
          </h3>

          <p className="text-slate-400 mb-8">
            I’m available for freelance work and backend development projects.
          </p>

          <a
            href="/contact"
            className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-xl font-bold transition"
          >
            Contact Me
          </a>
        </div>
      </div>

    </div>
  );
}