<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:115e59&height=200&section=header&text=VATSAL%20YADAV&fontSize=48&fontColor=5eead4&fontAlignY=35&desc=Agentic%20Systems%20%26%20Orchestration%20Layer%20Engineer&descAlignY=55&descSize=18&animation=fadeIn" width="100%"/>
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&size=18&pause=1500&color=5EEAD4&background=00000000&center=true&vCenter=true&width=650&lines=Orchestrating+multi-agent+systems%2C+one+state+machine+at+a+time;LangGraph+%C2%B7+RAG+%C2%B7+Multi-Agent+Pipelines;Currently+routing+production+traffic+at+NUMAA.ai;4+upstream+PRs+merged+into+mlflow+%26+ansible" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/vatsal-yadav"><img src="https://img.shields.io/badge/LinkedIn-0d1117?style=for-the-badge&logo=linkedin&logoColor=5EEAD4"/></a>
  <a href="https://vatsalyd.github.io/Portfolio"><img src="https://img.shields.io/badge/Portfolio-0d1117?style=for-the-badge&logo=googlechrome&logoColor=5EEAD4"/></a>
  <a href="mailto:vatsal.y.official@gmail.com"><img src="https://img.shields.io/badge/Email-0d1117?style=for-the-badge&logo=gmail&logoColor=5EEAD4"/></a>
  <a href="https://medium.com/@vatsal.y.official"><img src="https://img.shields.io/badge/Medium-0d1117?style=for-the-badge&logo=medium&logoColor=5EEAD4"/></a>
  <a href="https://x.com/fixedbyvatsal"><img src="https://img.shields.io/badge/X-0d1117?style=for-the-badge&logo=x&logoColor=5EEAD4"/></a>
</p>

---

```
ORCHESTRATOR STATUS  : ONLINE
ROLE                 : Agentic Systems & Orchestration Layer Engineer
BASE                 : IIT Bhilai — B.Tech, Data Science & AI (2024–2028)  ·  GPA 7.34/10
ROUTING TO           : Incrivelsoft (NUMAA.ai) — Nutrition Agent in Production
AGENT SPEED          : ~1.84s resolution latency
CONTACT              : vatsal.y.official@gmail.com  ·  +91 7983709173
```

<br>

### `$ whoami`

I specialize in the engine room of artificial intelligence. While much of the industry focuses on chat interfaces on the surface, my focus is building the robust backend systems that power them — bridging raw computing power with practical utility through resilient cloud architectures and autonomous agents that plan, reason, and execute independently.

Right now I'm deep in one specific problem: how do you get multiple specialized agents to behave like *one* coherent system instead of three confused ones talking past each other? I design the state machines, confidence-based escalation logic, and handoff protocols that sit between a user's request and a swarm of agents trying to answer it.

Currently doing this in production as an **AI/ML Intern at Incrivelsoft**, where I own the **Nutritionist Lite Agent** inside the **NUMAA.ai** multi-agent health platform — architecting a 3-layer hybrid system (ICMR-NIN clinical engine → guideline retrieval → Gemini 2.5 Flash router), enforcing clinical guardrails, and keeping the LLM from prescribing pizza for diabetes.

<br>

### `$ ps aux --agents`

> Production systems and shipped projects. Click any row to jump to the repo.

