import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

export default function Services() {

  // ================= SERVICES =================
  const services = [
    {
      id: 1,
      title: "Backend Development",
      description:
        "Building scalable and secure backend systems using Django and Python with REST API architecture.",
      icon: "Server",
    },
    {
      id: 2,
      title: "REST API Development",
      description:
        "Designing and developing clean, secure and well-structured APIs using Django REST Framework.",
      icon: "Plug",
    },
    {
      id: 3,
      title: "Database Design",
      description:
        "Efficient database design using MySQL and PostgreSQL with optimized relationships and queries.",
      icon: "Database",
    },
    {
      id: 4,
      title: "API Testing (Postman)",
      description:
        "Testing and validating APIs using Postman for smooth and reliable backend performance.",
      icon: "CheckCircle",
    },
    {
      id: 5,
      title: "Authentication System",
      description:
        "Implementing secure login systems using JWT, session authentication and role-based access.",
      icon: "Lock",
    },
    {
      id: 6,
      title: "Deployment & Hosting",
      description:
        "Deploying backend applications on cloud platforms and configuring production-ready servers.",
      icon: "Cloud",
    },
  ];

  // ================= CLICK ACTION =================
  const handleServiceClick = (title) => {
    const contactSection = document.getElementById("contact");

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }

    console.log("Service selected:", title);
  };

  return (
    <section id="services" className="py-24 px-6 bg-[#0f172a] text-white">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          My <span className="text-blue-500">Services</span>
        </h2>

        <p className="text-slate-400">
          Backend-focused development services for modern web applications.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {services.map((service) => {
          const Icon = LucideIcons[service.icon] || LucideIcons.HelpCircle;

          return (
            <motion.div
              key={service.id}
              onClick={() => handleServiceClick(service.title)}
              whileHover={{ y: -10, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer bg-slate-900/40 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/10"
            >

              {/* ICON */}
              <div className="p-3 inline-block rounded-xl bg-slate-800 mb-5 group-hover:bg-blue-500/10 transition">
                <Icon className="w-10 h-10 text-blue-400" />
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-slate-400 leading-relaxed">
                {service.description}
              </p>

            </motion.div>
          );
        })}

      </div>
    </section>
  );
}