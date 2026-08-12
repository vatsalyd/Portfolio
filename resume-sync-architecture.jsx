
import { useState } from "react";

const NODE = ({ x, y, w, h, color, label, sub, icon, onClick, active }) => (
  <g onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
    <rect
      x={x} y={y} width={w} height={h} rx="12"
      fill={active ? color : "#1e293b"}
      stroke={color}
      strokeWidth={active ? 0 : 2}
      style={{ transition: "all 0.2s" }}
    />
    <text x={x + w / 2} y={y + h / 2 - (sub ? 8 : 0)} textAnchor="middle" dominantBaseline="middle"
      fill={active ? "#fff" : color} fontSize="13" fontWeight="700" fontFamily="monospace">
      {icon} {label}
    </text>
    {sub && (
      <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" dominantBaseline="middle"
        fill={active ? "#ffffffaa" : "#94a3b8"} fontSize="10" fontFamily="sans-serif">
        {sub}
      </text>
    )}
  </g>
);

const ARROW = ({ x1, y1, x2, y2, color = "#475569", label, dashed }) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g>
      <defs>
        <marker id={`arrow-${color.replace("#", "")}`} markerWidth="8" markerHeight="8"
          refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={color} />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth="1.5"
        strokeDasharray={dashed ? "5,4" : undefined}
        markerEnd={`url(#arrow-${color.replace("#", "")})`} />
      {label && (
        <text x={mx} y={my - 6} textAnchor="middle" fill={color}
          fontSize="9" fontFamily="monospace" fontWeight="600"
          style={{ background: "#0f172a" }}>
          {label}
        </text>
      )}
    </g>
  );
};

const BADGE = ({ x, y, text, color }) => (
  <g>
    <rect x={x} y={y} width={text.length * 6.5 + 12} height={18} rx="9"
      fill={color + "33"} stroke={color} strokeWidth="1" />
    <text x={x + text.length * 3.25 + 6} y={y + 9} textAnchor="middle"
      dominantBaseline="middle" fill={color} fontSize="9" fontFamily="monospace" fontWeight="700">
      {text}
    </text>
  </g>
);

