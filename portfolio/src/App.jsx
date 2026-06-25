import { useState, useEffect, useRef } from "react";
import {
  Mail, Phone, MapPin, ExternalLink,
  ChevronDown, Menu, X, Download, ArrowRight
} from "lucide-react";
import "./App.css";

/* ── Icon Components ── */
const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/* ── Particle Background ── */
function ParticleBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H, particles;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    const rand = (a, b) => Math.random() * (b - a) + a;
    const init = () => {
      resize();
      particles = Array.from({ length: Math.floor((W * H) / 11000) }, () => ({
        x: rand(0, W), y: rand(0, H),
        vx: rand(-0.25, 0.25), vy: rand(-0.25, 0.25),
        r: rand(1, 2.2), alpha: rand(0.2, 0.6),
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,102,241,${0.13 * (1 - d / 120)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.alpha})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    init(); draw();
    window.addEventListener("resize", init);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", init); };
  }, []);
  return <canvas ref={canvasRef} className="particle-canvas" />;
}

/* ── Data ── */
const ROLES = ["Full Stack Developer", "React.js Engineer", "AI App Builder", "Node.js Dev"];
const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Certificates", "Contact"];

const SKILLS = [
  { icon: "💻", label: "Web & Frameworks", items: ["React.js","Node.js","Express.js","Next.js","Tailwind CSS","Bootstrap","HTML","CSS","JavaScript"] },
  { icon: "⌨️", label: "Languages",        items: ["Java","C++","C","Python","SQL"] },
  { icon: "🤖", label: "Generative AI",    items: ["GitHub Copilot","Prompt Engineering","Google Gemini API","NLP","AI-Assisted Dev"] },
  { icon: "🛡️", label: "Cybersecurity",    items: ["Network Security","Risk Management","SIEM Tools","IDS","Linux"] },
  { icon: "☁️", label: "Cloud & CRM",      items: ["AWS Cloud","Salesforce","Sales Cloud","Service Cloud","Lightning App Builder"] },
  { icon: "📊", label: "Data & Core CS",   items: ["Power BI","MySQL","DSA","OOP","DBMS","OS","Agile","Git","GitHub"] },
];

const EXPERIENCE = [
  {
    company: "Wells Fargo",
    role: "Technology Program Analyst",
    period: "Aug 2026 – Present",
    location: "India",
    current: true,
    points: [
      "Joining as a full-time Technology Program Analyst within Wells Fargo's technology division.",
      "Will work on enterprise-scale software solutions as part of the Technology Analyst Program.",
      "Focused on full-stack development and enterprise technology initiatives.",
    ],
    stack: [],
  },
  {
    company: "PwC India",
    role: "Salesforce Trainee",
    period: "Aug 2025 – Sep 2025",
    location: "India",
    points: [
      "Competitively selected as 1 of 100 from 6,000+ applicants nationwide — a 1.6% acceptance rate.",
      "Gained hands-on Salesforce CRM experience across Sales Cloud, Service Cloud, and Lightning App Builder — configuring workflows, process automations, and data management pipelines.",
      "Built custom Salesforce apps using Lightning App Builder and designed data models for CRM workflows.",
    ],
    stack: ["Salesforce","Sales Cloud","Service Cloud","Lightning App Builder","Process Automation"],
  },
  {
    company: "Expound Technivo",
    role: "Web Development Intern",
    period: "Jun 2025 – Jul 2025",
    location: "Mumbai",
    points: [
      "Delivered 3 full-stack web modules in 8 weeks using React.js and Express.js with no rework cycles post-review.",
      "Built a reusable Tailwind CSS component library (12+ components) that reduced estimated future dev time for new pages by ~30%.",
      "Owned the full request lifecycle for two key features — from database query design through Express middleware to React state management.",
    ],
    stack: ["React.js","Tailwind CSS","Node.js","Express.js","REST APIs","Git"],
  },
  {
    company: "Anvitech Solutions LLP",
    role: "Frontend Development Intern",
    period: "Jun 2024 – Jul 2024",
    location: "Mumbai",
    points: [
      "Designed and shipped 9 responsive web pages from scratch — each delivered in under 2 revision cycles.",
      "Resolved 15+ cross-browser UI inconsistencies across Chrome, Firefox, and Safari before the product's public launch.",
      "Integrated frontend components with backend APIs, translating mockups into functional UI.",
    ],
    stack: ["HTML","CSS","JavaScript","Bootstrap","Git"],
  },
];
const PROJECTS = [
  {
    title: "Resume Optimizer AI", 
    emoji: "📄", 
    color: "#6366F1",
    tagline: "GenAI Resume Analysis Engine",
    description: "Full-stack application powered by Google Gemini API to analyze, score, and optimize resumes against job descriptions.",
    details: [
      "Generates precise ATS-style compatibility scores from 0-100%.",
      "Performs real-time extraction of missing keywords and skills.",
      "Provides actionable sentence-level improvement suggestions."
    ],
    stack: ["React.js", "Node.js", "Express.js", "Tailwind CSS", "Gemini API"],
    githubLink: "https://github.com/tanisha222/RESUME-OPTIMIZER-AI",
    badge: "Most Popular"
  },
  {
    title: "NextNews – AI News Platform", 
    emoji: "📰", 
    color: "#8B5CF6",
    tagline: "Multilingual Audio/Visual Portal",
    description: "Automated news platform aggregating RSS feeds, translating content globally, and converting text-to-speech for accessibility.",
    details: [
      "Automates content aggregation and categorization using NLP.",
      "Translates news into 6+ major languages on the fly.",
      "Implements text-to-speech rendering for hands-free audio listening."
    ],
    stack: ["React.js", "Next.js", "Python", "NLP", "REST APIs"],
    githubLink: "https://github.com/tanisha222/NextNews--AI-News-Platform",
    badge: "Accessibility Focused"
  },
  {
    title: "AI Powered Lie Detector", 
    emoji: "🎭", 
    color: "#A78BFA",
    tagline: "Multimodal Video Deception Analyzer",
    description: "Advanced deception detection system combining facial expression mapping and vocal pitch analysis.",
    details: [
      "Extracts frame-by-frame emotion coefficients using OpenCV.",
      "Analyzes vocal tremors and speech transcripts via Python audio tools.",
      "Fuses visual + audio signals in Gemini 1.5 Pro to calculate truth probability."
    ],
    stack: ["Python", "OpenCV", "MoviePy", "Gemini API", "Speech Recognition"],
    githubLink: "https://github.com/tanisha222/AI-Powered-Lie-Detector",
    badge: "GenAI Innovation"
  },
  {
    title: "Travel Planner App", 
    emoji: "✈️", 
    color: "#7C3AED",
    tagline: "Intelligent Custom Itinerary Planner",
    description: "AI assistant that creates personalized day-by-day itineraries mapped to live destination weather patterns.",
    details: [
      "Leverages Gemini 1.5 Flash for high-speed multi-day schedule creation.",
      "Integrates real-time weather alerts via OpenWeatherMap API.",
      "Provides responsive maps and travel budgeting templates."
    ],
    stack: ["React (Vite)", "Node.js", "Express.js", "Tailwind CSS", "OpenWeatherMap API"],
    githubLink: "https://github.com/tanisha222/TRAVEL-PLANNER-APP",
    badge: "Featured App"
  }
];


