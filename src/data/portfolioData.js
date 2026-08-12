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
  { name: "Intro", href: "#hero" },
  { name: "Chat", href: "#chatbot" },
  { name: "Open Source", href: "#opensource" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Articles", href: "#articles" },
  { name: "Movies", href: "#movies" },
  { name: "Reach Out", href: "#contact" },
];

// Ordered list of sections for the Mentos Life guided tour.
// meta.title shows in the tour progress indicator; meta.hint shows as the spotlight caption.
export const tourSections = [
  { id: "hero", name: "Intro", title: "Intro", hint: "That's me — Vatsal. AI/ML engineer, IIT Bhilai student." },
  { id: "chatbot", name: "Chat", title: "Chat", hint: "Ask me anything — this little bot answers for me." },
  { id: "opensource", name: "Open Source", title: "Open Source", hint: "Live GitHub activity, straight from the API." },
  { id: "skills", name: "Skills", title: "Skills", hint: "Move your cursor — the boxes react. Physics, baby." },
  { id: "projects", name: "Projects", title: "Projects", hint: "Click any card to open the full detail page." },
  { id: "experience", name: "Experience", title: "Experience", hint: "Internship, leadership, and education timeline." },
  { id: "articles", name: "Articles", title: "Articles", hint: "Things I've written. (Placeholders for now.)" },
  { id: "movies", name: "Movies", title: "Movies", hint: "What I watch when I'm not training models." },
  { id: "contact", name: "Reach Out", title: "Reach Out", hint: "Last stop. Drop a message and let's talk." },
];

// ── Chatbot ──
// Casual & fun tone. Each entry: keywords[] to pattern-match (lowercased), and an `answer`.
// The first matching entry wins, so order broad → specific.
export const chatbotResponses = [
  {
    keywords: ["hi", "hello", "hey", "yo", "sup", "namaste"],
    answer: "Heyy! 👋 I'm Vatsal's mini-bot. Ask me about his stack, his internship, his projects, or what he's looking for. Or just type whatever — I'll do my best.",
  },
  {
    keywords: ["tech stack", "stack", "technologies", "tools", "what do you use", "frameworks"],
    answer: "Vatsal's daily stack: Python + FastAPI for backends, LangGraph/LangChain for multi-agent systems, PyTorch + scikit-learn for ML, ChromaDB for RAG, Docker + AWS EC2 for deploy, and a sprinkle of Streamlit for quick UIs. TypeScript/React when the frontend needs love too.",
  },
  {
    keywords: ["internship", "intern", "incrivelsoft", "numaa", "nutrition agent"],
    answer: "He's currently an AI/ML Intern at Incrivelsoft, owning the Nutrition Agent inside the NUMAA.ai multi-agent platform — regulating agent behaviour, debugging production bugs, and designing inter-agent state handoffs. Started May 2026, remote.",
  },
  {
    keywords: ["project", "projects", "work", "portfolio", "what have you built", "showcase"],
    answer: "Top builds: HelixDesk (3-agent LangGraph support system, ~1.8s resolution), FinSight AI (4-stage financial microservice, 100% intent accuracy), and JobFit-AI (resume-JD matcher on 13k+ pairs, fine-tuned SBERT). Scroll down to the Projects section — each card opens a full detail page.",
  },
  {
    keywords: ["looking for", "looking", "opportunity", "role", "job", "hire", "available"],
    answer: "He's open to AI/ML Engineering internships & full-time roles, multi-agent / LLM / RAG work especially. Remote-first, but open to relocate for the right team. Currently based out of Bhilai/Agra, India.",
  },
  {
    keywords: ["education", "college", "university", "iit", "study", "degree", "cgpa", "gpa"],
    answer: "B.Tech in Data Science & AI at IIT Bhilai (2024–2028), current CGPA 7.61/10. Core coursework spans ML, DL, NLP, CV, multi-agent systems, DSA, and linear algebra.",
  },
  {
    keywords: ["multi-agent", "agent", "langgraph", "langchain", "rag", "llm", "groq", "llama"],
    answer: "Multi-agent systems are his happy place — LangGraph state machines, ReAct loops, RAG with ChromaDB + Sentence-Transformers, served via FastAPI with Llama-3.3-70b on Groq. HelixDesk and the ReAct paper implementation both live on his GitHub.",
  },
  {
    keywords: ["resume", "cv", "download cv", "download resume"],
    answer: "You can grab his resume from the 'Resume' button up in the navbar — top-right. PDF, always up to date.",
  },
  {
    keywords: ["contact", "email", "reach", "phone", "get in touch", "message"],
    answer: "Easiest: email him at vatsal.y.official@gmail.com. Or scroll to the 'Reach Out' section at the bottom — there's a form that goes straight to his inbox. He replies fast.",
  },
  {
    keywords: ["github", "open source", "contributions", "commits", "prs", "pull request"],
    answer: "His GitHub is github.com/vatsalyd — check the 'Open Source' section just below, it pulls live activity straight from the GitHub API. PRs, events, and a little heatmap.",
  },
  {
    keywords: ["movies", "film", "favorite movie", "favourite", "cinema", "watch"],
    answer: "Oh you noticed the Movies section 👀 — that's his vibe check. Sci-fi and mind-bendy stuff mostly. Scroll down to see the picks with his notes on why.",
  },
  {
    keywords: ["where", "location", "based", "city", "live"],
    answer: "Bhilai (Chhattisgarh) during the semester, Agra (UP) during breaks. Remote-friendly everywhere else.",
  },
];

