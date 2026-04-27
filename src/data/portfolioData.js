// ── Portfolio Data — Single Source of Truth ──
// Edit this file to customize all content on the site.

import { FaPython, FaDocker, FaGitAlt, FaAws, FaGithub, FaLinkedin, FaKaggle } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiScikitlearn, SiPandas, SiNumpy, SiMongodb, SiStreamlit, SiLangchain, SiFastapi, SiOpenai, SiLeetcode } from 'react-icons/si';
import { TbBrandVscode, TbRobot, TbApi } from 'react-icons/tb';
import { BiLogoJavascript, BiLogoTypescript } from 'react-icons/bi';

export const personalInfo = {
  name: "Vatsal Yadav",
  firstName: "Vatsal",
  lastName: "Yadav",
  initials: "VY",
  roles: [
    "AI & ML Engineer",
    "Data Scientist",
    "Generative AI Developer",
    "LLM Systems Builder",
  ],
  bio: "I build intelligent systems that turn raw data into real-world impact. Specializing in Machine Learning, Generative AI, and Data Science — I architect models, multi-agent frameworks, and scalable AI pipelines.",
  email: "vatsal.y.official@gmail.com",
  phone: "+91 7983709173",
  location: "India",
  university: "Indian Institute of Technology (IIT) Bhilai",
  degree: "B.Tech in Data Science & Artificial Intelligence",
  year: "1st Year",
  gpa: "9.2 / 10",
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
  { label: "AI & ML Projects", value: 6, suffix: "+" },
  { label: "Data Pipelines", value: 10, suffix: "+" },
  { label: "Models Deployed", value: 5, suffix: "+" },
];

