<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:115e59&height=180&section=header&text=VATSAL%20YADAV&fontSize=42&fontColor=5eead4&fontAlignY=38&desc=AI%20Systems%20%26%20Autonomous%20Agents%20Engineer&descAlignY=60&descSize=16&animation=fadeIn" width="100%" alt="Vatsal Yadav Banner"/>
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/vatsal-yadav"><img src="https://img.shields.io/badge/LinkedIn-0d1117?style=flat-square&logo=linkedin&logoColor=5EEAD4" alt="LinkedIn"/></a>
  <a href="https://vatsalyd.github.io/Portfolio"><img src="https://img.shields.io/badge/Portfolio-0d1117?style=flat-square&logo=googlechrome&logoColor=5EEAD4" alt="Portfolio"/></a>
  <a href="mailto:vatsal.y.official@gmail.com"><img src="https://img.shields.io/badge/Email-0d1117?style=flat-square&logo=gmail&logoColor=5EEAD4" alt="Email"/></a>
  <a href="https://medium.com/@vatsal.y.official"><img src="https://img.shields.io/badge/Medium-0d1117?style=flat-square&logo=medium&logoColor=5EEAD4" alt="Medium"/></a>
  <a href="https://x.com/fixedbyvatsal"><img src="https://img.shields.io/badge/X-0d1117?style=flat-square&logo=x&logoColor=5EEAD4" alt="Twitter"/></a>
  <a href="https://github.com/vatsalyd"><img src="https://img.shields.io/badge/GitHub-0d1117?style=flat-square&logo=github&logoColor=5EEAD4" alt="GitHub"/></a>
</p>

---

```
STATUS   : ACTIVE · Production AI Systems
ROLE     : AI Systems & Autonomous Agents Engineer
BASE     : IIT Bhilai — B.Tech, Data Science & AI (2024–2028)
ROUTING  : Incrivelsoft (NUMAA.ai) — Production Nutrition Agent
CONTACT  : vatsal.y.official@gmail.com · +91 7983709173
```

---

### ⚡ `$ whoami`

I build the backend engine room for artificial intelligence — focusing on multi-agent coordination, state machines, and reliable handoffs rather than simple surface-level chat wrappers.

- 🚀 **Current Production Work**: AI/ML Intern at **Incrivelsoft**, owning the Nutrition Agent in the **NUMAA.ai** multi-agent health platform (3-layer hybrid engine: clinical rules → guideline retrieval → Gemini 2.5 Flash router).
- 🧠 **Research Focus**: Sub-second agent routing, confidence-gated escalations, and virtual memory paging (MCP) to reduce LLM token overhead.
- 🎓 **Education**: B.Tech in Data Science & Artificial Intelligence at **IIT Bhilai** (GPA: 7.34/10).

---

### 🤖 `$ ps aux --agents` (Featured Systems)