const CERTS = [
  { name: "Google Cybersecurity Professional Certificate", org: "Google · Coursera",          date: "Apr 2026", link: "https://coursera.org/verify/professional-cert/2ZFR4P5V1VU9",    badge: "🛡️" },
  { name: "Generative AI for Software Developers",        org: "Microsoft · Coursera",       date: "Mar 2026", link: "https://coursera.org/verify/specialization/WR2PAQSO0HJJ",       badge: "🤖" },
  { name: "SAP S/4HANA: ABAP to Cloud-Ready Applications",org: "Board Infinity · Coursera",  date: "May 2026", link: "https://coursera.org/verify/specialization/PE9CNG3ZAHZX",       badge: "🏢" },
  { name: "Introduction to DevOps",                       org: "IBM · Coursera",             date: "Jun 2026", link: "https://coursera.org/verify/FYFBP5IMZVF3",                      badge: "⚙️" },
  { name: "Databases and SQL for Data Science with Python",org: "IBM · Coursera",            date: "Jun 2026", link: "https://coursera.org/verify/OH27DGA806Q7",                      badge: "🗄️" },
  { name: "Version Control",                              org: "Meta · Coursera",             date: "Jun 2026", link: "https://coursera.org/verify/UU7FDHS27JCU",                      badge: "🔀" },
  { name: "AWS Certified Cloud Practitioner CLF-C02",     org: "Udemy",                      date: "Aug 2025", link: "https://ude.my/UC-4bc65a90-68e2-437a-8624-45d2e638facc",        badge: "☁️" },
];

/* ── Typer ── */
function TerminalTyper({ roles }) {
  const [displayed, setDisplayed] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = roles[roleIdx];
    let t;
    if (!deleting) {
      if (charIdx < current.length) t = setTimeout(() => setCharIdx(c => c + 1), 65);
      else t = setTimeout(() => setDeleting(true), 2200);
    } else {
      if (charIdx > 0) t = setTimeout(() => setCharIdx(c => c - 1), 38);
      else { setDeleting(false); setRoleIdx(i => (i + 1) % roles.length); }
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(t);
  }, [charIdx, deleting, roleIdx, roles]);
  return (
    <span className="typer">
      <span className="typer-prefix">&gt;&nbsp;</span>
      <span className="typer-text">{displayed}</span>
      <span className="typer-cursor">|</span>
    </span>
  );
}

