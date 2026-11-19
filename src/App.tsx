import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: "01",
    label: "Product engineering",
    title: "Atlas / AI workspace",
    description:
      "A collaborative research platform that turns scattered source material into traceable, decision-ready knowledge.",
    impact: ["42% faster synthesis", "12k weekly sessions", "SOC 2 ready"],
    stack: ["React", "TypeScript", "Python", "Postgres"],
    accent: "#ff5c35",
    className: "atlas",
  },
  {
    id: "02",
    label: "Realtime systems",
    title: "Relay / Live operations",
    description:
      "A command center for distributed teams, designed to make complex system health legible in a single glance.",
    impact: ["<80ms event latency", "99.99% uptime", "3.4m daily events"],
    stack: ["Next.js", "Go", "WebSockets", "ClickHouse"],
    accent: "#ff5c35",
    className: "relay",
  },
  {
    id: "03",
    label: "Creative technology",
    title: "Form / Generative identity",
    description:
      "A programmable identity engine that gives a global creative network one voice without making every story look the same.",
    impact: ["18 markets", "65% less production", "AA accessible"],
    stack: ["WebGL", "GLSL", "Node.js", "Figma API"],
    accent: "#ff5c35",
    className: "form",
  },
];

const capabilities = [
  [
    "01",
    "Engineering",
    "Product architecture, frontend systems, APIs, data platforms and the practical infrastructure that keeps it all moving.",
  ],
  [
    "02",
    "Experience",
    "Interaction design, prototyping and design systems that make difficult products feel obvious and humane.",
  ],
  [
    "03",
    "Motion",
    "Narrative scroll, realtime graphics and purposeful animation that creates clarity—not decoration.",
  ],
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true">
      <i />
      <i />
    </span>
  );
}

