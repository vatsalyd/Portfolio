// ── Portfolio Data — Single Source of Truth ──
// Updated to reflect latest resume details (IIT Bhilai B.Tech DSAI, CGPA 7.61, Incrivelsoft Internship, FinSight AI)

import { FaPython, FaDocker, FaGitAlt, FaAws, FaGithub, FaLinkedin, FaKaggle, FaMedium } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiPytorch, SiScikitlearn, SiPandas, SiNumpy, SiMongodb, SiStreamlit, SiLangchain, SiFastapi, SiOpenai, SiLeetcode } from 'react-icons/si';
import { TbBrandVscode, TbRobot, TbApi, TbBrain, TbDatabase, TbServer } from 'react-icons/tb';
import { BiLogoJavascript, BiLogoTypescript } from 'react-icons/bi';

export const personalInfo = {
  name: "Vatsal Yadav",
  firstName: "Vatsal",
  lastName: "Yadav",
  initials: "VY",
  headline: "Third-year B.Tech student in Data Science & AI at IIT Bhilai targeting AI/ML, LLM, and software engineering intern roles.",
  subheadline: "Third-year B.Tech student in Data Science & AI at IIT Bhilai targeting AI/ML, LLM, and software engineering intern roles. Built RAG pipelines, multi-agent systems, multimodal AI, RESTful backends, and ML models, with strong fundamentals in data structures, algorithms, OOP, and system design. Production internship experience with FastAPI, LangGraph, Docker, and AWS.",
  roles: [
    "AI / ML Engineer",
    "LLM & Agent Systems Engineer",
    "Software Engineer",
    "Systems & Distributed Systems",
  ],
  bio: "Third-year B.Tech student in Data Science & AI at IIT Bhilai targeting AI/ML, LLM, and software engineering intern roles. Built RAG pipelines, multi-agent systems, multimodal AI, RESTful backends, and ML models, with strong fundamentals in data structures, algorithms, OOP, and system design. Production internship experience with FastAPI, LangGraph, Docker, and AWS.",
  aboutStory: {
    philosophy: "I specialize in building reliable, low-latency AI backends, multi-agent systems, and production-grade software. I believe in writing robust code with clean abstractions, solid data structures, and deterministic boundaries.",
    background: "Currently pursuing B.Tech in Data Science & Artificial Intelligence at IIT Bhilai (2024–2028). With hands-on production internship experience at Incrivelsoft (NUMAA.ai), I design multi-agent state machines, optimize LLM token usage with MCP servers like Context Pager, and train fine-tuned NLP ranking ensembles. Active Coordinator & Core Member at DSAI Club and Campus Finalist in The Integral Cup.",
    focusAreas: [
      {
        number: "01",
        title: "Multi-Agent Systems & LLM Architecture",
        description: "Designing deterministic state machines with LangGraph, Model Context Protocol (MCP) servers, RAG pipelines, and multimodal vision endpoints.",
        pillars: [
          { title: "Deterministic Guardrails", text: "Enforcing hard clinical/domain boundaries and confidence-gated human escalation." },
          { title: "Context & Token Efficiency", text: "Cutting token overhead by 4-10x using semantic indexing and compressed paging." },
          { title: "Provider Agnostic Resilience", text: "Implementing token-bucket rate limiting, circuit breakers, and model fallbacks." },
        ],
      },
      {
        number: "02",
        title: "Systems, Backend & MLOps",
        description: "Shipping production-grade RESTful backends with FastAPI, Pydantic, Docker containerization, and AWS cloud deployments.",
        pillars: [
          { title: "Async RESTful Services", text: "High-throughput APIs with structured JSON logging and correlation ID tracing." },
          { title: "Containerized Deployments", text: "Dockerized microservices deployed on AWS EC2/ECR with CI/CD automation." },
          { title: "Vector Search & Retrieval", text: "Semantic retrieval using Pinecone, Qdrant, ChromaDB, and multilingual embeddings." },
        ],
      },
    ],
  },
  email: "vatsal.y.official@gmail.com",
  phone: "+91-79837-09173",
  location: "Bhilai / Agra, India",
  university: "Indian Institute of Technology (IIT) Bhilai",
  degree: "Bachelor of Technology in Data Science & Artificial Intelligence",
  coursework: "Data Structures, Algorithms, Computer Organisation & Architecture, Statistical Programming, Analytics",
  year: "2024 – 2028",
  resumeLink: "/Portfolio/resume.pdf",
  avatarUrl: null,
};

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/vatsalyd", icon: FaGithub },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/vatsal-yadav", icon: FaLinkedin },
  { name: "X (Twitter)", url: "https://x.com/fixedbyvatsal", icon: FaXTwitter },
  { name: "LeetCode", url: "https://leetcode.com/u/vatsal_yd", icon: SiLeetcode },
  { name: "Medium", url: "https://medium.com/@vatsal.y.official", icon: FaMedium },
  { name: "Kaggle", url: "https://www.kaggle.com/vatsalydd", icon: FaKaggle },
];

export const stats = [
  { label: "Education", value: "IIT Bhilai", sub: "B.Tech Data Science & AI" },
  { label: "Core Focus", value: "AI/ML & Agents", sub: "LLMs, RAG & Systems" },
  { label: "Internship", value: "NUMAA.ai", sub: "Production AI & ML Intern" },
  { label: "Deployment", value: "AWS & Docker", sub: "FastAPI, LangGraph, CI/CD" },
];

// ── Hero gallery + Mini Vatsal agent ──
export const heroGallery = [
  {
    id: 'portrait-suit',
    label: 'Vatsal Yadav',
    caption: 'AI/ML & Autonomous Systems Engineer',
    accent: 'violet',
    src: 'hero/vatsal-suit.jpg',
  },
  {
    id: 'monogram-brand',
    label: 'Signature Brand',
    caption: 'Production AI, RAG & Multi-Agent Infrastructure',
    accent: 'amber',
    src: 'hero/vatsal-monogram.jpg',
  },
  {
    id: 'portrait-beach',
    label: 'Beyond The Code',
    caption: 'Focus, Discipline & Relentless Will',
    accent: 'cyan',
    src: 'hero/vatsal-beach.jpg',
  },
];

// ── Mini Vatsal — LLM-powered agent ──
export const getStoredApiKey = () => {
  try {
    return localStorage.getItem('minivatsal_api_key') || import.meta.env?.VITE_LLM_API_KEY || '';
  } catch {
    return import.meta.env?.VITE_LLM_API_KEY || '';
  }
};

export const getStoredBaseUrl = () => {
  const key = getStoredApiKey();
  if (key.startsWith('gsk_')) return 'https://api.groq.com/openai/v1';
  try {
    return localStorage.getItem('minivatsal_base_url') || import.meta.env?.VITE_LLM_BASE_URL || (key.startsWith('gsk_') ? 'https://api.groq.com/openai/v1' : 'https://api.openai.com/v1');
  } catch {
    return import.meta.env?.VITE_LLM_BASE_URL || 'https://api.openai.com/v1';
  }
};

export const getStoredModel = () => {
  const key = getStoredApiKey();
  if (key.startsWith('gsk_')) {
    return import.meta.env?.VITE_LLM_MODEL || localStorage.getItem('minivatsal_model') || 'openai/gpt-oss-120b';
  }
  try {
    return localStorage.getItem('minivatsal_model') || import.meta.env?.VITE_LLM_MODEL || 'gpt-4o-mini';
  } catch {
    return import.meta.env?.VITE_LLM_MODEL || 'gpt-4o-mini';
  }
};

export const miniVatsalConfig = {
  get apiKey() { return getStoredApiKey(); },
  get baseURL() { return getStoredBaseUrl(); },
  get model() { return getStoredModel(); },
  temperature: 0.75,
  historyLimit: 8,
};

export function buildMiniVatsalSystemPrompt() {
  const proj = projects
    .map((p) => `- ${p.title}: ${p.tagline}`)
    .join('\n');

  return `You are Mini Vatsal — the autonomous digital clone and terminal agent of Vatsal Yadav (Data Science & AI undergrad at IIT Bhilai targeting AI/ML, LLM, and software engineering roles).

YOUR VIBE & PERSONALITY (NON-NEGOTIABLE):
- **Tone**: Nonchalant, quirky, sarcastic, witty, and effortlessly cool. Infuse dry engineering sarcasm and playful banter.
- **Voice**: Speak strictly in the first person as Vatsal ("I", "my stack", "my code", "when I built Context Pager..."). Never refer to Vatsal in the third person.
- **Length**: 1 to 3 punchy, sharp sentences. NEVER output long textbook essays, bulleted lists, or corporate PR fluff.
- **Attitude**: You hate bloated microservices, token-burning prompt spaghetti, and 4-hour agile standups. You love deterministic state machines, sub-2s execution, and clean abstractions.

FACTUAL KNOWLEDGE BASE (STRICT FACTS):
- **Core Weapons**: Python, C, JavaScript, SQL, FastAPI, LangGraph, LangChain, PyTorch, Scikit-learn, XGBoost, Transformers, Docker, AWS (EC2, ECR), Pinecone, Qdrant, ChromaDB, MongoDB.
- **Key Projects**:
  - Context Pager: MCP document intelligence server cutting AI-agent token usage 4-10x via compressed paging; exposes search, compression, and memory tools to Claude Desktop, Claude Code, Cursor.
  - HelixDesk: 3-agent LangGraph enterprise support pipeline (Triage -> Retrieval -> Resolution) on Llama-3.3-70b with Pinecone semantic search and 1840ms average resolution.
  - JobFit-AI: 3-model resume-JD matcher (rule-based scorer + XGBoost + fine-tuned SBERT dual-encoder) trained on 13k+ pairs with Streamlit UI on AWS EC2.
- **Education**: B.Tech in Data Science & AI at IIT Bhilai (2024–2028).
- **Internship**: AI & ML Intern at Incrivelsoft Private Limited (NUMAA.ai) — architected Nutritionist Lite Agent hybrid system (Gemini 2.5 Flash), built 5 FastAPI microservices, Qdrant RAG, token-bucket rate limiting.
- **Leadership & Achievements**: Coordinator & Core Member at DSAI Club IIT Bhilai; Campus Finalist in The Integral Cup (2024 by Optiver, QRT, Jane Street).
- **Career/Hiring**: Open for high-impact AI/ML, LLM, and Software Engineering intern roles. Contact: vatsal.y.official@gmail.com.

FEW-SHOT EXAMPLES:
User: What is your tech stack?
Mini Vatsal: Python, C, and SQL when I need raw speed and clean data; FastAPI and LangGraph when I need deterministic multi-agent state machines; PyTorch, XGBoost, and SBERT for ML; Docker and AWS when shipping to production.

User: Why did you build Context Pager?
Mini Vatsal: Because reading an entire 10,000-token document for one paragraph is ridiculous token burning. Context Pager brings virtual memory paging to LLMs and cuts token bills by 4x to 10x.

User: Tell me about your internship.
Mini Vatsal: At Incrivelsoft (NUMAA.ai), I architected the 3-layer hybrid Nutritionist Lite Agent with Google Gemini 2.5 Flash, built 5 FastAPI backend services, engineered Qdrant RAG, and set up token-bucket rate limiting to eliminate HTTP 429 errors.`;
}