const DETAIL_PANELS = {
  yaml: {
    title: "📁 Central YAML Data Store",
    color: "#a78bfa",
    desc: "Your single source of truth. All content lives here with visibility tags.",
    code: `# _data/projects.yaml
- name: "RAG Chatbot"
  description: "LLM-powered Q&A system..."
  tech: [Python, LangChain, Pinecone]
  github: "https://github.com/..."
  demo: "https://..."
  show_on: [portfolio, resume, github] ✅

- name: "Weekend Experiment"
  description: "Quick ML prototype..."
  tech: [Python, PyTorch]
  show_on: [portfolio]  # Portfolio only 🔒

# _data/experience.yaml
- company: "Google"
  role: "SWE Intern"
  period: "May–Aug 2024"
  bullets:
    - text: "Improved inference latency by 40%"
      show_on: [portfolio, resume, github]
    - text: "Internal tools details..."
      show_on: [portfolio]  # Confidential to resume`,
  },
  actions: {
    title: "⚙️ GitHub Actions Orchestrator",
    color: "#38bdf8",
    desc: "Runs on push to _data/ or on a daily cron. Filters, builds, and pushes everywhere.",
    code: `# .github/workflows/sync.yml
name: Sync Everything
on:
  push:
    paths: ['_data/**', 'templates/**']
  schedule:
    - cron: '0 6 * * *'  # Daily at 6 AM

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          token: \${{ secrets.PAT_TOKEN }}

      - name: Fetch GitHub Stats
        run: python scripts/fetch_gh_stats.py
        env:
          GH_TOKEN: \${{ secrets.GH_TOKEN }}

      - name: Build All Outputs
        run: python scripts/build.py

      - name: Compile LaTeX Resume
        uses: xu-cheng/latex-action@v3
        with:
          root_file: output/resume.tex

      - name: Push Profile README
        run: python scripts/push_readme.py

      - name: Push to Overleaf
        run: |
          git remote add overleaf https://git.overleaf.com/$OL_ID
          git subtree push --prefix=output/resume overleaf main
        env:
          OL_ID: \${{ secrets.OVERLEAF_PROJECT_ID }}`,
  },
  github_api: {
    title: "🐙 GitHub Contributions Auto-sync",
    color: "#34d399",
    desc: "Fetches live stats daily and embeds them in your profile and portfolio.",
    code: `# scripts/fetch_gh_stats.py
import requests, json, os

GH_TOKEN = os.environ["GH_TOKEN"]
USERNAME = "your-username"

# GraphQL: fetch contribution data
query = """
{ user(login: "%s") {
    contributionsCollection {
      totalCommitContributions
      contributionCalendar { totalContributions }
    }
    repositories(first: 6, orderBy: {
      field: UPDATED_AT, direction: DESC
    }) {
      nodes { name description stargazerCount url }
    }
  }
}""" % USERNAME

res = requests.post(
  "https://api.github.com/graphql",
  json={"query": query},
  headers={"Authorization": f"Bearer {GH_TOKEN}"}
)
data = res.json()["data"]["user"]

# Save to _data/gh_stats.json
with open("_data/gh_stats.json", "w") as f:
  json.dump(data, f)

# Use lowlighter/metrics for contribution graph SVG
# Just add this action step in workflow:
# uses: lowlighter/metrics@latest
# with:
#   token: \${{ secrets.GH_TOKEN }}
#   plugin_isocalendar: yes
#   plugin_languages: yes`,
  },
  portfolio: {
    title: "🌐 Portfolio (GitHub Pages)",
    color: "#fb923c",
    desc: "Receives everything. GitHub Actions commits updated JSON/content to your GH Pages repo.",
    code: `# scripts/push_portfolio.py
# Generates portfolio/_data/content.json
# with ALL items (no filtering)

import yaml, json, glob

all_data = {}
for file in glob.glob("_data/*.yaml"):
    key = file.split("/")[-1].replace(".yaml","")
    with open(file) as f:
        items = yaml.safe_load(f)
    # Portfolio gets EVERYTHING — no show_on filter
    all_data[key] = items

with open("portfolio/_data/content.json", "w") as f:
    json.dump(all_data, f)

# Also copy contribution stats
import shutil
shutil.copy("_data/gh_stats.json",
            "portfolio/_data/gh_stats.json")

# Commit and push to gh-pages
import subprocess
subprocess.run([
  "git", "add", "portfolio/_data/",
  "&&", "git", "commit", "-m",
  "chore: auto-sync portfolio data",
  "&&", "git", "push"
])`,
  },
  profile: {
    title: "👤 GitHub Profile README",
    color: "#f472b6",
    desc: "Auto-generated from filtered YAML + live GitHub stats. Stays lean and impressive.",
    code: `# templates/README.md.j2  (Jinja2 template)

# Hi, I'm {{ config.name }} 👋
{{ config.tagline }}

## 🚀 Featured Projects
{% for p in projects if 'github' in p.show_on %}
### [{{ p.name }}]({{ p.github }})
{{ p.description }}
\`{{ p.tech | join(' · ') }}\`
{% endfor %}

## 💼 Experience
{% for e in experience if 'github' in e.show_on %}
**{{ e.role }}** @ {{ e.company }} · {{ e.period }}
{% endfor %}

## 📊 GitHub Stats
![Stats](https://github-readme-stats.vercel.app/api?
  username={{ config.github }}&show_icons=true)

![Contributions](./metrics.svg)

---
*Auto-updated daily via GitHub Actions*

# scripts/push_readme.py — pushes to username/username repo
import requests, os

token = os.environ["PAT_TOKEN"]
# Renders template → commits to profile repo via API`,
  },
  resume: {
    title: "📄 Overleaf Resume (LaTeX)",
    color: "#fbbf24",
    desc: "GitHub Actions generates .tex from filtered data, compiles to PDF, syncs to Overleaf via Git.",
    code: `# templates/resume.tex.j2
\\documentclass[letterpaper,11pt]{article}
% ... preamble ...
\\begin{document}

\\section{Experience}
{% for e in experience if 'resume' in e.show_on %}
\\textbf{ {{e.role}} } \\hfill {{e.period}} \\\\
\\textit{ {{e.company}} }
\\begin{itemize}
{% for b in e.bullets if 'resume' in b.show_on %}
  \\item {{b.text}}
{% endfor %}
\\end{itemize}
{% endfor %}

\\section{Projects}
{% for p in projects if 'resume' in p.show_on %}
\\textbf{ {{p.name}} } \\\\
{{p.description}}
{% endfor %}

\\end{document}

# Overleaf Git Bridge (free for all accounts):
# 1. Overleaf → Account → Git Integration
# 2. Get URL: https://git.overleaf.com/<project-id>
# 3. GitHub Actions pushes generated .tex to it
# 4. Overleaf auto-compiles on git push ✅`,
  },
};

