export const resumeData = {
  personal: {
    name: "Rahul Bramhankar",
    title: "Full-Stack Developer",
    email: "rahulbramhankar04@gmail.com",
    phone: "+91 70571 67045",
    location: "Pune, India",
    linkedin: "https://linkedin.com/in/rahulbramhankar",
    github: "https://github.com/rahulbramhankar",
    tagline: "Full-Stack Developer · Hackathon Winner · Builder",
    about: "I'm a Computer Engineering student (2023–2027) who's been building real web apps since the early days of college. I work mostly with React, Node.js, Firebase, and REST APIs — both in freelance projects for actual clients and in hackathons where I helped ship a winning product. I care about writing clean code that works in production, not just in demos. Looking for a software engineering role where I can keep building and learning in a real team.",
    explore: ["Docker", "Spring Boot", "Solidity", "Selenium"]
  },
  stats: [
    { value: 400, suffix: "+", label: "Teams Competed Against" },
    { value: 3, suffix: "", label: "Live Projects" },
    { value: 2, suffix: "", label: "Hackathon Awards" },
    { value: 4, suffix: "", label: "Months Internship" }
  ],
  skills: {
    categories: [
      {
        name: "Languages & Frameworks",
        skills: ["Java", "JavaScript", "HTML", "CSS", "React.js", "Node.js", "REST APIs", "Hibernate"]
      },
      {
        name: "Databases & Cloud",
        skills: ["MySQL", "MongoDB", "PostgreSQL", "Firebase", "Supabase", "AWS (ML/SageMaker)"]
      },
      {
        name: "Tools & Concepts",
        skills: ["Git", "GitHub", "Postman", "VS Code", "Vite", "Agile", "CI/CD basics", "CRUD"]
      }
    ],
    radar: {
      labels: ["Frontend", "Backend", "Database", "Cloud", "Tools & Git", "Java & DSA"],
      data: [90, 85, 80, 75, 88, 85]
    }
  },
  projects: [
    {
      title: "EcoBounty",
      category: "AI / Web",
      tagline: "AI-Based Environmental Reporting Platform",
      badge: "🏆 Best Solution Award (Techathon 3.0)",
      description: "A community-driven full-stack web platform enabling users to report and track real-time environmental issues with AI-assisted verification APIs to validate submissions.",
      howItWorks: "Users capture a photo of an environmental hazard. The platform uploads this image to an AI model that runs classification to filter out spam. Valid reports are pinned on a dashboard map and administrators/government agencies are notified via automated workflows. Users earn EcoPoints, which gamifies community participation.",
      tech: ["React.js", "Node.js", "Firebase", "AI Verification APIs"],
      github: "https://github.com/rahulbramhankar/EcoBounty",
      demo: "https://github.com/rahulbramhankar/EcoBounty" // fallback or animated preview
    },
    {
      title: "FinTaxVers.com",
      category: "Web",
      tagline: "Financial & Tax Consultancy Platform",
      badge: "Freelance Production Project",
      description: "Full-stack client platform that reduced onboarding time by ~30% and implemented dynamic service routing.",
      howItWorks: "Features an automated contact and inquiry system that routes details to tax advisors using EmailJS and Firestore. Structured dynamically using React Router for SEO optimization and instant pages for 15+ different tax services.",
      tech: ["React.js", "Vite", "Firebase", "EmailJS", "Tailwind CSS"],
      github: "https://github.com/rahulbramhankar",
      demo: "https://fintaxvers.com"
    },
    {
      title: "Unmatrix",
      category: "Web",
      tagline: "Interior Estimator Platform",
      badge: "Freelance Platform",
      description: "Shopify-style interior design platform featuring product listings, cart management, and dynamic quotation generation.",
      howItWorks: "Computes complex materials and design selections dynamically to generate an accurate cost estimation PDF and proposal for customers in real-time, drastically reducing sales cycle length.",
      tech: ["React.js", "Node.js", "PostgreSQL", "REST APIs", "Tailwind CSS"],
      github: "https://github.com/rahulbramhankar",
      demo: "https://github.com/rahulbramhankar"
    },
    {
      title: "Agriguard",
      category: "AI / IoT",
      tagline: "AI-Powered Plant Disease Triage System",
      badge: "Machine Learning / IoT",
      description: "End-to-end plant health monitoring system integrating IoT sensor data with ML-based image analysis.",
      howItWorks: "Uses real-time data from soil moisture, temperature, and humidity sensors alongside an early-stage plant disease detection model using convolutional neural networks (CNNs) for proactive triage before crop damage.",
      tech: ["Python", "IoT Sensors", "Machine Learning", "TensorFlow"],
      github: "https://github.com/rahulbramhankar",
      demo: "https://github.com/rahulbramhankar"
    },
    {
      title: "Temple Donation Management",
      category: "Web",
      tagline: "Admin CRUD Platform",
      description: "A normalized relational database dashboard application built for temple administrators to efficiently log, filter, and track donations and donor details.",
      howItWorks: "A fully normalized MySQL schema prevents duplicate entries and allows admins to search transactions, generate reports, and update database fields with strict role validation.",
      tech: ["MySQL", "HTML", "CSS", "JavaScript", "Node.js"],
      github: "https://github.com/rahulbramhankar",
      demo: "https://github.com/rahulbramhankar"
    }
  ],
  experience: [
    {
      role: "Freelance Full-Stack Developer",
      company: "FinTaxVers.com",
      duration: "Jan 2026 – Present",
      location: "Nagpur, India",
      points: [
        "Built and deployed a full-stack financial/tax consultancy platform using React, Vite, and Firebase, decreasing client onboarding time by ~30%.",
        "Implemented dynamic routing and SEO-optimized service pages using React Router.",
        "Integrated EmailJS and Firebase for automated inquiry workflows, reducing manual response effort.",
        "Structured Firestore NoSQL data architecture for horizontal scalability."
      ]
    },
    {
      role: "Freelance Full-Stack Developer",
      company: "Unmatrix",
      duration: "Feb 2026 – Present",
      location: "Pune, India",
      points: [
        "Developed a Shopify-style interior estimator platform with product listing, cart, and proposal generation.",
        "Built a dynamic real-time cost estimation engine based on requirements.",
        "Designed RESTful backend and responsive frontend to scale concurrent user sessions."
      ]
    },
    {
      role: "Software Developer Intern",
      company: "NextGenTech",
      duration: "Feb 2026 – Present",
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