/* ── NavBar ── */
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="navbar__brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        TC<span className="brand-dot">.</span>
      </div>
      <ul className="navbar__links">
        {NAV_LINKS.map(l => <li key={l}><button onClick={() => scrollTo(l)}>{l}</button></li>)}
      </ul>
      <a href="/Tanisha_Chauhan_CV.pdf" download className="btn btn--outline navbar__cta">
        <Download size={14}/> Resume
      </a>
      <button className="navbar__burger" onClick={() => setOpen(o => !o)}>
        {open ? <X size={22}/> : <Menu size={22}/>}
      </button>
      {open && (
        <div className="mobile-menu">
          {NAV_LINKS.map(l => <button key={l} onClick={() => scrollTo(l)}>{l}</button>)}
          <a href="/Tanisha_Chauhan_CV.pdf" download className="btn btn--outline"><Download size={14}/> Download Resume</a>
        </div>
      )}
    </nav>
  );
}

/* ── Fading Video Background ── */
function FadingVideo({ src, className = "" }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.load();
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      muted
      playsInline
      autoPlay
      loop
      preload="auto"
    />
  );
}

/* ── Hero ── */
function Hero({ easterEggRainbow, atmosphere }) {
  return (
    <section className="hero" id="hero">
      <div className="hero__video-bg">
        <FadingVideo 
          src={atmosphere === "dandelion"
            ? "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260521_014404_fadafdb1-4df6-4699-be9c-77d25f39a3d0.mp4"
            : "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
          } 
          className="hero__video" 
        />
        <div className="hero__vignette" />
        <div className="hero__bottom-fade" />
        <img 
          src="https://miptxtnhvjrkpmnjgdhk.supabase.co/storage/v1/object/public/training-assets/landing%2Fhero-bottom-bg.png" 
          alt="" 
          className="hero__grass" 
        />
      </div>
      <div className="hero__content">
        <div className="hero__wf-badge">
          <span className="wf-badge__dot"/>
          <span className="wf-badge__text">
            Technology Program Analyst @ <span className="wf-badge__company">Wells Fargo</span>
          </span>
        </div>
        <h1 className={`hero__name${easterEggRainbow ? " rainbow-text" : ""}`}>Tanisha<br/>Chauhan</h1>
        <div className="hero__terminal"><TerminalTyper roles={ROLES}/></div>
        <p className="hero__bio">
          Full Stack Developer skilled in React.js, Node.js &amp; AI APIs.<br/>
          B.Tech CSE, VIT Vellore &nbsp;·&nbsp; Mumbai, India
        </p>
        <div className="hero__actions">
          <a href="/Tanisha_Chauhan_CV.pdf" download className="btn btn--primary">
            <Download size={16}/> Download Resume
          </a>
          <button className="btn btn--ghost" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            View My Work <ArrowRight size={15}/>
          </button>
        </div>
        <div className="hero__socials">
          <a href="https://github.com/tanisha222" target="_blank" rel="noopener noreferrer" className="hero__social-btn" aria-label="GitHub">
            <GithubIcon size={19}/>
          </a>
          <a href="https://linkedin.com/in/tanishachauhan02" target="_blank" rel="noopener noreferrer" className="hero__social-btn" aria-label="LinkedIn">
            <LinkedinIcon size={19}/>
          </a>
          <a href="mailto:ctanisha222@gmail.com" className="hero__social-btn" aria-label="Email">
            <Mail size={19}/>
          </a>
        </div>
      </div>
      <button className="hero__scroll" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
        <ChevronDown size={22}/>
      </button>
    </section>
  );
}

