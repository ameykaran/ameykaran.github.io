import React from "react";
import { Skill } from "@/types";

interface SkillBadgeProps {
  skill: Skill;
}

const getLevelClasses = (level: string) => {
  switch (level) {
    case "Beginner":
      return "bg-sun/10 text-sun border-sun/25";
    case "Intermediate":
      return "bg-mint/10 text-mint border-mint/25";
    case "Advanced":
      return "bg-blue/10 text-blue border-blue/25";
    default:
      return "bg-white/5 text-gray-300 border-white/10";
  }
};

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  return (
    <div className={`chip hover:scale-105 ${getLevelClasses(skill.level)}`}>
      <span className="font-medium">{skill.name}</span>
    </div>
  );
};

export default SkillBadge;
