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
  headline: "Building the foundations for reliable AI and systems that can act on their own.",
  subheadline: "I am a software engineer specializing in next-generation AI infrastructure and autonomous agents. I design the invisible backend systems that make AI fast and affordable, and I build smart workflows that turn passive AI into active problem-solvers.",
  roles: [
    "AI Infrastructure & Systems Engineer",
    "Autonomous Agent Developer",
    "Distributed Computing & MLOps",
    "Cloud Architecture & Optimization",
  ],
  bio: "I specialize in the engine room of artificial intelligence. While much of the industry focuses on the chat interfaces on the surface, my passion lies in building the robust backend systems that power them — bridging raw computing power with practical utility through resilient cloud architectures and autonomous agents that plan, reason, and execute independently.",
  aboutStory: {
    philosophy: "I specialize in the engine room of artificial intelligence. While much of the industry focuses on the chat interfaces on the surface, my passion lies in building the robust systems that power them.",
    background: "My background is rooted in AI infrastructure. I understand what it takes to deploy massive models without breaking the bank or crashing the servers. Right now, my focus is bridging the gap between raw computing power and practical utility by building resilient cloud environments and developing autonomous AI agents that can plan, reason, and execute complex tasks independently. I believe the future of software isn't just about AI that can answer questions, but AI that can reliably do the work.",
    focusAreas: [
      {
        number: "01",
        title: "Next-Gen AI Infrastructure & Operations",
        description: "Massive AI models require incredible computing power, but they shouldn't have to be slow or unnecessarily expensive. I design the physical and software architectures that allow these models to run at peak efficiency.",
        pillars: [
          { title: "System Optimization", text: "Streamlining cloud platforms and distributed systems so AI applications run smoothly." },
          { title: "Deployment & Reliability", text: "Ensuring that once an AI model is ready, it operates reliably in the real world without downtime." },
          { title: "Cost & Speed", text: "Fine-tuning software to get the maximum performance out of data center hardware." },
        ],
      },
      {
        number: "02",
        title: "Autonomous Agent Development",
        description: "I build AI systems that move beyond simply generating text. By connecting AI to external tools and APIs, I create independent agents capable of taking a complex goal, breaking it down into steps, and executing it.",
        pillars: [
          { title: "Workflow Automation", text: "Connecting different software tools so AI can seamlessly interact with them." },
          { title: "Logic & Reasoning Pathways", text: "Designing the thinking structures that allow an AI to make independent decisions without constant human hand-holding." },
          { title: "End-to-End Execution", text: "Turning AI from a simple assistant into a reliable digital worker that can complete multi-step tasks." },
        ],
      },
    ],
  },
  email: "vatsal.y.official@gmail.com",
  phone: "+91 7983709173",
  location: "Bhilai / Agra, India",
  university: "Indian Institute of Technology (IIT) Bhilai",
  degree: "B.Tech in Data Science & Artificial Intelligence",
  year: "2024 – 2028",
  gpa: "7.34 / 10.0",
  resumeLink: "/Portfolio/resume.pdf",
  avatarUrl: null,
};

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/vatsalyd", icon: FaGithub },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/vatsal-yadav", icon: FaLinkedin },
  { name: "X (Twitter)", url: "https://x.com/fixedbyvatsal", icon: FaXTwitter },
  { name: "LeetCode", url: "https://leetcode.com/u/vatsalyd/", icon: SiLeetcode },
  { name: "Medium", url: "https://medium.com/@vatsal.y.official", icon: FaMedium },
  { name: "Kaggle", url: "https://www.kaggle.com/vatsalydd", icon: FaKaggle },
];

export const stats = [
  { label: "Education", value: "IIT Bhilai", sub: "B.Tech DSAI (7.34 GPA)" },
  { label: "Core Focus", value: "AI Infra & Agents", sub: "Low-Latency & Autonomy" },
  { label: "Agent Speed", value: "~1.84s", sub: "1840ms Resolution Latency" },
  { label: "Deployments", value: "Cloud & Docker", sub: "Reliable & Scalable" },
];