export const skillCategories = [
  {
    name: "AI/ML Specializations",
    subtitle: "High-priority capabilities aligned with current industry demand",
    accent: "#C3110C",
    skills: [
      { name: "Generative AI", icon: TbRobot, level: 90, color: "#C3110C", evidence: "HelixDesk, LLM projects" },
      { name: "Multi-Agent Systems", icon: TbRobot, level: 92, color: "#E6501B", evidence: "Multi-Agent-System-Planning" },
      { name: "Retrieval-Augmented Generation (RAG)", icon: TbApi, level: 88, color: "#FF7A4A", evidence: "HelixDesk" },
      { name: "RAG Pipelines", icon: TbApi, level: 88, color: "#E6501B", evidence: "HelixDesk" },
      { name: "Prompt Engineering", icon: TbApi, level: 87, color: "#B8C0CC", evidence: "LLM orchestration workflows" },
      { name: "Model Evaluation & Fine-tuning", icon: TbApi, level: 85, color: "#E6501B", evidence: "JobFit-AI" },
      { name: "Model Evaluation", icon: TbApi, level: 85, color: "#FF7A4A", evidence: "JobFit-AI" },
      { name: "Feature Engineering", icon: TbApi, level: 88, color: "#C3110C", evidence: "JobFit-AI" },
      { name: "Tool Orchestration", icon: TbApi, level: 87, color: "#EE4C2C", evidence: "Multi-Agent-System-Planning" },
      { name: "Natural Language Processing (NLP)", icon: TbRobot, level: 86, color: "#C3110C", evidence: "JobFit-AI" },
      { name: "Machine Learning", icon: TbApi, level: 90, color: "#F7931E", evidence: "JobFit-AI, music-mood-classifier" },
      { name: "Deep Learning", icon: SiPytorch, level: 82, color: "#EE4C2C", evidence: "Sentence-BERT workflows" },
    ]
  },
  {
    name: "Languages & Frameworks",
    subtitle: "Core languages and frameworks for AI engineering",
    accent: "#E6501B",
    skills: [
      { name: "Python", icon: FaPython, level: 95, color: "#3776AB", evidence: "All core repos" },
      { name: "LangChain", icon: SiLangchain, level: 90, color: "#E6501B", evidence: "HelixDesk" },
      { name: "LangGraph", icon: TbRobot, level: 92, color: "#C3110C", evidence: "HelixDesk" },
      { name: "FastAPI", icon: SiFastapi, level: 89, color: "#009688", evidence: "HelixDesk" },
      { name: "Hugging Face Transformers", icon: TbRobot, level: 82, color: "#FF7A4A", evidence: "JobFit-AI" },
      { name: "PyTorch", icon: SiPytorch, level: 80, color: "#EE4C2C", evidence: "JobFit-AI" },
      { name: "Sentence Transformers", icon: SiPytorch, level: 87, color: "#C3110C", evidence: "HelixDesk, JobFit-AI" },
      { name: "TensorFlow", icon: SiTensorflow, level: 72, color: "#FF6F00", evidence: "AI coursework" },
      { name: "Scikit-learn", icon: SiScikitlearn, level: 90, color: "#F7931E", evidence: "JobFit-AI, music-mood-classifier" },
      { name: "XGBoost", icon: TbApi, level: 84, color: "#C3110C", evidence: "JobFit-AI" },
      { name: "OpenAI API", icon: SiOpenai, level: 86, color: "#B8C0CC", evidence: "LLM projects" },
      { name: "Groq API", icon: SiOpenai, level: 88, color: "#E6501B", evidence: "HelixDesk" },
      { name: "Flask", icon: TbApi, level: 75, color: "#E6501B", evidence: "Python backend experimentation" },
      { name: "JavaScript", icon: BiLogoJavascript, level: 74, color: "#F7DF1E", evidence: "Web projects" },
      { name: "TypeScript", icon: BiLogoTypescript, level: 72, color: "#3178C6", evidence: "DSAI-club-Website" },
      { name: "SQL", icon: TbApi, level: 82, color: "#C3110C", evidence: "Data workflows" },
      { name: "C", icon: TbApi, level: 66, color: "#B8C0CC", evidence: "no.-guesser" },
    ]
  },
  {
    name: "Cloud & MLOps",
    subtitle: "Productionization, deployment, and AI delivery pipelines",
    accent: "#740A03",
    skills: [
      { name: "Docker", icon: FaDocker, level: 82, color: "#2496ED", evidence: "HelixDesk" },
      { name: "MLflow", icon: TbApi, level: 74, color: "#E6501B", evidence: "Model tracking workflows" },
      { name: "AWS (EC2)", icon: FaAws, level: 76, color: "#FF9900", evidence: "HelixDesk deployment" },
      { name: "AWS (ECS)", icon: FaAws, level: 70, color: "#C3110C", evidence: "Container orchestration familiarity" },
      { name: "GitHub Actions", icon: FaGitAlt, level: 78, color: "#F05032", evidence: "HelixDesk CI/CD" },
      { name: "Uvicorn", icon: TbApi, level: 82, color: "#B8C0CC", evidence: "HelixDesk" },
      { name: "Pydantic", icon: TbApi, level: 84, color: "#FF7A4A", evidence: "HelixDesk" },
      { name: "Model Monitoring", icon: TbApi, level: 78, color: "#E6501B", evidence: "Evaluation-first ML workflow" },
      { name: "Pytest", icon: TbApi, level: 80, color: "#C3110C", evidence: "HelixDesk tests" },
    ]
  },
  {
    name: "Tools & Libraries",
    subtitle: "Data, experimentation, visualization, and applied AI tooling",
    accent: "#B8C0CC",
    skills: [
      { name: "Pandas", icon: SiPandas, level: 90, color: "#150458", evidence: "JobFit-AI, music-mood-classifier" },
      { name: "NumPy", icon: SiNumpy, level: 89, color: "#4D77CF", evidence: "JobFit-AI, music-mood-classifier" },
      { name: "Matplotlib", icon: TbApi, level: 82, color: "#E6501B", evidence: "Notebook analysis workflows" },
      { name: "Seaborn", icon: TbApi, level: 80, color: "#C3110C", evidence: "Notebook analysis workflows" },
      { name: "Plotly", icon: TbApi, level: 82, color: "#B8C0CC", evidence: "JobFit-AI visual analytics" },
      { name: "librosa", icon: TbRobot, level: 82, color: "#EE4C2C", evidence: "music-mood-classifier" },
      { name: "spaCy", icon: TbRobot, level: 86, color: "#C3110C", evidence: "JobFit-AI" },
      { name: "OpenCV", icon: TbRobot, level: 72, color: "#E6501B", evidence: "Computer vision coursework" },
      { name: "Streamlit", icon: SiStreamlit, level: 88, color: "#FF4B4B", evidence: "JobFit-AI, music-mood-classifier" },
      { name: "FAISS", icon: TbApi, level: 80, color: "#E6501B", evidence: "Vector search work" },
      { name: "Pinecone", icon: SiMongodb, level: 78, color: "#C3110C", evidence: "RAG familiarity" },
      { name: "ChromaDB", icon: SiMongodb, level: 86, color: "#B8C0CC", evidence: "HelixDesk" },
      { name: "Selenium", icon: TbRobot, level: 80, color: "#C3110C", evidence: "Automation workflows" },
      { name: "BeautifulSoup", icon: TbRobot, level: 84, color: "#E6501B", evidence: "Data extraction tasks" },
      { name: "Jupyter Notebooks", icon: TbApi, level: 90, color: "#FF7A4A", evidence: "JobFit-AI, music-mood-classifier" },
      { name: "RapidFuzz", icon: TbApi, level: 82, color: "#E6501B", evidence: "JobFit-AI" },
      { name: "PyPDF2 / DOCX Parsing", icon: TbApi, level: 78, color: "#B8C0CC", evidence: "JobFit-AI" },
      { name: "Git", icon: FaGitAlt, level: 90, color: "#F05032", evidence: "All repos" },
      { name: "VS Code", icon: TbBrandVscode, level: 93, color: "#007ACC", evidence: "Daily workflow" },
    ]
  },
];

