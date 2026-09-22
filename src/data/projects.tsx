import { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "LearnAI - Adaptive Agentic AI Assistant",
    description:
      "Multi-agent AI system with five specialised agents and dynamic user profiling for personalised learning responses, along with a self-adaptive document ingestion pipeline with OCR and semantic chunking.",
    technologies: ["Strands", "RAG", "OCR", "FastAPI", "NextJS"],
    githubUrl: "https://github.com/ameykaran/learnai",
    imageUrl: "./projects/learnai.jpg",
  },
  {
    title: "DilLeiX - Multilingual SLM pretrained from scratch",
    description:
      "Pretrained a 150M-parameter multilingual model from scratch on 3B tokens (English, Hindi, Mizo) with curriculum training, fine-tuned for reasoning tasks.",
    technologies: ["Transformers", "Python", "PyTorch", "NLP"],
    githubUrl: "https://github.com/ameykaran/dilleix",
    demoUrl: "https://huggingface.co/ameykaran/DilLeiX-it",
    imageUrl: "./projects/dilleix.jpg",
  },
  {
    title: "Legends of Stonks - Stock Market Learning Platform",
    description:
      "Gamified stock market learning platform with service-oriented architecture (7 microservices), Dockerised deployment, and nginx reverse proxy.",
    technologies: [
      "Python",
      "Docker",
      "Nginx",
      "PostgreSQL",
      "NextJS",
      "FastAPI",
    ],
    githubUrl: "https://github.com/ameykaran/legends-of-stonks",
    imageUrl: "./projects/legends-of-stonks.jpg",
  },
  {
    title: "OCR using CRNNs",
    description:
      "Built and trained machine learning models for extracting text from images using CNN encoder and RNN as decoder for auto-regressive modelling, achieving an accuracy of 77.16%.",
    technologies: ["Python", "PyTorch", "CNN", "RNN", "OCR"],
    githubUrl: "https://github.com/ameykaran/ocr-crnn",
    imageUrl: "./projects/ocr-crnn.jpg",
  },
  {
    title: "Rudra's Subscription Service - Refactoring",
    description:
      "Refactored Sismics RSS Reader using UML diagrams, Designite and Sonarqube for identifying code smells, implementing design patterns, and LLM-assisted automated refactoring.",
    technologies: [
      "Java",
      "HTML/CSS",
      "JavaScript",
      "UML",
      "Designite",
      "Sonarqube",
    ],
    githubUrl: "https://github.com/ameykaran/rudra-subscription",
    imageUrl: "./projects/rudra-subscription.jpg",
  },
  {
    title: "Tiny Tots - Baby Growth Tracker",
    description:
      "Baby growth tracking solution built from user research insights, with Figma wireframes and ViteJS prototype.",
    technologies: ["ViteJS", "User Research", "Figma", "JavaScript"],
    githubUrl: "https://github.com/ameykaran/tiny-tots",
    demoUrl: "https://tiny-tots-tracker-app.vercel.app/",
    imageUrl: "./projects/tiny-tots.jpg",
  },
  {
    title: "Recruitment Portal for IIIT Hyderabad",
    description:
      "End-to-end online recruitment portal with job posting, application submission, interview scheduling, and CAS authentication for staff and faculty hiring.",
    technologies: ["ReactJS", "MongoDB", "NodeJS", "Express"],
    githubUrl: "https://github.com/ameykaran/recruitment-portal",
    imageUrl: "./projects/recruitment-portal.jpg",
  },
  {
    title: "UNO Cards Detection using Pattern Matching",
    description:
      "A system for automatic detection and recognition of UNO cards using pattern matching and image processing techniques.",
    technologies: ["Numpy", "Matplotlib", "OpenCV", "Image Processing"],
    githubUrl: "https://github.com/ameykaran/dip-project/",
    imageUrl: "./projects/uno-cards.jpg",
  },
  {
    title: "AKonsole",
    description:
      "Simple shell built from scratch in C with IO redirection, piping, background processes, signal handling, and fork-exec model.",
    technologies: ["C", "System Calls", "MakeFile", "Linux IO redirection"],
    githubUrl: "https://github.com/ameykaran/akonsole",
    imageUrl: "./akonsole.png",
  },
  {
    title: "Optimising Matrix Multiplication",
    description:
      "Optimised matrix multiplication using GCC flags, SIMD vectorisation, OpenMP multi-threading, and CUDA for GPU acceleration, achieving 100x speedup.",
    technologies: ["C", "MakeFile", "SIMD", "CUDA", "OpenMP"],
    githubUrl: "https://github.com/ameykaran/matrix-optimization",
    imageUrl: "./projects/matrix-multiplication.jpg",
  },

  {
    title: "IceCream Parlor - Concurrency",
    description:
      "Implementing concepts of concurrency, threads, mutexes, condition variables and semaphores.",
    technologies: ["C", "Semaphores", "Locks"],
    githubUrl: "https://github.com/ameykaran/Concurrency",
    imageUrl: "./projects/icecream-parlor.jpg",
  },
  {
    title: "Improving xv6 - Part2",
    description:
      "Added another scheduling policy - Priority Based Scheduler (PBS), modified `setpriority` system call and implemented Copy-on-Write (COW)",
    technologies: [
      "C",
      "MakeFile",
      "Scheduling Policy",
      "System Calls",
      "Memory Pages",
    ],
    githubUrl: "https://github.com/ameykaran/xv6-part2",
    imageUrl: "./projects/xv6-part2.jpg",
  },
  {
    title: "IndCity - Wordle Game",
    description:
      "Wordle-like game for Indian audience where players guess city names based on hints. Published on Google Play Store.",
    technologies: ["Android Studio", "Java"],
    demoUrl: "https://apkgk.com/com.ameykaran.indcity",
    imageUrl: "./projects/indcity.webp",
  },
];
