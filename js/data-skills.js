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
        { name: "TypeScript", level: 90, color: "#3178C6", icon: "ts" },
        { name: "Python", level: 88, color: "#3776AB", icon: "py" },
        { name: "Dart", level: 80, color: "#00B0FF", icon: "dart" },
        { name: "Java", level: 75, color: "#007396", icon: "java" },
        { name: "PHP", level: 70, color: "#777BB4", icon: "php" },
      ],
    },
    {
      id: "frontend",
      label: "Frontend & Mobile",
      icon: "📱",
      skills: [
        { name: "React", level: 95, color: "#61DAFB", icon: "react" },
        { name: "Next.js", level: 90, color: "#FFFFFF", icon: "next" },
        { name: "Flutter", level: 92, color: "#02569B", icon: "flutter" },
        { name: "React Native", level: 85, color: "#61DAFB", icon: "react" },
        { name: "Tailwind CSS", level: 92, color: "#06B6D4", icon: "tw" },
        { name: "WordPress", level: 90, color: "#21759B", icon: "wp" },
      ],
    },
    {
      id: "backend",
      label: "Backend & Databases",
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 92, color: "#339933", icon: "node" },
        { name: "Express.js", level: 88, color: "#FFFFFF", icon: "express" },
        { name: "Flask", level: 75, color: "#000000", icon: "flask" },
        { name: "Laravel", level: 70, color: "#FF2D20", icon: "laravel" },
        { name: "MongoDB", level: 88, color: "#47A248", icon: "mongo" },
        { name: "PostgreSQL", level: 85, color: "#336791", icon: "pg" },
      ],
    },
    {
      id: "ai_ml",
      label: "AI & Machine Learning",
      icon: "🧠",
      skills: [
        { name: "TensorFlow", level: 80, color: "#FF6F00", icon: "tf" },
        { name: "PyTorch", level: 75, color: "#EE4C2C", icon: "pytorch" },
        { name: "OpenCV", level: 82, color: "#5C3EE6", icon: "opencv" },
        { name: "Scikit-learn", level: 78, color: "#F7931E", icon: "sklearn" },
        { name: "Pandas", level: 85, color: "#150458", icon: "pandas" },
        { name: "NumPy", level: 88, color: "#013243", icon: "numpy" },
      ],
    },
    {
      id: "tools_devops",
      label: "Tools & DevOps",
      icon: "🛠️",
      skills: [
        { name: "Docker", level: 85, color: "#2496ED", icon: "docker" },
        { name: "Git & GitHub", level: 92, color: "#F05032", icon: "git" },
        { name: "Vs Code", level: 75, color: "#009639", icon: "nginx" },
        { name: "Visual Studio", level: 80, color: "#F24E1E", icon: "figma" },
        { name: "Power BI", level: 70, color: "#F2C811", icon: "powerbi" },
        { name: "Vercel", level: 65, color: "#000000", icon: "unity" },
      ],
    },
  ],

  // Interactive 3D globe par show hone wali skills
  globe: [
    "React", "Node.js", "Python", "TypeScript",
    "Flutter", "Docker", "MongoDB", "PostgreSQL",
    "Next.js", "WordPress", "Flask", "Dart",
    "Laravel", "TensorFlow", "OpenCV", "Tailwind"
  ],
};

