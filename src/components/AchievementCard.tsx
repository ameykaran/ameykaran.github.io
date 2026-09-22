import React from "react";
import { Award, Calendar, Trophy, GraduationCap, FileText } from "lucide-react";
import { Achievement } from "@/types";

interface AchievementCardProps {
  achievement: Achievement;
}

const styleFor = (category: string) => {
  switch (category) {
    case "Competition":
      return { icon: Trophy, classes: "bg-sun/15 text-sun border-sun/30" };
    case "Certification":
      return { icon: FileText, classes: "bg-mint/15 text-mint border-mint/30" };
    case "Academic":
      return { icon: GraduationCap, classes: "bg-violet/15 text-violet border-violet/30" };
    default:
      return { icon: Award, classes: "bg-coral/15 text-coral border-coral/30" };
  }
};

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const { icon: Icon, classes } = styleFor(achievement.category);

  return (
    <div className="glass-card p-6 hover:-translate-y-1 hover:animate-wiggle transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 border ${classes}`}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1">
          <h3 className="font-display text-base font-semibold text-white mb-1.5">
            {achievement.title}
          </h3>

          <div className="flex items-center gap-1 text-xs text-gray-400 font-mono mb-3">
            <Calendar className="w-3.5 h-3.5" />
            {achievement.date}
          </div>

          <p className="text-gray-300/90 text-sm leading-relaxed">
            {achievement.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
