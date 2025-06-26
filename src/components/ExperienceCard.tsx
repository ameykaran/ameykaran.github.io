import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  companyLogo?: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
}

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <div className="glass-card p-6 hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          {experience.companyLogo ? (
            <img
              src={experience.companyLogo}
              alt="Tech Solutions Inc."
              className="w-6 h-6"
            />
          ) : (
            <Briefcase className="w-6 h-6 text-white" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h3 className="text-xl font-semibold text-white">
              {experience.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-300 mt-1 sm:mt-0">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {experience.duration}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {experience.location}
              </div>
            </div>
          </div>

          <p className="text-blue-200 font-medium mb-3">{experience.company}</p>

          <p className="text-gray-300 mb-4 leading-relaxed">
            {experience.description}
          </p>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white">Key Achievements:</h4>
            <ul className="space-y-1">
              {experience.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