| System | Overview | Stack |
|:---|:---|:---|
| [**`numaa-nutrition-agent`**](https://numaa.ai) | Nutrition logic inside NUMAA.ai; 5 FastAPI microservices; token-bucket rate limiting (300 RPM); clinical guardrails | Gemini 2.5 · FastAPI · Qdrant · MongoDB |
| [**`context-pager`**](https://github.com/vatsalyd/context_pager) | MCP virtual memory for LLMs — pages compressed doc slices on demand (**4–10× token reduction**) | MCP · Vector Search · FastAPI · Python |
| [**`helixdesk`**](https://github.com/vatsalyd/helixdesk) | 3-agent LangGraph state machine (Triage → Retrieval → Resolution) with Llama-3.3-70b (**~1.8s latency**) | LangGraph · ChromaDB · FastAPI · Docker · AWS |
| [**`finsight-ai`**](https://github.com/vatsalyd/FinSightAI) | 4-stage financial pipeline (Rate Limiter → Safety Guard → Intent Classifier → Router) | FastAPI · SSE · yfinance · Python |
| [**`jobfit-ai`**](https://github.com/vatsalyd/JobFit-AI) | 3-model resume↔JD matching engine (spaCy NER + XGBoost + fine-tuned SBERT on 13k+ pairs) | XGBoost · PyTorch · SBERT · Streamlit |
| [**`claimsure-ai`**](https://github.com/vatsalyd/ClaimSure) | Insurance claim verification agent with multi-modal OCR invoice intake + validation gates | Python · Document OCR · FastAPI |

<details>
<summary><b>View more projects (7 builds)</b></summary>
<br>

| Project | Description | Stack |
|:---|:---|:---|
| [**influencer-search**](https://github.com/vatsalyd/influencer-search) | Creator discovery platform with multi-dimensional filtering and telemetry | React 19 · TypeScript · Vite · Framer Motion |
| [**ReAct Paper Implementation**](https://github.com/vatsalyd/ReAct-Paper-Implementation) | From-scratch ReAct (ICLR 2023) autonomous Thought → Action → Observation loop | Python · LangChain · Groq |
| [**RawAccel-Studio**](https://github.com/vatsalyd/RawAccel-Studio) | ML pipeline predicting mouse acceleration curves from gameplay telemetry | Python · Scikit-learn · Curve Fitting |
| [**AI-OCR Receipt Extraction**](https://github.com/vatsalyd/AI-OCR-Receipt-Extraction) | 4-stage computer vision & NER pipeline for structured receipt parsing | OpenCV · Tesseract · NER · Python |
| [**PGAGI Screening Portal**](https://github.com/vatsalyd/AI-powered-role-based-candidate-screening-system) | Role-based technical interview simulator and evaluation engine | LLMs · Prompt Engineering · FastAPI |
| [**Maven**](https://github.com/vatsalyd/Maven) | Local desktop assistant with AES-256 encrypted smart field autofill | Python · Windows API · Security |
| [**ShiftSync**](https://github.com/vatsalyd/ShiftSync) | Cross-platform shift-scheduling application with real-time state sync | React Native · Expo · TypeScript |

</details>

---

### 🌐 `$ cat upstream_contributions.log`

> **Live & Automated**: Contributions to external open-source repositories (auto-synced via GitHub Actions).

<!-- START_SECTION:activity -->
| Repository | Contribution / Pull Request | Status |
|:---|:---|:---:|
| [`IncrivelsoftHQ/TummyTales-Platform`](https://github.com/IncrivelsoftHQ/TummyTales-Platform) | [refactor: single-provider Gemini migration + token budget fixes](https://github.com/IncrivelsoftHQ/TummyTales-Platform/pull/158) | ✅ Merged |
| [`IncrivelsoftHQ/TummyTales-Platform`](https://github.com/IncrivelsoftHQ/TummyTales-Platform) | [perf: latency reduction — cache, ProfileRepository, service decomposition](https://github.com/IncrivelsoftHQ/TummyTales-Platform/pull/154) | ✅ Merged |
| [`mlflow/mlflow`](https://github.com/mlflow/mlflow) | [Fix async trace export dropping workspace context (#24093)](https://github.com/mlflow/mlflow/pull/24275) | ✅ Merged |
| [`deepchem/deepchem`](https://github.com/deepchem/deepchem) | [fix: DTNNEmbedding parameter misspelled (should be initializer) — Fixes #5020](https://github.com/deepchem/deepchem/pull/5025) | 🟡 Open |
| [`mlflow/mlflow`](https://github.com/mlflow/mlflow) | [Support Gemini thought signature in AI Gateway](https://github.com/mlflow/mlflow/pull/24051) | ✅ Merged |
| [`ansible/ansible`](https://github.com/ansible/ansible) | [Fix role lookup from ansible-playbook cwd](https://github.com/ansible/ansible/pull/87112) | ✅ Merged |
<!-- END_SECTION:activity -->

> Full interactive feed with repository filters → [Portfolio Open Source Section](https://vatsalyd.github.io/Portfolio/#opensource)

---

### 🛠️ `$ cat routing_table.yaml` (Tech Stack)

```
Orchestration & Agents : LangGraph · LangChain · Multi-Agent Systems · MCP · RAG · Function Calling
ML & Deep Learning     : PyTorch · Scikit-learn · XGBoost · Sentence-BERT · Hugging Face · spaCy
Cloud & Infrastructure : FastAPI · Docker · AWS (EC2/ECR) · GitHub Actions · Qdrant · ChromaDB · MongoDB
Languages              : Python · C++ · TypeScript · JavaScript · SQL · Bash
```

---

### 📝 `$ cat published_articles.md`

- 📖 [**Your AI Agent Is Reading the Whole Book. You're Paying for Every Word**](https://medium.com/@vatsal.y.official/your-ai-agent-is-reading-the-whole-book-youre-paying-for-every-word-1193f3dec6df)  
  _Virtual memory & semantic page indexing with Context Pager to cut token overhead by 4–10×._
- 📖 [**I Refactored My AI Agent System and Deleted Half the Complexity**](https://medium.com/@vatsal.y.official/i-refactored-my-ai-agent-system-and-deleted-half-the-complexity-heres-what-i-changed-and-why-687154b1602f)  
  _Flattening multi-agent state machines into explicit deterministic routing DAGs for sub-second latency._
- 📖 [**I Built a Pregnancy Nutrition AI at My Internship — The LLM Was the Last Thing I Worried About**](https://medium.com/@vatsal.y.official/i-built-a-pregnancy-nutrition-ai-at-my-internship-the-llm-was-the-last-thing-i-worried-about-7c9200fd1782)  
  _Production clinical safety guardrails, state handoffs, and medical quality loops._

---

### 📬 `$ connect()`

<p align="center">
  <a href="mailto:vatsal.y.official@gmail.com"><img src="https://img.shields.io/badge/vatsal.y.official@gmail.com-0d1117?style=flat-square&logo=gmail&logoColor=5EEAD4"/></a>
  <a href="https://www.linkedin.com/in/vatsal-yadav"><img src="https://img.shields.io/badge/LinkedIn-0d1117?style=flat-square&logo=linkedin&logoColor=5EEAD4"/></a>
  <a href="https://vatsalyd.github.io/Portfolio"><img src="https://img.shields.io/badge/Portfolio-0d1117?style=flat-square&logo=googlechrome&logoColor=5EEAD4"/></a>
  <a href="https://github.com/vatsalyd"><img src="https://img.shields.io/badge/GitHub-0d1117?style=flat-square&logo=github&logoColor=5EEAD4"/></a>
  <a href="https://x.com/fixedbyvatsal"><img src="https://img.shields.io/badge/X-0d1117?style=flat-square&logo=x&logoColor=5EEAD4"/></a>
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:115e59,100:0f172a&height=90&section=footer" width="100%" alt="Footer"/>
</p>
