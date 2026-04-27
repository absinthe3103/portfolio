import React, { useEffect, useRef, useState } from 'react';
import './App.css';

// ── Types ──────────────────────────────────────────────────
interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  year: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
  type: 'internship' | 'part-time' | 'club';
}

// ── Data ───────────────────────────────────────────────────
const SKILLS = {
  Languages: ['Java', 'JavaScript', 'TypeScript', 'PHP', 'Python'],
  Frontend: ['React', 'React Native', 'Three.js', 'HTML/CSS'],
  Backend: ['Laravel', 'Spring Boot', 'RESTful APIs', 'Docker'],
  Tools: ['MySQL', 'PostgreSQL', 'SQLite', 'XAMPP', 'Visual Studio Code'],
};

const PROJECTS: Project[] = [
  {
    title: 'AI-Driven 3D Soil Analyzer',
    description:
      'UTAR Hackathon project — a 3D soil risk visualization platform built with React and Three.js. Implemented core mathematical logic and AI APIs to predict soil conditions within a 36-hour intensive development window.',
    tech: ['React', 'Three.js', 'Python', 'PostgreSQL', 'AI APIs'],
    year: '2025',
  },
  {
    title: 'AI Emergency Monitoring Dashboard',
    description:
      'GDG UTM Hackathon — engineered a real-time Emergency Monitoring Dashboard using React and Python. Designed a high-performance frontend to visualize live data streams from AI-driven analysis APIs, delivering a functional MVP.',
    tech: ['React', 'Python', 'AI APIs', 'WebSockets'],
    year: '2025',
  },
  {
    title: 'Advanced Web Application',
    description:
      'Full-stack web app built with Laravel and React following MVC architecture. Integrated a Laravel backend via RESTful APIs with a responsive React frontend, and designed relational database schemas in MySQL with XAMPP.',
    tech: ['Laravel', 'React', 'MySQL', 'RESTful APIs'],
    year: '2024',
  },
  {
    title: 'Full-Stack Enterprise Starter',
    description:
      'Self-learnt project — architected a full-stack system using Spring Boot (Java) and React following MVC patterns. Containerized with Docker and tested API lifecycle using Thunder Client for robust CRUD functionality.',
    tech: ['Spring Boot', 'React', 'PostgreSQL', 'Docker'],
    year: '2024',
  },
];

const EXPERIENCES: Experience[] = [
  {
    role: 'Co-founder & Treasurer',
    company: 'LEO Club, UTAR Sungai Long',
    period: '2024 – 2026',
    description: [
      'Co-founded the LEO Club at UTAR, building the organisation from scratch alongside fellow students.',
      'Serving as Treasurer — preparing profit and loss accounts for each club event.',
      'Organised multiple events, developing leadership, financial management, and coordination skills.',
    ],
    type: 'club',
  },
  {
    role: 'Assistant Account Clerk',
    company: 'Messrs MM Management Services Sdn. Bhd.',
    period: 'Mar 2023 – Jun 2023',
    description: [
      'Joined full-time after SPM, assisting senior staff with accounts, taxes, audit, and administrative tasks.',
      'Continued on a part-time basis after enrolling at UTAR to maintain focus on degree studies.',
      'Gained hands-on exposure to real-world accounting and professional firm workflows.',
    ],
    type: 'part-time',
  },
  {
    role: 'Assistant Head Prefect & Club Leader',
    company: 'SMK Saint Gabriel',
    period: '2018 – 2022',
    description: [
      'Progressed from Prefect to Board of Director Prefect and Assistant Head Prefect by 2022.',
      'Secretary of Basketball Club and Boys Scout; Vice Chairman of Recycling Club in 2022.',
      'Participated in district-level chess competitions and assisted in organising intramural school events.',
    ],
    type: 'club',
  },
];

// ── Hooks ──────────────────────────────────────────────────
function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ── Components ─────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a href="#hero" className="nav__logo">
        zhifong<span className="nav__logo-dot">.</span>
      </a>
      <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
        {links.map((l) => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              className="nav__link"
              onClick={() => setMenuOpen(false)}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="nav__burger"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span className={menuOpen ? 'open' : ''} />
      </button>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__inner">
        <p className="hero__eyebrow animate-fade-up" style={{ animationDelay: '0.05s' }}>
          Year 2 Software Engineering · UTAR Sungai Long
        </p>
        <h1 className="hero__title animate-fade-up" style={{ animationDelay: '0.15s' }}>
          Hi, I'm <span className="hero__name">Loh Zhi Fong</span>.<br />
          I build things<br />
          <em>for the web & mobile.</em>
        </h1>
        <p className="hero__sub animate-fade-up" style={{ animationDelay: '0.28s' }}>
          Full-stack developer with experience in React, Laravel, Spring Boot, and AI-integrated apps.
          Two hackathons shipped, real accounting experience, and a builder's mindset — based in Malaysia.
        </p>
        <div className="hero__cta animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <a href="#projects" className="btn btn--primary">View Projects</a>
          <a href="#contact" className="btn btn--ghost">Get in Touch</a>
        </div>
      </div>
      <div className="hero__index animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <div className="hero__index-line" />
        <span>scroll</span>
      </div>
    </section>
  );
}

