// ── Portfolio Data — Single Source of Truth ──
// Updated to reflect latest resume details (IIT Bhilai B.Tech DSAI, CGPA 7.61, Incrivelsoft Internship, FinSight AI)

import { FaPython, FaDocker, FaGitAlt, FaAws, FaGithub, FaLinkedin, FaKaggle } from 'react-icons/fa';
import { SiPytorch, SiScikitlearn, SiPandas, SiNumpy, SiMongodb, SiStreamlit, SiLangchain, SiFastapi, SiOpenai, SiLeetcode } from 'react-icons/si';
import { TbBrandVscode, TbRobot, TbApi, TbBrain, TbDatabase, TbServer } from 'react-icons/tb';
import { BiLogoJavascript, BiLogoTypescript } from 'react-icons/bi';

export const personalInfo = {
  name: "Vatsal Yadav",
  firstName: "Vatsal",
  lastName: "Yadav",
  initials: "VY",
  roles: [
    "AI & ML Engineer",
    "Multi-Agent Systems Builder",
    "Data Scientist",
    "LLM Pipeline Architect",
  ],
  bio: "B.Tech student in Data Science & AI at IIT Bhilai and AI & ML Intern at Incrivelsoft. I architect autonomous multi-agent frameworks, RAG pipelines, and production machine learning models that turn complex data into intelligent action.",
  email: "vatsal.y.official@gmail.com",
  phone: "+91 7983709173",
  location: "Bhilai / Agra, India",
  university: "Indian Institute of Technology (IIT) Bhilai",
  degree: "B.Tech in Data Science & Artificial Intelligence",
  year: "2nd Year (2024 – 2028)",
  gpa: "7.61 / 10.0",
  resumeLink: "/Portfolio/resume.pdf",
  avatarUrl: null,
};

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/vatsalyd", icon: FaGithub },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/vatsal-yadav", icon: FaLinkedin },
  { name: "Kaggle", url: "https://www.kaggle.com/vatsalydd", icon: FaKaggle },
  { name: "LeetCode", url: "https://leetcode.com/u/vatsal_yd/", icon: SiLeetcode },
];

export const stats = [
  { label: "CGPA (IIT Bhilai)", value: 7.61 },
  { label: "AI & ML Projects", value: 6, suffix: "+" },
  { label: "Models & Agents Deployed", value: 5, suffix: "+" },
  { label: "Hackathon Participants Mentored", value: 100, suffix: "+" },
];

