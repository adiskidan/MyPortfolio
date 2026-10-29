export const personalInfo = {
  name: "Adis Kidan",
  firstName: "Adis",
  lastName: "Kidan",
  title: "4th-Year CS Senior & Full-Stack Developer",
  statusPill: "4th-Year CS Senior · Open to Full-Stack & AI Roles",
  yearSenior: "4th Year Senior",
  university: "Debre Berhan University",
  universityLocation: "DEBRE BERHAN UNIVERSITY, ETHIOPIA",
  degree: "Bachelor of Science in Computer Science",
  graduationYear: "2027",
  location: "Ethiopia",
  email: "adiskidan368@gmail.com",
  phone: "+251 900 000 000",
  availability: "4th-Year CS Senior · Open to Full-Stack & AI Roles",
  avatarUrl: "/adis-image.png",
  bio: "I am a passionate fourth-year Computer Science student at Debre Berhan University, specializing in Web Development with additional experience in mobile and desktop applications. I love creating innovative solutions that solve real-world problems and contribute to the tech ecosystem in Ethiopia.",
  github: "https://github.com/adiskidan",
  linkedin: "https://www.linkedin.com/in/adiskidan",
  telegram: "https://t.me/Rice_1219",
  twitter: "https://twitter.com/adiskidan",
  resumeUrl: "/resume.pdf", // Link to downloadable resume PDF
  resumeLabel: "PDF hosted on Google Drive",
  web3formsKey: "", // Paste Web3Forms access key here (from https://web3forms.com for adiskidan368@gmail.com)
  formEndpoint: "https://formsubmit.co/ajax/adiskidan368@gmail.com",
  stats: [
    { label: "Projects Built", value: "12+" },
    { label: "Core Technologies", value: "15+" },
    { label: "Certifications", value: "4 Official" },
    { label: "Commitment", value: "100%" },
  ],
};

export const certificatesData = [
  {
    id: "ai-cert",
    title: "Artificial Intelligence Fundamentals",
    issuer: "Ethio Coders Initiative / Udacity",
    organization: "Ministry of Innovation & Technology (MInT)",
    issueDate: "2024",
    pdfUrl: "/certificates/AI.pdf",
    category: "AI & Machine Learning",
    skills: ["AI Fundamentals", "Neural Networks", "Python", "Machine Learning Concepts"],
    badgeColor: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30",
  },
  {
    id: "data-science-cert",
    title: "Data Science & Analytics",
    issuer: "Ethio Coders Initiative / Udacity",
    organization: "Ministry of Innovation & Technology (MInT)",
    issueDate: "2024",
    pdfUrl: "/certificates/Data_Science.pdf",
    category: "Data Science",
    skills: ["Data Analysis", "Python", "NumPy", "Pandas", "Statistical Modeling"],
    badgeColor: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
  },
  {
    id: "android-cert",
    title: "Android App Development",
    issuer: "Ethio Coders Initiative / Udacity",
    organization: "Ministry of Innovation & Technology (MInT)",
    issueDate: "2024",
    pdfUrl: "/certificates/Andoriod.pdf",
    category: "Mobile Development",
    skills: ["Android Studio", "Kotlin / Java", "Mobile UI Architecture", "App Lifecycle"],
    badgeColor: "from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30",
  },
  {
    id: "programming-fund-cert",
    title: "Programming Fundamentals",
    issuer: "Ethio Coders Initiative / Udacity",
    organization: "Ministry of Innovation & Technology (MInT)",
    issueDate: "2024",
    pdfUrl: "/certificates/Programing Fundamental.pdf",
    category: "Computer Science Core",
    skills: ["Algorithms", "Object-Oriented Design", "Control Flow", "Problem Solving"],
    badgeColor: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
  },
];