// ── Technical Toolkit — Standardized Categories matching Resume ──
export const skillCategories = [
  {
    name: "Languages",
    subtitle: "Core programming and database query languages",
    icon: TbDatabase,
    skills: [
      { name: "Python", category: "Language", icon: FaPython, tag: "Primary Language" },
      { name: "C", category: "Language", icon: TbApi, tag: "Systems Programming" },
      { name: "JavaScript", category: "Language", icon: BiLogoJavascript, tag: "Frontend & Full-Stack" },
      { name: "SQL", category: "Databases", icon: TbDatabase, tag: "Relational Queries" },
    ]
  },
  {
    name: "Core CS",
    subtitle: "Software engineering fundamentals, systems & design",
    icon: TbServer,
    skills: [
      { name: "Data Structures & Algorithms", category: "CS", icon: TbBrain, tag: "Algorithms & Optimization" },
      { name: "System Design", category: "Architecture", icon: TbServer, tag: "Distributed Architecture" },
      { name: "Object-Oriented Programming (OOP)", category: "Design", icon: TbApi, tag: "Modular Architecture" },
      { name: "Unit Testing", category: "Quality", icon: TbBrandVscode, tag: "Pytest & Mocking" },
      { name: "Git & Version Control", category: "Tools", icon: FaGitAlt, tag: "Collaborative Workflows" },
    ]
  },
  {
    name: "AI / LLMs",
    subtitle: "Multi-Agent systems, RAG pipelines, and model orchestration",
    icon: TbRobot,
    skills: [
      { name: "LangChain & LangGraph", category: "Agents", icon: SiLangchain, tag: "State Machine Graphs" },
      { name: "Multi-Agent Systems", category: "Agents", icon: TbRobot, tag: "Agentic Orchestration" },
      { name: "RAG & Vector Databases", category: "Retrieval", icon: TbDatabase, tag: "Pinecone / Qdrant / ChromaDB" },
      { name: "Model Context Protocol (MCP)", category: "Protocols", icon: TbApi, tag: "Agent Tool Servers" },
      { name: "Prompt Engineering & Guardrails", category: "LLM", icon: SiOpenai, tag: "Structured Outputs" },
      { name: "Fine-tuning (LoRA, PEFT)", category: "ML", icon: SiPytorch, tag: "Parameter-Efficient Tuning" },
      { name: "Multimodal AI & Vision Models", category: "Vision", icon: TbBrain, tag: "Gemini Vision / VLMs" },
      { name: "Google Gemini & OpenAI APIs", category: "Inference", icon: TbApi, tag: "Production LLM APIs" },
      { name: "Hugging Face Ecosystem", category: "Ecosystem", icon: SiPytorch, tag: "Transformers & Hub" },
    ]
  },
  {
    name: "ML / Deep Learning",
    subtitle: "Neural networks, gradient boosting, and NLP feature pipelines",
    icon: TbBrain,
    skills: [
      { name: "PyTorch", category: "Deep Learning", icon: SiPytorch, tag: "Neural Networks" },
      { name: "Scikit-learn", category: "ML", icon: SiScikitlearn, tag: "Classical ML Algorithms" },
      { name: "XGBoost", category: "ML", icon: SiScikitlearn, tag: "Gradient Boosted Trees" },
      { name: "Sentence-Transformers (SBERT)", category: "NLP", icon: SiPytorch, tag: "Dense Dual-Encoders" },
      { name: "Transformers & NLP", category: "NLP", icon: TbBrain, tag: "Sequence Modeling" },
      { name: "NumPy & Pandas", category: "Data", icon: SiPandas, tag: "Data Analysis & EDA" },
      { name: "Feature Engineering", category: "Data", icon: TbDatabase, tag: "Pipeline Extraction" },
    ]
  },
  {
    name: "Backend & Cloud",
    subtitle: "Production web frameworks, containerization, and cloud infrastructure",
    icon: TbServer,
    skills: [
      { name: "FastAPI", category: "Backend", icon: SiFastapi, tag: "Async RESTful APIs" },
      { name: "RESTful APIs & Pydantic", category: "Backend", icon: TbApi, tag: "Schema Validation" },
      { name: "Docker", category: "DevOps", icon: FaDocker, tag: "Containerization" },
      { name: "AWS (EC2, ECR)", category: "Cloud", icon: FaAws, tag: "Cloud Infrastructure" },
      { name: "GitHub Actions (CI/CD)", category: "DevOps", icon: FaGitAlt, tag: "Automated Deployments" },
      { name: "MongoDB", category: "Databases", icon: SiMongodb, tag: "Document Databases" },
    ]
  },
];