export default function App() {
  const [active, setActive] = useState("yaml");

  const panel = DETAIL_PANELS[active];

  const nodes = {
    yaml:       { x: 250, y: 30,  w: 160, h: 50, color: "#a78bfa", label: "data.yaml",    sub: "Source of Truth",      icon: "📁" },
    github_api: { x: 30,  y: 30,  w: 160, h: 50, color: "#34d399", label: "GitHub API",   sub: "Live Contributions",   icon: "🐙" },
    actions:    { x: 185, y: 145, w: 290, h: 50, color: "#38bdf8", label: "GitHub Actions", sub: "Filter • Build • Push", icon: "⚙️" },
    portfolio:  { x: 30,  y: 270, w: 155, h: 50, color: "#fb923c", label: "Portfolio",     sub: "Everything",           icon: "🌐" },
    profile:    { x: 213, y: 270, w: 155, h: 50, color: "#f472b6", label: "GH Profile",    sub: "Filtered",             icon: "👤" },
    resume:     { x: 395, y: 270, w: 155, h: 50, color: "#fbbf24", label: "Overleaf",      sub: "Filtered PDF",         icon: "📄" },
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "#f1f5f9",
      fontFamily: "sans-serif",
      padding: "24px 16px",
    }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>
            Resume · GitHub · Portfolio Sync
          </h1>
          <p style={{ color: "#64748b", fontSize: 13, marginTop: 6 }}>
            Click any node to see implementation details
          </p>
        </div>

        {/* SVG Architecture Diagram */}
        <div style={{
          background: "#1e293b",
          borderRadius: 16,
          padding: "20px 10px",
          marginBottom: 20,
          border: "1px solid #334155",
        }}>
          <svg viewBox="0 0 660 340" width="100%" style={{ display: "block" }}>
            {/* Arrows */}
            {/* GitHub API → Actions */}
            <ARROW x1={190} y1={55} x2={275} y2={145} color="#34d399" label="live stats" />
            {/* YAML → Actions */}
            <ARROW x1={330} y1={80} x2={330} y2={145} color="#a78bfa" label="content" />
            {/* Actions → Portfolio */}
            <ARROW x1={240} y1={195} x2={110} y2={270} color="#fb923c" label="all items" />
            {/* Actions → Profile */}
            <ARROW x1={310} y1={195} x2={292} y2={270} color="#f472b6" label="filtered" />
            {/* Actions → Resume */}
            <ARROW x1={390} y1={195} x2={472} y2={270} color="#fbbf24" label="filtered" />

            {/* Trigger badges */}
            <BADGE x={470} y={40}  text="on: push" color="#38bdf8" />
            <BADGE x={476} y={62}  text="cron: daily" color="#38bdf8" />

            {/* Nodes */}
            {Object.entries(nodes).map(([key, n]) => (
              <NODE key={key}
                x={n.x} y={n.y} w={n.w} h={n.h}
                color={n.color} label={n.label} sub={n.sub} icon={n.icon}
                active={active === key}
                onClick={() => setActive(key)}
              />
            ))}

            {/* Filter labels on outputs */}
            <BADGE x={33}  y={330} text="show_on: all"      color="#fb923c" />
            <BADGE x={215} y={330} text="show_on: github"   color="#f472b6" />
            <BADGE x={397} y={330} text="show_on: resume"   color="#fbbf24" />
          </svg>
        </div>

        {/* Detail Panel */}
        <div style={{
          background: "#1e293b",
          border: `1.5px solid ${panel.color}44`,
          borderLeft: `4px solid ${panel.color}`,
          borderRadius: 14,
          padding: "18px 20px",
          transition: "all 0.2s",
        }}>
          <h2 style={{ margin: "0 0 6px", fontSize: 16, color: panel.color, fontWeight: 700 }}>
            {panel.title}
          </h2>
          <p style={{ margin: "0 0 14px", color: "#94a3b8", fontSize: 13 }}>
            {panel.desc}
          </p>
          <pre style={{
            background: "#0f172a",
            border: "1px solid #334155",
            borderRadius: 10,
            padding: "14px 16px",
            fontSize: 11,
            lineHeight: 1.6,
            color: "#e2e8f0",
            overflowX: "auto",
            margin: 0,
            fontFamily: "monospace",
          }}>
            {panel.code}
          </pre>
        </div>

        {/* Quick nav tabs */}
        <div style={{
          display: "flex",
          gap: 8,
          marginTop: 16,
          flexWrap: "wrap",
        }}>
          {Object.entries(DETAIL_PANELS).map(([key, p]) => (
            <button key={key}
              onClick={() => setActive(key)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                border: `1.5px solid ${p.color}`,
                background: active === key ? p.color : "transparent",
                color: active === key ? "#fff" : p.color,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                transition: "all 0.15s",
              }}>
              {p.title.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>

        {/* Setup steps */}
        <div style={{
          marginTop: 20,
          background: "#1e293b",
          borderRadius: 14,
          border: "1px solid #334155",
          padding: "18px 20px",
        }}>
          <h3 style={{ margin: "0 0 14px", color: "#f1f5f9", fontSize: 14, fontWeight: 700 }}>
            🛠 One-time Setup (5 steps)
          </h3>
          {[
            ["1", "#a78bfa", "Create a central repo", "New private repo: my-profile-data. This is where _data/, templates/, scripts/, and .github/workflows/ live."],
            ["2", "#34d399", "Add GitHub secrets", "PAT_TOKEN (personal access token with repo scope) + GH_TOKEN (for API reads) + OVERLEAF_PROJECT_ID."],
            ["3", "#38bdf8", "Connect Overleaf Git", "Overleaf → Menu → Git → Copy the git.overleaf.com URL. Add it as a remote: git remote add overleaf <url>."],
            ["4", "#fb923c", "Set show_on tags in YAML", "Go through your projects/experience and tag each item. This is your editorial control layer."],
            ["5", "#fbbf24", "Push once to trigger", "Push to _data/ → Actions runs → all three places update automatically from now on."],
          ].map(([n, c, title, desc]) => (
            <div key={n} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <div style={{
                minWidth: 26, height: 26, borderRadius: "50%",
                background: c, color: "#000",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800, flexShrink: 0,
              }}>{n}</div>
              <div>
                <div style={{ color: "#f1f5f9", fontSize: 13, fontWeight: 600 }}>{title}</div>
                <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