export const chatbotFallback = "Great question! For that one, reach out to me directly — vatsal.y.official@gmail.com. I'd rather give you a real answer than a guessed one.";

export const chatbotSuggestions = [
  "What's your tech stack?",
  "Tell me about your internship",
  "What have you built?",
  "What are you looking for?",
];

// ── Articles (placeholder) ──
// Replace `url`, `excerpt`, `date`, `readTime` with real values later.
export const articles = [
  {
    title: "Building a 3-Agent Support System with LangGraph",
    excerpt: "How I architected HelixDesk — a Triage → Retrieval → Resolution state machine using Llama-3.3-70b on Groq, semantic ChromaDB search, and auto-escalation for low-confidence tickets.",
    date: "Jun 2026",
    readTime: "8 min read",
    url: "#",
    tag: "Multi-Agent",
  },
  {
    title: "ReAct from Scratch: Thought → Action → Observation",
    excerpt: "A from-scratch Python implementation of the ReAct paper (ICLR 2023). Walking through the autonomous loop, Wikipedia tools, and few-shot evaluation on HotpotQA and FEVER.",
    date: "May 2026",
    readTime: "11 min read",
    url: "#",
    tag: "LLMs",
  },
  {
    title: "Resume-JD Matching: 3 Models Beat 1",
    excerpt: "Why a stacked spaCy NER + XGBoost + fine-tuned Sentence-BERT ensemble outperformed any single model on 13,000+ resume-JD pairs across 24 job categories.",
    date: "Apr 2026",
    readTime: "9 min read",
    url: "#",
    tag: "ML",
  },
  {
    title: "Audio Mood Classification with librosa",
    excerpt: "Extracting MFCCs, spectral centroid, chroma STFT, and ZCR — then predicting song mood with Random Forest. A small but fun audio ML walkthrough.",
    date: "Mar 2026",
    readTime: "6 min read",
    url: "#",
    tag: "Audio ML",
  },
  {
    title: "SSE Over FastAPI for Real-Time AI Responses",
    excerpt: "Streaming LLM tokens andpipeline progress to the client with Server-Sent Events — patterns, gotchas, and a 166ms cached-latency benchmark.",
    date: "Feb 2026",
    readTime: "7 min read",
    url: "#",
    tag: "Backend",
  },
  {
    title: "From IIT Bhilai to Multi-Agent Internship",
    excerpt: "How my DSAI coursework, DSAI Club leadership, and side projects lined up to land the Incrivelsoft internship — and what I learned in the first months.",
    date: "Jan 2026",
    readTime: "5 min read",
    url: "#",
    tag: "Journey",
  },
];

// ── Favourite Movies (placeholder — swap with real picks later) ──
export const favMovies = [
  {
    title: "Interstellar",
    year: 2014,
    note: "The time-dilation scene broke my brain. Gargantua physics + Hans Zimmer organs = perfect.",
    accent: "violet",
    emoji: "🪐",
  },
  {
    title: "Inception",
    year: 2010,
    note: "Nested dreams as nested loop architectures.Christopher Nolan engineers stories like systems.",
    accent: "cyan",
    emoji: "🌀",
  },
  {
    title: "The Matrix",
    year: 1999,
    note: "The OG. Every AI conversation leads back here eventually. Red pill, always.",
    accent: "emerald",
    emoji: "💊",
  },
  {
    title: "Blade Runner 2049",
    year: 2017,
    note: "Visual mood-board for any agentic-system future. 'Tears in rain' energy throughout.",
    accent: "amber",
    emoji: "🌆",
  },
  {
    title: "Arrival",
    year: 2016,
    note: "Linguistics as the real alien tech. Made me rethink how agents 'understand' each other.",
    accent: "rose",
    emoji: "🛸",
  },
  {
    title: "Ex Machina",
    year: 2014,
    note: "Cautionary tale for anyone dating their own chatbot. Small cast, huge ideas.",
    accent: "violet",
    emoji: "🤖",
  },
];

// ── GitHub Open Source / static fallback data ──
// Used if the live API rate-limits. Keep the `events` shape matching GitHub's events API.
export const githubUser = "vatsalyd";
export const staticGithubFallback = {
  repos: 17,
  prs: [
    { repo: "vatsalyd/Multi-Agent-System-Planning", title: "HelixDesk: 3-agent LangGraph state machine", state: "merged", createdAt: "2026-06-12" },
    { repo: "vatsalyd/ReAct-Paper-Implementation", title: "ReAct Thought → Action → Observation loop", state: "merged", createdAt: "2026-05-08" },
    { repo: "vatsalyd/JobFit-AI", title: "Stacked spaCy + XGBoost + SBERT matcher", state: "merged", createdAt: "2026-04-21" },
    { repo: "vatsalyd/music-mood-classifier", title: "Audio feature extraction + Random Forest", state: "open", createdAt: "2026-03-15" },
  ],
  heatmap: Array.from({ length: 7 * 26 }, () => (Math.random() > 0.6 ? (Math.floor(Math.random() * 4) + 1) : 0)),
};