export const skillCategories = [
  {
    name: "AI & Multi-Agent Engineering",
    subtitle: "Autonomous agentic workflows, LLM orchestration, and RAG systems",
    icon: TbBrain,
    skills: [
      { name: "Multi-Agent Systems", category: "Core", icon: TbRobot, tag: "LangGraph / NUMAA.ai" },
      { name: "LangGraph", category: "Framework", icon: TbRobot, tag: "State Machines" },
      { name: "LangChain", category: "Framework", icon: SiLangchain, tag: "Agentic Chains" },
      { name: "Retrieval-Augmented Generation (RAG)", category: "Architecture", icon: TbApi, tag: "ChromaDB / Vector Search" },
      { name: "Prompt Engineering", category: "LLMs", icon: TbApi, tag: "ReAct / Dynamic Prompting" },
      { name: "OpenAI / Groq API", category: "LLMs", icon: SiOpenai, tag: "Llama-3.3-70b / GPT-4o" },
      { name: "Inter-Agent Protocols", category: "Architecture", icon: TbServer, tag: "State Handoffs" },
      { name: "ReAct Framework", category: "Architecture", icon: TbBrain, tag: "Thought-Action Loops" },
    ]
  },
  {
    name: "Machine Learning & NLP",
    subtitle: "Predictive modeling, deep learning, sentence transformers, and evaluation",
    icon: TbRobot,
    skills: [
      { name: "PyTorch", category: "Deep Learning", icon: SiPytorch, tag: "Neural Networks" },
      { name: "Sentence Transformers (SBERT)", category: "NLP", icon: SiPytorch, tag: "Dual-Encoders / Embeddings" },
      { name: "Scikit-learn", category: "Machine Learning", icon: SiScikitlearn, tag: "Regression / Classification" },
      { name: "XGBoost", category: "Machine Learning", icon: TbApi, tag: "Gradient Boosting" },
      { name: "Natural Language Processing (NLP)", category: "Domain", icon: TbBrain, tag: "spaCy / Tokenization" },
      { name: "Audio ML (librosa)", category: "Domain", icon: TbRobot, tag: "MFCCs / Spectral Feature Extract" },
      { name: "Feature Engineering", category: "Data Science", icon: TbDatabase, tag: "TF-IDF / Jaccard / Cosine" },
      { name: "Model Calibration & Ranking", category: "MLOps", icon: TbApi, tag: "Rank-based Scoring" },
    ]
  },
  {
    name: "Backend, Cloud & MLOps",
    subtitle: "Production deployment, microservices, containerization, and REST APIs",
    icon: TbServer,
    skills: [
      { name: "FastAPI", category: "Backend", icon: SiFastapi, tag: "Async REST APIs" },
      { name: "Docker", category: "Containerization", icon: FaDocker, tag: "Microservices" },
      { name: "AWS EC2 / ECR", category: "Cloud", icon: FaAws, tag: "Cloud Infrastructure" },
      { name: "GitHub Actions (CI/CD)", category: "DevOps", icon: FaGitAlt, tag: "Push-to-Deploy Pipelines" },
      { name: "ChromaDB", category: "Databases", icon: SiMongodb, tag: "Vector Database" },
      { name: "Streamlit", category: "Deployment", icon: SiStreamlit, tag: "Interactive AI Interfaces" },
      { name: "Server-Sent Events (SSE)", category: "Streaming", icon: TbServer, tag: "Real-time Streaming" },
      { name: "Python", category: "Language", icon: FaPython, tag: "Primary Stack" },
    ]
  },
  {
    name: "Data Science & Development Tools",
    subtitle: "Data manipulation, analytics visualization, and core languages",
    icon: TbDatabase,
    skills: [
      { name: "Pandas & NumPy", category: "Data Manipulation", icon: SiPandas, tag: "Vectorized Analytics" },
      { name: "Matplotlib / Seaborn / Plotly", category: "Visualization", icon: TbDatabase, tag: "Exploratory Analytics" },
      { name: "SQL", category: "Databases", icon: TbDatabase, tag: "Relational Queries" },
      { name: "C Language", category: "Systems", icon: TbApi, tag: "Systems Programming" },
      { name: "TypeScript / JavaScript", category: "Web", icon: BiLogoTypescript, tag: "Frontend & Web Apps" },
      { name: "Git & GitHub", category: "Version Control", icon: FaGitAlt, tag: "Collaborative Workflows" },
      { name: "VS Code & Linux", category: "Environment", icon: TbBrandVscode, tag: "Development Setup" },
    ]
  },
];

