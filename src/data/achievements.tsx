import { Achievement } from "@/types";

export const achievements: Achievement[] = [
  {
    title: "Dean's List",
    date: "2022 - 2025",
    description:
      "Ranked in the top 10-20% of the batch in the second, fourth and fifth semesters at IIIT Hyderabad.",
    category: "Academic" as const,
  },
  {
    title: "Research Award",
    date: "2025",
    description:
      "Recognised for publishing at an A-tier conference during undergraduate studies.",
    category: "Award" as const,
  },
  {
    title: "NTSE Scholar",
    date: "2020",
    description:
      "Selected among 1000 students across India for the National Talent Search Examination fellowship.",
    category: "Academic" as const,
  },
  {
    title: "SQL Injection Workshop",
    date: "2023",
    description:
      "Conducted a technical session on SQL injection as part of the Hacking Club at IIIT Hyderabad.",
    category: "Certification" as const,
  },
];
