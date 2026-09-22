import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const Projects = () => {
  useEffect(() => {
    document.title = "Projects | Amey Karan";
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-12">
          <Link to="/">
            <Button
              variant="outline"
              className="mb-6 rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="font-display text-4xl font-extrabold text-white mb-3 text-center tracking-tight">
            My Projects
          </h1>
          <p className="text-gray-300/90 text-center max-w-2xl mx-auto">
            A collection of projects I've worked on, spanning AI/LLM systems, web
            development, and systems programming.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