export const projects = [
  {
    title: "HelixDesk — Enterprise Support Intelligence",
    description: "Enterprise multi-agent customer support system powered by a 3-agent LangGraph state machine (Triage → Retrieval → Resolution) using Llama-3.3-70b via Groq. Features auto-escalation for low-confidence tickets, semantic ChromaDB search with Sentence-Transformers for citation-backed responses, and FastAPI REST endpoints integrated with Slack & webhooks. Achieves ~1.8s average resolution time.",
    tags: ["LangGraph", "Llama-3.3-70b", "ChromaDB", "FastAPI", "Docker", "AWS EC2", "CI/CD"],
    category: "AI",
    image: null,
    github: "https://github.com/vatsalyd/Multi-Agent-System-Planning",
    live: "http://44.214.206.48:8000/api/v1/docs",
    featured: true,
  },
  {
    title: "FinSight AI — Intelligent Portfolio Co-Pilot",
    description: "Real-time AI financial microservice featuring a 4-stage pipeline (Rate Limiter → Safety Guard → Intent Classifier → Agent Router) classifying queries across 10 financial domains with 100% accuracy. Includes a Portfolio Health Agent computing CAGR, benchmark alpha, and concentration risk from live yfinance data, streamed via Server-Sent Events (SSE) with 166ms cached latency.",
    tags: ["Python", "FastAPI", "SSE", "yfinance", "Rate Limiter", "Financial AI"],
    category: "AI",
    image: null,
    github: "https://github.com/vatsalyd",
    live: null,
    featured: true,
  },
  {
    title: "JobFit-AI — Resume Matching Engine",
    description: "3-model resume-JD matching system trained on 13,000+ pairs across 24 job categories. Combines spaCy skill NER, XGBoost trained on 10 custom feature metrics (TF-IDF, Jaccard, SBERT cosine), and a fine-tuned Sentence-BERT dual-encoder. Deployed on AWS EC2 (t3.small) via containerized Streamlit.",
    tags: ["XGBoost", "PyTorch", "Sentence-BERT", "spaCy", "Streamlit", "AWS EC2"],
    category: "ML",
    image: null,
    github: "https://github.com/vatsalyd/JobFit-AI",
    live: "http://54.211.51.42:8501/",
    featured: true,
  },
  {
    title: "Music Mood Classifier",
    description: "Audio classification system that predicts song moods (happy, sad, romantic, dramatic, angry) by extracting acoustic features — tempo, spectral centroid, chroma STFT, ZCR, and MFCCs — using librosa. Trained with Random Forest Classifiers and served via Streamlit.",
    tags: ["librosa", "Scikit-learn", "Random Forest", "Audio ML", "Streamlit"],
    category: "ML",
    image: null,
    github: "https://github.com/vatsalyd/music-mood-classifier",
    live: null,
    featured: false,
  },
  {
    title: "ReAct Paper Implementation",
    description: "From-scratch Python implementation of ReAct: Synergizing Reasoning and Acting in Language Models (ICLR 2023). Implements an autonomous Thought → Action → Observation loop with Wikipedia search tools and few-shot evaluation on HotpotQA and FEVER.",
    tags: ["ReAct", "LangChain", "Groq", "Python", "LLMs"],
    category: "AI",
    image: null,
    github: "https://github.com/vatsalyd/ReAct-Paper-Implementation",
    live: null,
    featured: false,
  },
  {
    title: "ShiftSync — Shift Scheduling App",
    description: "Cross-platform mobile application built with React Native and Expo for shift scheduling and team coordination. Features real-time state sync, component architecture, and custom hooks.",
    tags: ["React Native", "Expo", "TypeScript", "Mobile"],
    category: "Dev",
    image: null,
    github: "https://github.com/vatsalyd/ShiftSync",
    live: null,
    featured: false,
  },
];

export const experience = [
  {
    type: "experience",
    title: "AI & ML Intern",
    organization: "Incrivelsoft Private Limited",
    period: "May 2026 – Present",
    location: "Remote",
    description: "Owning end-to-end development of the Nutrition Agent within the NUMAA.ai multi-agent platform. Regulating core agent functionality, diagnosing production bugs, and shipping feature enhancements for response quality. Designing inter-agent communication flows and state-handoff protocols with domain agents.",
    skills: ["Multi-Agent Systems", "NUMAA.ai", "State Handoffs", "Agent Orchestration", "Python"],
  },
  {
    type: "experience",
    title: "Coordinator | Core Member",
    organization: "Data Science & AI Club (DSAI), IIT Bhilai",
    period: "Aug 2024 – Present",
    location: "Bhilai, Chhattisgarh",
    description: "Promoted to Coordinator overseeing the club's AI/ML initiatives. Organized a high-impact hackathon at Meraz (IIT Bhilai's annual fest) for 100+ participants, delivered machine learning workshops, and mentored junior members in deep learning and data science.",
    skills: ["Leadership", "Hackathon Management", "ML Workshops", "Mentorship"],
  },
  {
    type: "experience",
    title: "Student Volunteer",
    organization: "Centre for Career Planning & Services (CCPS), IIT Bhilai",
    period: "Sep 2024 – Present",
    location: "Bhilai, Chhattisgarh",
    description: "Leading outreach to 100+ companies for campus placement drives. Maintaining recruiter relational databases and coordinating official placement communications and logistics.",
    skills: ["Corporate Outreach", "Database Management", "Event Coordination"],
  },
  {
    type: "education",
    title: "B.Tech in Data Science & Artificial Intelligence",
    organization: "Indian Institute of Technology (IIT) Bhilai",
    period: "2024 – 2028",
    location: "Bhilai, Chhattisgarh",
    description: "Current CGPA: 7.61 / 10.0. Core coursework includes Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Multi-Agent Systems, Data Structures & Algorithms, and Linear Algebra.",
    skills: ["Data Science", "Artificial Intelligence", "IIT Bhilai", "CGPA 7.61"],
  },
  {
    type: "education",
    title: "Class XII (ICSE / ISC)",
    organization: "St. Peters College",
    period: "2023",
    location: "Agra, Uttar Pradesh",
    description: "Completed Grade 12 with 94% aggregate score.",
    skills: ["Mathematics", "Physics", "Computer Science"],
  },
];

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];
