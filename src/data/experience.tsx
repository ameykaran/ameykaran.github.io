import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    title: "SDE Intern",
    company: "UiPath",
    duration: "May 2026 - Jul 2026",
    location: "Bengaluru, India",
    description:
      "Worked on a platform that generates dynamic web applications from natural language prompts, featuring real-time previews and one-click deployment.",
    achievements: [
      "Built iterative refinement through follow-up prompts for generated applications",
      "Implemented context-grounding to improve application generation accuracy and relevance",
      "Brought down generation time from 10 minutes to 3 minutes",
    ],
  },
  {
    title: "Research Assistant",
    company: "MontyCloud (with SERC)",
    duration: "May 2024 - Apr 2026",
    location: "Hyderabad, India",
    description:
      "Developed a novel multi-agent framework - MOYA, available as an open-source package, leveraging LLMs and the Model Context Protocol for tool access.",
    achievements: [
      "Created specialised agents with dedicated data sources for distinct CloudOps tasks",
      "Built an autonomous CloudOps Copilot to optimise AWS accounts",
      "Solved unstructured data, scalability and extensibility problems through RAG and hierarchical summarisation",
      "Published findings at CAIN 2025",
    ],
  },
  {
    title: "Undergraduate Researcher",
    company: "Software Engineering Research Center",
    duration: "May 2024 - Present",
    location: "IIIT Hyderabad",
    description:
      "Researching the intersection of Generative AI and Software Architecture, currently exploring the possibility of extracting design decisions from source code using Large Language Models.",
    achievements: [
      "Conducted experiments on multiple open-source projects to evaluate LLMs for design decision extraction",
    ],
  },
  {
    title: "Teaching Assistant",
    company: "IIIT Hyderabad",
    duration: "Jan 2025 - May 2025",
    location: "Hyderabad, India",
    description:
      "Assisted in conducting the Introduction to Software Systems course during Monsoon '25 by supporting tutorials and labs for hands-on learning.",
    achievements: [
      "Supported tutorials and labs for hands-on learning",
      "Helped create and evaluate assignments and exams",
    ],
  },
  {
    title: "Web Team Head",
    company: "Student Alumni Connect Cell",
    duration: "Nov 2023 - Dec 2024",
    location: "IIIT Hyderabad",
    description:
      "Led the development of the Yearbook portal to streamline the collection of data from a graduating batch of 300+ students.",
    achievements: [
      "Coordinated with other teams to ensure seamless integration of features and a user-friendly interface",
      "Designed the entire backend to handle different APIs and services",
    ],
  },
];
