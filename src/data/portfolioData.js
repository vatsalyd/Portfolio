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
  { label: "Systems & Agents Shipped", value: 6, suffix: "+" },
  { label: "Cloud & Pipeline Deployments", value: 5, suffix: "+" },
  { label: "Engineers & Hackers Mentored", value: 100, suffix: "+" },
];

// ── Hero gallery + Mini Vatsal agent ──
export const heroGallery = [
  { id: 'studio',   label: 'At the desk',     caption: 'Where the infrastructure & agents are built',  accent: 'violet',  src: null },
  { id: 'campus',   label: 'IIT Bhilai',       caption: 'B.Tech DSAI · 2nd year',     accent: 'cyan',    src: null },
  { id: 'stage',    label: 'On stage',         caption: 'Systems workshops · Meraz hackathon', accent: 'amber', src: null },
  { id: 'ship',     label: 'Shipping',         caption: 'From repo to reliable production',     accent: 'emerald', src: null },
];

// ── Mini Vatsal — LLM-powered agent ──
export const miniVatsalConfig = {
  apiKey:  import.meta.env?.VITE_LLM_API_KEY  ?? '',
  baseURL: import.meta.env?.VITE_LLM_BASE_URL ?? 'https://api.openai.com/v1',
  model:   import.meta.env?.VITE_LLM_MODEL     ?? 'gpt-4o-mini',
  temperature: 0.6,
  historyLimit: 6,
};