// Experience timeline
const EXPERIENCE = [
  {
    id: 1,
    role: "Founder & Lead Developer",
    company: "NewTechSofts",
    location: "Hybrid",
    period: "Jan 2026 – Present",
    current: true,
    description:
      "Directing software architecture, leading developers, and delivering custom SaaS solutions and AI-powered enterprise systems.",
    achievements: [
      "Founded and managed NewTechSofts, leading engineering teams to build client-centric software products.",
      "Designed scalable cloud infrastructures and integrated advanced AI/ML algorithms into custom SaaS platforms.",
      "Managed end-to-end development lifecycles for desktop systems and automated B2B workflows.",
    ],
    tech: ["React JS", "Node.js", "Express", "TypeScript", "AI Integration", "Python", "Flask"],
    color: "#00E5FF",
  },
  {
    id: 2,
    role: "Full Stack Engineer & Desktop Application Expert",
    company: "Primze Tech",
    location: "Remote",
    period: "Feb 2026 – Present",
    current: true,
    description:
      "Specializing in building scalable, modern, and high-performance web applications using the MERN stack and Next.js.",
    achievements: [
      "Engineered responsive front-end user interfaces and robust, scalable backend APIs.",
      "Optimized application performance, reduced system bugs, and managed secure PostgreSQL and MongoDB schemas.",
      "Delivered complete end-to-end optimizations and custom desktop/web system architectures.",
    ],
    tech: ["React JS", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "MongoDB", "C#", "Docker"],
    color: "#00FF9C",
  },
  {
    id: 3,
    role: "Mobile Application Developer",
    company: "Hecta Solution",
    location: "Onsite",
    period: "Feb 2026 – May 2026",
    current: false,
    description:
      "Focused on designing robust native and cross-platform mobile apps using Flutter and React Native.",
    achievements: [
      "Built responsive UI/UX user experiences and integrated secure third-party APIs and background services.",
      "Managed end-to-end deployment pipelines on Apple App Store and Google Play Store.",
      "Collaborated on backend database structures, server-side connections, and mobile performance optimization.",
    ],
    tech: ["Flutter", "Dart", "React Native", "Firebase", "API Integration", "Mobile UI/UX"],
    color: "#BF00FF",
  },
  {
    id: 4,
    role: "Full Stack Web Developer (Freelance)",
    company: "Fiverr",
    location: "Remote",
    period: "Mar 2023 – Present",
    current: true,
    description:
      "Successfully developed custom CMS websites, landing pages, and e-commerce platforms for international clients.",
    achievements: [
      "Developed custom CMS websites, landing pages, and functional e-commerce portals using WordPress, Elementor, and Wix.",
      "Managed search engine friendly architectures, speed optimization, and custom WooCommerce setups for various clients.",
    ],
    tech: ["WordPress", "Elementor", "Wix", "Squarespace", "SEO", "HTML5", "CSS3", "JavaScript"],
    color: "#00ED64",
  },
  {
    id: 5,
    role: "Full Stack Web Developer Intern",
    company: "Eziline Software House Pvt Ltd",
    location: "Hybrid",
    period: "Jun 2025 – Oct 2025",
    current: false,
    description:
      "Worked on full-stack web applications and integrated backend routes using MERN Stack during the internship.",
    achievements: [
      "Developed responsive front-end pages in React and built backend server routes using Node.js and Express.",
      "Collaborated on database management, API integration, and debugging application errors.",
    ],
    tech: ["React JS", "Node.js", "Express", "MongoDB", "Next.js", "MySQL", "API Integration"],
    color: "#21759B",
  },
  {
    id: 6,
    role: "Search Engine Optimization (SEO) Intern",
    company: "NRZ Company",
    location: "Onsite",
    period: "Jun 2025 – Aug 2025",
    current: false,
    description:
      "Assisted in SEO performance audits, keyword tracking, and optimizing corporate web visibility.",
    achievements: [
      "Conducted keyword research and competitor analysis to identify opportunities for improving search engine rankings.",
      "Assisted in implementing on-page and off-page SEO strategies to enhance corporate website traffic.",
    ],
    tech: ["SEO", "Keyword Research", "On-Page SEO", "Off-Page SEO", "Google Analytics"],
    color: "#FF5A5F",
  },
  {
    id: 7,
    role: "Customer Service Agent",
    company: "Konnectify",
    location: "Onsite",
    period: "3 Months",
    current: false,
    description:
      "Handled client relationships and service queries over the phone for specialized medical service workflows.",
    achievements: [
      "Managed booking requests, solved query tickets, and maintained positive client relations.",
      "Ensured effective telephone communication, resolving support tickets, and assisting client management.",
    ],
    tech: ["Customer Service", "Client Relations", "Support Ticketing", "Communication"],
    color: "#FF9900",
  }
];