import React from "react";
import { ExternalLink } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false }) => {
  return (
    <div
      className={cn(
        "glass-card group overflow-hidden flex flex-col hover:-translate-y-1 hover:rotate-[0.3deg] transition-all duration-300",
        featured && "sm:col-span-2 sm:row-span-2"
      )}
    >
      {project.imageUrl && (
        <div className="relative overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className={cn(
              "w-full object-cover group-hover:scale-105 transition-transform duration-500",
              featured ? "h-64" : "h-40"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#150f1f]/80 via-transparent to-transparent" />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-blue transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-300/90 mb-4 text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span key={index} className="chip bg-violet/10 text-violet border-violet/20">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-mint transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
              Code
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-blue transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
