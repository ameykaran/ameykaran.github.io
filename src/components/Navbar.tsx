import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Download } from "lucide-react";
import { about } from "@/data/about";

const navLinks = [
  { id: null, label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "publications", label: "Publications" },
];

const Navbar = () => {
  const scrollToSection = (id: string | null) => {
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 pt-4">
      <nav className="max-w-5xl mx-auto flex items-center justify-between gap-4 rounded-full border border-white/10 bg-[#150f1f]/70 backdrop-blur-xl px-4 sm:px-6 py-3 shadow-lg">
        <button
          type="button"
          onClick={() => scrollToSection(null)}
          className="font-display font-bold text-white text-lg tracking-tight hover:text-blue transition-colors"
        >
          Amey<span className="text-blue">.</span>
        </button>

        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              {link.label}
            </button>
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
