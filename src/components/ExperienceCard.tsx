import React from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Experience } from "@/types";

interface ExperienceCardProps {
  experience: Experience;
  accent?: "coral" | "mint" | "sun" | "violet";
}

const accentClasses: Record<string, string> = {
  coral: "bg-coral/15 text-coral border-coral/30",
  mint: "bg-mint/15 text-mint border-mint/30",
  sun: "bg-sun/15 text-sun border-sun/30",
  violet: "bg-violet/15 text-violet border-violet/30",
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, accent = "coral" }) => {
  return (
    <div className="glass-card p-6 sm:p-7 hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 border ${accentClasses[accent]}`}
        >
          <Briefcase className="w-5 h-5" />
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
            <h3 className="font-display text-lg font-semibold text-white">
              {experience.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {experience.duration}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {experience.location}
              </span>
            </div>
          </div>

          <p className={`font-medium mb-3 text-sm ${accentClasses[accent].split(" ")[1]}`}>
            {experience.company}
          </p>

          <p className="text-gray-300/90 mb-3 leading-relaxed text-sm">
            {experience.description}
          </p>

          <ul className="space-y-1.5">
            {experience.achievements.map((achievement, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-300/90">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-mint flex-shrink-0" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