export const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "React.js", level: "Advanced", icon: "Code2" },
      { name: "JavaScript (ES6+)", level: "Advanced", icon: "FileCode" },
      { name: "TypeScript", level: "Intermediate", icon: "FileCode2" },
      { name: "Tailwind CSS", level: "Advanced", icon: "Palette" },
      { name: "HTML5 / CSS3", level: "Advanced", icon: "Layout" },
      { name: "Redux / Zustand", level: "Intermediate", icon: "Boxes" },
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      { name: "Node.js", level: "Advanced", icon: "Server" },
      { name: "Express.js", level: "Advanced", icon: "Cpu" },
      { name: "Python / Flask", level: "Advanced", icon: "Terminal" },
      { name: "RESTful APIs", level: "Advanced", icon: "Network" },
      { name: "JWT Auth / RBAC", level: "Advanced", icon: "ShieldCheck" },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "PostgreSQL", level: "Intermediate", icon: "Database" },
      { name: "MongoDB", level: "Advanced", icon: "Database" },
      { name: "SQLite", level: "Advanced", icon: "HardDrive" },
      { name: "MySQL", level: "Intermediate", icon: "HardDrive" },
      { name: "Prisma ORM / Mongoose", level: "Intermediate", icon: "Layers" },
    ],
  },
  {
    category: "DevOps & Tools",
    skills: [
      { name: "Git & GitHub", level: "Advanced", icon: "GitBranch" },
      { name: "OpenCV / ONNX", level: "Intermediate", icon: "Cpu" },
      { name: "Linux / Bash", level: "Intermediate", icon: "TerminalSquare" },
      { name: "Postman", level: "Advanced", icon: "Send" },
      { name: "Vite / Webpack", level: "Intermediate", icon: "Wrench" },
    ],
  },
  {
    category: "CS Fundamentals",
    skills: [
      { name: "Data Structures & Algorithms", level: "Proficient", icon: "Binary" },
      { name: "Object-Oriented Programming (OOP)", level: "Advanced", icon: "Boxes" },
      { name: "Database Management Systems (DBMS)", level: "Advanced", icon: "ServerCrash" },
      { name: "Software Engineering & SDLC", level: "Advanced", icon: "Workflow" },
      { name: "Computer Networks", level: "Intermediate", icon: "Share2" },
    ],
  },
];

export const projectsData = [
  {
    id: "ethiopian-bingo-system",
    title: "Standard Ethiopian Bingo Business System",
    category: "Full-Stack",
    tagline: "Commercial electronic Bingo gaming, automated number calling, and financial pool calculation system.",
    description: "An automated commercial Bingo management system developed for Ethiopian gaming enterprises. Features automated caller number generation, multi-ticket player registry, real-time financial tracking with 20% house cut deduction and winner pool allocation in Ethiopian Birr (ETB), audio voice callouts, and instant winning card verification.",
    image: "/projects/bingo-cover.jpg",
    tags: ["JavaScript", "HTML5", "CSS3", "Audio APIs", "Financial Logic", "Game Systems"],
    github: null, // Source code not visible as requested!
    isClosedSource: true,
    liveDemo: "/demos/bingo/index.html",
    featured: true,
    highlights: [
      "Real-time financial calculator: 20% house commission and net winner pool in Birr",
      "Interactive caller board with automated drawing and Amharic audio cues",
      "Dynamic ticket generation and instant winning pattern verification",
    ],
  },
  {
    id: "dbu-face-attendance",
    title: "DBU Smart Face Recognition Attendance System",
    category: "Full-Stack",
    tagline: "Enterprise biometric attendance system powered by YuNet + SFace ONNX deep learning and Flask.",
    description: "An enterprise-grade, real-time biometric attendance system engineered for Debre Berhan University. Powered by YuNet face detection (100+ FPS) and SFace 128-dimensional deep neural recognition. Includes passive anti-spoofing (skin chrominance & texture frequency checks), role-based access control (Admin, Teacher, Student), automated timetable lecture detection, QR code student ID badges, and official ReportLab PDF attendance registers.",
    image: "/projects/face-recognition-cover.jpg",
    tags: ["Python", "Flask", "OpenCV", "YuNet / SFace ONNX", "SQLite", "ReportLab PDF", "HTML5/CSS3"],
    github: "https://github.com/adiskidan/face-recognition-attendance",
    liveDemo: "/demos/face-recognition/index.html",
    featured: true,
    highlights: [
      "High-speed YuNet face detector with 128-D SFace facial embeddings matching",
      "Passive anti-spoofing rejecting photo prints and phone screen replay attacks",
      "Automated lecture timetable detection with official ReportLab PDF registers",
      "Digital CR80 student ID badge generation with encrypted QR code fallback",
    ],
  },
  {
    id: "hulu-video-store",
    title: "Hulu Video Store & Chapa Checkout",
    category: "Full-Stack",
    tagline: "Digital video marketplace and streaming storefront with Ethiopian Chapa payment gateway integration.",
    description: "A full-featured digital video distribution and streaming storefront built with Node.js and Express. Features an integrated creator studio for uploading and managing HD videos and artwork, automated order tracking, and seamless integration with Ethiopia's Chapa Checkout API supporting one-time payments in both ETB and USD.",
    image: "/projects/hulu-video-cover.jpg",
    tags: ["Node.js", "Express", "Chapa Checkout API", "JavaScript", "REST APIs", "Fintech"],
    github: "https://github.com/adiskidan/hulu-video-store",
    liveDemo: "/demos/hulu-video/index.html",
    featured: true,
    highlights: [
      "Integrated Chapa Payment Gateway supporting ETB and USD transactions",
      "Creator Studio portal for video catalog uploads and price tier management",
      "Server-side transaction authorization and persistent JSON order logs",
    ],
  },
  {
    id: "smart-farmer-support",
    title: "Smart Rural Farmer Support System",
    category: "Frontend",
    tagline: "Agricultural advisory and community web portal designed for rural farming communities.",
    description: "An accessible, responsive web application engineered to bridge the information gap for rural farmers. Delivers localized crop management recommendations, pest identification guides, soil care best practices, and real-time market price references in a lightweight, intuitive interface.",
    image: "/projects/farmer-support-cover.jpg",
    tags: ["JavaScript", "HTML5", "CSS3", "Responsive Design", "Agricultural Tech"],
    github: "https://github.com/adiskidan/smart-farmer-support",
    liveDemo: "/demos/farmer-support/index.html",
    featured: false,
    highlights: [
      "Lightweight, mobile-first design optimized for rural low-bandwidth connections",
      "Interactive crop scheduling guide and seasonal planting recommendations",
      "Localized marketplace advisory tools for fair price discovery",
    ],
  },
  {
    id: "gebeta-game",
    title: "Gebeta (Ethiopian Mancala) Game Engine",
    category: "Frontend",
    tagline: "Interactive digital implementation of the traditional Ethiopian Mancala board game.",
    description: "A Python-based algorithmic recreation of the ancient Ethiopian count-and-capture board game Gebeta. Features complete circular board state tracking, sowing rules, capture logic, and turn-based player mechanics designed with object-oriented principles.",
    image: "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Algorithms", "Game Theory", "Data Structures"],
    github: "https://github.com/adiskidan/gebeta-game",
    liveDemo: "#",
    featured: false,
    highlights: [
      "Complete rule implementation of traditional Gebeta count-and-sow mechanics",
      "Circular linked list / array board representation with capture detection",
      "Modular game loop architecture supporting player vs player and AI bots",
    ],
  },
];

