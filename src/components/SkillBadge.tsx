import React from "react";
import { Skill } from "@/types";

interface SkillBadgeProps {
  skill: Skill;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "Intermediate":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Advanced":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div
      className={`px-3 py-1 rounded-full text-sm border transition-all duration-300 hover:scale-105 ${getLevelColor(
        skill.level
      )}`}
    >
      <span className="font-medium">{skill.name}</span>
      <span className="ml-1 opacity-75 text-xs">({skill.level})</span>
    </div>
  );
};

export default SkillBadge;
