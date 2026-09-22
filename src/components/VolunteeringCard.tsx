import React from "react";
import { HeartHandshake, Calendar } from "lucide-react";
import { Volunteering } from "@/types";

interface VolunteeringCardProps {
  volunteering: Volunteering;
}

const VolunteeringCard: React.FC<VolunteeringCardProps> = ({ volunteering }) => {
  return (
    <div className="glass-card p-6 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 border bg-mint/15 text-mint border-mint/30">
          <HeartHandshake className="w-5 h-5" />
        </div>

        <div className="flex-1">
          <h3 className="font-display text-base font-semibold text-white mb-1">
            {volunteering.role}
          </h3>
          <p className="text-sm text-coral font-medium mb-2">{volunteering.organisation}</p>

          <div className="flex items-center gap-1 text-xs text-gray-400 font-mono mb-3">
            <Calendar className="w-3.5 h-3.5" />
            {volunteering.duration}
          </div>

          <p className="text-gray-300/90 text-sm leading-relaxed">
            {volunteering.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VolunteeringCard;