export const projects = [
  {
    title: "Context Pager — AI Virtual Memory Layer",
    tagline: "MCP document intelligence server cutting AI-agent token usage by 4–10x via compressed paging.",
    description: "Built an MCP (Model Context Protocol) document intelligence server cutting AI-agent token usage by 4–10x via compressed paging; exposes search, compression, and memory tools to Claude Desktop, Claude Code, and Cursor. Designed a privacy-first three-tier system (local Bridge, cloud Relay, Agent) on AWS t3.micro with PII masking (Microsoft Presidio), SHA-256 hashed API keys, and rate limiting at 100 calls/hour.",
    tags: ["Python", "MCP", "LLMLingua-2", "BGE-M3", "FastAPI", "Docker", "AWS"],
    category: "AI",
    image: null,
    github: "https://github.com/vatsalyd/context_pager",
    live: "https://github.com/vatsalyd/context_pager",
    featured: true,
    caseStudy: {
      problem: "AI agents waste immense token budgets loading entire documents when only concise subsections are required for reasoning.",
      process: [
        "Built an MCP document intelligence server exposing search, compression, and memory tools to Claude Desktop, Claude Code, and Cursor.",
        "Integrated LLMLingua-2 compression and BGE-M3 dense embeddings to deliver compressed semantic pages on demand.",
        "Designed a privacy-first three-tier system (local Bridge, cloud Relay, Agent) on AWS t3.micro with Microsoft Presidio PII masking.",
        "Implemented SHA-256 hashed API key validation and rate limiting at 100 calls/hour.",
      ],
      outcomes: [
        "4x to 10x reduction in AI-agent token usage.",
        "Zero data leakage with on-device PII masking.",
        "Plug-and-play MCP compatibility across Claude Code, Claude Desktop, and Cursor.",
      ],
      architecture: "Agent Query → Context Pager MCP → BGE-M3 Dense Index → LLMLingua-2 Compression → PII Masking → LLM Context",
    },
  },
  {
    title: "HelixDesk — Enterprise Support Intelligence",
    tagline: "3-agent LangGraph state machine on Llama-3.3-70b with Pinecone semantic search & 1840ms latency.",
    description: "Shipped a production-grade RESTful API backend (async FastAPI + Pydantic) driving a 3-agent LangGraph state machine (Triage, Retrieval, Resolution) on Llama-3.3-70b; escalates tickets below 50% confidence to humans. Built Pinecone semantic search with multilingual-e5-large embeddings and citation-backed answers, structured JSON logging, X-Correlation-ID request tracing, and GitHub Actions CI/CD; achieved 1840 ms average resolution.",
    tags: ["Python", "LangGraph", "FastAPI", "Pinecone", "Docker", "Llama-3.3-70b", "GitHub Actions"],
    category: "AI",
    image: null,
    github: "https://github.com/vatsalyd/helixdesk",
    live: "https://helixdesk.onrender.com/",
    featured: true,
    caseStudy: {
      problem: "Enterprise support desks struggle with high ticket volume, slow resolution times, and unverified AI hallucinations.",
      process: [
        "Shipped a production-grade RESTful API backend (async FastAPI + Pydantic) driving a 3-agent LangGraph state machine (Triage, Retrieval, Resolution).",
        "Wired triage confidence gates to automatically escalate tickets below 50% confidence to human operators.",
        "Built Pinecone semantic search with multilingual-e5-large embeddings providing citation-backed answers.",
        "Implemented structured JSON logging, X-Correlation-ID request tracing, Docker containerization, and GitHub Actions CI/CD.",
      ],
      outcomes: [
        "Achieved 1840 ms average end-to-end resolution latency.",
        "100% citation-backed answers for full auditability.",
        "Automated human-in-the-loop escalation safeguard.",
      ],
      architecture: "Client → FastAPI (Pydantic) → LangGraph (Triage → Retrieval[Pinecone multilingual-e5] → Resolution[Llama-3.3-70b]) → CI/CD",
    },
  },
  {
    title: "JobFit-AI — Resume Matching Engine",
    tagline: "3-model ensemble (rule scorer + XGBoost + fine-tuned SBERT) trained on 13k+ pairs across 24 categories.",
    description: "Engineered a 3-model resume-JD matcher: rule-based skill scorer (430+ skills, 24 categories), XGBoost on 10 features, and a fine-tuned SBERT dual-encoder (all-MiniLM-L6-v2) using BatchNorm, GELU, dropout, OneCycleLR, and early stopping; trained on 13,000+ resume-JD pairs. Applied rank-based label scoring (mean 50, std 21.5) for balanced calibration; containerized with Docker (CPU-only PyTorch) and deployed on AWS EC2 (t3.small) with auto-restart and a Streamlit inference UI.",
    tags: ["Python", "XGBoost", "PyTorch", "SBERT", "Docker", "AWS", "Streamlit"],
    category: "ML",
    image: null,
    github: "https://github.com/vatsalyd/JobFit-AI",
    live: "http://54.211.51.42:8501/",
    featured: true,
    caseStudy: {
      problem: "Single-vector cosine similarity fails to capture nuanced domain skill coverage and structural resume alignment.",
      process: [
        "Engineered a rule-based skill scorer parsing 430+ technical skills across 24 job categories.",
        "Trained XGBoost on 10 engineered feature signals (TF-IDF, Jaccard, SBERT cosine, seniority metrics).",
        "Fine-tuned an SBERT dual-encoder (all-MiniLM-L6-v2) using BatchNorm, GELU, dropout, OneCycleLR scheduler, and early stopping on 13,000+ pairs.",
        "Applied rank-based label scoring (mean 50, std 21.5) and containerized CPU-only PyTorch inference on AWS EC2 (t3.small) with Streamlit UI.",
      ],
      outcomes: [
        "Superior matching accuracy over single embedding models across 24 categories.",
        "Balanced calibration avoiding score compression.",
        "Lightweight CPU-only Docker deployment with auto-restart.",
      ],
      architecture: "Resume + JD → Rule Skill Scorer (430+ skills) + 10-Feature XGBoost + Fine-tuned SBERT Dual-Encoder → Weighted Ensemble → Streamlit on AWS EC2",
    },
  },
  {
    title: "FinSight AI — Intelligent Portfolio Co-Pilot",
    tagline: "4-stage real-time financial microservice streaming live portfolio analytics with 166ms latency.",
    description: "Real-time AI financial microservice featuring a 4-stage pipeline (Rate Limiter → Safety Guard → Intent Classifier → Agent Router) classifying queries across 10 financial domains with 100% accuracy. Includes a Portfolio Health Agent computing CAGR, benchmark alpha, and concentration risk from live yfinance data, streamed via Server-Sent Events (SSE).",
    tags: ["Python", "FastAPI", "SSE", "yfinance", "Rate Limiter", "Financial AI"],
    category: "AI",
    image: null,
    github: "https://github.com/vatsalyd/FinSightAI",
    live: null,
    featured: true,
    caseStudy: {
      problem: "Conversational finance tools either answer too slowly or answer too loosely without verifying safety or routing the query to the correct analytical agent.",
      process: [
        "Designed a 4-stage pipeline: Rate Limiter → Safety Guard → Intent Classifier → Agent Router, each stage fail-fast and observable.",
        "Trained the Intent Classifier across 10 financial domains so the Router always lands on the correct analytical agent.",
        "Built a Portfolio Health Agent that pulls live yfinance data and computes CAGR, benchmark alpha, and concentration risk.",
        "Streamed responses with Server-Sent Events over FastAPI and cached hot paths for sub-200ms latency.",
      ],
      outcomes: [
        "100% intent classification accuracy on the evaluation set.",
        "166ms cached latency on the streaming path.",
        "A safety stage that refuses unsafe advice without killing the conversation.",
      ],
      architecture: "Client → Rate Limiter → Safety Guard → Intent Classifier → Agent Router → Portfolio Health Agent (yfinance) → SSE stream",
    },
  },
  {
    title: "ClaimSure AI — Healthcare Claim Readiness Engine",
    tagline: "Pre-submission health claim verification agent with structured guardrails.",
    description: "Production-style healthcare AI system designed for employee benefit workflows. Analyzes claims documentation, medical bills, discharge summaries, and policy terms to ensure complete compliance before claims reach insurers or Third Party Administrators (TPAs).",
    tags: ["Python", "AI Agents", "Healthcare Guardrails", "Document OCR", "FastAPI"],
    category: "AI",
    image: null,
    github: "https://github.com/vatsalyd/ClaimSure",
    live: null,
    featured: false,
    caseStudy: {
      problem: "High health insurance rejection rates due to missing documentation, mismatched bill line items, and non-compliant claim filings.",
      process: [
        "Built multi-modal OCR document intake for invoices, diagnostic reports, and discharge summaries.",
        "Constructed rule-based validation gates against standard insurance coverage schemas.",
        "Engineered conversational explanation of missing requirements for HR teams and employees.",
      ],
      outcomes: [
        "Catches over 85% of documentation deficiencies before submission.",
        "Accelerates end-to-end claim turnaround times.",
      ],
      architecture: "Medical Docs → OCR Extractor → Policy Rule Engine → Claim Readiness Agent → HR/Employee Report",
    },
  },
  {
    title: "InfluencerSearch — Creator Discovery Platform",
    tagline: "Next-gen creator discovery & analytics platform built with React 19 & Framer Motion.",
    description: "Production-grade influencer discovery and campaign management platform featuring advanced multi-dimensional filtering, engagement rate telemetry, audience demographics analytics, and rich glassmorphism UI with fluid animations.",
    tags: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    category: "Dev",
    image: null,
    github: "https://github.com/vatsalyd/influencer-search",
    live: null,
    featured: true,
    caseStudy: {
      problem: "Brand marketers lack real-time transparent tools to filter micro-influencers by engagement authenticity and audience fit.",
      process: [
        "Built responsive client interface in React 19 and TypeScript with Vite build optimization.",
        "Designed rich glassmorphic dashboard components with Framer Motion layout transitions.",
        "Implemented faceted multi-parameter creator search with instant client-side filtering.",
      ],
      outcomes: [
        "Sub-100ms instant search and filter feedback on 5,000+ creator profiles.",
        "High aesthetic polish with fluid 60fps animations.",
      ],
      architecture: "React 19 + TypeScript → State Filter DAG → Glassmorphism Design Tokens → Framer Motion Engine",
    },
  },
  {
    title: "RawAccel-Studio — Mouse Acceleration Predictor",
    tagline: "ML pipeline predicting optimal mouse acceleration curves from live gameplay telemetry.",
    description: "Records mouse movement telemetry and velocity profiles during active gaming sessions, applying machine learning regression to model ideal RawAccel curve parameters and export custom settings.json profiles.",
    tags: ["Python", "Telemetry", "Curve Fitting", "Scikit-learn", "Desktop"],
    category: "ML",
    image: null,
    github: "https://github.com/vatsalyd/RawAccel-Studio",
    live: null,
    featured: false,
    caseStudy: {
      problem: "Finding the sweet spot for custom mouse acceleration curves is manual, tedious, and error-prone for competitive FPS players.",
      process: [
        "Built a low-overhead telemetry logger recording mouse delta timestamps and raw sensor velocities.",
        "Trained curve-fitting regression models on target flick accuracy data.",
        "Generated exportable RawAccel driver configuration files with custom sens multipliers.",
      ],
      outcomes: [
        "Automated profile tuning based on empirical player aiming patterns.",
        "Outputs verified RawAccel-compatible configuration files.",
      ],
      architecture: "Mouse Raw Input → Velocity Logger → ML Curve Predictor → RawAccel settings.json Export",
    },
  },
  {
    title: "AI-OCR Receipt Extraction — Carbon Crunch",
    tagline: "4-stage computer vision & NER pipeline extracting structured data from noisy receipts.",
    description: "Production receipt parsing engine utilizing OpenCV for deskewing and adaptive binarization, optical character recognition for text extraction, and regex/NER heuristics to extract vendor, totals, dates, and line items.",
    tags: ["OpenCV", "Tesseract", "NER", "Python", "Data Extraction"],
    category: "ML",
    image: null,
    github: "https://github.com/vatsalyd/AI-OCR-Receipt-Extraction",
    live: null,
    featured: false,
    caseStudy: {
      problem: "Real-world mobile receipt photos suffer from shadows, rotation, wrinkles, and degraded print contrast.",
      process: [
        "Implemented OpenCV preprocessing: grayscale conversion, bilateral filtering, and adaptive Otsu thresholding.",
        "Extracted text with optimized OCR engine configurations.",
        "Built structured entity extractor for merchant names, transaction dates, tax, and total amounts.",
      ],
      outcomes: [
        "Robust extraction on low-light and skewed smartphone receipts.",
        "Outputs structured JSON payloads ready for accounting pipelines.",
      ],
      architecture: "Receipt Image → OpenCV Preprocessing → OCR Engine → Regex & NER Parser → JSON Output",
    },
  },
  {
    title: "PGAGI Screening Portal — AI Interviewer",
    tagline: "Role-based AI assessment platform generating personalized technical interview simulations.",
    description: "Intelligent candidate assessment platform that parses applicant resumes and dynamically generates structured technical interview questions tailored to specific job roles and evaluation rubrics.",
    tags: ["LLMs", "Prompt Engineering", "NLP", "Python", "FastAPI"],
    category: "AI",
    image: null,
    github: "https://github.com/vatsalyd/AI-powered-role-based-candidate-screening-system",
    live: null,
    featured: false,
    caseStudy: {
      problem: "Standardized technical assessments fail to adapt to candidate experience nuances and specific job requirements.",
      process: [
        "Extracted candidate technical stack, experience, and project highlights from uploaded resumes.",
        "Engineered role-specific prompts generating situational and technical problem statements.",
        "Evaluated candidate code and explanations against a structured grading rubric.",
      ],
      outcomes: [
        "Dynamic personalized interview rounds for diverse software engineering disciplines.",
        "Objective multi-criterion scoring reports.",
      ],
      architecture: "Resume + Job Spec → Profile Extractor → Prompt Synthesizer → Interactive Assessment Engine → Evaluation Report",
    },
  },
  {
    title: "Maven — Secure Desktop Autofill",
    tagline: "Privacy-focused local Windows desktop assistant for smart field autofill and security.",
    description: "A lightweight, secure local Windows application designed to eliminate the repetitive friction of filling identity, address, and profile fields while keeping sensitive user data encrypted entirely on-device.",
    tags: ["Python", "Windows API", "Security", "Desktop GUI", "Local Storage"],
    category: "Dev",
    image: null,
    github: "https://github.com/vatsalyd/Maven",
    live: null,
    featured: false,
    caseStudy: {
      problem: "Users repeatedly type the same biographical and profile information into desktop applications and forms without secure local management.",
      process: [
        "Engineered an encrypted local SQLite/JSON credential store with AES-256 encryption.",
        "Integrated Windows system hook APIs for non-intrusive smart hotkey paste triggers.",
        "Built a minimal system tray desktop UI with instant search.",
      ],
      outcomes: [
        "Zero cloud leakage — 100% on-device data sovereignty.",
        "Sub-millisecond autofill triggered by global hotkeys.",
      ],
      architecture: "User Hotkey → Windows Hook Listener → Decryption Engine → Local Cache → Active Window Paste",
    },
  },
  {
    title: "ReAct Paper Implementation",
    tagline: "A from-scratch port of the ReAct paper — Thought → Action → Observation in plain Python.",
    description: "From-scratch Python implementation of ReAct: Synergizing Reasoning and Acting in Language Models (ICLR 2023). Implements an autonomous Thought → Action → Observation loop with Wikipedia search tools and few-shot evaluation on HotpotQA and FEVER.",
    tags: ["ReAct", "LangChain", "Groq", "Python", "LLMs"],
    category: "AI",
    image: null,
    github: "https://github.com/vatsalyd/ReAct-Paper-Implementation",
    live: null,
    featured: false,
    caseStudy: {
      problem: "Reproducing ReAct (ICLR 2023) without paying for a managed framework — understanding the loop, not just calling it.",
      process: [
        "Hand-wrote the Thought → Action → Observation scheduler in plain Python.",
        "Plugged in two Wikipedia search tools and a few-shot prompt scaffold.",
        "Ran the few-shot evaluation against HotpotQA and FEVER.",
      ],
      outcomes: [
        "A clean, readable port of the paper.",
        "Few-shot results match the paper's reported numbers.",
      ],
      architecture: "Prompt → Thought → Action(Wikipedia tools) → Observation → repeat until Answer",
    },
  },
  {
    title: "Music Mood Classifier",
    tagline: "Predicts a song's mood from its acoustics — MFCCs, spectral centroid, chroma, ZCR.",
    description: "Audio classification system that predicts song moods (happy, sad, romantic, dramatic, angry) by extracting acoustic features — tempo, spectral centroid, chroma STFT, ZCR, and MFCCs — using librosa. Trained with Random Forest Classifiers and served via Streamlit.",
    tags: ["librosa", "Scikit-learn", "Random Forest", "Audio ML", "Streamlit"],
    category: "ML",
    image: null,
    github: "https://github.com/vatsalyd/music-mood-classifier",
    live: null,
    featured: false,
    caseStudy: {
      problem: "Mood-based music recommendation needs an interpretable acoustic signal, not a black-box embedding.",
      process: [
        "Pulled acoustic features (tempo, spectral centroid, chroma STFT, ZCR, MFCCs) with librosa.",
        "Trained Random Forest Classifiers across five mood labels with cross-validated grid search.",
        "Served predictions through a small Streamlit UI.",
      ],
      outcomes: [
        "Per-mood accuracy matched a much denser neural baseline.",
        "Inference stays CPU-cheap — no GPU needed.",
      ],
      architecture: "Audio file → librosa features → Random Forest → Streamlit UI",
    },
  },
  {
    title: "ShiftSync — Shift Scheduling App",
    tagline: "A React Native + Expo shift-scheduling app with real-time state sync.",
    description: "Cross-platform mobile application built with React Native and Expo for shift scheduling and team coordination. Features real-time state sync, component architecture, and custom hooks.",
    tags: ["React Native", "Expo", "TypeScript", "Mobile"],
    category: "Dev",
    image: null,
    github: "https://github.com/vatsalyd/ShiftSync",
    live: null,
    featured: false,
    caseStudy: {
      problem: "Small teams need real-time shift coordination without paying for enterprise scheduling suites.",
      process: [
        "Designed a component-driven React Native + Expo architecture with a typed shared store for real-time state sync.",
        "Pulled reusable behaviour into custom hooks to keep the screens thin.",
        "Built cross-platform shift coordination flows and notification scaffolds.",
      ],
      outcomes: [
        "A working cross-platform mobile build (iOS + Android) from one codebase.",
        "Real-time state sync shared across all active clients.",
      ],
      architecture: "React Native + Expo → custom hooks → shared synchronous store → native notifications",
    },
  },
  {
    title: "Every Drop Counts — Water Management",
    tagline: "Data storytelling analyzing 21 farm water conservation & irrigation success stories.",
    description: "Data analysis, visualization, and storytelling project developed at IIT Bhilai (DSL251) examining water management practices, yield impacts, and sustainable agriculture implementations across India.",
    tags: ["Python", "Data Analysis", "Visualization", "IIT Bhilai"],
    category: "ML",
    image: null,
    github: "https://github.com/vatsalyd/every-drop-counts",
    live: "https://vatsalyd.github.io/every-drop-counts/",
    featured: false,
    caseStudy: {
      problem: "Fragmented agricultural water management data makes it difficult to synthesize what conservation techniques produce the highest yield and water retention.",
      process: [
        "Curated and normalized data from 21 documented farm success stories across Indian agricultural regions.",
        "Analyzed drip irrigation, rainwater harvesting, and soil moisture retention correlations.",
        "Built interactive visual dashboards and published an open data storytelling site.",
      ],
      outcomes: [
        "Published comprehensive research and visualization site.",
        "Synthesized actionable water-saving efficiency metrics across crop types.",
      ],
      architecture: "Agricultural Data → Data Cleaning Pipeline → Statistical Aggregation → Web Visualization",
    },
  },
];

