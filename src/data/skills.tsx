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
  { name: "Python", level: "Advanced", category: "Programming" },
  { name: "JavaScript", level: "Advanced", category: "Programming" },
  { name: "C++", level: "Advanced", category: "Programming" },
  { name: "C", level: "Advanced", category: "Programming" },
  { name: "Java", level: "Intermediate", category: "Programming" },
  { name: "Bash Scripting", level: "Intermediate", category: "Programming" },

  { name: "React", level: "Advanced", category: "Framework" },
  { name: "Flask", level: "Advanced", category: "Framework" },
  { name: "FastAPI", level: "Advanced", category: "Framework" },
  { name: "NextJS", level: "Intermediate", category: "Framework" },

  { name: "SQLite", level: "Advanced", category: "Database" },
  { name: "PostreSQL", level: "Advanced", category: "Database" },
  { name: "MongoDB", level: "Intermediate", category: "Database" },

  { name: "Git", level: "Advanced", category: "Tools" },
  { name: "Docker", level: "Beginner", category: "Tools" },
  { name: "Streamlit", level: "Beginner", category: "Tools" },

  { name: "Material UI", level: "Advanced", category: "Specialisation" },
  { name: "PyTorch", level: "Intermediate", category: "Specialisation" },
  { name: "Archlinux", level: "Intermediate", category: "Specialisation" },
  { name: "AWS Cloud", level: "Intermediate", category: "Specialisation" },
];