export const projects = [
  {
    title: "HelixDesk",
    description: "Deployed a multi-agent AI system for enterprise support teams that resolves tickets using specialized agents (classify, research, draft). Architecture: State-machine orchestrated agent graph backed by ChromaDB vector search over internal knowledge bases.",
    tags: ["LangGraph", "Groq", "ChromaDB", "FastAPI", "Sentence-BERT", "Docker"],
    category: "AI",
    image: null,
    github: "https://github.com/vatsalyd/Multi-Agent-System-Planning",
    live: null,
    featured: true,
  },
  {
    title: "JobFit AI",
    description: "AI-powered resume–job description matching system with multi-model scoring. Extracts skills via SpaCy NER and fuzzy matching, computes rule-based overlap, ML-based feature scoring (Random Forest/XGBoost), and semantic similarity via fine-tuned Sentence-BERT (all-MiniLM-L6-v2). Interactive Streamlit UI for instant gap analysis.",
    tags: ["SpaCy", "Sentence-BERT", "Scikit-learn", "Streamlit", "NLP", "Python"],
    category: "AI",
    image: null,
    github: "https://github.com/vatsalyd/JobFit-AI",
    live: null,
    featured: true,
  },
  {
    title: "Music Mood Classifier",
    description: "Audio mood prediction system that classifies songs into mood categories (happy, sad, romantic, dramatic, angry) by extracting acoustic features — tempo, spectral centroid, chroma STFT, ZCR, and MFCCs — using librosa. Trained with Random Forest Classifier and deployed via Streamlit web app and CLI predictor.",
    tags: ["librosa", "Scikit-learn", "Streamlit", "Audio ML", "Python"],
    category: "ML",
    image: null,
    github: "https://github.com/vatsalyd/music-mood-classifier",
    live: null,
    featured: true,
  },
  {
    title: "ShiftSync",
    description: "Cross-platform mobile application built with React Native and Expo for shift scheduling and team coordination. Features real-time sync, component-based architecture, and custom hooks for state management.",
    tags: ["React Native", "Expo", "TypeScript", "Mobile", "JavaScript"],
    category: "Dev",
    image: null,
    github: "https://github.com/vatsalyd/ShiftSync",
    live: null,
    featured: true,
  },
  {
    title: "ReAct Paper Implementation",
    description: "From-scratch educational implementation of ReAct: Synergizing Reasoning and Acting in Language Models (ICLR 2023). Features a minimal reasoning loop (Thought → Action → Observation) with Wikipedia Search/Lookup tools, custom LLM wrapper for Groq/OpenAI, and few-shot evaluation on HotpotQA and FEVER.",
    tags: ["ReAct", "Agents", "Groq", "Python", "LLMs", "NLP"],
    category: "AI",
    image: null,
    github: "https://github.com/vatsalyd/ReAct-Paper-Implementation",
    live: null,
    featured: true,
  },
];

export const experience = [
  {
    type: "experience",
    title: "Core Member / Leading Member — DSAI Club",
    organization: "IIT Bhilai",
    period: "2024 – Present",
    description: "Core and leading member of the Data Science & Artificial Intelligence Club at IIT Bhilai. Organizing technical workshops, mentoring peers in ML/DL, and leading teams on AI research projects.",
    skills: ["Leadership", "ML/DL", "Workshops", "Research"],
  },
  {
    type: "education",
    title: "B.Tech — Data Science & AI",
    organization: "Indian Institute of Technology (IIT) Bhilai",
    period: "2024 – 2028",
    description: "Specializing in Data Science & Artificial Intelligence. Coursework includes Machine Learning, Deep Learning, NLP, Computer Vision, and Multi-Agent Systems.",
    skills: ["DSAI", "IIT Bhilai"],
  },
];

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export const dataShowcaseData = {
  accuracyCurve: [
    { epoch: 1, train: 0.45, val: 0.42 },
    { epoch: 2, train: 0.62, val: 0.58 },
    { epoch: 3, train: 0.74, val: 0.69 },
    { epoch: 4, train: 0.82, val: 0.78 },
    { epoch: 5, train: 0.87, val: 0.83 },
    { epoch: 6, train: 0.91, val: 0.86 },
    { epoch: 7, train: 0.93, val: 0.88 },
    { epoch: 8, train: 0.95, val: 0.90 },
    { epoch: 9, train: 0.96, val: 0.91 },
    { epoch: 10, train: 0.97, val: 0.92 },
  ],
  featureImportance: [
    { name: "Agent Reasoning", value: 0.95 },
    { name: "Tool Selection", value: 0.88 },
    { name: "Memory Recall", value: 0.82 },
    { name: "Context Window", value: 0.76 },
    { name: "Chain Planning", value: 0.70 },
    { name: "Error Recovery", value: 0.64 },
  ],
  codeSnippet: `from langgraph.graph import StateGraph
from langchain_groq import ChatGroq

# Initialize HelixDesk agent pipeline
llm = ChatGroq(model="llama-3.3-70b-versatile")

# Define agent state machine
graph = StateGraph(TicketState)
graph.add_node("classifier", classify_ticket)
graph.add_node("researcher", search_knowledge)
graph.add_node("drafter", draft_resolution)

# Add conditional routing
graph.add_conditional_edges(
    "classifier",
    route_by_confidence,
    {"research": "researcher", "escalate": END}
)
graph.add_edge("researcher", "drafter")

# Compile and execute
app = graph.compile()
result = app.invoke({
    "ticket": "VPN not connecting remotely"
})`,
};
