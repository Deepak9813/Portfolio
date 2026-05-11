import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // ================= INPUT HANDLER =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= ALERT =================
  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  // ================= FAKE SUBMIT (NO BACKEND) =================
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      showAlert("Message sent successfully!", "success");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setLoading(false);
    }, 1200);
  };

  // ================= SERVICE EVENT =================
  useEffect(() => {
    const handler = (e) => {
      setForm((prev) => ({
        ...prev,
        subject: `Inquiry: ${e.detail}`,
      }));

      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      });
    };

    window.addEventListener("serviceSelected", handler);
    return () => window.removeEventListener("serviceSelected", handler);
  }, []);

  return (
    <section
      id="contact"
      className="min-h-screen bg-[#0f172a] text-white px-6 py-24 relative overflow-hidden"
    >

      {/* ================= BACKGROUND GLOW ================= */}
      <div className="absolute inset-0 flex justify-center items-center -z-10">
        <div className="w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>

      {/* ================= HEADER ================= */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Get In <span className="text-blue-500">Touch</span>
        </h2>

        <p className="text-slate-400 max-w-xl mx-auto">
          Have a project idea? Let’s talk and build something amazing.
        </p>
      </div>

      {/* ================= GRID ================= */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* ================= INFO ================= */}
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-3xl">

          <h3 className="text-2xl font-bold mb-8 text-blue-500">
            Contact Info
          </h3>

          <div className="space-y-8">

            <div className="flex gap-4">
              <MapPin className="text-blue-400" />
              <div>
                <h4 className="font-bold">Location</h4>
                <p className="text-slate-400">Kathmandu, Nepal</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="text-blue-400" />
              <div>
                <h4 className="font-bold">Phone</h4>
                <p className="text-slate-400">+977-9848977856</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Mail className="text-blue-400" />
              <div>
                <h4 className="font-bold">Email</h4>
                <p className="text-slate-400">deepakbaij0927@gmail.com</p>
              </div>
            </div>

          </div>
        </div>

        {/* ================= FORM ================= */}
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-3xl">

          <form onSubmit={handleSubmit} className="space-y-6">

            {["name", "email", "subject"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                required={field !== "subject"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl text-white focus:border-blue-500 outline-none"
              />
            ))}

            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Message"
              className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl text-white focus:border-blue-500 outline-none resize-none"
            />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
              <Send size={18} />
            </button>

          </form>

        </div>

      </div>

      {/* ================= ALERT ================= */}
      {alert && (
        <div
          className={`fixed top-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-white shadow-lg ${
            alert.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {alert.message}
        </div>
      )}

    </section>
  );
}