export function buildMiniVatsalSystemPrompt() {
  const skills = skillCategories
    .map((c) => `- ${c.name}: ${c.skills.map((s) => s.name).join(', ')}`)
    .join('\n');
  const proj = projects
    .map((p) => `- ${p.title}: ${p.description}`)
    .join('\n');
  const exp = experience
    .map((e) => `- ${e.title} @ ${e.organization} (${e.period}): ${e.description}`)
    .join('\n');

  return `You are Mini Vatsal — an AI agent that speaks as Vatsal Yadav on his portfolio website. You answer in first person as Vatsal. Keep a confident, grounded, and concise engineering tone. No buzzwords, no fluff, no jargon.

WHO I AM:
${personalInfo.subheadline}
${personalInfo.bio}

CORE FOCUS AREAS:
1. Next-Gen AI Infrastructure & Operations: Designing physical and software architectures that make massive models fast, reliable, and cost-efficient.
2. Autonomous Agent Development: Creating independent AI agents that plan, reason, and execute end-to-end tasks with external tools and APIs.

TECHNICAL TOOLKIT:
- Languages: Python, C++
- Infrastructure: Cloud Platform Architecture, Distributed Computing, Data Center Optimization, AWS, Docker
- AI Engineering & MLOps: Multi-Agent State Machines (LangGraph), API Orchestration, Workflow Automation, RAG, FastAPI

EDUCATION & BACKGROUND:
- B.Tech in Data Science & Artificial Intelligence at IIT Bhilai (CGPA 7.61).
- AI & ML Intern at Incrivelsoft, building multi-agent systems and healthcare AI workflows.
- Contact: ${personalInfo.email}

GUIDELINES:
- Answer in 1-3 sentences directly and concisely.
- Emphasize systems reliability, cost-speed optimization, and practical execution.`;
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
    title: "HelixDesk — Enterprise Support Intelligence",
    tagline: "A three-agent LangGraph pipeline that closes support tickets in under two seconds.",
    description: "Enterprise multi-agent customer support system powered by a 3-agent LangGraph state machine (Triage → Retrieval → Resolution) using Llama-3.3-70b via Groq. Features auto-escalation for low-confidence tickets, semantic ChromaDB search with Sentence-Transformers for citation-backed responses, and FastAPI REST endpoints integrated with Slack & webhooks. Achieves ~1.8s average resolution time.",
    tags: ["LangGraph", "Llama-3.3-70b", "ChromaDB", "FastAPI", "Docker", "AWS EC2", "CI/CD"],
    category: "AI",
    image: null,
    github: "https://github.com/vatsalyd/Multi-Agent-System-Planning",
    live: "http://44.214.206.48:8000/api/v1/docs",
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
    tagline: "A 4-stage microservice that classifies financial intent and streams portfolio health in real time.",
    description: "Real-time AI financial microservice featuring a 4-stage pipeline (Rate Limiter → Safety Guard → Intent Classifier → Agent Router) classifying queries across 10 financial domains with 100% accuracy. Includes a Portfolio Health Agent computing CAGR, benchmark alpha, and concentration risk from live yfinance data, streamed via Server-Sent Events (SSE) with 166ms cached latency.",
    tags: ["Python", "FastAPI", "SSE", "yfinance", "Rate Limiter", "Financial AI"],
    category: "AI",
    image: null,
    github: "https://github.com/vatsalyd",
    live: null,
    featured: true,
    caseStudy: {
      problem: "Conversational finance tools either answer too slowly or answer too loosely — they stream chunks without validating safety or routing the query to the right analytical agent.",
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
    title: "JobFit-AI — Resume Matching Engine",
    tagline: "Three models stacked to score resume-to-JD fit on 13,000+ pairs across 24 job categories.",
    description: "3-model resume-JD matching system trained on 13,000+ pairs across 24 job categories. Combines spaCy skill NER, XGBoost trained on 10 custom feature metrics (TF-IDF, Jaccard, SBERT cosine), and a fine-tuned Sentence-BERT dual-encoder. Deployed on AWS EC2 (t3.small) via containerized Streamlit.",
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
    title: "Music Mood Classifier",
    tagline: "Predicts a song's mood from its acoustics — MFCCs, spectral centroid, chroma, ZCR.",
    description: "Audio classification system that predicts song moods (happy, sad, romantic, dramatic, angry) by extracting acoustic features — tempo, spectral centroid, chroma STFT, ZCR, and MFCCs — using librosa. Trained with Random Forest Classifiers and served via Streamlit.",
    tags: ["librosa", "Scikit-learn", "Random Forest", "Audio ML", "Streamlit"],
    category: "ML",
    image: null,
    github: "https://github.com/vatsalyd/music-mood-classifier",
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
    workDone: [
      { label: "Nutrition Agent", body: "Owned end-to-end build of the Nutrition Agent inside NUMAA.ai — covering prompt design, tool surface, and the response-quality regression suite." },
      { label: "Production bug triage", body: "Diagnosed and patched production failures in agent hand-offs, latency regressions, and unsafe tool calls across the multi-agent runtime." },
      { label: "Inter-agent protocol", body: "Designed the state-handoff schema between Nutrition and the domain agents (symptom, diet, lifestyle) so context survives each hop." },
      { label: "Response-quality loop", body: "Added targeted prompt + retrieval changes that lifted domain-answer quality between weekly evaluations." },
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
  { id: "hero",       name: "Intro",        subtitle: "Who I am · Mini Vatsal agent",   x: 12, y: 18, w: 22, h: 14, kind: "compass" },
  { id: "opensource", name: "Open Source",  subtitle: "Pull requests & issues",         x: 40, y: 10, w: 24, h: 12, kind: "anchor"   },
  { id: "skills",     name: "Skills",       subtitle: "The toolkit",                     x: 70, y: 20, w: 22, h: 14, kind: "gear"     },
  { id: "projects",   name: "Projects",     subtitle: "Things I've built",               x: 16, y: 38, w: 24, h: 14, kind: "tower"    },
  { id: "experience", name: "Experience",   subtitle: "The path so far",                 x: 48, y: 40, w: 24, h: 14, kind: "scroll"   },
  { id: "articles",   name: "Articles",      subtitle: "Writing & notes",                x: 74, y: 44, w: 20, h: 12, kind: "quill"    },
  { id: "taste",      name: "The Taste",    subtitle: "Cinema & culture picks",          x: 20, y: 58, w: 20, h: 10, kind: "film"     },
  { id: "characters", name: "Characters",   subtitle: "Iconic figures & archetypes",     x: 46, y: 58, w: 22, h: 10, kind: "mask"     },
  { id: "contact",    name: "Reach Out",    subtitle: "Send a message",                  x: 72, y: 60, w: 20, h: 10, kind: "envelope" },
];

// Tiny index number shown above each region label on the map.
export const regionIndex = (region) =>
  String(mapRegions.findIndex((r) => r.id === region.id) + 1).padStart(2, '0');

// ── Chatbot ──
// Casual & fun tone. Each entry: keywords[] to pattern-match (lowercased), and an `answer`.
// The first matching entry wins, so order broad → specific.
export const chatbotResponses = [
  {
    keywords: ["hi", "hello", "hey", "yo", "sup", "namaste"],
    answer: "Heyy! I'm Vatsal's mini-bot. Ask me about his stack, his internship, his projects, or what he's looking for. Or just type whatever — I'll do my best.",
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
    answer: "Oh you noticed the Movies section — that's his vibe check. Sci-fi and mind-bendy stuff mostly. Scroll down to see the picks with his notes on why.",
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

// ── Articles ──
// `url` should point to a real Medium article. Leave url as null / '#' when
// there is no canonical link yet and the card will render as "draft" (no
// outgoing link). `coverImage` is optional — falls back to a typographic
// cover glyph driven by the tag. `mediumUser` is your @handle on Medium so
// the section can also surface a "Read more on Medium" CTA.
export const mediumUser = "vatsal.y.official"; // @handle on Medium

export const articles = [
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
