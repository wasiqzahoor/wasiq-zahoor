// ============================================================
//  DATA — SKILLS
//  Edit this file to add / remove / update your skills
// ============================================================

const SKILLS = {
  categories: [
    {
      id: "languages",
      label: "Languages",
      icon: "💻",
      skills: [
        { name: "JavaScript", level: 95, color: "#F7DF1E", icon: "js" },
        { name: "TypeScript", level: 88, color: "#3178C6", icon: "ts" },
        { name: "Python", level: 85, color: "#3776AB", icon: "py" },
        { name: "Rust", level: 60, color: "#DEA584", icon: "rs" },
        { name: "Go", level: 70, color: "#00ADD8", icon: "go" },
        { name: "Solidity", level: 65, color: "#363636", icon: "sol" },
      ],
    },
    {
      id: "frontend",
      label: "Frontend",
      icon: "🎨",
      skills: [
        { name: "React", level: 95, color: "#61DAFB", icon: "react" },
        { name: "Vue 3", level: 85, color: "#42B883", icon: "vue" },
        { name: "Three.js", level: 80, color: "#049EF4", icon: "three" },
        { name: "Next.js", level: 88, color: "#FFFFFF", icon: "next" },
        { name: "Tailwind CSS", level: 92, color: "#06B6D4", icon: "tw" },
        { name: "WebGL / GLSL", level: 70, color: "#990000", icon: "gl" },
      ],
    },
    {
      id: "backend",
      label: "Backend",
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 92, color: "#339933", icon: "node" },
        { name: "FastAPI", level: 82, color: "#009688", icon: "fast" },
        { name: "GraphQL", level: 78, color: "#E10098", icon: "gql" },
        { name: "PostgreSQL", level: 85, color: "#336791", icon: "pg" },
        { name: "MongoDB", level: 88, color: "#47A248", icon: "mongo" },
        { name: "Redis", level: 80, color: "#DC382D", icon: "redis" },
      ],
    },
    {
      id: "devops",
      label: "DevOps / Cloud",
      icon: "☁️",
      skills: [
        { name: "Docker", level: 90, color: "#2496ED", icon: "docker" },
        { name: "Kubernetes", level: 78, color: "#326CE5", icon: "k8s" },
        { name: "AWS", level: 85, color: "#FF9900", icon: "aws" },
        { name: "GCP", level: 75, color: "#4285F4", icon: "gcp" },
        { name: "GitHub Actions", level: 88, color: "#2088FF", icon: "gh" },
        { name: "Terraform", level: 72, color: "#7B42BC", icon: "tf" },
      ],
    },
  ],

  // Shown on the interactive 3D globe
  globe: [
    "React", "Node.js", "Python", "TypeScript",
    "AWS", "Docker", "MongoDB", "GraphQL",
    "Three.js", "Kubernetes", "FastAPI", "Next.js",
    "Redis", "PostgreSQL", "Vue", "Tailwind",
  ],
};

// Experience timeline
const EXPERIENCE = [
  {
    id: 1,
    role: "Full Stack Web Developer & Desktop Application Expert",
    company: "PrimzTech Solutions",
    location: "Remote",
    period: "Nov 2025 – Present",
    current: true,
    description:
      "Leading full-stack web and desktop application development. Expert in high-performance optimization, software architecture, and AI-integrated workflows.",
    achievements: [
      "Building and scaling enterprise-level applications with MERN stack and .NET.",
      "Developing performance-critical software using C#, .NET, and advanced registry optimization techniques.",
      "Optimizing system architecture and improving application stability for complex enterprise clients.",
    ],
    tech: ["React JS", "Angular JS", "Node.js", "C#", ".NET", "WPF", "AI Integration", "Python"],
    color: "#00F5FF",
  },
  {
    id: 2,
    role: "App Developer",
    company: "Hecta Solutions",
    location: "Onsite",
    period: "Dec 2024 – Sep 2025",
    current: false,
    description:
      "Full-cycle application development with a focus on optimization and AI-driven automation.",
    achievements: [
      "Engineered high-performance web applications with advanced server-side optimization.",
      "Implemented complex AI models within application workflows to enhance functionality.",
      "Focused on low-level system optimization using C# and .NET frameworks for desktop solutions.",
    ],
    tech: ["Flutter", "Dart", "Firebase", "C#", ".NET", "Python"],
    color: "#BF00FF",
  },
  {
    id: 3,
    role: "Full Stack Web Developer",
    company: "EziTech Institute",
    location: " Remote",
    period: "May 2024 – Oct 2024",
    current: false,
    description:
      "Comprehensive full-stack development focusing on web application lifecycle, database management, and UI/UX implementation.",
    achievements: [
      "Developed end-to-end full-stack applications using React, Node.js, and MongoDB.",
      "Integrated AI services and cloud-based file management systems into production-grade portals.",
      "Optimized front-end performance and cross-platform compatibility for various web applications.",
    ],
    tech: ["React JS", "Node.js", "Express", "MongoDB", "Firebase", "WordPress"],
    color: "#00FF9C",
  },
];