// Skill Types

export enum SkillCategory {
  Programming = "Programming",
  Framework = "Framework",
  Tools = "Tools",
  Database = "Database",
  Specialisation = "Specialisation",
}

export interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: SkillCategory;
}

// Experience Types
export interface Experience {
  title: string;
  company: string;
  companyLogo?: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
}

// Project Types
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
}

// Achievement Types
export interface Achievement {
  title: string;
  date: string;
  description: string;
  category: "Competition" | "Certification" | "Academic" | "Award";
}

// Publication Types
export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: string;
  abstract: string;
  url?: string;
  doi?: string;
}
