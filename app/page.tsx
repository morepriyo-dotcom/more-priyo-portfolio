import HeroParticles from "./hero-particles";
import ScrollMotion from "./scroll-motion";
import CommandPalette from "./command-palette";

const projects = [
  {
    index: "01",
    name: "JanSetu AI",
    category: "CIVIC TECHNOLOGY · FULL-STACK",
    description:
      "A website that connects people and government by giving citizens a way to raise public issues. I built the full-stack website end to end.",
    marker: "JS",
    tone: "indigo",
    status: "FULL-STACK PROJECT",
    sourceUrl: "https://github.com/morepriyo-dotcom/JanSetu-AI",
    liveUrl: "https://jansetu-gray.vercel.app",
  },
  {
    index: "02",
    name: "SkillBridge",
    category: "EDUCATION · AI · IN PROGRESS",
    description:
      "A platform in progress to connect students with industry. Planned features include student assessments, AI-supported skill-gap analysis, placement-team access, and employer job listings. My contribution is database management.",
    marker: "SB",
    tone: "amber",
    status: "IN PROGRESS",
    sourceUrl: "https://github.com/morepriyo-dotcom",
    liveUrl: "https://skillbridge-sih-rho.vercel.app/",
  },
  {
    index: "03",
    name: "Back2U",
    category: "AI · LOST-AND-FOUND RECOVERY",
    description:
      "An automated lost-and-found recovery platform. It ranks possible matches using text and image embeddings, distance, and recency, with a deterministic fallback. Private ownership clues stay hidden from public search; claim disputes, authorized handovers, and rewards follow a guarded transaction flow. It also generates digital Lost Article Reports with masked IDs.",
    marker: "B2U",
    tone: "indigo",
    status: "PUBLIC REPOSITORY",
    sourceUrl: "https://github.com/morepriyo-dotcom/Back2U",
    liveUrl: "https://back2-u-eta.vercel.app/",
  },
];

const skillGroups = [
  { name: "Programming", tools: ["C", "Java", "Python", "SQL", "PL/SQL", "TypeScript"] },
  { name: "Web development", tools: ["Next.js", "Node.js", "Tailwind CSS"] },
  { name: "Databases", tools: ["PostgreSQL", "MongoDB", "DBMS"] },
];

const activities = [
  { name: "TechHorizon", detail: "Participant · Hosted by Guru Nanak University" },
  { name: "National Data Science Olympiad", detail: "Participant · Pinnacle Excellence Conclave" },
  { name: "CodeBorderland", detail: "Participant · Hosted at CVR College of Engineering" },
];

const certificates = [
  { label: "Data Visualization · Kaggle", href: "https://www.kaggle.com/learn/certification/priyomore/data-visualization" },
  { label: "SQL Basics · HackerRank", href: "https://www.hackerrank.com/certificates/0a83d720ba01" },
];

