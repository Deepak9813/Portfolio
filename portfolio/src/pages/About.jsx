import { useState, useEffect } from "react";

const SkillBar = ({ name, percent, animate }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="text-slate-300">{name}</span>
      <span className="text-blue-400 font-semibold">{percent}%</span>
    </div>

    <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
      <div
        className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000"
        style={{ width: animate ? `${percent}%` : "0%" }}
      />
    </div>
  </div>
);

export default function About() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const about = {
  title: "About Me",
  subtitle:
    "Full Stack Developer | Django & Spring Boot Enthusiast | Educator",

  description:
    "I am a passionate full stack developer specializing in Django, Spring Boot, Python, Java, and modern web technologies. I build scalable web applications, REST APIs, and responsive user interfaces while also teaching programming and real-world software development.",

  summary:
    "I work as a  Backend Developer at Sajha Info Tech, where I develop REST APIs, backend systems, and web applications using Django and Spring Boot. Alongside my professional work, I also teach Python, Java, Django, and web development technologies such as HTML, CSS, JavaScript to beginners, helping them understand real-world development practices and software architecture.",
};
const skills = [
  { name: "Django", percent: 85 },
  { name: "Python", percent: 88 },
  { name: "Java", percent: 80 },
  { name: "Spring Boot", percent: 78 },
  { name: "Spring Framework", percent: 75 },
  { name: "REST API Development", percent: 82 },
  { name: "Postman (API Testing)", percent: 80 },
  { name: "HTML", percent: 92 },
  { name: "CSS", percent: 90 },
  { name: "JavaScript", percent: 88 },
  { name: "Database (MySQL / PostgreSQL)", percent: 78 },
];

  const experience = [
    {
      role: "Junior Backend Developer",
      company: "Sajha Info Tech",
      desc: "Working on backend systems, REST APIs, and Django-based web applications.",
    },
    {
      role: "Python & Django Instructor",
      company: "Freelance / Teaching",
      desc: "Teaching Python and Django to beginners, focusing on real-world backend development.",
    },
  ];

  const projects = [
    {
      title: "E-commerce Backend API",
      description:
        "REST API backend for e-commerce with authentication, products, and cart system.",
      link: "#",
    },
    {
      title: "Task Management API",
      description:
        "Secure task management backend using Django and JWT authentication.",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 px-6 py-16">

      {/* HERO */}
      <div className="max-w-5xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-4">
          {about.title}
        </h1>

        <h2 className="text-xl md:text-2xl text-blue-400/80 mb-6">
          {about.subtitle}
        </h2>

        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          {about.description}
        </p>
      </div>

      {/* SUMMARY */}
      <div className="max-w-5xl mx-auto bg-slate-900/50 border border-slate-800 p-8 rounded-2xl shadow-xl mb-16">
        <h3 className="text-2xl font-semibold text-white mb-4">
          Professional Summary
        </h3>
        <p className="text-slate-400 text-lg leading-relaxed">
          {about.summary}
        </p>
      </div>

      {/* EXPERIENCE */}
      <div className="max-w-5xl mx-auto mb-16">
        <h3 className="text-3xl font-bold text-center mb-12 text-white">
          Experience
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
          {experience.map((exp, i) => (
            <div
              key={i}
              className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition"
            >
              <h4 className="text-blue-500 font-bold text-xl mb-2">
                {exp.role}
              </h4>
              <p className="text-slate-300 font-semibold mb-3">
                {exp.company}
              </p>
              <p className="text-slate-400">{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SKILLS */}
      <div className="max-w-5xl mx-auto mb-20">
        <h3 className="text-3xl font-bold text-center mb-12 text-white">
          Backend Skills
        </h3>

        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl">
          {skills.map((skill, i) => (
            <SkillBar key={i} {...skill} animate={animate} />
          ))}
        </div>
      </div>

      {/* PROJECTS */}
      <div className="max-w-5xl mx-auto mb-20">
        <h3 className="text-3xl font-bold text-center mb-12 text-white">
          Featured Projects
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition"
            >
              <h4 className="text-blue-500 font-bold text-xl mb-4">
                {project.title}
              </h4>

              <p className="text-slate-400 mb-6">
                {project.description}
              </p>

              <a
                href={project.link}
                className="text-blue-400 font-semibold hover:text-blue-300"
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* CV BUTTON */}
      <div className="text-center">
        <a
          href="#"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold transition active:scale-95"
        >
          Download CV
        </a>
      </div>

    </div>
  );
}