function About() {
  const { ref, visible } = useIntersection();
  return (
    <section className="section" id="about" ref={ref}>
      <div className={`about__grid ${visible ? 'is-visible' : ''}`}>
        <div className="about__label">
          <span className="label-tag">01 / About</span>
        </div>
        <div className="about__content">
          <h2 className="section__heading">
            A developer who cares about the craft.
          </h2>
          <p className="about__body">
            I'm Loh Zhi Fong — a Year 2 Software Engineering student at UTAR Sungai Long (Bachelor of Science (Hons), 2022–2026).
            I learn best by doing: I've shipped projects at two hackathons, built full-stack apps with Laravel and Spring Boot,
            and explored AI integration with React and Python.
          </p>
          <p className="about__body">
            My stack spans <strong>React, React Native, Laravel, Spring Boot, and Docker</strong>.
            Outside of coding, I co-founded the LEO Club at UTAR and served as Treasurer —
            which taught me that building teams is as important as building software.
            I also have a real accounting background from working at a professional firm after SPM.
          </p>
          <p className="about__body">
            Current CGPA: 2.89 · MUET Band 3.5 · Fluent in Mandarin, English, and Malay.
          </p>
          <div className="about__facts">
            <div className="about__fact">
              <span className="about__fact-num">2</span>
              <span className="about__fact-label">Hackathons Shipped</span>
            </div>
            <div className="about__fact">
              <span className="about__fact-num">4+</span>
              <span className="about__fact-label">Projects Built</span>
            </div>
            <div className="about__fact">
              <span className="about__fact-num">MY</span>
              <span className="about__fact-label">Based in Malaysia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const { ref, visible } = useIntersection();
  return (
    <section className="section section--alt" id="skills" ref={ref}>
      <div className={`skills__inner ${visible ? 'is-visible' : ''}`}>
        <div className="section__header">
          <span className="label-tag">02 / Skills</span>
          <h2 className="section__heading">What I work with.</h2>
        </div>
        <div className="skills__grid">
          {Object.entries(SKILLS).map(([category, items], ci) => (
            <div
              className="skills__group"
              key={category}
              style={{ animationDelay: `${ci * 0.1}s` }}
            >
              <h3 className="skills__category">{category}</h3>
              <ul className="skills__list">
                {items.map((skill) => (
                  <li key={skill} className="skills__item">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const { ref, visible } = useIntersection();
  return (
    <section className="section" id="projects" ref={ref}>
      <div className={`projects__inner ${visible ? 'is-visible' : ''}`}>
        <div className="section__header">
          <span className="label-tag">03 / Projects</span>
          <h2 className="section__heading">Things I've built.</h2>
        </div>
        <div className="projects__grid">
          {PROJECTS.map((p, i) => (
            <article
              className="project-card"
              key={p.title}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="project-card__top">
                <span className="project-card__year">{p.year}</span>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__link"
                  >
                    ↗
                  </a>
                )}
              </div>
              <h3 className="project-card__title">{p.title}</h3>
              <p className="project-card__desc">{p.description}</p>
              <div className="project-card__tech">
                {p.tech.map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const { ref, visible } = useIntersection();
  return (
    <section className="section section--alt" id="experience" ref={ref}>
      <div className={`experience__inner ${visible ? 'is-visible' : ''}`}>
        <div className="section__header">
          <span className="label-tag">04 / Experience</span>
          <h2 className="section__heading">Where I've been.</h2>
        </div>
        <div className="timeline">
          {EXPERIENCES.map((exp, i) => (
            <div
              className="timeline__item"
              key={exp.role}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="timeline__meta">
                <span className="timeline__period">{exp.period}</span>
                <span className={`timeline__badge timeline__badge--${exp.type}`}>
                  {exp.type === 'internship'
                    ? 'Internship'
                    : exp.type === 'part-time'
                    ? 'Part-time'
                    : 'Leadership'}
                </span>
              </div>
              <div className="timeline__body">
                <h3 className="timeline__role">{exp.role}</h3>
                <p className="timeline__company">{exp.company}</p>
                <ul className="timeline__desc">
                  {exp.description.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { ref, visible } = useIntersection();
  return (
    <section className="section" id="contact" ref={ref}>
      <div className={`contact__inner ${visible ? 'is-visible' : ''}`}>
        <div className="section__header">
          <span className="label-tag">05 / Contact</span>
        </div>
        <h2 className="contact__heading">
          Let's work<br /><em>together.</em>
        </h2>
        <p className="contact__sub">
          I'm currently open to internship opportunities and project collaborations.
          If you'd like to connect, my inbox is always open.
        </p>
        <div className="contact__links">
          <a href="mailto:zhifong05@gmail.com" className="contact__link">
            <span className="contact__link-icon">✉</span>
            zhifong05@gmail.com
          </a>
          <a
            href="https://github.com/absinthe3103"
            target="_blank"
            rel="noreferrer"
            className="contact__link"
          >
            <span className="contact__link-icon">⌥</span>
            GitHub
          </a>
          <a    
            href="https://www.linkedin.com/in/loh-zhifong-8557b4287"
            target="_blank"
            rel="noreferrer"
            className="contact__link"
          >
            <span className="contact__link-icon">in</span>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} Loh Zhi Fong · Built with React + TypeScript</span>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ExperienceSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
