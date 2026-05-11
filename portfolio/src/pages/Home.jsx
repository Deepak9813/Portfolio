import React from "react";
import skmPic from "../assets/images/deepak_dai_pic.jpeg";

export default function Home() {
  const projects = [
    {
      title: "E-commerce Platform",
      desc: "Online shopping system built with Django.",
      link: "#",
    },
    {
      title: "Task Management App",
      desc: "Task tracking application with authentication.",
      link: "#",
    },
    {
      title: "Portfolio Website v2",
      desc: "Modern responsive portfolio built using Django.",
      link: "#",
    },
  ];

  return (
    <div className="flex flex-col">

      {/* HERO SECTION */}
      <section className="min-h-[calc(100vh-64px)] flex items-start justify-center bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-8 pt-[84px]">
        
        <div className="flex flex-col md:flex-row items-center max-w-[1200px] w-full mx-auto gap-10">

          {/* IMAGE */}
          <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-xl flex justify-center items-center">
            <img
              src={skmPic}
              alt="Deepak Baij"
              className="w-full h-full object-cover rounded-full border-4 border-blue-400 shadow-lg"
            />
          </div>

          {/* CONTENT */}
          <div className="flex-1 text-center md:text-left">
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hi, I'm <span className="text-blue-400">Deepak Baij</span>
            </h1>

            <div className="inline-block bg-gradient-to-r from-blue-700 to-blue-500 text-white px-5 py-2 rounded-2xl mb-5">
              Backend Developer
            </div>

            <p className="text-gray-300 mb-6 max-w-lg">
              Backend developer specializing in Django and Python, building scalable APIs,
              secure systems, and modern web applications.
            </p>

            <a
              href="#projects"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl text-white font-semibold transition-transform transform hover:-translate-y-1 hover:shadow-lg"
            >
              View My Projects
            </a>

          </div>

        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-16 px-6 bg-[#0f172a] text-white">
        
        <h2 className="text-3xl md:text-4xl text-center mb-12">
          My Recent Work
        </h2>

        <div className="flex flex-wrap justify-center gap-8">

          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="bg-[#1e293b] p-8 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2 w-80"
            >
              <h3 className="text-xl font-bold mb-3">{proj.title}</h3>
              <p className="text-gray-300 mb-4">{proj.desc}</p>

              <a
                href={proj.link}
                className="text-blue-400 font-medium hover:underline"
              >
                View Project
              </a>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}