export const resumeData = {
  personal: {
    name: "Rahul Bramhankar",
    title: "Full-Stack Developer",
    email: "rahulbramhankar04@gmail.com",
    phone: "+91 70571 67045",
    location: "Pune, India",
    linkedin: "https://www.linkedin.com/in/rahul-bramhankar-a424a328b",
    github: "https://github.com/RAHUL0408-B",
    tagline: "Full-Stack Developer · Hackathon Winner · Builder",
    about: "I'm a Computer Engineering student (2023–2027) who's been building real web apps since the early days of college. I work mostly with React, Node.js, Firebase, and REST APIs — both in freelance projects for actual clients and in hackathons where I helped ship a winning product. I care about writing clean code that works in production, not just in demos. Looking for a software engineering role where I can keep building and learning in a real team.",
    explore: ["Docker", "Spring Boot", "Solidity", "Selenium"]
  },
  stats: [
    { value: 400, suffix: "+", label: "Teams Competed Against" },
    { value: 6, suffix: "", label: "Projects" },
    { value: 2, suffix: "", label: "Hackathon Awards" },

  ],
  skills: {
    categories: [
      {
        name: "Frontend Development",
        skills: ["React.js", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Vite"]
      },
      {
        name: "Backend Development",
        skills: ["Java", "Node.js", "Spring Boot", "REST APIs", "Hibernate", "CRUD"]
      },
      {
        name: "Database & Cloud",
        skills: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Supabase", "AWS (ML/SageMaker)"]
      },
      {
        name: "Tools & DevOps",
        skills: ["Git", "GitHub", "Postman", "VS Code", "Agile", "CI/CD basics"]
      }
    ],
    radar: {
      labels: ["Frontend", "Backend", "Database", "Cloud", "Tools & Git", "Java & DSA"],
      data: [90, 85, 80, 75, 88, 85]
    }
  },
  projects: [
    {
      title: "BharatSahayak",
      category: "AI / Web",
      tagline: "AI-Powered Government Scheme Discovery",
      badge: "Redrob Ideathon 2026",
      description: "An AI-powered welfare companion that finds every government scheme a citizen qualifies for and delivers it proactively through WhatsApp or a voice call on any basic phone.",
      problem: "₹2.6 lakh crore in government welfare benefits go unclaimed every year in India. Millions of eligible citizens lack awareness, literacy, and the internet/smartphones needed to navigate complex English-first government portals.",
      solution: "Built a zero-internet required platform where users simply send a WhatsApp message or call a toll-free number in Hindi/Marathi. The AI analyzes their profile, matches them with eligible schemes, tracks missed benefits, and provides voice alerts for deadlines.",
      image: "/images/projects/bharatsahayak_1.png",
      images: [
        "/images/projects/bharatsahayak_1.png",
        "/images/projects/bharatsahayak_2.png",
        "/images/projects/bharatsahayak_3.png",
        "/images/projects/bharatsahayak_4.png"
      ],
      tech: ["React.js", "Node.js", "Supabase", "Mistral AI", "Twilio"],
      detailedTech: ["React.js", "Vite", "Tailwind CSS", "Node.js", "Express", "Supabase", "Mistral AI", "Twilio", "Vercel"],
      github: "https://github.com/RAHUL0408-B/BharatSahayak",
      demo: "https://bharat-sahayak-one.vercel.app"
    },
    {
      title: "EcoBounty",
      category: "AI / Web",
      tagline: "AI-Based Environmental Reporting Platform",
      badge: "🏆 Best Solution Award (Techathon 3.0)",
      description: "A community-driven full-stack web platform enabling users to report and track real-time environmental issues with AI-assisted verification APIs to validate submissions.",
      problem: "Environmental hazards like illegal dumping, trash buildup, and water pollution often go unreported because traditional reporting methods are slow, confusing, and lack transparency. Communities lack incentive to report, and government agencies get flooded with duplicate or spam reports.",
      solution: "Created a community-driven web platform that gamifies environmental reporting. Integrated AI classification APIs to filter out spam images automatically. Valid reports are immediately pinned on an interactive map, and automated email workflows alert relevant local authorities. Users earn redeemable EcoPoints for verified reports.",
      image: "/images/projects/ecobounty.jpg",
      images: ["/images/projects/ecobounty.jpg", "/images/projects/ecobounty_2.jpg", "/images/projects/ecobounty_3.jpg"],
      tech: ["React.js", "Node.js", "Firebase", "AI Verification APIs"],
      detailedTech: ["React.js", "Node.js", "Express.js", "Firebase Firestore & Auth", "AI Image Classification APIs", "Google Maps API", "Tailwind CSS"],
      github: "https://github.com/RAHUL0408-B/EcoBountyRahul",
      demo: "https://ecobountyapp.netlify.app/"
    },
    {
      title: "WhatsApp Clone Backend",
      category: "Backend / Systems",
      tagline: "Scalable Real-time Messaging System",
      badge: "Spring Boot & Kafka",
      description: "Built a WhatsApp Clone backend using Spring Boot with JWT Authentication, PostgreSQL, WebSockets, Redis, and Kafka for secure and real-time messaging.",
      problem: "Designing a real-time chat application backend that scales efficiently requires handling thousands of concurrent WebSocket connections, persisting millions of messages, and ensuring message delivery with minimal latency while securing user data and managing distributed system events.",
      solution: "Developed a robust, layered backend architecture using Spring Boot. Secured APIs with JWT Authentication and Spring Security. Integrated WebSockets for bi-directional real-time communication, Redis for caching/session management, and Apache Kafka as a message broker to handle scalable event-driven message distribution across users. Persisted chats and user details in PostgreSQL.",
      image: "/images/projects/whatsapp_backend.png",
      tech: ["Spring Boot", "WebSockets", "Redis", "Kafka", "PostgreSQL"],
      detailedTech: ["Spring Boot", "Spring Security & JWT", "Java", "Apache Kafka", "Redis Cache", "Spring WebSockets", "PostgreSQL", "Hibernate / JPA"],
      github: "https://github.com/RAHUL0408-B/WhatsApp-Clone-Backend",
      demo: "https://github.com/RAHUL0408-B/WhatsApp-Clone-Backend"
    },
    {
      title: "FinTaxVers.com",
      category: "Web",
      tagline: "Financial & Tax Consultancy Platform",
      badge: "Freelance Production Project",
      description: "Full-stack client platform that reduced onboarding time by ~30% and implemented dynamic service routing.",
      problem: "Tax and financial consultancy onboarding is traditionally paperwork-heavy, leading to high client drop-off. Navigating through 15+ different tax services was confusing for users, and manually routing inquiries delayed advisor response times.",
      solution: "Designed and deployed a highly performant, SEO-optimized web application with dynamic React Router service paths. Built an automated inquiry intake system using EmailJS and Firestore that instantly routes lead details to the correct tax specialists, reducing onboarding time by ~30%.",
      image: "/images/projects/fintaxvers.png",
      tech: ["React.js", "Vite", "Firebase", "EmailJS", "Tailwind CSS"],
      detailedTech: ["React.js", "Vite", "Firebase Firestore", "EmailJS", "Tailwind CSS", "React Router", "Framer Motion"],
      github: "https://github.com/RAHUL0408-B/FinTaxYug",
      demo: "https://fintaxvers.com"
    },
    {
      title: "Unmatrix",
      category: "Web",
      tagline: "Interior Estimator Platform",
      badge: "Freelance Platform",
      description: "Shopify-style interior design platform featuring product listings, cart management, and dynamic quotation generation.",
      problem: "Interior design clients struggle to visualize costs based on materials and room specifications in real-time. Designing custom quotes took designers days, slowing down the sales cycle and reducing conversion rates.",
      solution: "Developed a Shopify-style interior estimator platform. Clients select products, materials, and dimension specs, and a custom calculations engine instantly computes estimations and generates a downloadable PDF proposal, shortening the sales cycle.",
      image: "/images/projects/unmatrix.png",
      tech: ["React.js", "Node.js", "PostgreSQL", "REST APIs", "Tailwind CSS"],
      detailedTech: ["React.js", "Node.js", "Express.js", "PostgreSQL (Sequelize)", "Tailwind CSS", "jsPDF", "REST APIs"],
      github: "https://github.com/RAHUL0408-B/Estimation.web",
      demo: "https://estimationweb.netlify.app/"
    },
    {
      title: "Agriguard",
      category: "AI / IoT",
      tagline: "AI-Powered Plant Disease Triage System",
      badge: "Machine Learning / IoT",
      description: "End-to-end plant health monitoring system integrating IoT sensor data with ML-based image analysis.",
      problem: "Crop diseases often go unnoticed until significant damage is done, leading to massive yield losses for small-scale farmers. Traditional soil and crop health monitoring requires manual expert inspection, which is costly and slow.",
      solution: "Engineered an end-to-end plant health triage system. Integrated physical IoT sensors (soil moisture, temperature, humidity) with a Convolutional Neural Network (CNN) trained on plant leaves. The system provides early disease warnings and actionable remediation steps on a real-time web dashboard.",
      image: "/images/projects/agriguard.png",
      images: ["/images/projects/agriguard.png", "/images/projects/agriguard_2.png"],
      tech: ["Python", "IoT Sensors", "Machine Learning", "TensorFlow"],
      detailedTech: ["Python", "TensorFlow/Keras", "Convolutional Neural Networks (CNN)", "IoT Hardware (ESP32)", "React.js (Dashboard)", "Flask API", "Chart.js"],
      github: "https://github.com/Anicantcode/Cyberpunks-Agriguard",
      demo: "https://cyberpunks-agriguard.vercel.app/"
    }
  ],
  experience: [
    {
      role: "Freelance Full-Stack Developer",
      company: "FinTaxVers.com",
      duration: "Jan 2026 – Present",
      location: "Nagpur, India",
      github: "https://github.com/RAHUL0408-B/FinTaxYug",
      live: "https://fintaxvers.com",
      points: [
        "Built and deployed a full-stack financial/tax consultancy platform using React, Vite, and Firebase, decreasing client onboarding time by ~30%.",
        "Implemented dynamic routing and SEO-optimized service pages using React Router.",
        "Integrated EmailJS and Firebase for automated inquiry workflows, reducing manual response effort.",
        "Structured Firestore NoSQL data architecture for horizontal scalability."
      ]
    },
    {
      role: "Software Developer Intern",
      company: "NextGenTech",
      duration: "Feb 2026 – May 2026",
      location: "Pune, India",
      points: [
        "Contributing to full-stack feature development and code reviews within an agile team.",
        "Working on production-grade codebases using Git/GitHub and CI/CD practices.",
        "Collaborating with senior engineers on sprint planning and sprint deliveries."
      ]
    }
  ],
  achievements: [
    {
      title: "Winner - Techathon 3.0",
      year: "2026",
      desc: "Best Solution Award for EcoBounty, an AI-powered environmental reporting platform selected out of hundreds of competing teams."
    },
    {
      title: "Certificate of Appreciation - Pandora Hackathon",
      year: "2026",
      desc: "Recognized for innovative design and execution in the AI for Smart Cities track."
    },
    {
      title: "Java & DSA Internship - Talent Battle Pvt. Ltd.",
      year: "2025",
      desc: "Completed intensive training in Java programming, OOP principles, and algorithmic problem-solving."
    },
    {
      title: "AWS Certified Machine Learning - Specialty Prep",
      year: "2025",
      desc: "Completed comprehensive training on ML pipelines, SageMaker, and cloud model deployment."
    }
  ]
};
