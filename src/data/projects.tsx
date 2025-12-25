import { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "LearnAI - Adaptive Agentic AI Assistant",
    description:
      "Multi-agent AI system with five specialised agents and dynamic user profiling for personalised learning responses, along with a self-adaptive document ingestion pipeline with OCR and semantic chunking.",
    technologies: ["Strands", "RAG", "OCR", "FastAPI", "NextJS"],
    githubUrl: "https://github.com/ameykaran/learnai",
    imageUrl:
      "https://ams3.digitaloceanspaces.com/karabo-ai/static/assets/img/teaching_learning_ai_assistant.jpg",
  },
  {
    title: "DilLeiX - Multilingual SLM pretrained from scratch",
    description:
      "Pretrained a 150M-parameter multilingual model from scratch on 3B tokens (English, Hindi, Mizo) with curriculum training, fine-tuned for reasoning tasks.",
    technologies: ["Transformers", "Python", "PyTorch", "NLP"],
    githubUrl: "https://github.com/ameykaran/dilleix",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4E12AQEKGQD8xqPVTA/article-cover_image-shrink_600_2000/B4EZVLy_bJHgAU-/0/1740733414301?e=2147483647&v=beta&t=UopLcUs3YLOI2CcGxz5u9nL4zPsz2npHZ1TZZc4Tr5Y",
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
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop",
  },
  {
    title: "OCR using CRNNs",
    description:
      "Built and trained machine learning models for extracting text from images using CNN encoder and RNN as decoder for auto-regressive modelling, achieving an accuracy of 77.16%.",
    technologies: ["Python", "PyTorch", "CNN", "RNN", "OCR"],
    githubUrl: "https://github.com/ameykaran/ocr-crnn",
    imageUrl:
      "https://cdn.prod.website-files.com/61e7d259b7746e3f63f0b6be/62dff621ff6976b401611642_Sans%20titre%20(20).png",
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
    imageUrl: "https://www.sismics.com/reader/img/features/central.png",
  },
  {
    title: "Tiny Tots - Baby Growth Tracker",
    description:
      "Baby growth tracking solution built from user research insights, with Figma wireframes and ViteJS prototype.",
    technologies: ["ViteJS", "User Research", "Figma", "JavaScript"],
    githubUrl: "https://github.com/ameykaran/tiny-tots",
    demoUrl: "https://tiny-tots-tracker-app.vercel.app/",
    imageUrl:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=300&fit=crop",
  },
  {
    title: "Recruitment Portal for IIIT Hyderabad",
    description:
      "End-to-end online recruitment portal with job posting, application submission, interview scheduling, and CAS authentication for staff and faculty hiring.",
    technologies: ["ReactJS", "MongoDB", "NodeJS", "Express"],
    githubUrl: "https://github.com/ameykaran/recruitment-portal",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
  },
  {
    title: "UNO Cards Detection using Pattern Matching",
    description:
      "A system for automatic detection and recognition of UNO cards using pattern matching and image processing techniques.",
    technologies: ["Numpy", "Matplotlib", "OpenCV", "Image Processing"],
    githubUrl: "https://github.com/ameykaran/dip-project/",
    imageUrl:
      "https://assetsio.gnwcdn.com/uno-hand_I1JrsbV.jpg?width=1200&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp",
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
    imageUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=300&fit=crop",
  },

  {
    title: "IceCream Parlor - Concurrency",
    description:
      "Implementing concepts of concurrency, threads, mutexes, condition variables and semaphores.",
    technologies: ["C", "Semaphores", "Locks"],
    githubUrl: "https://github.com/ameykaran/Concurrency",
    imageUrl:
      "https://seaworld.com/san-diego/-/media/migrated-media/seaworld-san-diego/images/dining/dreyers-ice-cream-parlor/1900x500-swc-dining-dreyers-ice-cream-parlor.jpg",
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
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop",
  },
  {
    title: "IndCity - Wordle Game",
    description:
      "Wordle-like game for Indian audience where players guess city names based on hints. Published on Google Play Store.",
    technologies: ["Android Studio", "Java"],
    demoUrl: "https://apkgk.com/com.ameykaran.indcity",
    imageUrl:
      "https://play-lh.googleusercontent.com/Xj6aRDt0zUxVSXM1Ke1a_aNlwb4Noka6fFdkskbFxXk6RvHveBm2bPTpB4vED0KWOKM=w800-h500-rw",
  },
];