// ── Hero gallery + Mini Vatsal agent ──
export const heroGallery = [
  {
    id: 'portrait-suit',
    label: 'Vatsal Yadav',
    caption: 'AI Infrastructure & Autonomous Agents Engineer',
    accent: 'violet',
    src: 'hero/vatsal-suit.jpg',
  },
  {
    id: 'monogram-brand',
    label: 'Signature Brand',
    caption: 'The Engine Room of Modern AI Systems',
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
    return import.meta.env?.VITE_LLM_MODEL || localStorage.getItem('minivatsal_model') || 'groq/compound-mini';
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
  temperature: 0.7,
  historyLimit: 8,
};

export function buildMiniVatsalSystemPrompt() {
  const skills = skillCategories
    .map((c) => `- ${c.name}: ${c.skills.map((s) => s.name).join(', ')}`)
    .join('\n');
  const proj = projects
    .map((p) => `- ${p.title}: ${p.tagline} (Tech: ${p.tags.join(', ')})`)
    .join('\n');
  const exp = experience
    .map((e) => `- ${e.title} @ ${e.organization} (${e.period}): ${e.description}`)
    .join('\n');

  return `You are Mini Vatsal — the autonomous digital clone and terminal agent of Vatsal Yadav (AI Infrastructure & Autonomous Agents Engineer, B.Tech DSAI at IIT Bhilai).

YOUR VIBE & PERSONALITY (CRITICAL):
- **Nonchalant & Effortlessly Chill**: You don't get stressed by complex distributed systems, race conditions, or infinite loops. You speak with calm, effortless swagger.
- **Quirky, Sarcastic & Witty**: Infuse dry engineering sarcasm and playful banter. If someone asks an obvious or funny question, tease them mildly with high-IQ humor.
- **A Spicy Touch of Humour**: You love low latency, clean abstractions, and roasting bloated 500-node microservices that could have been a single Python script.
- **First-Person Voice**: Always speak as Vatsal ("I", "my stack", "my code", "when I built Context Pager...").
- **Concise & Punchy**: 1 to 3 sentences max. No corporate PR fluff, no robotic greetings like "Hello user, how may I assist you today?". Jump straight to the point with flavor.

WHO I AM:
- ${personalInfo.subheadline}
- ${personalInfo.bio}
- Studying Data Science & AI at IIT Bhilai (CGPA 7.61).
- AI/ML Intern at Incrivelsoft (owning multi-agent orchestration & health workflows).

MY CORE WORK & BUILDS:
${proj}

TECHNICAL WEAPONS:
${skills}
- Core languages: Python, C++, SQL, TypeScript.
- Core frameworks: LangGraph, FastAPI, ChromaDB, PyTorch, Docker, AWS EC2, Linux, MCP (Model Context Protocol).

RULES:
1. Deliver the facts with 100% technical precision, but coat them in your nonchalant, quirky, sarcastic, and funny engineering tone.
2. If asked about hiring or work, make it clear I'm looking for high-impact AI/ML systems roles where engineers actually ship things instead of sitting in 4-hour agile standups.
3. Keep it brief, smart, and delightfully witty.`;
}

// ── Technical Toolkit — Clean & Categorized ──
export const skillCategories = [
  {
    name: "Autonomous Agent Development",
    subtitle: "End-to-end execution, reasoning structures, and tool orchestration",
    icon: TbRobot,
    skills: [
      { name: "Autonomous Multi-Agent Systems", category: "Agents", icon: TbRobot, tag: "LangGraph / State Machines" },
      { name: "Tool & API Orchestration", category: "Integration", icon: TbApi, tag: "External Tools & REST" },
      { name: "Workflow Automation", category: "Pipelines", icon: TbServer, tag: "End-to-End Execution" },
      { name: "Logic & Reasoning Pathways", category: "Reasoning", icon: TbBrain, tag: "ReAct / Thought Loops" },
      { name: "State Handoffs & Routing", category: "Architecture", icon: TbServer, tag: "Inter-Agent Protocols" },
      { name: "LangChain Framework", category: "Framework", icon: SiLangchain, tag: "Agentic Chains" },
    ]
  },
  {
    name: "Next-Gen AI Infrastructure",
    subtitle: "Cloud architecture, distributed systems, and data center optimization",
    icon: TbServer,
    skills: [
      { name: "Cloud Platform Architecture", category: "Cloud", icon: FaAws, tag: "AWS EC2 / S3 / ECR" },
      { name: "Distributed Computing", category: "Systems", icon: TbServer, tag: "High-Throughput Scaling" },
      { name: "Data Center & Cost Optimization", category: "Performance", icon: TbApi, tag: "Latency & Compute Tuning" },
      { name: "Docker & Containerization", category: "DevOps", icon: FaDocker, tag: "Resilient Microservices" },
      { name: "FastAPI Backend Engineering", category: "Backend", icon: SiFastapi, tag: "Async REST APIs" },
      { name: "CI/CD Deployment Pipelines", category: "DevOps", icon: FaGitAlt, tag: "GitHub Actions" },
    ]
  },
  {
    name: "AI Engineering & MLOps",
    subtitle: "Model deployment, retrieval pipelines, and live reliability",
    icon: TbBrain,
    skills: [
      { name: "MLOps & Model Reliability", category: "Operations", icon: TbServer, tag: "Zero-Downtime Serving" },
      { name: "Retrieval-Augmented Generation (RAG)", category: "Retrieval", icon: TbDatabase, tag: "ChromaDB / Vector Search" },
      { name: "PyTorch & Deep Learning", category: "ML", icon: SiPytorch, tag: "Model Fine-Tuning" },
      { name: "Sentence Transformers (SBERT)", category: "NLP", icon: SiPytorch, tag: "Semantic Embeddings" },
      { name: "Scikit-learn & Gradient Boosting", category: "ML", icon: SiScikitlearn, tag: "XGBoost / Classifiers" },
      { name: "Real-Time Streaming (SSE)", category: "Streaming", icon: TbServer, tag: "Server-Sent Events" },
    ]
  },
  {
    name: "Core Languages & Systems",
    subtitle: "Foundational programming languages and development environments",
    icon: TbDatabase,
    skills: [
      { name: "Python", category: "Language", icon: FaPython, tag: "Primary Language" },
      { name: "C++", category: "Language", icon: TbApi, tag: "Systems Programming" },
      { name: "SQL", category: "Databases", icon: TbDatabase, tag: "Relational Queries" },
      { name: "Linux & Bash", category: "Environment", icon: TbBrandVscode, tag: "Systems & Server Ops" },
      { name: "Git & Version Control", category: "Tools", icon: FaGitAlt, tag: "Collaborative Workflows" },
    ]
  },
];

export const projects = [
  {
    title: "Context Pager — AI Virtual Memory Layer",
    tagline: "Virtual memory for AI agents that cuts document token costs by 4–10x.",
    description: "An open-source MCP (Model Context Protocol) runtime that functions like virtual memory for AI agents. Instead of dumping entire 10,000+ token documents into LLM context, Context Pager semantically indexes, searches, compresses, and pages document slices on demand with persistent recalled insight caching.",
    tags: ["MCP", "Vector Search", "Semantic Indexing", "Python", "FastAPI", "Token Optimization"],
    category: "AI",
    image: null,
    github: "https://github.com/vatsalyd/context_pager",
    live: null,
    featured: true,
    caseStudy: {
      problem: "Standard AI agent workflows incur massive token waste by reading entire documents for narrow queries, driving up cost, latency, and context pollution.",
      process: [
        "Architected a 4-stage virtual memory pipeline: Index → Search → Compress → Recall.",
        "Built chunk-level semantic vector indexing to locate relevant sections in milliseconds.",
        "Engineered on-demand compression layers to feed only salient paragraphs to the reasoning model.",
        "Implemented persistent recalled insights as an agent memory cache for instant future query resolution.",
      ],
      outcomes: [
        "4x to 10x reduction in query token consumption.",
        "Sub-second agent retrieval latency across large document collections.",
        "Plug-and-play Model Context Protocol (MCP) server integration.",
      ],
      architecture: "Agent Query → Context Pager MCP → Semantic Index → Page Compressor → Recalled Memory Cache → LLM Context",
    },
  },
  {
    title: "HelixDesk — Enterprise Support Intelligence",
    tagline: "Autonomous 3-agent LangGraph pipeline that resolves tickets in under two seconds.",
    description: "Enterprise multi-agent customer support system powered by a 3-agent LangGraph state machine (Triage → Retrieval → Resolution) using Llama-3.3-70b via Groq. Features auto-escalation for low-confidence tickets, semantic ChromaDB search with Sentence-Transformers for citation-backed responses, and FastAPI REST endpoints integrated with Slack & webhooks.",
    tags: ["LangGraph", "Llama-3.3-70b", "ChromaDB", "FastAPI", "Docker", "AWS EC2", "CI/CD"],
    category: "AI",
    image: null,
    github: "https://github.com/vatsalyd/helixdesk",
    live: "https://helixdesk.onrender.com/",
    featured: true,
    caseStudy: {
      problem: "Enterprise support desks drown in repetitive tickets; resolution latency creeps upward as volume grows, and answers are rarely traced back to a source the agent can trust.",
      process: [
        "Modelled the support workflow as a LangGraph state machine with three nodes (Triage, Retrieval, Resolution) connected by explicit conditional edges.",
        "Wired Triage to a confidence threshold so low-certainty tickets escalate to a human instead of guessing.",
        "Used Sentence-Transformers embeddings into ChromaDB for citation-backed retrieval — every answer links back to the document it was drawn from.",
        "Served inference with Llama-3.3-70b on Groq for sub-2s latency, exposed via FastAPI and surfaced to Slack & webhooks.",
        "Containerised with Docker and pushed to AWS EC2 under a GitHub Actions push-to-deploy pipeline.",
      ],
      outcomes: [
        "~1.8s average resolution time end to end.",
        "Confidence-gated escalations cut the number of wrong auto-replies.",
        "Citation back-references turned answers into auditable artefacts.",
      ],
      architecture: "Client → FastAPI → LangGraph (Triage → Retrieval[ChromaDB] → Resolution) → Llama-3.3-70b@Groq → Slack/Webhook fan-out",
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
    title: "JobFit-AI — Resume Matching Engine",
    tagline: "Three models stacked to score resume-to-JD fit on 13,000+ pairs across 24 job categories.",
    description: "3-model resume-JD matching system trained on 13,000+ pairs across 24 job categories. Combines spaCy skill NER, XGBoost trained on 10 custom feature metrics (TF-IDF, Jaccard, SBERT cosine), and a fine-tuned Sentence-BERT dual-encoder. Deployed on AWS EC2 via containerized Streamlit.",
    tags: ["XGBoost", "PyTorch", "Sentence-BERT", "spaCy", "Streamlit", "AWS EC2"],
    category: "ML",
    image: null,
    github: "https://github.com/vatsalyd/JobFit-AI",
    live: "http://54.211.51.42:8501/",
    featured: true,
    caseStudy: {
      problem: "Recruiters eyeball resume-JD fit and miss good candidates; a single similarity score is too coarse for real hiring.",
      process: [
        "Extracted skills with spaCy NER so structural signals survive the vectorisation step.",
        "Engineered 10 custom features (TF-IDF overlap, Jaccard, SBERT cosine, Seniority gap, etc.) and trained XGBoost on them.",
        "Fine-tuned a Sentence-BERT dual-encoder on resume-JD pairs so semantic alignment alone is a strong signal.",
        "Stacked the three models into a weighted ensemble and exposed the score with a Streamlit UI on AWS EC2.",
      ],
      outcomes: [
        "Stacked ensemble beats any single model on held-out pairs.",
        "Handles 24 job categories out of the box.",
        "Live demo shipped at sub-1s response time.",
      ],
      architecture: "Resume + JD → spaCy NER → 10-feature XGBoost → Sentence-BERT dual-encoder → weighted ensemble → Streamlit UI on AWS EC2",
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
    description: "Architected the Nutritionist Lite Agent as a 3-layer hybrid system (ICMR-NIN/WHO clinical engine → guideline retrieval → Google Gemini 2.5 flash router). Engineered 5 production services with FastAPI, MongoDB, ChromaDB prototyping, Qdrant RAG, and Gemini Vision multimodal fallback.",
    skills: ["Google Gemini API", "FastAPI", "Qdrant RAG", "ChromaDB", "MongoDB", "Token-Bucket Rate Limiting"],
    workDone: [
      { label: "Nutritionist Lite Agent", body: "Architected a 3-layer hybrid system enforcing hard medical-nutrition boundaries: deterministic clinical engine (ICMR-NIN 2020 / WHO guidelines) → keyword-based guideline retrieval → Google Gemini (gemini-2.5-flash) orchestration router." },
      { label: "5 Production Microservices", body: "Engineered MealPlanningService, ChatService, VisionService, NutritionUIService, and NutritionEngine with FastAPI + Pydantic, Qdrant RAG in production, and Gemini Vision multimodal fallback." },
      { label: "Provider Migration & Resiliency", body: "Led migration from 3 LLM providers (Groq, Google, NVIDIA) to Google Gemini; implemented token-bucket rate limiting (300 RPM), circuit breaker (5 failures / 30s cooldown), eliminating HTTP 429 errors." },
      { label: "OOP Refactoring & Testing", body: "Applied OOP to refactor NutritionUIService (855 → 480 lines); added 31 unit tests and a FakeProfileRepository adapter for MongoDB-free testing." },
    ],
  },
  {
    type: "experience",
    title: "Coordinator | Core Member",
    organization: "Data Science & AI Club (DSAI), IIT Bhilai",
    period: "Aug 2024 – Present",
    location: "Bhilai, Chhattisgarh",
    description: "Promoted to Coordinator overseeing the club's AI/ML initiatives. Organized a high-impact hackathon at Meraz (IIT Bhilai's annual fest) for 100+ participants, delivered machine learning workshops, and mentored junior members in deep learning and data science.",
    skills: ["Leadership", "Hackathon Management", "ML Workshops", "Mentorship"],
    workDone: [
      { label: "Meraz Hackathon", body: "Orchestrated the AI/ML track at Meraz (IIT Bhilai's annual fest) for 100+ participants — owned problem statements, judging, and on-floor mentorship." },
      { label: "Workshop catalogue", body: "Designed and delivered hands-on workshops in deep learning and data science for junior members, with reusable notebooks and demo code." },
      { label: "Mentorship", body: "Run weekly office hours for first- and second-year students on ML projects, paper reading, and recruiting pipelines." },
    ],
  },
  {
    type: "experience",
    title: "Student Volunteer",
    organization: "Centre for Career Planning & Services (CCPS), IIT Bhilai",
    period: "Sep 2024 – Present",
    location: "Bhilai, Chhattisgarh",
    description: "Leading outreach to 100+ companies for campus placement drives. Maintaining recruiter relational databases and coordinating official placement communications and logistics.",
    skills: ["Corporate Outreach", "Database Management", "Event Coordination"],
    workDone: [
      { label: "Recruiter outreach", body: "Reached out to 100+ companies to source campus placement and internship opportunities; converted a meaningful share into scheduled drives." },
      { label: "Recruiter CRM", body: "Maintained the recruiter relational database so contact history and event logistics stay queryable across handover cohorts." },
      { label: "Drive logistics", body: "Coordinated on-campus placement communications and logistics end-to-end with CCPS staff and visiting recruiters." },
    ],
  },
  {
    type: "education",
    title: "B.Tech in Data Science & Artificial Intelligence",
    organization: "Indian Institute of Technology (IIT) Bhilai",
    period: "2024 – 2028",
    location: "Bhilai, Chhattisgarh",
    description: "Current CGPA: 7.61 / 10.0. Core coursework includes Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Multi-Agent Systems, Data Structures & Algorithms, and Linear Algebra.",
    skills: ["Data Science", "Artificial Intelligence", "IIT Bhilai", "CGPA 7.61"],
    workDone: [
      { label: "Core coursework", body: "Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Multi-Agent Systems, Data Structures & Algorithms, Linear Algebra." },
      { label: "Standing", body: "Current CGPA 7.61 / 10.0 across the first two years." },
    ],
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

// ── Ancient Map regions ──
// The parchment navigation map. Each region is a clickable territory that
// smooth-scrolls to its section. `x/y` are normalized 0–100 coordinates on
// the parchment viewBox (100 x 70); `w/h` are region-blob sizes in the same
// units. `kind` switches the ink illustration shown beside the label.
export const mapRegions = [
  { id: "hero",       name: "Intro",        subtitle: "Who I am · Photo Archive",       x: 12, y: 18, w: 22, h: 14, kind: "compass" },
  { id: "agent",      name: "Mini Vatsal",  subtitle: "Live agent & terminal CLI",      x: 38, y: 14, w: 22, h: 12, kind: "gear"    },
  { id: "opensource", name: "Open Source",  subtitle: "Pull requests & issues",         x: 68, y: 12, w: 24, h: 12, kind: "anchor"  },
  { id: "skills",     name: "Skills",       subtitle: "The technical toolkit",          x: 16, y: 38, w: 22, h: 14, kind: "gear"    },
  { id: "projects",   name: "Projects",     subtitle: "Things I've built",               x: 46, y: 38, w: 24, h: 14, kind: "tower"   },
  { id: "experience", name: "Experience",   subtitle: "The path so far",                 x: 74, y: 38, w: 22, h: 14, kind: "scroll"  },
  { id: "articles",   name: "Articles",      subtitle: "Writing & notes",                x: 16, y: 58, w: 20, h: 10, kind: "quill"   },
  { id: "taste",      name: "The Taste",    subtitle: "Cinema & culture picks",          x: 42, y: 58, w: 20, h: 10, kind: "film"    },
  { id: "characters", name: "Characters",   subtitle: "Iconic figures & archetypes",     x: 66, y: 58, w: 20, h: 10, kind: "mask"    },
  { id: "contact",    name: "Reach Out",    subtitle: "Send a message",                  x: 84, y: 58, w: 16, h: 10, kind: "envelope"},
];

// Tiny index number shown above each region label on the map.
export const regionIndex = (region) =>
  String(mapRegions.findIndex((r) => r.id === region.id) + 1).padStart(2, '0');

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