function Visual({ project }: { project: (typeof projects)[number] }) {
  if (project.className === "atlas") {
    return (
      <div
        className="project-visual atlas-visual"
        style={{ "--accent": project.accent } as React.CSSProperties}
      >
        <span className="visual-caption">Knowledge graph / 2024</span>
        <div className="orbit orbit-a" />
        <div className="orbit orbit-b" />
        <div className="atlas-core">
          <span>AT</span>
        </div>
        {["Strategy", "Market", "Signals", "Context"].map((item, index) => (
          <span className={`data-node node-${index + 1}`} key={item}>
            {item}
          </span>
        ))}
      </div>
    );
  }

  if (project.className === "relay") {
    return (
      <div
        className="project-visual relay-visual"
        style={{ "--accent": project.accent } as React.CSSProperties}
      >
        <span className="visual-caption">Live network / 09:42:18</span>
        <div className="relay-grid" />
        <div className="signal signal-a" />
        <div className="signal signal-b" />
        <div className="relay-panel">
          <span>System health</span>
          <strong>99.99</strong>
          <small>All regions operational</small>
        </div>
        <div className="ticker">LHR → JFK &nbsp; +18ms &nbsp; FRA → SIN &nbsp; +24ms</div>
      </div>
    );
  }

  return (
    <div
      className="project-visual form-visual"
      style={{ "--accent": project.accent } as React.CSSProperties}
    >
      <span className="visual-caption">Identity seed / 00384</span>
      <div className="form-shape shape-one" />
      <div className="form-shape shape-two" />
      <div className="form-shape shape-three" />
      <div className="form-word">FORM</div>
      <span className="form-code">G–84 / V–12</span>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const [copied, setCopied] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const scroll = window.scrollY;
        document.documentElement.style.setProperty("--scroll-y", `${scroll}px`);
        if (progressRef.current)
          progressRef.current.style.transform = `scaleX(${max ? scroll / max : 0})`;

        const sections = ["intro", "work", "about", "contact"];
        let current = sections[0];
        sections.forEach((id) => {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top < window.innerHeight * 0.55) current = id;
        });
        setActiveSection(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("ahmadfaiqdefamus@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className="noise" aria-hidden="true" />
      <div className="scroll-progress" ref={progressRef} />

      <header className="topbar">
        <a className="brand" href="#intro" onClick={closeMenu} aria-label=", home">
          <span className="brand-mark">AF</span>
          <span className="brand-status">
            <i /> Independent
            <br />
            Fullstack Engineer
          </span>
        </a>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Primary navigation">
          {["Work", "About", "Contact"].map((item) => (
            <a href={`#${item.toLowerCase()}`} onClick={closeMenu} key={item}>
              {item}
              <span>0{item === "Work" ? "1" : item === "About" ? "2" : "3"}</span>
            </a>
          ))}
        </nav>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "Close" : "Menu"} <MenuIcon open={menuOpen} />
        </button>
        <a className="availability" href="#contact">
          <i /> Available Q2 2026
        </a>
      </header>

      <aside className="section-index" aria-label="Current section">
        <span>Index</span>
        {["intro", "work", "about", "contact"].map((section, index) => (
          <a
            key={section}
            href={`#${section}`}
            className={activeSection === section ? "active" : ""}
          >
            0{index + 1}
          </a>
        ))}
      </aside>

      <main>
        <section className="hero" id="intro">
          <div className="hero-kicker reveal-in">
            <span>Based in Sepecial Region of Yogyakarta</span>
            <span>Working worldwide</span>
          </div>
          <h1 aria-label="I build digital things with pulse">
            <span className="line line-one">
              I BUILD <em>DIGITAL</em>
            </span>
            <span className="line line-two">
              THINGS WITH <b>PULSE.</b>
            </span>
          </h1>
          <div className="hero-copy">
            <p>
              Fullstack engineer, product designer and motion-minded maker helping ambitious teams
              turn complicated ideas into beautifully simple software.
            </p>
            <a href="#work">
              Explore selected work{" "}
              <span>
                <ArrowIcon />
              </span>
            </a>
          </div>
          <div className="hero-stage" aria-hidden="true">
            <div className="stage-ring ring-one" />
            <div className="stage-ring ring-two" />
            <div className="stage-object">
              <span>BUILD</span>
              <span>MOVE</span>
              <span>SHIP</span>
            </div>
            <span className="stage-coordinate coordinate-a">12.9716° N</span>
            <span className="stage-coordinate coordinate-b">77.5946° E</span>
          </div>
          <div className="scroll-cue">
            <span /> Scroll to explore
          </div>
        </section>

        <section className="manifesto">
          <div className="manifesto-sticky">
            <span className="eyebrow">01 / Philosophy</span>
            <p>
              Code is a material.
              <br />
              Design is a behavior.
              <br />
              <em>Motion is meaning.</em>
            </p>
          </div>
          <div className="manifesto-notes">
            <p>
              I work across the whole product stack because the strongest ideas rarely respect
              discipline boundaries.
            </p>
            <p>
              From system architecture to the final easing curve, every decision is part of the same
              experience.
            </p>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-heading">
            <span className="eyebrow">02 / Selected work</span>
            <h2>
              Built to work.
              <br />
              <em>Designed to matter.</em>
            </h2>
            <p>Three projects where technology, utility and expression became one system.</p>
          </div>

          <div className="projects">
            {projects.map((project) => (
              <article className="project" key={project.id}>
                <div className="project-meta">
                  <span>{project.id}</span>
                  <span>{project.label}</span>
                  <span>2024</span>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul>
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <Visual project={project} />
                <div className="impact-row">
                  {project.impact.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                  <button type="button" aria-label={`View ${project.title} case study`}>
                    Case study <ArrowIcon />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-intro">
            <span className="eyebrow">03 / What I do</span>
            <h2>
              One person.
              <br />
              Three perspectives.
            </h2>
            <p>
              I partner with founders and product teams from zero-to-one explorations through
              shipped, scalable products.
            </p>
          </div>
          <div className="capability-list">
            {capabilities.map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <i>
                  <ArrowIcon />
                </i>
              </article>
            ))}
          </div>
          <div className="toolbelt">
            <span>Currently working with</span>
            <div>
              React <i>•</i> TypeScript <i>•</i> Node <i>•</i> Go <i>•</i> WebGL <i>•</i> Postgres{" "}
              <i>•</i> Figma
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <span className="eyebrow">04 / Start a conversation</span>
          <div className="contact-orb" aria-hidden="true">
            <span>HELLO</span>
          </div>
          <h2>
            Have something
            <br />
            interesting in mind?
          </h2>
          <div className="contact-actions">
            <button type="button" onClick={copyEmail}>
              {copied ? "Email copied" : "ahmadfaiqdefamus@gmail.com"} <ArrowIcon />
            </button>
            <p>Open to selected freelance, consulting and creative technology collaborations.</p>
          </div>
          <footer>
            <span>© 2026 Ahmad Faiq </span>
            <div>
              <a href="#linkedin">LinkedIn</a>
              <a href="https://github.com/ahmadfaiqm">GitHub</a>
              <a href="https://t.me/ahmadfaiq">Telegram</a>
            </div>
            <a href="#intro">Back to top ↑</a>
          </footer>
        </section>
      </main>
    </div>
  );
}