/* ── About ── */
function About({ easterEggSpin }) {
  const stats = [
    { value: "8.46", label: "CGPA at VIT",   icon: "🎓" },
    { value: "3+",   label: "Internships",    icon: "💼" },
    { value: "4+",   label: "AI Projects",    icon: "🤖" },
    { value: "7",    label: "Certifications", icon: "📜" },
  ];
  return (
    <section className="section about reveal-on-scroll" id="about">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">01 — About</span>
          <h2 className="section__title">Who Am I</h2>
        </div>
        <div className="about__grid">

          {/* Photo column */}
          <div className="about__photo-col">
            <div className="about__photo-wrap">
              <div className="about__photo-ring"/>
              <div className="about__photo-ring about__photo-ring--2"/>
              <img
                src="/tanisha.jpg"
                alt="Tanisha Chauhan"
                className={`about__photo${easterEggSpin ? " photo-spin" : ""}`}
              />
              <div className="about__photo-badge">
                <span>🏦</span>
                <span>Wells Fargo</span>
              </div>
            </div>
          </div>

          {/* Text + stats column */}
          <div className="about__right">
            <div className="about__text">
              <p>Hi, I'm Tanisha Chauhan. A Full Stack Developer passionate about building intelligent digital experiences. I specialize in creating scalable web applications using React, Node.js, and modern cloud technologies while integrating AI to solve real-world problems.</p>
              <p>From AI-powered resume optimization and lie detection systems to intelligent news and travel platforms, I enjoy transforming ideas into impactful products. Currently joining <strong>Wells Fargo as a Technology Program Analyst</strong>, I combine strong engineering fundamentals with a passion for innovation, problem-solving, and continuous learning. 🚀</p>
              <div className="about__tags">
                <span>📍 Mumbai, India</span>
                <span>🎓 VIT Vellore · B.Tech CSE</span>
                <span>🏦 Wells Fargo</span>
              </div>
            </div>
            <div className="about__stats">
              {stats.map(s => (
                <div className="stat-card" key={s.label}>
                  <div className="stat-card__icon">{s.icon}</div>
                  <div className="stat-card__value">{s.value}</div>
                  <div className="stat-card__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Skills ── */
function Skills() {
  return (
    <section className="section skills reveal-on-scroll" id="skills">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">02 — Skills</span>
          <h2 className="section__title">What I Work With</h2>
        </div>
        <div className="skills__grid">
          {SKILLS.map(s => (
            <div className="skill-card" key={s.label}>
              <div className="skill-card__header">
                <span className="skill-card__icon">{s.icon}</span>
                <h3 className="skill-card__label">{s.label}</h3>
              </div>
              <div className="skill-card__pills">
                {s.items.map(item => <span className="pill" key={item}>{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Experience ── */
function Experience() {
  return (
    <section className="section experience reveal-on-scroll" id="experience">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">03 — Experience</span>
          <h2 className="section__title">Where I've Worked</h2>
        </div>
        <div className="timeline">
          {EXPERIENCE.map((exp, i) => (
            <div className="timeline__item" key={i}>
              <div className="timeline__marker">
                {exp.current && <div className="timeline__pulse"/>}
              </div>
              <div className={`timeline__card${exp.current ? " timeline__card--current" : ""}`}>
                <div className="timeline__header">
                  <div className="timeline__meta">
                    <div className="timeline__top-row">
                      <span className="timeline__company">{exp.company}</span>
                    </div>
                    <div className="timeline__role">{exp.role}</div>
                    <div className="timeline__loc"><MapPin size={11}/> {exp.location}</div>
                  </div>
                  <span className="timeline__period">{exp.period}</span>
                </div>
                <ul className="timeline__points">
                  {exp.points.map((p, j) => (
                    <li key={j}><span className="tl-bullet">▹</span>{p}</li>
                  ))}
                </ul>
                {exp.stack.length > 0 && (
                  <div className="timeline__stack">
                    {exp.stack.map(t => <span className="pill pill--sm" key={t}>{t}</span>)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="edu">
          <div className="section__header" style={{ marginBottom: "1.75rem" }}>
            <span className="section__tag">Education</span>
            <h3 className="edu__heading">Academic Background</h3>
          </div>
          <div className="edu__cards">
            {[
              { school: "Vellore Institute of Technology, Vellore", degree: "B.Tech Computer Science", detail: "CGPA 8.46", year: "2022–2026", icon: "🎓" },
              { school: "Pace Junior Science College, Mumbai", degree: "Intermediate (PCM)", detail: "82%", year: "2020–2022", icon: "📘" },
              { school: "RBK School, Mumbai", degree: "High School", detail: "95.4%", year: "2019–2020", icon: "🏫" },
            ].map(e => (
              <div className="edu__card" key={e.school}>
                <div className="edu__icon">{e.icon}</div>
                <div className="edu__year">{e.year}</div>
                <div className="edu__school">{e.school}</div>
                <div className="edu__degree">{e.degree}</div>
                <div className="edu__detail">{e.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Projects ── */
function Projects() {
  return (
    <section className="section projects reveal-on-scroll" id="projects">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">04 — Projects</span>
          <h2 className="section__title">Things I've Built</h2>
        </div>
        <div className="projects__grid">
          {PROJECTS.map(p => (
            <div className="project-card" key={p.title} style={{ "--accent": p.color }}>
              <div className="project-card__glow" />
              
              <div className="project-card__top">
                <span className="project-card__emoji">{p.emoji}</span>
                {p.badge && <span className="project-card__badge">{p.badge}</span>}
              </div>

              <h3 className="project-card__title">{p.title}</h3>
              <p className="project-card__tagline">{p.tagline}</p>
              <p className="project-card__desc">{p.description}</p>

              <div className="project-card__features">
                <span className="features-title">KEY IMPACTS &amp; FEATURES:</span>
                <ul>
                  {p.details.map((detail, idx) => (
                    <li key={idx}>
                      <span className="feature-bullet">▹</span>
                      <span className="feature-text">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="project-card__stack">
                {p.stack.map(t => <span className="pill pill--sm" key={t}>{t}</span>)}
              </div>

              <div className="project-card__actions">
                {p.githubLink && (
                  <a href={p.githubLink} className="project-card__action-btn project-card__action-btn--primary" target="_blank" rel="noopener noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Certificates ── */
function Certificates() {
  return (
    <section className="section certificates reveal-on-scroll" id="certificates">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">05 — Credentials</span>
          <h2 className="section__title">Certifications</h2>
        </div>
        <div className="certs__grid">
          {CERTS.map(c => (
            <a className="cert-item" key={c.name} href={c.link} target="_blank" rel="noopener noreferrer">
              <span className="cert-item__badge">{c.badge}</span>
              <div className="cert-item__body">
                <div className="cert-item__name">{c.name}</div>
                <div className="cert-item__org">{c.org} · {c.date}</div>
              </div>
              <ExternalLink size={11} className="cert-item__ext"/>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ── Contact ── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:ctanisha222@gmail.com?subject=${encodeURIComponent(form.subject || "Collaboration Inquiry")}&body=${encodeURIComponent(
      `Hi Tanisha,\n\n${form.message}\n\nBest regards,\n${form.name}\n${form.email}`
    )}`;
    window.location.href = mailto;
  };
  return (
    <section className="section contact reveal-on-scroll" id="contact">
      <div className="contact__video-bg">
        <FadingVideo 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260521_014404_fadafdb1-4df6-4699-be9c-77d25f39a3d0.mp4" 
          className="contact__video" 
        />
        <div className="contact__vignette" />
        <div className="contact__bottom-fade" />
        <img 
          src="https://miptxtnhvjrkpmnjgdhk.supabase.co/storage/v1/object/public/training-assets/landing%2Fhero-bottom-bg.png" 
          alt="" 
          className="contact__grass" 
        />
      </div>
      <div className="container">
        <div className="section__header">
          <span className="section__tag">06 — Contact</span>
          <h2 className="section__title">Let's Connect</h2>
        </div>
        <div className="contact__grid">
          
          {/* Left column */}
          <div className="contact__info-col">
            <h3 className="contact__heading">
              Let's build something <span className="italic-text">great</span> together.
            </h3>
            <p className="contact__desc">
              Currently a Technology Program Analyst at Wells Fargo, I'm always open to discussing exciting full-stack, GenAI, or enterprise software challenges. Let's connect and explore opportunities to collaborate.
            </p>
            <div className="contact__links-stack">
              <a href="mailto:ctanisha222@gmail.com" className="contact__pill-btn">
                <div className="pill-btn__icon"><Mail size={18}/></div>
                <div className="pill-btn__text">
                  <span className="pill-btn__label">EMAIL</span>
                  <span className="pill-btn__val">ctanisha222@gmail.com</span>
                </div>
              </a>
              <a href="https://linkedin.com/in/tanishachauhan02" target="_blank" rel="noopener noreferrer" className="contact__pill-btn">
                <div className="pill-btn__icon"><LinkedinIcon size={18}/></div>
                <div className="pill-btn__text">
                  <span className="pill-btn__label">LINKEDIN</span>
                  <span className="pill-btn__val">linkedin.com/in/tanishachauhan02</span>
                </div>
              </a>
              <a href="https://github.com/tanisha222" target="_blank" rel="noopener noreferrer" className="contact__pill-btn">
                <div className="pill-btn__icon"><GithubIcon size={18}/></div>
                <div className="pill-btn__text">
                  <span className="pill-btn__label">GITHUB</span>
                  <span className="pill-btn__val">github.com/tanisha222</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right column (Form) */}
          <form className="contact__form-card" onSubmit={handleSubmit}>
            <div className="form__row">
              <div className="form__group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="form__group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form__group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                required
                placeholder="What's this about?"
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
              />
            </div>
            <div className="form__group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="Tell me about your project or opportunity..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
              />
            </div>
            
            <button type="submit" className="btn btn--primary form__submit-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              Send Message
            </button>
            <span className="form__hint">Opens your default email client with the message pre-filled.</span>
          </form>

        </div>
      </div>
    </section>
  );
}

/* ── App ── */
/* ── Matrix Code Rain ── */
function MatrixRain({ active }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$@#%&";
    const fontSize = 16;
    const columns = W / fontSize;
    const rainDrops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(5, 3, 8, 0.05)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        if (rainDrops[i] * fontSize > H && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
              }
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="matrix-canvas" />;
}

/* ── Cosmic Command Center ── */
function CosmicCommandCenter({
  accent,
  setAccent,
  particles,
  setParticles,
  matrix,
  setMatrix,
  spin,
  setSpin,
  rainbow,
  setRainbow
}) {
  const [open, setOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);
  const audioCtxRef = useRef(null);
  const synthNodeRef = useRef(null);

  const stopAmbientSound = () => {
    if (synthNodeRef.current) {
      synthNodeRef.current.stop();
      synthNodeRef.current = null;
    }
  };

  const startAmbientSound = () => {
    if (synthNodeRef.current) return true;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      
      // If browser blocked autoplay and suspended the audio context on load,
      // close it immediately so we can clean-start it on first interaction.
      if (ctx.state === "suspended") {
        ctx.close();
        return false;
      }
      
      audioCtxRef.current = ctx;

      // Master output gain
      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.setValueAtTime(0.0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.5); // Ultra-smooth fade in

      // Delay Line 1 (Lush Echo delay with damping filter)
      const delayNode = ctx.createDelay(1.0);
      const delayFeedback = ctx.createGain();
      const delayFilter = ctx.createBiquadFilter();

      delayNode.delayTime.setValueAtTime(0.4, ctx.currentTime); // 400ms delay time
      delayFeedback.gain.setValueAtTime(0.40, ctx.currentTime); // 40% feedback
      delayFilter.type = "lowpass";
      delayFilter.frequency.setValueAtTime(1000, ctx.currentTime); // Damped highs

      // Loop: Delay -> Filter -> Feedback -> Delay
      delayNode.connect(delayFilter);
      delayFilter.connect(delayFeedback);
      delayFeedback.connect(delayNode);
      delayNode.connect(masterGain);

      // Delay Line 2 (Slow space echo for wider stereo field simulation)
      const spaceDelay = ctx.createDelay(1.5);
      const spaceFeedback = ctx.createGain();
      const spaceFilter = ctx.createBiquadFilter();

      spaceDelay.delayTime.setValueAtTime(0.75, ctx.currentTime); // 750ms delay time
      spaceFeedback.gain.setValueAtTime(0.28, ctx.currentTime);
      spaceFilter.type = "lowpass";
      spaceFilter.frequency.setValueAtTime(800, ctx.currentTime);

      spaceDelay.connect(spaceFilter);
      spaceFilter.connect(spaceFeedback);
      spaceFeedback.connect(spaceDelay);
      spaceDelay.connect(masterGain);

      // Track active pad nodes for smooth transition transitions
      let activePadNodes = [];

      // Warm Pad Synthesizer
      const playPadChord = (freqs, time) => {
        // Fade out older chord oscs to avoid clicks
        const oldNodes = [...activePadNodes];
        activePadNodes = [];

        oldNodes.forEach(node => {
          try {
            node.gain.gain.cancelScheduledValues(time);
            node.gain.gain.setValueAtTime(node.gain.gain.value, time);
            node.gain.gain.exponentialRampToValueAtTime(0.0001, time + 2.0);
            node.osc.stop(time + 2.2);
          } catch (e) {}
        });

        // Start new warm chords
        freqs.forEach(freq => {
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          const filterNode = ctx.createBiquadFilter();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, time);

          filterNode.type = "lowpass";
          filterNode.frequency.setValueAtTime(450, time); // Keeps pads dark, soft and warm

          gainNode.gain.setValueAtTime(0.0, time);
          gainNode.gain.linearRampToValueAtTime(0.02, time + 1.8); // Swelling attack

          osc.connect(filterNode);
          filterNode.connect(gainNode);
          gainNode.connect(masterGain);

          osc.start(time);
          activePadNodes.push({ osc, gain: gainNode });
        });
      };

      // Premium Detuned Pluck Synthesizer
      const playPluck = (freq, time, velocity = 1.0) => {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const oscGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc1.type = "triangle";
        osc2.type = "sine";

        osc1.frequency.setValueAtTime(freq, time);
        osc2.frequency.setValueAtTime(freq, time);
        osc2.detune.setValueAtTime(10, time); // 10 cents detuned for rich, premium chorus

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1500, time);
        filter.frequency.exponentialRampToValueAtTime(250, time + 0.5); // Sweep cutoff down for organic pluck

        oscGain.gain.setValueAtTime(0.0, time);
        oscGain.gain.linearRampToValueAtTime(0.05 * velocity, time + 0.006); // Extremely snappy pluck attack
        oscGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.7);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(oscGain);

        oscGain.connect(masterGain);
        oscGain.connect(delayNode);
        oscGain.connect(spaceDelay);

        osc1.start(time);
        osc2.start(time);
        osc1.stop(time + 0.8);
        osc2.stop(time + 0.8);
      };

      // Beautiful ambient chord progression (Cmaj9 ➔ G6 ➔ Am9 ➔ Fmaj9)
      const CHORDS = [
        [130.81, 261.63, 329.63, 392.00, 587.33], // Cmaj9
        [98.00, 196.00, 293.66, 392.00, 440.00],  // G6
        [110.00, 220.00, 261.63, 329.63, 493.88], // Am9
        [87.31, 174.61, 261.63, 349.23, 523.25]   // Fmaj9
      ];

      // Organic, slow-moving melody steps
      const MELODY = [
        587.33, 392.00, 329.63, 587.33,
        440.00, 293.66, 392.00, 0, // 0 is a musical pause/breath
        493.88, 329.63, 261.63, 493.88,
        523.25, 349.23, 261.63, 0
      ];

      let step = 0;

      const playTick = () => {
        if (ctx.state !== "running") return;
        const now = ctx.currentTime;

        // Play a new background pad chord every 4 steps (4 seconds)
        if (step % 4 === 0) {
          const chordIndex = Math.floor(step / 4) % CHORDS.length;
          playPadChord(CHORDS[chordIndex], now);
        }

        // Play pluck melody note if it's not a rest (0)
        const pitch = MELODY[step % MELODY.length];
        if (pitch > 0) {
          // Slightly randomize velocity for organic, human feel
          const velocity = 0.85 + Math.random() * 0.25;
          playPluck(pitch, now, velocity);
        }

        step = (step + 1) % MELODY.length;
      };

      // Start sequencer (Lush 1000ms pace)
      playTick();
      const sequencerInterval = setInterval(playTick, 1000);

      synthNodeRef.current = {
        stop: () => {
          clearInterval(sequencerInterval);
          // Gently fade out chords
          const now = ctx.currentTime;
          activePadNodes.forEach(node => {
            try {
              node.gain.gain.cancelScheduledValues(now);
              node.gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
              node.osc.stop(now + 1.2);
            } catch (e) {}
          });
          masterGain.gain.setValueAtTime(masterGain.gain.value, now);
          masterGain.gain.linearRampToValueAtTime(0.0, now + 1.2);
          setTimeout(() => {
            ctx.close();
          }, 1300);
        }
      };
      
      return true;
    } catch (err) {
      console.error("Audio failed to initialize", err);
      return false;
    }
  };

  const toggleAmbientSound = () => {
    setIsPlayingAudio(prev => !prev);
  };

  // Sync state to playing nodes & handle autoplay restrictions
  useEffect(() => {
    if (isPlayingAudio) {
      const initAudioOnInteraction = () => {
        const success = startAmbientSound();
        if (success) {
          removeListeners();
        }
      };

      const removeListeners = () => {
        document.removeEventListener("click", initAudioOnInteraction);
        document.removeEventListener("touchstart", initAudioOnInteraction);
        document.removeEventListener("keydown", initAudioOnInteraction);
      };

      // Try playing immediately
      const success = startAmbientSound();

      if (!success) {
        // Register interaction fallback for modern browser autoplay policy
        document.addEventListener("click", initAudioOnInteraction);
        document.addEventListener("touchstart", initAudioOnInteraction);
        document.addEventListener("keydown", initAudioOnInteraction);
      }

      return () => {
        removeListeners();
      };
    } else {
      stopAmbientSound();
    }
  }, [isPlayingAudio]);

  useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, []);

  return (
    <>
      <button 
        className="cosmic-trigger" 
        onClick={() => setOpen(!open)}
        aria-label="Open Cosmic Controller"
      >
        <span className="cosmic-trigger__pulse" />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06-.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>

      {open && (
        <div className="cosmic-panel">
          <div className="cosmic-panel__header">
            <div className="cosmic-panel__title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--violet)" }}>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Cosmic HUD Controller
            </div>
            <button className="cosmic-panel__close" onClick={() => setOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="cosmic-panel__section">
            <span className="cosmic-panel__section-title">Cosmic Accents</span>
            <div className="cosmic-panel__themes">
              {[
                { id: "purple", label: "Violet" },
                { id: "cyber", label: "Cyber" },
                { id: "mint", label: "Mint" },
                { id: "gold", label: "Amber" }
              ].map((t) => (
                <button
                  key={t.id}
                  className={`theme-dot theme-dot--${t.id}${accent === t.id ? " theme-dot--active" : ""}`}
                  title={t.label}
                  onClick={() => setAccent(t.id)}
                />
              ))}
            </div>
          </div>

          <div className="cosmic-panel__section">
            <span className="cosmic-panel__section-title">Interactions</span>
            <div className="cosmic-panel__toggle">
              <span className="cosmic-panel__toggle-label">Interactive Node Starfield</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={particles}
                  onChange={(e) => setParticles(e.target.checked)}
                />
                <span className="slider" />
              </label>
            </div>
          </div>

          <div className="cosmic-panel__section">
            <span className="cosmic-panel__section-title">Ambient Audio</span>
            <div className="cosmic-panel__toggle">
              <span className="cosmic-panel__toggle-label">Play Music</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isPlayingAudio}
                  onChange={toggleAmbientSound}
                />
                <span className="slider" />
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── App ── */
export default function App() {
  const [accent, setAccent] = useState("cyber");
  const [particles, setParticles] = useState(true);
  const [matrix, setMatrix] = useState(false);
  const [spin, setSpin] = useState(false);
  const [rainbow, setRainbow] = useState(false);
  const [atmosphere, setAtmosphere] = useState("cosmic");

  // Animations States
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const root = document.documentElement;
    if (accent === "purple") {
      root.style.setProperty("--indigo", "#6366F1");
      root.style.setProperty("--violet", "#8B5CF6");
      root.style.setProperty("--lavender", "#C4B5FD");
      root.style.setProperty("--border", "rgba(139, 92, 246, 0.12)");
      root.style.setProperty("--border-h", "rgba(139, 92, 246, 0.35)");
    } else if (accent === "cyber") {
      root.style.setProperty("--indigo", "#06b6d4");
      root.style.setProperty("--violet", "#ec4899");
      root.style.setProperty("--lavender", "#fbcfe8");
      root.style.setProperty("--border", "rgba(236, 72, 153, 0.12)");
      root.style.setProperty("--border-h", "rgba(236, 72, 153, 0.35)");
    } else if (accent === "mint") {
      root.style.setProperty("--indigo", "#0d9488");
      root.style.setProperty("--violet", "#10b981");
      root.style.setProperty("--lavender", "#a7f3d0");
      root.style.setProperty("--border", "rgba(16, 185, 129, 0.12)");
      root.style.setProperty("--border-h", "rgba(16, 185, 129, 0.35)");
    } else if (accent === "gold") {
      root.style.setProperty("--indigo", "#ea580c");
      root.style.setProperty("--violet", "#f59e0b");
      root.style.setProperty("--lavender", "#fde68a");
      root.style.setProperty("--border", "rgba(245, 158, 11, 0.12)");
      root.style.setProperty("--border-h", "rgba(245, 158, 11, 0.35)");
    }
  }, [accent]);

  // Scroll Progress and Cursor Trail Listeners
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Reveal-on-Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // 3D Tilt Card Effects
  useEffect(() => {
    const cards = document.querySelectorAll(".project-card, .skill-card, .edu__card");

    const handleMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xc = rect.width / 2;
      const yc = rect.height / 2;

      const angleX = (yc - y) / 12; // Max rotation degrees
      const angleY = (x - xc) / 12;

      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleLeave = (e) => {
      const card = e.currentTarget;
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    };

    cards.forEach((card) => {
      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  // Magnetic Menu links and social buttons
  useEffect(() => {
    const items = document.querySelectorAll(
      ".navbar__links button, .navbar__brand, .hero__social-btn, .navbar__burger"
    );

    const handleMove = (e) => {
      const item = e.currentTarget;
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      item.style.transform = `translate3d(${x * 0.35}px, ${y * 0.35}px, 0)`;
    };

    const handleLeave = (e) => {
      const item = e.currentTarget;
      item.style.transform = "translate3d(0, 0, 0)";
    };

    items.forEach((item) => {
      item.addEventListener("mousemove", handleMove);
      item.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      items.forEach((item) => {
        item.removeEventListener("mousemove", handleMove);
        item.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      <div className="custom-cursor-glow" style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%)` }} />
      {particles && <ParticleBackground />}
      <MatrixRain active={matrix} />
      <NavBar />
      <Hero easterEggRainbow={rainbow} atmosphere={atmosphere} />
      <About easterEggSpin={spin} />
      <Skills />
      <Experience />
      <Projects />
      <Certificates />
      <Contact />
      <footer className="footer">
        <div className="container">
          <span>© 2026 Tanisha Chauhan. All rights reserved.</span>
          <div className="footer__socials">
            <a href="https://github.com/tanisha222" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GithubIcon size={18}/>
            </a>
            <a href="https://linkedin.com/in/tanishachauhan02" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={18}/>
            </a>
            <a href="mailto:ctanisha222@gmail.com" aria-label="Email">
              <Mail size={18}/>
            </a>
          </div>
        </div>
      </footer>
      <CosmicCommandCenter
        accent={accent}
        setAccent={setAccent}
        particles={particles}
        setParticles={setParticles}
        matrix={matrix}
        setMatrix={setMatrix}
        spin={spin}
        setSpin={setSpin}
        rainbow={rainbow}
        setRainbow={setRainbow}
        atmosphere={atmosphere}
        setAtmosphere={setAtmosphere}
      />
    </>
  );
}
