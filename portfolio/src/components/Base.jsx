import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Facebook, Instagram, Linkedin } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import skmPic from "../assets/images/db_logo.png";

export default function Base({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const [hideHF, setHideHF] = useState(false);
  const lastScroll = useRef(0);
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());

  const navItems = ["Home", "About", "Services", "Contact", "Projects", "Blog"];
  const socialIcons = [
    { icon: <Github />, link: "https://github.com/Deepak9813" },
    { icon: <Facebook />, link: "https://www.facebook.com/share/17oLBH5ShL" },
    { icon: <Instagram />, link: "https://instagram.com/" },
    { icon: <Linkedin />, link: "https://www.linkedin.com/in/deepak-baij-837989361" },
    { icon: <FaTiktok />, link: "https://www.tiktok.com/@di_pu2055" },
  ];

  // Update live time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Hide header on scroll down
  useEffect(() => {
    const onScroll = () => {
      const curr = window.scrollY;
      setHideHF(curr > lastScroll.current && curr > 50);
      lastScroll.current = curr <= 0 ? 0 : curr;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overlayRef = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (overlayRef.current && e.target === overlayRef.current) setNavOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NavLinks = ({ className }) => (
    <ul className={className}>
      {navItems.map((item) => {
        const path = item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`;
        return (
          <li key={item}>
            <Link
              to={path}
              onClick={() => setNavOpen(false)}
              className={`font-semibold text-lg px-4 py-3 rounded-lg block w-full transition-all transform-gpu antialiased ${
                location.pathname === path
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-white hover:bg-gray-700"
              }`}
            >
              {item}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-white font-sans relative">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 px-4 md:px-8 py-4 bg-[#0f172a] shadow-md transition-transform duration-300 ${
          hideHF ? "-translate-y-24" : "translate-y-0"
        }`}
      >
        {/* Container: Removed max-w-[1200px] and mx-auto to allow items to 
          hit the far edges of the screen. Added 'relative' to allow 
          absolute centering of the nav links.
        */}
        <div className="w-full flex items-center justify-between relative">
          
          {/* Logo - Perfectly Left Aligned */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 z-10">
            <img 
              src="src/assets/images/db_logo.png" 
              alt="error" 
              className="h-12 w-12 rounded-lg object-cover border border-blue-500/30" 
            />
          </Link>

          {/* Desktop nav - Centered in the middle of the viewport.
            pointer-events-none on the wrapper ensures the logo/hamburger remain clickable.
          */}
          <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <NavLinks className="flex gap-2 lg:gap-8" />
            </div>
          </div>

          {/*for hamburger button */}
          <div 
            className="md:hidden flex flex-col gap-1.5 cursor-pointer z-50 p-2" 
            onClick={() => setNavOpen(!navOpen)}
          >
            <span className={`h-0.5 w-6 bg-white rounded transition-all duration-300 ${navOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`h-0.5 w-6 bg-white rounded transition-all duration-300 ${navOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-white rounded transition-all duration-300 ${navOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </div>
      </header>

      {/* Mobile view Overlay */}
      {navOpen && (
        <div 
          ref={overlayRef} 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity md:hidden" 
        />
      )}

      {/* Mobile nav Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-72 bg-[#0f172a] border-r border-gray-800 p-6 pt-24 flex flex-col gap-6 z-40 transform transition-transform duration-500 ease-in-out md:hidden ${
          navOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <NavLinks className="flex flex-col gap-4" />
        
        <div className="mt-auto border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-xs mb-4 uppercase tracking-widest text-center">Socials</p>
            <div className="grid grid-cols-4 gap-4 text-2xl">
              {socialIcons.map((s, i) => (
                <a 
                  key={i} 
                  href={s.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-blue-400 transition transform hover:-translate-y-1 flex justify-center"
                >
                  {s.icon}
                </a>
              ))}
            </div>
        </div>
      </div>

      {/* Main content */}
      <main className="pt-24 flex-1">{children}</main>

      {/* Footer */}
    <footer
      className={`w-full bg-[#1e293b] text-gray-200 py-6 shadow-inner transition-transform duration-300 ${
        hideHF ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-6">
        
        <p className="text-sm md:text-base font-medium">
          © {new Date().getFullYear()} Deepak Baij
        </p>

        <div className="flex gap-5 text-xl">
          {socialIcons.map((s, i) => (
            <a
              key={i}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition transform hover:-translate-y-1 hover:scale-110"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
    </div>
  );
}