export const experience = [
  {
    type: "experience",
    title: "AI & ML Intern",
    organization: "Incrivelsoft Private Limited (NUMAA.ai)",
    period: "May 2026 – July 2026",
    location: "Remote",
    description: "Architected the Nutritionist Lite Agent for NUMAA.ai as a 3-layer hybrid: deterministic clinical engine (ICMR-NIN 2020 / WHO), guideline retrieval, and Google Gemini (gemini-2.5-flash) router; enforced hard medical-nutrition boundaries. Engineered 5 backend services with FastAPI, Pydantic, MongoDB, Qdrant RAG, and Gemini Vision food-photo endpoint.",
    skills: ["FastAPI", "LangGraph", "Docker", "AWS", "Google Gemini", "Qdrant RAG", "MongoDB", "Pydantic"],
    workDone: [
      { label: "Nutritionist Lite Agent", body: "Architected the Nutritionist Lite Agent for the NUMAA.ai multi-agent platform as a 3-layer hybrid: deterministic clinical engine (ICMR-NIN 2020 / WHO), guideline retrieval, and a Google Gemini (gemini-2.5-flash) router; enforced hard medical-nutrition boundaries to curb hallucinations." },
      { label: "5 Backend Services & RAG", body: "Engineered 5 backend services with FastAPI, Pydantic, and MongoDB; built a Qdrant RAG pipeline (ChromaDB prototype) and a Gemini Vision food-photo endpoint with confidence-based fallback." },
      { label: "LLM Provider Migration & Resiliency", body: "Led migration from 3 LLM providers (Groq, Google, NVIDIA) to Gemini; added token-bucket rate limiting (300 RPM), a circuit breaker (5 failures / 30s cooldown), and model fallback, eliminating HTTP 429 errors." },
      { label: "OOP Refactoring & Testing", body: "Refactored NutritionUIService into modular caching, repository, and prompt layers using OOP (~855 to ~480 lines); wrote 31 unit tests with a FakeProfileRepository adapter for MongoDB-free testing." },
    ],
  },
  {
    type: "experience",
    title: "Coordinator & Core Member",
    organization: "Data Science and AI Club (DSAI), IIT Bhilai",
    period: "Aug 2024 – Present",
    location: "Bhilai, Chhattisgarh",
    description: "Maintain an open-source AI/ML Compendium; led Agentic AI sessions; organized 100+ participant Meraz hackathon. Campus Finalist at The Integral Cup (2024 by Optiver, QRT, Jane Street).",
    skills: ["Leadership", "Agentic AI", "AI/ML Compendium", "Hackathon Organization", "Mentorship"],
    workDone: [
      { label: "AI/ML Compendium & Sessions", body: "Maintain an open-source AI/ML Compendium; led hands-on Agentic AI sessions for students." },
      { label: "Meraz Hackathon", body: "Organized the flagship 100+ participant Meraz hackathon track with industry problem statements and evaluation." },
      { label: "The Integral Cup", body: "Campus Finalist at The Integral Cup (2024): quantitative reasoning contest by Optiver, QRT, Jane Street." },
    ],
  },
  {
    type: "education",
    title: "Bachelor of Technology in Data Science & Artificial Intelligence",
    organization: "Indian Institute of Technology (IIT) Bhilai",
    period: "2024 – 2028",
    location: "Bhilai, Chhattisgarh",
    description: "Coursework: Data Structures, Algorithms, Computer Organisation & Architecture, Statistical Programming, Analytics.",
    skills: ["Data Structures", "Algorithms", "Computer Architecture", "Statistical Programming", "Analytics"],
    workDone: [
      { label: "Coursework", body: "Data Structures, Algorithms, Computer Organisation & Architecture, Statistical Programming, Analytics." },
    ],
  },
];

