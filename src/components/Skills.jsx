import ScrollReveal from './ScrollReveal';
import EditorialSection from './EditorialSection';
import { skillCategories } from '../data/portfolioData';

/**
 * Skills — solid editorial pixel boxes.
 *
 * Each skill renders as a uniformly sized "pixel" tile sitting inside its
 * category. The tile carries the skill's icon + its name + a one-line tag,
 * sitting on a solid accent-tinted fill with a hairline border and a top
 * accent stripe. On hover the tile lifts and its border deepens to the
 * accent. No physics, no cursor repulsion — the design language is now
 * typographic and editorial across the whole portfolio.
 *
 * Categories sit one under the other with a small horizontal rule and an
 * index number, so the four skill groups read as their own sub-sections.
 */
const CATEGORY_ACCENTS = {
    'AI & Multi-Agent Engineering': 'violet',
    'Machine Learning & NLP': 'cyan',
    'Backend, Cloud & MLOps': 'amber',
    'Data Science & Development Tools': 'emerald',
};

export default function Skills() {
    return (
        <EditorialSection
            id="skills"
            ghost="SKILLS"
            eyebrowIndex="03"
            eyebrowLabel="SKILLS"
        >
            <div className="container skills-container">
                <ScrollReveal>
                    <div className="section-header">
                        <span className="section-label">// The Stack</span>
                        <h2 className="section-title">Capabilities & Tools</h2>
                        <p className="section-subtitle">
                            Four groups, one solid grid. Each tile is a tool I actually ship with; the stripe marks its discipline.
                        </p>
                    </div>
                </ScrollReveal>

                {skillCategories.map((cat, ci) => {
                    const accent = CATEGORY_ACCENTS[cat.name] || 'violet';
                    return (
                        <ScrollReveal key={cat.name} delay={ci * 0.06}>
                            <article className="skills-group">
                                <header className="skills-group-head">
                                    <span className="skills-group-index">
                                        {String(ci + 1).padStart(2, '0')}
                                    </span>
                                    <div className="skills-group-titles">
                                        <h3 className="skills-group-name">{cat.name}</h3>
                                        <p className="skills-group-sub">{cat.subtitle}</p>
                                    </div>
                                </header>

                                <div className={`skills-grid accent-${accent}`}>
                                    {cat.skills.map((s) => (
                                        <SkillTile key={s.name} skill={s} accent={accent} />
                                    ))}
                                </div>
                            </article>
                        </ScrollReveal>
                    );
                })}
            </div>
        </EditorialSection>
    );
}

/* ── A single pixel box ── */
function SkillTile({ skill, accent }) {
    const Icon = skill.icon;
    return (
        <div className={`skill-box accent-${accent}`}>
            <span className="skill-box-stripe" aria-hidden="true" />
            <div className="skill-box-icon">
                {Icon ? <Icon /> : <span className="skill-box-glyph">●</span>}
            </div>
            <div className="skill-box-text">
                <div className="skill-box-name">{skill.name}</div>
                <div className="skill-box-tag">{skill.tag}</div>
            </div>
        </div>
    );
}
