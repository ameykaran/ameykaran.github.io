import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Download } from "lucide-react";
import { about } from "@/data/about";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 pt-4">
      <nav className="max-w-5xl mx-auto flex items-center justify-between gap-4 rounded-full border border-white/10 bg-[#150f1f]/70 backdrop-blur-xl px-4 sm:px-6 py-3 shadow-lg">
        <Link
          to="/"
          className="font-display font-bold text-white text-lg tracking-tight hover:text-blue transition-colors"
        >
          Amey<span className="text-blue">.</span>
        </Link>

        <div className="hidden sm:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                location.pathname === link.to
                  ? "bg-white/10 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={about.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-300 hover:text-mint transition-colors hidden sm:inline-block"
          >
            <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
          </a>
          <a
            href={about.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-300 hover:text-mint transition-colors hidden sm:inline-block"
          >
            <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />
          </a>
          <a href={about.resumePath} target="_blank" rel="noopener noreferrer">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue text-[#150f1f] text-sm font-semibold px-4 py-1.5 hover:bg-blue/90 hover:scale-105 transition-all duration-300">
              <Download className="w-3.5 h-3.5" />
              Resume
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