export const educationData = [
  {
    institution: "Debre Berhan University (DBU)",
    degree: "Bachelor of Science in Computer Science",
    period: "2023 - Present (Expected 2027)",
    location: "Debre Berhan, Ethiopia",
    description: "Focusing on software engineering principles, algorithms, distributed systems, and modern web application development. Active participant in coding challenges and student tech seminars.",
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (Java / C++)",
      "Database Management Systems (SQL & Relational Design)",
      "Web Programming & Technologies",
      "Operating Systems & System Architecture",
      "Computer Networks & Data Communication",
    ],
    achievements: [
      "Active member of the University Computer Science & Coding Club",
      "Organized peer study groups for programming problem solving",
      "Consistently high academic standing in core CS modules",
    ],
  },
];

export const timelineData = [
  {
    year: "2024 - Present",
    title: "Full-Stack Web Development & Open Source",
    role: "Independent Developer & Student",
    description: "Architecting end-to-end applications using the MERN stack (MongoDB, Express, React, Node.js) and PostgreSQL. Building production-grade student portals and exploring modern DevOps.",
  },
  {
    year: "2023",
    title: "B.Sc. in Computer Science at DBU",
    role: "Debre Berhan University",
    description: "Started degree program. Mastered procedural programming, data structures, algorithm analysis, and object-oriented paradigms.",
  },
  {
    year: "2022",
    title: "Discovered Passion for Programming",
    role: "Self-Directed Learning",
    description: "Wrote first lines of code in Python and C++, built basic scripts and static web pages, sparking deep interest in software engineering.",
  },
];

// Ensure technologies & tags compatibility on all project items
projectsData.forEach((project) => {
  if (!project.technologies) {
    project.technologies = project.tags || [];
  }
  if (!project.tags) {
    project.tags = project.technologies || [];
  }
  if (!project.highlights) {
    project.highlights = [];
  }
});