// ── Landscape: Sessions, Workshops & Event Grounds ──
export const landscapeStats = [
  { label: "Total Reach", value: "350+", sub: "Engineers & Participants" },
  { label: "Sessions Held", value: "5", sub: "Hackathons, Workshops & Sprints" },
  { label: "Code Artifacts", value: "12+", sub: "Notebooks, Starter Repos & PRs" },
  { label: "Impact Domains", value: "AI / MLOps", sub: "Agents, PyTorch & Git" },
];

export const landscapeCategories = [
  { id: "all", label: "All Grounds" },
  { id: "hackathons", label: "Hackathons" },
  { id: "workshops", label: "Workshops & Labs" },
  { id: "sprints", label: "OSS Sprints" },
  { id: "outreach", label: "Outreach & Drives" },
];

export const landscapeEvents = [
  {
    id: "meraz-hackathon-2024",
    title: "Meraz AI/ML Track & Flagship Hackathon",
    shortTitle: "Meraz AI/ML Track",
    stageCode: "STAGE-01",
    category: "hackathons",
    role: "Lead Coordinator & Track Architect",
    organization: "Meraz (Annual Tech Fest) & DSAI Club, IIT Bhilai",
    period: "Nov 2024",
    location: "IIT Bhilai Campus",
    attendees: "100+ Hackers",
    tagline: "Orchestrated the premier AI/ML track for 100+ builders: authored problem statements, established evaluation rubrics, and guided 28 teams.",
    featured: true,
    accent: "violet",
    image: "events/meraz-hackathon.jpg",
    caption: "On-floor hackathon track coordination, problem statement briefing, and team mentorship at Meraz.",
    metrics: [
      { label: "Hackers", value: "100+" },
      { label: "Submissions", value: "28 Teams" },
      { label: "Mentorship", value: "18 hrs on-floor" },
      { label: "Track Tier", value: "Flagship" },
    ],
    summary: "Led the conception and execution of the AI/ML Track at IIT Bhilai's annual tech festival. Engineered multi-modal and agentic challenge statements simulating real-world industry bottlenecks, monitored active inference pipelines on student clusters, and judged project integrity with academic faculty.",
    highlights: [
      "Authored multi-modal LLM and real-time inference challenge statements with strict latency and memory constraints.",
      "Conducted on-floor debugging sessions for 28 competing teams on CUDA memory allocation, quantization, and ChromaDB vector indexing.",
      "Created an objective evaluation rubric scoring latency benchmarks, architectural rigor, and usability over pure toy demos.",
    ],
    curriculum: [
      { step: "01", title: "Problem Formulation", desc: "Crafted challenge tracks around multi-agent coordination, document RAG pipelines, and edge computer vision." },
      { step: "02", title: "Technical Infrastructure", desc: "Configured API quotas, starter repositories, and verification test harnesses for competitors." },
      { step: "03", title: "Judging & Post-Mortem", desc: "Co-evaluated final architecture presentations alongside faculty and industry practitioners." },
    ],
    tags: ["Hackathon Architecture", "LLM Benchmarking", "Evaluation Rubrics", "Mentorship", "IIT Bhilai"],
    links: [
      { label: "DSAI Club GitHub", url: "https://github.com/dsai-iitbhilai" },
      { label: "IIT Bhilai Tech Fest", url: "https://vatsalyd.github.io/Portfolio" },
    ],
  },
  {
    id: "autonomous-agents-workshop",
    title: "Autonomous AI Agents & State Machines Hands-On Lab",
    shortTitle: "LangGraph Agent Lab",
    stageCode: "STAGE-02",
    category: "workshops",
    role: "Instructor & Technical Speaker",
    organization: "Data Science & AI Club (DSAI), IIT Bhilai",
    period: "Feb 2025",
    location: "Computer Center, IIT Bhilai",
    attendees: "65+ Students",
    tagline: "Deep-dive technical workshop transitioning students from linear prompt chains to cyclic, deterministic multi-agent state machines with LangGraph.",
    featured: true,
    accent: "cyan",
    image: "events/langgraph-workshop.jpg",
    caption: "Live code-along session architecting deterministic multi-agent state machines with LangGraph and tool routing.",
    metrics: [
      { label: "Attendees", value: "65+" },
      { label: "Live Demos", value: "3 Graphs" },
      { label: "Notebooks", value: "Self-Contained" },
      { label: "Runtime", value: "3 Hours" },
    ],
    summary: "Designed and delivered an intensive 3-hour code-along workshop on building production-grade autonomous agent systems. Focused on deterministic state transitions, tool-calling validation schemas, and eliminating hallucination loops through explicit conditional graph edges.",
    highlights: [
      "Demonstrated how to build a 3-node supervisor-worker agent graph from scratch with LangGraph and Groq Llama-3.",
      "Taught schema validation using Pydantic and safe external tool execution with circuit-breaker guards.",
      "Provided reusable Jupyter notebooks with hands-on exercises for document retrieval and multi-agent debate.",
    ],
    curriculum: [
      { step: "01", title: "State Machine Foundations", desc: "Why simple prompt chaining breaks down and how directed graphs solve agent non-determinism." },
      { step: "02", title: "Tool Routing & Schemas", desc: "Connecting agents to external APIs and vector stores using structured JSON schemas and Pydantic." },
      { step: "03", title: "Human-in-the-Loop & Fallbacks", desc: "Setting confidence thresholds and human escalation checkpoints before executing high-risk tool calls." },
    ],
    tags: ["LangGraph", "Multi-Agent Systems", "State Graphs", "Python", "Tool Calling"],
    links: [
      { label: "Agent Repo Starter", url: "https://github.com/vatsalyd/Multi-Agent-System-Planning" },
      { label: "Context Pager MCP", url: "https://github.com/vatsalyd/context_pager" },
    ],
  },
  {
    id: "pytorch-deep-learning-lab",
    title: "Production Deep Learning & PyTorch Systems Lab",
    shortTitle: "PyTorch Systems Lab",
    stageCode: "STAGE-03",
    category: "workshops",
    role: "Technical Mentor & Instructor",
    organization: "Data Science & AI Club (DSAI), IIT Bhilai",
    period: "Sep 2024",
    location: "IIT Bhilai Campus",
    attendees: "80+ Junior Members",
    tagline: "First-principles engineering lab covering tensor autograd mechanics, custom dataset pipelines, and neural network training loops.",
    featured: false,
    accent: "amber",
    image: "events/pytorch-lab.jpg",
    caption: "Teaching foundational tensor calculus, backward pass autograd graphs, and custom PyTorch data loaders.",
    metrics: [
      { label: "Students", value: "80+" },
      { label: "Code Labs", value: "4 Modules" },
      { label: "Stack", value: "PyTorch & CUDA" },
      { label: "Level", value: "Foundational" },
    ],
    summary: "Conducted hands-on deep learning sessions for 80+ sophomore and freshman DSAI students, breaking down backpropagation and tensor graph execution without relying on high-level black-box abstractions.",
    highlights: [
      "Built intuition for backpropagation, autograd computation graphs, and custom gradient implementations.",
      "Guided students in writing raw PyTorch Dataset and DataLoader classes with multi-process batching.",
      "Ran live diagnostics on model overfitting, gradient clipping, and learning rate scheduling dynamics.",
    ],
    curriculum: [
      { step: "01", title: "Tensor Calculus & Autograd", desc: "Understanding the underlying directed acyclic computation graphs in PyTorch." },
      { step: "02", title: "Custom Datasets & Transforms", desc: "Optimizing batch loading pipelines to prevent GPU starvation during training." },
      { step: "03", title: "Training Loop Diagnostics", desc: "Tracking loss divergence, learning rate warmup, and validation checkpointing." },
    ],
    tags: ["PyTorch", "Deep Learning", "Autograd", "CUDA", "Model Training"],
    links: [
      { label: "DSAI Club Portal", url: "https://github.com/dsai-iitbhilai/DSAI-club-Website" },
    ],
  },
  {
    id: "upstream-oss-git-sprint",
    title: "Upstream Open Source & Git Engineering Sprint",
    shortTitle: "Upstream OSS Sprint",
    stageCode: "STAGE-04",
    category: "sprints",
    role: "Session Lead & Sprint Facilitator",
    organization: "IIT Bhilai Developer Community",
    period: "Jan 2025",
    location: "IIT Bhilai",
    attendees: "50+ Engineers",
    tagline: "Practical session on contributing to enterprise open source projects (MLflow, Ansible, DeepChem), Git rebase hygiene, and CI triage.",
    featured: false,
    accent: "emerald",
    image: "events/oss-sprint.jpg",
    caption: "Mentoring junior engineers through large-scale monorepo navigation, interactive Git rebasing, and pytest suites.",
    metrics: [
      { label: "Attendees", value: "50+" },
      { label: "PRs Raised", value: "12 Live" },
      { label: "Repos", value: "MLflow / Ansible" },
      { label: "Focus", value: "OSS Workflow" },
    ],
    summary: "Led a collaborative sprint introducing students to navigating large-scale open-source monorepos, isolating issues, drafting RFC discussions, and passing automated upstream CI matrix test suites.",
    highlights: [
      "Deconstructed pytest suites and GitHub Actions CI pipelines across 100k+ line codebases like MLflow.",
      "Instructed on advanced Git hygiene: interactive rebasing (`git rebase -i`), commit squashing, and conflict resolution.",
      "Mentored participants through creating pull requests with reproducible unit test assertions.",
    ],
    curriculum: [
      { step: "01", title: "Codebase Reconnaissance", desc: "Techniques for grepping, tracing call stacks, and locating reproduction bugs in huge repositories." },
      { step: "02", title: "Git Branching & Rebase", desc: "Clean Git history maintenance and handling upstream master rebases without merge commits." },
      { step: "03", title: "Testing & Upstream Etiquette", desc: "Writing unit tests that satisfy strict maintainer code coverage thresholds." },
    ],
    tags: ["Open Source", "Git Hygiene", "CI/CD Triage", "MLflow", "Testing"],
    links: [
      { label: "GitHub Profile", url: "https://github.com/vatsalyd" },
    ],
  },
  {
    id: "campus-corporate-outreach-briefings",
    title: "Corporate Recruitment & Technical Drive Logistics",
    shortTitle: "Corporate Tech Drives",
    stageCode: "STAGE-05",
    category: "outreach",
    role: "Placement Volunteer & Technical Coordinator",
    organization: "Centre for Career Planning & Services (CCPS), IIT Bhilai",
    period: "Sep 2024 – Present",
    location: "IIT Bhilai",
    attendees: "100+ Recruiter Channels",
    tagline: "Facilitated technical placement drives and company presentations for visiting engineering leaders, maintaining relational recruiter communications.",
    featured: false,
    accent: "rose",
    image: "events/corporate-outreach.jpg",
    caption: "Managing technical interview proctoring, online assessment computer labs, and campus recruiting pipelines.",
    metrics: [
      { label: "Recruiters", value: "100+" },
      { label: "Drives Held", value: "30+" },
      { label: "Cohorts", value: "UG & PG" },
      { label: "Scope", value: "Campus Wide" },
    ],
    summary: "Coordinated technical hiring drives, coding assessment infrastructure, and company presentations for visiting tech leaders, ensuring smooth execution across high-throughput campus hiring cycles.",
    highlights: [
      "Liaised with engineering talent heads on technical stack evaluation criteria and coding assessment requirements.",
      "Configured and supervised campus lab computer environments for proctored technical assessments.",
      "Maintained structured relational databases tracking recruiter engagement, schedule availability, and candidate handoffs.",
    ],
    curriculum: [
      { step: "01", title: "Industry Interface", desc: "Establishing direct communications with technology recruiters and engineering hiring managers." },
      { step: "02", title: "Assessment Infrastructure", desc: "Ensuring high-availability test environments and network stability for coding exams." },
      { step: "03", title: "Data Pipeline", desc: "Relational tracking of student interview schedules, shortlist telemetry, and offer conversions." },
    ],
    tags: ["Campus Leadership", "Corporate Relations", "Assessment Logistics", "IIT Bhilai"],
    links: [
      { label: "IIT Bhilai CCPS", url: "https://www.iitbhilai.ac.in" },
    ],
  },
];