export default function Home() {
  return (
    <>
      <ScrollMotion />
      <CommandPalette />
      <div className="opening-sequence" aria-hidden="true"><span className="opening-mark">MP</span><span className="opening-track"><i /></span><span className="opening-caption">MORE PRIYO <b>·</b> PORTFOLIO</span></div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="More Priyo, home"><span className="brand-mark">MP</span><span>MORE PRIYO</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#about">About</a><a href="#work">Projects</a><a href="#skills">Skills</a><a href="#journey">Journey</a>
        </nav>
        <a className="header-contact" href="#contact">Contact <span aria-hidden="true">↗</span></a>
        <details className="mobile-menu">
          <summary aria-label="Open navigation menu"><span /><span /></summary>
          <nav aria-label="Mobile navigation"><a href="#about">About</a><a href="#work">Projects</a><a href="#skills">Skills</a><a href="#journey">Journey</a><a href="#contact">Contact</a></nav>
        </details>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-stars" aria-hidden="true" />
          <div className="hero-meta"><span><i className="availability-dot" /> OPEN TO LEARNING &amp; COLLABORATION</span><span>PORTFOLIO · 2026</span></div>
          <div className="hero-center">
            <div className="particle-frame"><HeroParticles /><span className="frame-corner corner-tl" /><span className="frame-corner corner-tr" /><span className="frame-corner corner-bl" /><span className="frame-corner corner-br" /></div>
            <p className="hero-label">DATA SCIENCE <b>×</b> ARTIFICIAL INTELLIGENCE</p>
            <h1 className="hero-title" aria-label="Portfolio">PORTFOLIO</h1>
            <div className="hero-identity"><span>MORE PRIYO</span><span>DATA SCIENCE + AI DEVELOPER</span></div>
            <div className="hero-socials" aria-label="Find me online"><a href="https://www.linkedin.com/in/more-priyo-758b1737a" target="_blank" rel="noreferrer"><span className="social-glyph">in</span> LinkedIn <span aria-hidden="true">↗</span></a><a href="https://github.com/morepriyo-dotcom" target="_blank" rel="noreferrer"><span className="social-glyph github-glyph">⌘</span> GitHub <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="hero-bottom"><a href="#work" className="scroll-cue"><span className="scroll-icon">↓</span><span>SCROLL TO EXPLORE</span></a><span className="hero-location">B.TECH · CSE (DATA SCIENCE)</span></div>
          <span className="hero-side-note">IDEAS INTO IMPACT&nbsp; · &nbsp;001—006</span>
        </section>

        <section className="about section-shell" id="about">
          <div className="section-index"><span>01</span><span>ABOUT ME</span></div>
          <div className="about-grid reveal">
            <h2>Curiosity is where<br />good ideas <em>begin.</em></h2>
            <div className="about-copy"><p>I’m More Priyo, a second-year B.Tech student in CSE (Data Science) at CVR College of Engineering. I enjoy exploring how software and data can help solve problems people face in everyday life.</p><p>Right now, I’m learning by building: from civic technology that connects people with government to tools that help students find their path into industry.</p><a className="inline-link" href="#work">A look at what I’m building <span>↘</span></a></div>
          </div>
        </section>

        <section className="projects-section" id="work">
          <div className="section-shell">
            <div className="section-index"><span>02</span><span>SELECTED WORK</span></div>
            <div className="projects-heading reveal"><h2>Built with purpose.<br /><em>Growing with every project.</em></h2><p>Three projects at different stages, each shaped by ideas I care about.</p></div>
            <div className="project-list">
              {projects.map((project) => (
                <article className={`project-card ${project.tone} reveal reveal-delay-${project.index === "01" ? "1" : "2"}`} key={project.index}>
                  <div className="project-art" aria-hidden="true"><div className="project-grid-lines" /><div className="project-orbit orbit-a" /><div className="project-orbit orbit-b" /><span className="project-monogram">{project.marker}</span><span className="project-coordinate">{project.index} / 03</span><span className="project-art-label">{project.status}</span></div>
                  <div className="project-copy"><div className="project-kicker"><span>{project.index}</span><span>{project.category}</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="project-bottom"><span>PERSONAL PROJECT</span><span className="project-pulse"><i /> {project.status}</span></div><div className="project-links">{"liveUrl" in project && <a href={project.liveUrl} target="_blank" rel="noreferrer">Open live project ↗</a>}<a href={project.sourceUrl} target="_blank" rel="noreferrer">{project.index === "02" ? "Browse my GitHub ↗" : "View source on GitHub ↗"}</a></div></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="skills-section section-shell" id="skills">
          <div className="section-index"><span>03</span><span>THE TOOLKIT</span></div>
          <div className="skills-layout reveal"><div><h2>Tools I use<br />to make <em>things.</em></h2><p className="section-blurb">A growing toolkit across programming, web development, and databases.</p></div><div className="skill-groups">{skillGroups.map((group, groupIndex) => <div className="skill-group" key={group.name}><div className="skill-group-title"><span>0{groupIndex + 1}</span><h3>{group.name}</h3></div><div className="skill-items">{group.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div>)}</div></div>
        </section>

        <section className="journey-section" id="journey">
          <div className="section-shell">
            <div className="section-index"><span>04</span><span>THE JOURNEY SO FAR</span></div>
            <div className="journey-layout reveal">
              <div className="education-block"><span className="small-label">CURRENTLY STUDYING</span><h2>Learning by<br /><em>doing.</em></h2><div className="education-rule" /><h3>B.Tech in CSE (Data Science)</h3><p>Second year · CVR College of Engineering</p></div>
              <div className="journey-details"><div className="detail-heading"><span>01</span><h3>Events &amp; participation</h3></div><div className="activity-list">{activities.map((activity) => <div className="activity-row" key={activity.name}><span>{activity.name}</span><span>{activity.detail}</span></div>)}</div><div className="detail-heading certificates-heading"><span>02</span><h3>Certifications</h3></div><div className="certificate-list">{certificates.map((certificate) => certificate.href ? <a className="certificate" href={certificate.href} key={certificate.label} target="_blank" rel="noreferrer">{certificate.label} <i>↗</i></a> : <span className="certificate" key={certificate.label}>{certificate.label}</span>)}</div></div>
            </div>
          </div>
        </section>

        <section className="resume-section section-shell" id="resume"><div className="section-index"><span>05</span><span>RESUME</span></div><div className="resume-row reveal"><h2>A little more<br /><em>about my work.</em></h2><div><p>Download my one-page résumé for a concise overview of my projects, skills, education, and participation.</p><a className="inline-link" href="/More-Priyo-Resume.pdf" download>Download résumé <span>↓</span></a></div></div></section>

        <section className="contact-section" id="contact">
          <div className="contact-stars" aria-hidden="true" />
          <div className="section-shell contact-inner reveal"><div className="section-index"><span>06</span><span>LET’S CONNECT</span></div><p className="contact-eyebrow">HAVE A QUESTION, IDEA, OR OPPORTUNITY?</p><h2>Let’s make<br /><em>something matter.</em></h2><a className="contact-email" href="mailto:morepriyo@gmail.com">morepriyo@gmail.com <span>↗</span></a><div className="contact-footer"><a className="brand" href="#home"><span className="brand-mark">MP</span><span>MORE PRIYO</span></a><span>DATA SCIENCE + AI DEVELOPER</span><div className="social-links"><a href="https://www.linkedin.com/in/more-priyo-758b1737a" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/morepriyo-dotcom" target="_blank" rel="noreferrer">GitHub ↗</a></div><span>© 2026 MORE PRIYO</span></div></div>
        </section>
      </main>
    </>
  );
}
