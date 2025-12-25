export const skillCategories = [
  "Programming",
  "Framework",
  "Tools",
  "Database",
  "Specialisation",
] as const;

type SkillCategory = (typeof skillCategories)[number];

interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: SkillCategory;
}

export const skills: Skill[] = [
  // Programming Languages
  { name: "Python", level: "Advanced", category: "Programming" },
  { name: "C", level: "Advanced", category: "Programming" },
  { name: "C++", level: "Intermediate", category: "Programming" },
  { name: "Java", level: "Intermediate", category: "Programming" },
  { name: "JavaScript", level: "Intermediate", category: "Programming" },
  { name: "TypeScript", level: "Intermediate", category: "Programming" },
  { name: "Bash", level: "Intermediate", category: "Programming" },
  { name: "HTML/CSS", level: "Advanced", category: "Programming" },

  // Frameworks & Libraries
  { name: "NextJS", level: "Intermediate", category: "Framework" },
  { name: "FastAPI", level: "Advanced", category: "Framework" },
  { name: "React", level: "Intermediate", category: "Framework" },
  { name: "PyTorch", level: "Intermediate", category: "Framework" },
  { name: "Transformers", level: "Intermediate", category: "Framework" },

  // Databases
  { name: "PostgreSQL", level: "Intermediate", category: "Database" },
  { name: "MongoDB", level: "Intermediate", category: "Database" },
  { name: "SQLite", level: "Advanced", category: "Database" },

  // Tools & Technologies
  { name: "Docker", level: "Advanced", category: "Tools" },
  { name: "Nginx", level: "Intermediate", category: "Tools" },
  { name: "AWS", level: "Intermediate", category: "Tools" },
  { name: "Git", level: "Advanced", category: "Tools" },
  { name: "Archlinux", level: "Advanced", category: "Tools" },

  // Specialisations
  { name: "LLMs & Agents", level: "Advanced", category: "Specialisation" },
  { name: "RAG Systems", level: "Advanced", category: "Specialisation" },
  { name: "Material UI", level: "Beginner", category: "Specialisation" },
];