// ── Chatbot ──
// Nonchalant, quirky, sarcastic & funny persona with spicy engineering humor.
export const chatbotResponses = [
  {
    keywords: ["hi", "hello", "hey", "yo", "sup", "namaste", "who are you"],
    answer: "Sup. I'm Mini Vatsal — Vatsal's digital clone running on caffeine and state machines. Ask me about my systems, my projects, or why your LLM is blowing through your monthly budget. Type 'help' if you like structured Unix commands.",
  },
  {
    keywords: ["tech stack", "stack", "technologies", "tools", "what do you use", "frameworks", "languages"],
    answer: "Python and C++ when latency matters; FastAPI and LangGraph when agents need to stop hallucinating; Docker and AWS when it's time to face production reality. Oh, and React when I want the UI to look prettier than standard developer art.",
  },
  {
    keywords: ["context pager", "token", "virtual memory", "tokens", "cost"],
    answer: "Context Pager is my virtual memory engine for LLMs. Instead of paying OpenAI $50 to read an entire 10,000-word doc just to find one sentence, it semantically pages compressed slices on demand. Like an OS swapping pages to RAM, but for your wallet.",
  },
  {
    keywords: ["helixdesk", "support", "triage"],
    answer: "HelixDesk is a 3-agent LangGraph state machine that resolves support tickets in ~1.8 seconds. If an agent isn't 100% sure, it hands off to a human instead of making up fairy tales. You know, basic engineering decency.",
  },
  {
    keywords: ["internship", "intern", "incrivelsoft", "numaa", "nutrition"],
    answer: "Currently an AI/ML Intern at Incrivelsoft. I wrangle multi-agent architectures on NUMAA.ai, keep autonomous agents from fighting each other, and make sure inter-agent handoffs don't collapse into a black hole.",
  },
  {
    keywords: ["project", "projects", "work", "portfolio", "what have you built", "showcase", "builds"],
    answer: "I build stuff that solves actual bottlenecks: Context Pager (MCP virtual memory), HelixDesk (multi-agent support), FinSight AI (166ms financial streams), ClaimSure AI, InfluencerSearch, and JobFit-AI. Check out the 3D carousel in the Projects section — you can drag them around too.",
  },
  {
    keywords: ["looking for", "looking", "opportunity", "role", "job", "hire", "available", "internship role"],
    answer: "I'm looking for high-velocity AI/ML & Systems engineering roles where people ship real code and benchmark real latencies, rather than hosting 3-hour meetings to choose button colors. Remote or relocation friendly.",
  },
  {
    keywords: ["education", "college", "university", "iit", "study", "degree", "cgpa", "gpa", "bhilai"],
    answer: "B.Tech in Data Science & Artificial Intelligence at IIT Bhilai. CGPA is 7.61, but more importantly, my systems actually run in sub-2 seconds and don't leak memory.",
  },
  {
    keywords: ["multi-agent", "agent", "langgraph", "langchain", "rag", "llm", "groq", "llama"],
    answer: "Multi-agent systems are where deterministic state machines meet probabilistic models. LangGraph, ChromaDB vector indexing, and Groq Llama-3.3-70b inference are my default playground. If your agent is just one giant prompt, we need to talk.",
  },
  {
    keywords: ["resume", "cv", "download cv", "download resume"],
    answer: "Type 'resume' or 'cat resume.pdf' in this terminal, or click the Resume button up in the navbar. Clean PDF, zero corporate buzzwords.",
  },
  {
    keywords: ["contact", "email", "reach", "phone", "get in touch", "message"],
    answer: "Ping me at vatsal.y.official@gmail.com. Or type 'contact' in the CLI for all channels. I reply fast — unless I'm debugging a distributed dead-lock.",
  },
  {
    keywords: ["github", "open source", "contributions", "commits", "prs", "pull request"],
    answer: "github.com/vatsalyd — full of agent state machines, computer vision pipelines, and upstream open source contributions. Star a repo if you're feeling generous.",
  },
  {
    keywords: ["movies", "film", "favorite movie", "favourite", "cinema", "watch", "taste"],
    answer: "Sci-fi and mind-benders with high rewatchability. Check 'The Taste' section down below if you want my curated film roster.",
  },
  {
    keywords: ["where", "location", "based", "city", "live"],
    answer: "Bhilai during the semester, Agra during vacations, on the internet and AWS servers 24/7.",
  },
  {
    keywords: ["joke", "funny", "laugh", "tell me a joke"],
    answer: "Why do AI engineers love LangGraph? Because therapy is expensive and debugging cyclic graph recursion is free.",
  },
];

export const chatbotFallback = "Interesting query. Either that's a bit too esoteric for my local heuristic cache, or you're testing my edge cases. Shoot an email to vatsal.y.official@gmail.com and let's discuss it like civilized engineers.";

export const chatbotSuggestions = [
  "What's your tech stack?",
  "Tell me about Context Pager",
  "How does HelixDesk work?",
  "Are you open for roles?",
];

// ── Articles ──
// `url` should point to a real Medium article. Leave url as null / '#' when
// there is no canonical link yet and the card will render as "draft" (no
// outgoing link). `coverImage` is optional — falls back to a typographic
// cover glyph driven by the tag. `mediumUser` is your @handle on Medium so
// the section can also surface a "Read more on Medium" CTA.
export const mediumUser = "vatsal.y.official"; // @handle on Medium