| Agent | Status | What It Does | Key Metric | Stack |
|:---|:---:|:---|:---:|:---|
| [**`numaa-nutrition-agent`**](https://numaa.ai) | 🔵 `prod` | Nutrition domain logic inside NUMAA.ai; 3-layer hybrid (clinical engine → retrieval → Gemini router); 5 FastAPI microservices; token-bucket rate limiting (300 RPM) | **5 services shipped** | Gemini 2.5 Flash · FastAPI · Qdrant · MongoDB |
| [**`context-pager`**](https://github.com/vatsalyd/context_pager) | 🟢 `shipped` | MCP virtual memory for LLMs — semantically pages compressed doc slices on demand; 4-stage Index → Search → Compress → Recall pipeline | **4–10× token savings** | MCP · Vector Search · FastAPI · Python |
| [**`helixdesk`**](https://github.com/vatsalyd/helixdesk) | 🟢 `shipped` | 3-agent LangGraph state machine (Triage → Retrieval → Resolution) with Llama-3.3-70b via Groq; confidence-gated auto-escalation; citation-backed ChromaDB retrieval | **~1.8s resolution** | LangGraph · ChromaDB · FastAPI · Docker · AWS EC2 |
| [**`finsight-ai`**](https://github.com/vatsalyd/FinSightAI) | 🟢 `shipped` | 4-stage financial pipeline (Rate Limiter → Safety Guard → Intent Classifier → Agent Router); Portfolio Health Agent with live yfinance data via SSE | **166ms latency** | FastAPI · SSE · yfinance · Python |
| [**`claimsure-ai`**](https://github.com/vatsalyd/ClaimSure) | 🟢 `shipped` | Healthcare insurance pre-submission verification agent; multi-modal OCR intake for invoices + policy rule validation gates | **85%+ deficiency catch** | Python · AI Agents · Document OCR · FastAPI |
| [**`jobfit-ai`**](https://github.com/vatsalyd/JobFit-AI) | 🟢 `shipped` | 3-model resume↔JD matching (spaCy NER + XGBoost on 10 custom features + fine-tuned SBERT dual-encoder); trained on 13k+ pairs across 24 job categories | **Sub-1s inference** | XGBoost · PyTorch · SBERT · Streamlit · AWS EC2 |
| [**`influencer-search`**](https://github.com/vatsalyd/influencer-search) | 🟢 `shipped` | Next-gen creator discovery platform with multi-dimensional filtering, engagement telemetry, and glassmorphism UI | **60fps animations** | React 19 · TypeScript · Vite · Framer Motion |
| [**`react-paper`**](https://github.com/vatsalyd/ReAct-Paper-Implementation) | 🟢 `shipped` | From-scratch ReAct (ICLR 2023) implementation — autonomous Thought → Action → Observation loop with Wikipedia tools | **Paper-matched results** | Python · LangChain · Groq |

<details>
<summary><b>More builds →</b> RawAccel-Studio · AI-OCR Receipt Extraction · PGAGI Screening Portal · Maven · ShiftSync · Music Mood Classifier · Every Drop Counts</summary>

| Project | What It Does | Stack |
|:---|:---|:---|
| [**RawAccel-Studio**](https://github.com/vatsalyd/RawAccel-Studio) | ML pipeline predicting optimal mouse acceleration curves from live gameplay telemetry | Python · Scikit-learn · Curve Fitting |
| [**AI-OCR Receipt Extraction**](https://github.com/vatsalyd/AI-OCR-Receipt-Extraction) | 4-stage computer vision & NER pipeline for structured data extraction from noisy receipts | OpenCV · Tesseract · NER · Python |
| [**PGAGI Screening Portal**](https://github.com/vatsalyd/AI-powered-role-based-candidate-screening-system) | Role-based AI assessment platform generating personalized technical interview simulations | LLMs · Prompt Engineering · FastAPI |
| [**Maven**](https://github.com/vatsalyd/Maven) | Privacy-focused local Windows desktop assistant for smart field autofill with AES-256 encryption | Python · Windows API · Security |
| [**ShiftSync**](https://github.com/vatsalyd/ShiftSync) | Cross-platform shift-scheduling app with real-time state sync | React Native · Expo · TypeScript |
| [**Music Mood Classifier**](https://github.com/vatsalyd/music-mood-classifier) | Audio classification predicting song moods from MFCCs, spectral centroid, chroma, ZCR | librosa · Scikit-learn · Streamlit |
| [**Every Drop Counts**](https://github.com/vatsalyd/every-drop-counts) | Data storytelling analyzing 21 farm water conservation & irrigation success stories (IIT Bhilai DSL251) | Python · Data Visualization |

</details>

<br>

### `$ cat upstream_contributions.log`

> Contributions to repositories I don't own. Full auto-syncing live feed → [Portfolio](https://vatsalyd.github.io/Portfolio/#opensource)

| Repository | PR / Issue | Status |
|:---|:---|:---:|
| [`mlflow/mlflow`](https://github.com/mlflow/mlflow) | [Fix async trace export dropping workspace context (#24093)](https://github.com/mlflow/mlflow/pull/24275) | ✅ Merged |
| [`mlflow/mlflow`](https://github.com/mlflow/mlflow) | [Support Gemini thought signature in AI Gateway](https://github.com/mlflow/mlflow/pull/24051) | ✅ Merged |
| [`mlflow/mlflow`](https://github.com/mlflow/mlflow) | [Warn when search_runs() silently truncates results](https://github.com/mlflow/mlflow/pull/22215) | ✅ Merged |
| [`ansible/ansible`](https://github.com/ansible/ansible) | [Fix role lookup from ansible-playbook cwd](https://github.com/ansible/ansible/pull/87112) | ✅ Merged |
| [`deepchem/deepchem`](https://github.com/deepchem/deepchem) | [Fix DTNNEmbedding parameter misspelled — Fixes #5020](https://github.com/deepchem/deepchem/pull/5025) | 🟡 Open |
| [`fossasia/eventyay`](https://github.com/fossasia/eventyay) | [CI tests workflow references removed src path](https://github.com/fossasia/eventyay/issues/4133) | 🔵 Closed |

<br>

### `$ cat routing_table.yaml`

**orchestration_and_agents**
<p align="left">
<img src="https://img.shields.io/badge/LangGraph-134e4a?style=for-the-badge&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/LangChain-134e4a?style=for-the-badge&logo=langchain&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/Multi--Agent%20Systems-134e4a?style=for-the-badge&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/MCP-134e4a?style=for-the-badge&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/RAG-134e4a?style=for-the-badge&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/OpenAI%20API-134e4a?style=for-the-badge&logo=openai&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/Google%20Gemini-134e4a?style=for-the-badge&logo=googlegemini&logoColor=5EEAD4"/>
</p>

**ml_and_deep_learning**
<p align="left">
<img src="https://img.shields.io/badge/PyTorch-134e4a?style=for-the-badge&logo=pytorch&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/Scikit--learn-134e4a?style=for-the-badge&logo=scikitlearn&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/XGBoost-134e4a?style=for-the-badge&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/Sentence--BERT-134e4a?style=for-the-badge&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/Hugging%20Face-134e4a?style=for-the-badge&logo=huggingface&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/spaCy%20NER-134e4a?style=for-the-badge&logoColor=5EEAD4"/>
</p>

**infra_and_deployment**
<p align="left">
<img src="https://img.shields.io/badge/FastAPI-134e4a?style=for-the-badge&logo=fastapi&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/Docker-134e4a?style=for-the-badge&logo=docker&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/AWS%20EC2/ECR-134e4a?style=for-the-badge&logo=amazonaws&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/GitHub%20Actions-134e4a?style=for-the-badge&logo=githubactions&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/ChromaDB-134e4a?style=for-the-badge&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/Qdrant-134e4a?style=for-the-badge&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/MongoDB-134e4a?style=for-the-badge&logo=mongodb&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/Streamlit-134e4a?style=for-the-badge&logo=streamlit&logoColor=5EEAD4"/>
</p>

**languages**
<p align="left">
<img src="https://img.shields.io/badge/Python-134e4a?style=for-the-badge&logo=python&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/C++-134e4a?style=for-the-badge&logo=cplusplus&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/JavaScript-134e4a?style=for-the-badge&logo=javascript&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/TypeScript-134e4a?style=for-the-badge&logo=typescript&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/SQL-134e4a?style=for-the-badge&logo=mysql&logoColor=5EEAD4"/>
<img src="https://img.shields.io/badge/Bash-134e4a?style=for-the-badge&logo=gnubash&logoColor=5EEAD4"/>
</p>

<br>

### `$ cat published_articles.md`

| Article | Tags | Read |
|:---|:---:|:---:|
| **Your AI Agent Is Reading the Whole Book. You're Paying for Every Word** — The silent token tax of full-document agent architectures and how Context Pager cuts overhead by 4–10× | `MCP` `Memory` | [Read →](https://medium.com/@vatsal.y.official/your-ai-agent-is-reading-the-whole-book-youre-paying-for-every-word-1193f3dec6df) |
| **I Refactored My AI Agent System and Deleted Half the Complexity** — Stripping unnecessary abstractions, flattening state transitions, and optimizing multi-agent routing for sub-second latency | `Agents` `Systems` | [Read →](https://medium.com/@vatsal.y.official/i-refactored-my-ai-agent-system-and-deleted-half-the-complexity-heres-what-i-changed-and-why-687154b1602f) |
| **I Built a Pregnancy Nutrition AI at My Internship — The LLM Was the Last Thing I Worried About** — State handoffs, strict safety guardrails, medical response quality loops, and multi-agent orchestration | `Production AI` `Healthcare` | [Read →](https://medium.com/@vatsal.y.official/i-built-a-pregnancy-nutrition-ai-at-my-internship-the-llm-was-the-last-thing-i-worried-about-7c9200fd1782) |

<br>

### `$ tail -f research.log`

Right now I'm deep in the orchestration layer itself — not what one agent can do, but how several agents *coordinate*: state handoffs that don't lose context, confidence-based escalation instead of silent failure, and sub-second routing decisions before any LLM call fires. That's the throughline across NUMAA.ai's inter-agent handoffs, HelixDesk's triage escalation, and FinSight's pre-LLM safety/intent layer — same underlying problem, three different domains.

<br>

### `$ git log --oneline`

```
2026  DEPLOY    AI/ML Intern @ Incrivelsoft — 5 production microservices, Nutritionist Lite Agent, Qdrant RAG, Gemini 2.5
2026  MERGE     4 upstream PRs merged → mlflow/mlflow (×3) + ansible/ansible (×1)
2026  WRITE     3 published engineering articles on Medium — token costs, agent refactoring, healthcare AI
2025  SHIP      Context Pager, HelixDesk, FinSight AI, JobFit-AI — four systems, design through deploy
2025  PROMOTE   Coordinator, DSAI Club @ IIT Bhilai — ran the Meraz hackathon for 100+ participants
2024  JOIN      Core Member, DSAI Club  ·  Volunteer, Centre for Career Planning & Services (CCPS)
2024  INIT      B.Tech, Data Science & AI @ Indian Institute of Technology (IIT) Bhilai
```

<br>

### `$ cat experience.yaml`

```yaml
- role: AI & ML Intern
  org: Incrivelsoft Private Limited (NUMAA.ai)
  period: May 2026 – July 2026
  location: Remote
  highlights:
    - Architected Nutritionist Lite Agent as 3-layer hybrid system (ICMR-NIN/WHO → retrieval → Gemini 2.5 Flash router)
    - Engineered 5 production services with FastAPI, MongoDB, Qdrant RAG, Gemini Vision multimodal fallback
    - Led migration from 3 LLM providers to Google Gemini; implemented token-bucket rate limiting (300 RPM), circuit breaker
    - Refactored NutritionUIService (855 → 480 lines); added 31 unit tests with FakeProfileRepository adapter

- role: Coordinator
  org: Data Science & AI Club (DSAI), IIT Bhilai
  period: Aug 2024 – Present
  highlights:
    - Orchestrated the AI/ML track at Meraz (IIT Bhilai's annual fest) for 100+ participants
    - Designed and delivered hands-on workshops in deep learning and data science
    - Weekly office hours for first- and second-year students on ML projects and paper reading

- role: Student Volunteer
  org: Centre for Career Planning & Services (CCPS), IIT Bhilai
  period: Sep 2024 – Present
  highlights:
    - Led outreach to 100+ companies for campus placement drives
    - Maintained recruiter relational databases and coordinated placement logistics
```

<br>

### `$ curl stats.vatsalyd.dev`

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=vatsalyd&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=5EEAD4&icon_color=5EEAD4&text_color=c9d1d9" width="49%"/>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=vatsalyd&layout=compact&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=5EEAD4&text_color=c9d1d9" width="38%"/>
</p>

<p align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=vatsalyd&theme=react-dark&hide_border=true&bg_color=0D1117&color=5EEAD4&line=5EEAD4&point=ffffff" width="90%"/>
</p>

<br>

### `$ connect()`

<p align="center">
  <a href="mailto:vatsal.y.official@gmail.com"><img src="https://img.shields.io/badge/vatsal.y.official@gmail.com-0d1117?style=for-the-badge&logo=gmail&logoColor=5EEAD4"/></a>
  <a href="https://www.linkedin.com/in/vatsal-yadav"><img src="https://img.shields.io/badge/LinkedIn-0d1117?style=for-the-badge&logo=linkedin&logoColor=5EEAD4"/></a>
  <a href="https://vatsalyd.github.io/Portfolio"><img src="https://img.shields.io/badge/Portfolio-0d1117?style=for-the-badge&logo=googlechrome&logoColor=5EEAD4"/></a>
  <a href="https://github.com/vatsalyd"><img src="https://img.shields.io/badge/GitHub-0d1117?style=for-the-badge&logo=github&logoColor=5EEAD4"/></a>
  <a href="https://x.com/fixedbyvatsal"><img src="https://img.shields.io/badge/X-0d1117?style=for-the-badge&logo=x&logoColor=5EEAD4"/></a>
  <a href="https://leetcode.com/u/vatsalyd/"><img src="https://img.shields.io/badge/LeetCode-0d1117?style=for-the-badge&logo=leetcode&logoColor=5EEAD4"/></a>
  <a href="https://www.kaggle.com/vatsalydd"><img src="https://img.shields.io/badge/Kaggle-0d1117?style=for-the-badge&logo=kaggle&logoColor=5EEAD4"/></a>
</p>

```
I'm actively looking for high-impact AI/ML Systems & Agent Engineering internships
and full-time roles where people ship real code and benchmark real latencies.
Remote or relocation — let's talk.
```

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:115e59,100:0f172a&height=100&section=footer" width="100%"/>
</p>
