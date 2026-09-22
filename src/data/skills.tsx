import { Skill, SkillCategory } from "@/types";

export const skills: Skill[] = [
  // Programming Languages
  { name: "Python", level: "Advanced", category: SkillCategory.Programming },
  { name: "Java", level: "Intermediate", category: SkillCategory.Programming },
  { name: "C/C++", level: "Advanced", category: SkillCategory.Programming },
  { name: "Go", level: "Intermediate", category: SkillCategory.Programming },
  { name: "JavaScript", level: "Intermediate", category: SkillCategory.Programming },
  { name: "TypeScript", level: "Intermediate", category: SkillCategory.Programming },
  { name: "Bash", level: "Intermediate", category: SkillCategory.Programming },
  { name: "HTML/CSS", level: "Advanced", category: SkillCategory.Programming },

  // Frameworks & Tools
  { name: "NextJS", level: "Intermediate", category: SkillCategory.Framework },
  { name: "FastAPI", level: "Advanced", category: SkillCategory.Framework },
  { name: "PyTorch", level: "Intermediate", category: SkillCategory.Framework },
  { name: "Transformers", level: "Intermediate", category: SkillCategory.Framework },
  { name: "Docker", level: "Advanced", category: SkillCategory.Framework },
  { name: "Nginx", level: "Intermediate", category: SkillCategory.Framework },
  { name: "AWS", level: "Intermediate", category: SkillCategory.Framework },
  { name: "Archlinux", level: "Advanced", category: SkillCategory.Framework },

  // Databases
  { name: "PostgreSQL", level: "Intermediate", category: SkillCategory.Database },
  { name: "MongoDB", level: "Intermediate", category: SkillCategory.Database },

  // Specialisations
  { name: "LLMs & Agents", level: "Advanced", category: SkillCategory.Specialisation },
  { name: "RAG Systems", level: "Advanced", category: SkillCategory.Specialisation },
  { name: "Model Context Protocol", level: "Advanced", category: SkillCategory.Specialisation },
];