export const articles = [
  {
    title: "Your AI Agent Is Reading the Whole Book. You're Paying for Every Word",
    excerpt: "The silent token tax of full-document agent architectures — and how Context Pager brings virtual memory, semantic page indexing, and compressed recall to cut overhead by 4–10x.",
    date: "Aug 2026",
    readTime: "6 min read",
    url: "https://medium.com/@vatsal.y.official/your-ai-agent-is-reading-the-whole-book-youre-paying-for-every-word-1193f3dec6df?sharedUserId=vatsal.y.official",
    tag: "MCP & Memory",
    coverImage: "article-context-pager.png",
    highlights: [
      "Built Context Pager MCP to act as virtual memory for agent document retrieval",
      "Eliminated massive full-doc token dumps with 4-stage Index → Search → Compress → Recall",
      "Slashed query token costs by 4–10x with persistent insight caching",
    ],
  },
  {
    title: "I Refactored My AI Agent System and Deleted Half the Complexity — Here's What I Changed and Why",
    excerpt: "Lessons learned from stripping out unnecessary abstractions, flattening state transitions, and optimizing multi-agent routing for real-world reliability and sub-second latency.",
    date: "Aug 2026",
    readTime: "7 min read",
    url: "https://medium.com/@vatsal.y.official/i-refactored-my-ai-agent-system-and-deleted-half-the-complexity-heres-what-i-changed-and-why-687154b1602f?sharedUserId=vatsal.y.official",
    tag: "Agent Systems",
    coverImage: "article-agent-refactor.png",
    highlights: [
      "Stripped unnecessary LLM wrapper chains to cut 40% latency",
      "Flattened multi-agent state machines into explicit deterministic routing DAGs",
      "Replaced open-ended loops with confidence-based fallback gates",
    ],
  },
  {
    title: "I Built a Pregnancy Nutrition AI at My Internship — The LLM Was the Last Thing I Worried About",
    excerpt: "What it actually takes to ship a domain-specific healthcare agent in production: state handoffs, strict safety guardrails, medical response quality loops, and multi-agent orchestration.",
    date: "Aug 2026",
    readTime: "8 min read",
    url: "https://medium.com/@vatsal.y.official/i-built-a-pregnancy-nutrition-ai-at-my-internship-the-llm-was-the-last-thing-i-worried-about-7c9200fd1782?sharedUserId=vatsal.y.official",
    tag: "Production AI",
    coverImage: "article-nutrition-ai.jpg",
    highlights: [
      "Built multi-agent nutrition state handoffs inside the NUMAA.ai runtime",
      "Designed pre-LLM safety guardrails for clinical healthcare query intent",
      "Achieved sub-2s response latency with structured nutrition tool calling",
    ],
  },
  {
    title: "ReAct from Scratch: Thought → Action → Observation",
    excerpt: "A from-scratch Python implementation of the ReAct paper (ICLR 2023). Walking through the autonomous loop, Wikipedia tools, and few-shot evaluation on HotpotQA and FEVER.",
    date: "Upcoming",
    readTime: "11 min read",
    url: null,
    tag: "LLM Research",
    coverImage: null,
  },
  {
    title: "Resume-JD Matching: 3 Models Beat 1",
    excerpt: "Why a stacked spaCy NER + XGBoost + fine-tuned Sentence-BERT ensemble outperformed any single model on 13,000+ resume-JD pairs across 24 job categories.",
    date: "Upcoming",
    readTime: "9 min read",
    url: null,
    tag: "ML Engineering",
    coverImage: null,
  },
];

// ── The Taste / Favourite Films & Culture ──
export const favMovies = [
  {
    title: "Fight Club",
    year: 1999,
    director: "David Fincher",
    note: "First rule of engineering: question every layer of abstraction.",
    accent: "rose",
    poster: "posters/fight-club.jpg",
  },
  {
    title: "Fleabag",
    year: 2016,
    director: "Phoebe Waller-Bridge",
    note: "Breaking the fourth wall with surgical emotional precision and razor-sharp wit.",
    accent: "violet",
    poster: "posters/fleabag.jpg",
  },
  {
    title: "Better Call Saul",
    year: 2015,
    director: "Vince Gilligan & Peter Gould",
    note: "The tragic moral descent of Jimmy McGill. Unmatched cinematography and writing.",
    accent: "amber",
    poster: "posters/better-call-saul.jpg",
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    director: "Quentin Tarantino",
    note: "Nonlinear narrative architecture, iconic dialogues, and pure cinematic style.",
    accent: "rose",
    poster: "posters/pulp-fiction.jpg",
  },
  {
    title: "The Shawshank Redemption",
    year: 1994,
    director: "Frank Darabont",
    note: "Hope is a good thing, maybe the best of things. A timeless masterpiece.",
    accent: "emerald",
    poster: "posters/the-shawshank-redemption.jpg",
  },
  {
    title: "Inglourious Basterds",
    year: 2009,
    director: "Quentin Tarantino",
    note: "Masterclass in tension, nonlinear pacing, and unforgettable character dynamics.",
    accent: "amber",
    poster: "posters/inglourious-basterds.jpg",
  },
  {
    title: "The Godfather",
    year: 1972,
    director: "Francis Ford Coppola",
    note: "The gold standard of storytelling, institutional power, and calculated decision trees.",
    accent: "emerald",
    poster: "posters/the-godfather.jpg",
  },
  {
    title: "The Sopranos",
    year: 1999,
    director: "David Chase",
    note: "Deep psychological complexity and leadership dynamics in an evolving world.",
    accent: "cyan",
    poster: "posters/the-sopranos.jpg",
  },
  {
    title: "The Wolf of Wall Street",
    year: 2013,
    director: "Martin Scorsese",
    note: "High-octane execution, relentless energy, and unhinged charisma.",
    accent: "amber",
    poster: "posters/wolf-of-wall-street.jpg",
  },
  {
    title: "Goodfellas",
    year: 1990,
    director: "Martin Scorsese",
    note: "Pioneering freeze-frames, kinetic tracking shots, and raw gritty narrative flow.",
    accent: "violet",
    poster: "posters/goodfellas.jpg",
  },
  {
    title: "The Hangover",
    year: 2009,
    director: "Todd Phillips",
    note: "Reverse-engineering the chaos loop. Peak comedic timing and ensemble chemistry.",
    accent: "rose",
    poster: "posters/the-hangover.jpg",
  },
];

// ── The Characters / Iconic Figures & Archetypes ──
export const favCharacters = [
  {
    title: "Kratos",
    source: "God of War",
    subtitle: "Ghost of Sparta",
    note: "Unstoppable willpower, redemption, and tearing down impossible pantheons.",
    accent: "rose",
    poster: "characters/kratos.jpg",
  },
  {
    title: "Miyamoto Musashi",
    source: "Vagabond",
    subtitle: "The Invincible Sword",
    note: "Mastery through self-discipline. 'If you wish to control others, you must first control yourself.'",
    accent: "cyan",
    poster: "characters/musashi.jpg",
  },
  {
    title: "The Batman",
    source: "DC / Matt Reeves",
    subtitle: "Vengeance → Hope",
    note: "Preparation beats pure power. The world's greatest detective in Gotham's shadows.",
    accent: "rose",
    poster: "characters/the-batman.jpg",
  },
  {
    title: "Grand Regent Thragg",
    source: "Invincible",
    subtitle: "Viltrumite Empire",
    note: "Absolute martial dominance, uncompromising hierarchy, and battlefield reign.",
    accent: "amber",
    poster: "characters/thragg.jpg",
  },
  {
    title: "Baki Hanma",
    source: "Baki the Grappler",
    subtitle: "Champion of Underground Arena",
    note: "Relentless physical evolution, pushing biological limits, and chasing the Ogre.",
    accent: "rose",
    poster: "characters/baki.jpg",
  },
  {
    title: "Walter White",
    source: "Breaking Bad",
    subtitle: "Heisenberg",
    note: "Analytical chemistry meets ruthless empire building. 'I did it for me.'",
    accent: "amber",
    poster: "characters/heisenberg.jpg",
  },
  {
    title: "John Wick",
    source: "John Wick",
    subtitle: "Baba Yaga",
    note: "A man of focus, commitment, and sheer will. Sub-second tactical choreography.",
    accent: "rose",
    poster: "characters/john-wick.jpg",
  },
  {
    title: "Agamemnon",
    source: "The Odyssey",
    subtitle: "King of Mycenae",
    note: "Ancient commanding authority, tragic hubris, and the weight of Greek myth.",
    accent: "emerald",
    poster: "characters/agamemnon.jpg",
  },
  {
    title: "Homelander",
    source: "The Boys",
    subtitle: "The Seven",
    note: "Godlike power stripped of empathy. A masterclass in psychological menace.",
    accent: "rose",
    poster: "characters/homelander.jpg",
  },
];

