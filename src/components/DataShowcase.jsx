import { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FiCopy, FiCheck } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import { dataShowcaseData } from '../data/portfolioData';

function CodeBlock({ code }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const tokenizeLine = (line) => {
        const tokens = [];
        const regex = /(#.*)|(""".*?"""|'''.*?'''|".*?"|'.*?')|\b(import|from|class|def|return|self|super|as)\b|\b(AgentExecutor|ChatOpenAI|Tool|create_react_agent|AgentType)\b|\b(True|False|None)\b|(\d+\.?\d*)|(\S+|\s+)/g;
        let match;
        while ((match = regex.exec(line)) !== null) {
            const [m, comment, str, keyword, builtin, bool, num, other] = match;
            if (comment) tokens.push({ text: comment, color: '#555', italic: true });
            else if (str) tokens.push({ text: str, color: '#E8DAB2' });
            else if (keyword) tokens.push({ text: keyword, color: '#E6501B' });
            else if (builtin) tokens.push({ text: builtin, color: '#C3110C' });
            else if (bool) tokens.push({ text: bool, color: '#F59E0B' });
            else if (num) tokens.push({ text: num, color: '#FF3E3E' });
            else tokens.push({ text: other || m, color: null });
        }
        return tokens;
    };

    const highlightSyntax = (code) => {
        return code.split('\n').map((line, i) => {
            const tokens = tokenizeLine(line);
            return (
                <div key={i} style={{ display: 'flex', minHeight: 20 }}>
                    <span style={{
                        color: 'var(--text-muted)',
                        width: 36,
                        textAlign: 'right',
                        paddingRight: 16,
                        userSelect: 'none',
                        fontSize: '0.8rem',
                        opacity: 0.4,
                    }}>
                        {i + 1}
                    </span>
                    <span>
                        {tokens.map((t, j) => (
                            <span key={j} style={{ color: t.color || 'inherit', fontStyle: t.italic ? 'italic' : 'normal' }}>
                                {t.text}
                            </span>
                        ))}
                    </span>
                </div>
            );
        });
    };

    return (
        <div className="glass-card" style={{ overflow: 'hidden', borderRadius: 'var(--border-radius)' }}>
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', background: 'rgba(0,0,0,0.4)', borderBottom: 'var(--border-glass)',
            }}>
                <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF605C' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD44' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00CA4E' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    agent_core.py
                </span>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopy}
                    style={{
                        background: 'none', border: 'none', color: 'var(--text-muted)',
                        cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4,
                        fontFamily: 'var(--font-mono)',
                    }}
                >
                    {copied ? <><FiCheck color="#C3110C" /> Copied!</> : <><FiCopy /> Copy</>}
                </motion.button>
            </div>
            <pre style={{
                padding: '16px 8px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                lineHeight: 1.6, overflow: 'auto', maxHeight: 400, color: 'var(--text-primary)', margin: 0,
            }}>
                {highlightSyntax(code)}
            </pre>
        </div>
    );
}

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: 'rgba(5, 5, 5, 0.95)',
            border: '1px solid rgba(195,17,12,0.12)',
            borderRadius: 6,
            padding: '10px 14px',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
        }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: 4 }}>Epoch {label}</p>
            {payload.map((p, i) => (
                <p key={i} style={{ color: p.color }}>
                    {p.name}: {(p.value * 100).toFixed(1)}%
                </p>
            ))}
        </div>
    );
};

const barColors = ['#C3110C', '#E6501B', '#740A03', '#FF3E3E', '#F59E0B', '#B8C0CC'];

export default function DataShowcase() {
    return (
        <section id="data-showcase" className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// Data in Action</span>
                        <h2 className="section-title">AI Agent Metrics</h2>
                        <p className="section-subtitle">
                            Real metrics from my AI and ML projects — because engineers should show, not tell
                        </p>
                    </div>
                </ScrollReveal>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="data-grid">
                    <ScrollReveal variant="fadeLeft" delay={0.1}>
                        <div className="glass-card" style={{ padding: 24 }}>
                            <h3 style={{ fontSize: '0.95rem', marginBottom: 4 }}>Agent Training Accuracy</h3>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 20, fontFamily: 'var(--font-mono)' }}>
                                Reward model convergence
                            </p>
                            <ResponsiveContainer width="100%" height={250}>
                                <AreaChart data={dataShowcaseData.accuracyCurve}>
                                    <defs>
                                        <linearGradient id="gradTrain" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#C3110C" stopOpacity={0.25} />
                                            <stop offset="95%" stopColor="#C3110C" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="gradVal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#E6501B" stopOpacity={0.25} />
                                            <stop offset="95%" stopColor="#E6501B" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                    <XAxis dataKey="epoch" stroke="var(--text-muted)" fontSize={11} />
                                    <YAxis stroke="var(--text-muted)" fontSize={11} domain={[0, 1]} tickFormatter={v => `${(v * 100).toFixed(0)}%`} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="train" stroke="#C3110C" fill="url(#gradTrain)" strokeWidth={2} name="Train" />
                                    <Area type="monotone" dataKey="val" stroke="#E6501B" fill="url(#gradVal)" strokeWidth={2} name="Validation" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeRight" delay={0.2}>
                        <div className="glass-card" style={{ padding: 24 }}>
                            <h3 style={{ fontSize: '0.95rem', marginBottom: 4 }}>Agent Performance Factors</h3>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 20, fontFamily: 'var(--font-mono)' }}>
                                Multi-agent benchmark analysis
                            </p>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={dataShowcaseData.featureImportance} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                                    <XAxis type="number" stroke="var(--text-muted)" fontSize={11} domain={[0, 1]} />
                                    <YAxis type="category" dataKey="name" stroke="var(--text-muted)" fontSize={11} width={100} />
                                    <Tooltip
                                        formatter={(v) => `${(v * 100).toFixed(1)}%`}
                                        contentStyle={{
                                            background: 'rgba(5,5,5,0.95)',
                                            border: '1px solid rgba(195,17,12,0.12)',
                                            borderRadius: 6,
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.8rem',
                                        }}
                                    />
                                    <Bar dataKey="value" radius={[0, 3, 3, 0]}>
                                        {dataShowcaseData.featureImportance.map((entry, i) => (
                                            <Cell key={i} fill={barColors[i % barColors.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeUp" delay={0.3} style={{ gridColumn: '1 / -1' }}>
                        <CodeBlock code={dataShowcaseData.codeSnippet} />
                    </ScrollReveal>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .data-grid { grid-template-columns: 1fr !important; }
                    .data-grid > * { grid-column: 1 !important; }
                }
            `}</style>
        </section>
    );
}