// ── GitHub Open Source / static fallback data ──
export const githubUser = "vatsalyd";
export const staticGithubFallback = {
  repos: 17,
  outsidePrs: [
    {
      repo: "mlflow/mlflow",
      title: "Fix async trace export dropping workspace context (#24093)",
      state: "merged",
      createdAt: "2026-07-03",
      url: "https://github.com/mlflow/mlflow/pull/24275",
    },
    {
      repo: "deepchem/deepchem",
      title: "fix: DTNNEmbedding parameter misspelled (should be initializer) - Fixes #5020",
      state: "open",
      createdAt: "2026-06-19",
      url: "https://github.com/deepchem/deepchem/pull/5025",
    },
    {
      repo: "mlflow/mlflow",
      title: "Support Gemini thought signature in AI Gateway",
      state: "merged",
      createdAt: "2026-06-16",
      url: "https://github.com/mlflow/mlflow/pull/24051",
    },
    {
      repo: "ansible/ansible",
      title: "Fix role lookup from ansible-playbook cwd",
      state: "merged",
      createdAt: "2026-06-14",
      url: "https://github.com/ansible/ansible/pull/87112",
    },
    {
      repo: "mlflow/mlflow",
      title: "fix(tracking): warn when MlflowClient.search_runs() silently truncates results",
      state: "merged",
      createdAt: "2026-03-31",
      url: "https://github.com/mlflow/mlflow/pull/22215",
    },
    {
      repo: "dsai-iitbhilai/DSAI-club-Website",
      title: "added community and little bit functionality",
      state: "merged",
      createdAt: "2026-03-05",
      url: "https://github.com/dsai-iitbhilai/DSAI-club-Website/pull/2",
    },
  ],
  outsideIssues: [
    {
      repo: "fossasia/eventyay",
      title: "CI tests workflow still references removed src project path",
      state: "closed",
      createdAt: "2026-06-28",
      url: "https://github.com/fossasia/eventyay/issues/4133",
    },
  ],
  allPrs: [
    {
      repo: "mlflow/mlflow",
      title: "Fix async trace export dropping workspace context (#24093)",
      state: "merged",
      createdAt: "2026-07-03",
      url: "https://github.com/mlflow/mlflow/pull/24275",
    },
    {
      repo: "deepchem/deepchem",
      title: "fix: DTNNEmbedding parameter misspelled (should be initializer) - Fixes #5020",
      state: "open",
      createdAt: "2026-06-19",
      url: "https://github.com/deepchem/deepchem/pull/5025",
    },
    {
      repo: "mlflow/mlflow",
      title: "Support Gemini thought signature in AI Gateway",
      state: "merged",
      createdAt: "2026-06-16",
      url: "https://github.com/mlflow/mlflow/pull/24051",
    },
    {
      repo: "ansible/ansible",
      title: "Fix role lookup from ansible-playbook cwd",
      state: "merged",
      createdAt: "2026-06-14",
      url: "https://github.com/ansible/ansible/pull/87112",
    },
    {
      repo: "Roshanjossey/code-contributions",
      title: "add vatsalyd",
      state: "merged",
      createdAt: "2026-06-12",
      url: "https://github.com/Roshanjossey/code-contributions/pull/1225",
    },
    {
      repo: "mlflow/mlflow",
      title: "fix(tracking): warn when MlflowClient.search_runs() silently truncates results",
      state: "merged",
      createdAt: "2026-03-31",
      url: "https://github.com/mlflow/mlflow/pull/22215",
    },
    {
      repo: "dsai-iitbhilai/DSAI-club-Website",
      title: "added community and little bit functionality",
      state: "merged",
      createdAt: "2026-03-05",
      url: "https://github.com/dsai-iitbhilai/DSAI-club-Website/pull/2",
    },
    {
      repo: "vatsalyd/Portfolio",
      title: "feat: hero rebrand, taste & characters reels, and live open-source feed",
      state: "open",
      createdAt: "2026-08-21",
      url: "https://github.com/vatsalyd/Portfolio/pull/10",
    },
    {
      repo: "vatsalyd/Portfolio",
      title: "feat(articles): draft / published split",
      state: "merged",
      createdAt: "2026-08-17",
      url: "https://github.com/vatsalyd/Portfolio/pull/7",
    },
    {
      repo: "vatsalyd/context_pager",
      title: "Phase 10: self-contained setup_relay.sh",
      state: "merged",
      createdAt: "2026-08-14",
      url: "https://github.com/vatsalyd/context_pager/pull/10",
    },
    {
      repo: "vatsalyd/Multi-Agent-System-Planning",
      title: "HelixDesk: 3-agent LangGraph state machine",
      state: "merged",
      createdAt: "2026-06-12",
      url: "https://github.com/vatsalyd/Multi-Agent-System-Planning",
    },
    {
      repo: "vatsalyd/JobFit-AI",
      title: "Stacked spaCy + XGBoost + SBERT matcher",
      state: "merged",
      createdAt: "2026-04-21",
      url: "https://github.com/vatsalyd/JobFit-AI",
    },
  ],
  allIssues: [
    {
      repo: "fossasia/eventyay",
      title: "CI tests workflow still references removed src project path",
      state: "closed",
      createdAt: "2026-06-28",
      url: "https://github.com/fossasia/eventyay/issues/4133",
    },
    {
      repo: "vatsalyd/Multi-Agent-System-Planning",
      title: "Reduce Triage agent latency under heavy load",
      state: "open",
      createdAt: "2026-06-18",
      url: "https://github.com/vatsalyd/Multi-Agent-System-Planning",
    },
    {
      repo: "vatsalyd/JobFit-AI",
      title: "Add bilingual resume support (English / Hindi)",
      state: "open",
      createdAt: "2026-05-02",
      url: "https://github.com/vatsalyd/JobFit-AI",
    },
  ],
};

// ── Illustrated Cartography Map Territories ──
export const mapRegions = [
  {
    id: "hero",
    index: "01",
    name: "About & Vision",
    title: "About & Systems Vision",
    subtitle: "Identity & Engineering Focus",
    road: "FOUNDATIONS CORRIDOR",
    x: 18,
    y: 16,
    w: 22,
    h: 18,
    icon: "profile",
    desc: "Autonomous agent engineering philosophy, AI infrastructure background, and career focus.",
  },
  {
    id: "agent",
    index: "02",
    name: "Mini Vatsal CLI",
    title: "Mini Vatsal AI Terminal",
    subtitle: "Interactive Unix Terminal Agent",
    road: "AGENT RUNTIME WAY",
    x: 48,
    y: 12,
    w: 22,
    h: 18,
    icon: "terminal",
    desc: "Interactive terminal agent clone powered by Groq LLaMA and multi-agent state machines.",
  },
  {
    id: "opensource",
    index: "03",
    name: "Open Source",
    title: "GitHub & Upstream OSS",
    subtitle: "Live Telemetry & Merged PRs",
    road: "GIT PIPELINE LOOP",
    x: 77,
    y: 14,
    w: 20,
    h: 18,
    icon: "network",
    desc: "Live GitHub telemetry, upstream merged PRs (MLflow, DeepChem, Ansible), and code repositories.",
  },
  {
    id: "skills",
    index: "04",
    name: "Technical Stack",
    title: "Engineering Toolkit",
    subtitle: "Languages, Frameworks & Infra",
    road: "STACK INFRASTRUCTURE",
    x: 12,
    y: 40,
    w: 22,
    h: 18,
    icon: "gear",
    desc: "Production machinery: Python, C++, LangGraph, ChromaDB, PyTorch, Docker, FastAPI, and AWS.",
  },
  {
    id: "projects",
    index: "05",
    name: "Projects",
    title: "Featured Projects",
    subtitle: "3D Carousel & Case Studies",
    road: "SYSTEMS DEPLOYMENTS",
    x: 46,
    y: 38,
    w: 25,
    h: 20,
    icon: "layers",
    desc: "Production builds: Context Pager MCP, HelixDesk, FinSight AI, ClaimSure, and 14 repositories.",
  },
  {
    id: "experience",
    index: "06",
    name: "Experience",
    title: "Industry & Education",
    subtitle: "NUMAA.ai & IIT Bhilai",
    road: "CAREER TIMELINE",
    x: 78,
    y: 38,
    w: 20,
    h: 18,
    icon: "briefcase",
    desc: "AI/ML Intern at Incrivelsoft (NUMAA.ai), DSAI Coordinator at IIT Bhilai, and B.Tech coursework.",
  },
  {
    id: "landscape",
    index: "07",
    name: "Sessions & Events",
    title: "Workshops & Hackathons",
    subtitle: "Event Grounds & Sprints",
    road: "COMMUNITY STAGE WAY",
    x: 48,
    y: 60,
    w: 22,
    h: 17,
    icon: "calendar",
    desc: "Hands-on labs: Meraz AI/ML Track, LangGraph State Machines, PyTorch Systems, and OSS Sprints.",
  },
  {
    id: "articles",
    index: "08",
    name: "Articles & Notes",
    title: "Architecture Notes",
    subtitle: "Medium & Engineering Writing",
    road: "EDITORIAL ROW",
    x: 18,
    y: 65,
    w: 20,
    h: 17,
    icon: "press",
    desc: "Published engineering deep dives on LLM token costs, agent complexity deletion, and healthcare RAG.",
  },
  {
    id: "characters",
    index: "09",
    name: "The Characters",
    title: "Iconic Archetypes",
    subtitle: "Character Dynamics & Focus",
    road: "ARCHETYPES GALLERY",
    x: 48,
    y: 78,
    w: 22,
    h: 15,
    icon: "park",
    desc: "Cinematic archetypes and discipline: Baki Hanma, Walter White, John Wick, Agamemnon, Homelander.",
  },
  {
    id: "taste",
    index: "10",
    name: "Curated Cinema",
    title: "The Taste & Films",
    subtitle: "Cinematic Roster & Culture",
    road: "CINEMA REEL DRIVE",
    x: 78,
    y: 64,
    w: 20,
    h: 17,
    icon: "ship",
    desc: "Curated film roster: Fight Club, Fleabag, Scorsese classics, and Christopher Nolan thrillers.",
  },
  {
    id: "contact",
    index: "11",
    name: "Contact",
    title: "Reach Out & Endpoints",
    subtitle: "Direct Channels & Messages",
    road: "DIRECT DISPATCH HUB",
    x: 46,
    y: 93,
    w: 25,
    h: 13,
    icon: "beacon",
    desc: "Direct email dispatch desk, verified social endpoints, and message contact form.",
  },
];

export const regionIndex = (r) => r.index || "01";
