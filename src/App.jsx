import { useEffect, useMemo, useState } from 'react';
import logo from './assets/logo.svg';

const sections = [
  { id: 'timeline', label: 'Timeline' },
  { id: 'skills', label: 'Skills' },
  { id: 'bio', label: 'Bio' },
  { id: 'contact', label: 'Contact' },
];

const timelineItems = [
  {
    year: '1993 - 1998',
    title: 'Technical education foundation',
    meta: 'High School Aldini Valeriani',
    text: 'Completed a high school diploma focused on Mechanical Drafting and Mechanical Drafting CAD/CADD, building an early technical mindset around precision, systems, and design.',
  },
  {
    year: '2008 - 2010',
    title: 'Interface and web development consultant',
    meta: 'Kallisto 204 S.r.L. / Spazio 9 srl',
    text: 'Started the professional path as a freelance consultant and interface developer in the Bologna area, working across frontend implementation, web development, and WordPress-specialized projects.',
  },
  {
    year: '2010 - 2022',
    title: 'From software development to DBOps',
    meta: 'YOOX-NET-A-PORTER Group',
    text: 'Spent more than 11 years growing through backend, frontend architecture, senior software development, and Senior DBOps responsibilities, moving from product engineering into operational ownership.',
  },
  {
    year: '2022',
    title: 'AWS microservices and infrastructure modernization',
    meta: 'Cazoo - Senior Platform Engineer',
    text: 'Maintained AWS ECS-based microservices infrastructure, improved CI/CD automation, strengthened Grafana and CloudWatch observability, and migrated Infrastructure as Code from CloudFormation to Terraform Cloud.',
  },
  {
    year: '2022 - 2024',
    title: 'Platform engineering for AWS, Kubernetes, and data workflows',
    meta: 'Everli - Senior Platform Engineer',
    text: 'Managed AWS infrastructure with CDK and Kubernetes EKS, optimized CI/CD and infrastructure costs, automated AWS SageMaker project creation, and collaborated on scalable analytics and data workflows.',
  },
  {
    year: '2024 - Present',
    title: 'Cloud, DevOps, AI, and automation',
    meta: 'Bullfinch - DevOps Engineer',
    text: 'Optimizes cloud infrastructure for scalability and security, migrated from AWS EKS to Rancher RKE2 on Hetzner Cloud, and integrates LLM platforms such as Vertex AI, Gemini, and ChatGPT into business automation.',
  },
];

const skillGroups = [
  {
    name: 'Frontend',
    skills: ['React', 'TypeScript', 'Responsive UI', 'Design systems', 'Accessibility'],
  },
  {
    name: 'Backend',
    skills: ['APIs', 'Node.js', 'Python', 'Databases', 'Event-driven systems'],
  },
  {
    name: 'Cloud & DevOps',
    skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Docker', 'AWS'],
  },
  {
    name: 'Engineering Practice',
    skills: ['System design', 'Testing', 'Observability', 'Automation', 'Documentation'],
  },
];

const contactItems = [
  { label: 'Email', value: 'your.email@example.com', href: 'mailto:your.email@example.com' },
  { label: 'Phone', value: '+39 000 000 0000', href: 'tel:+390000000000' },
  { label: 'LinkedIn', value: 'linkedin.com/in/your-profile', href: 'https://linkedin.com' },
  { label: 'Repository', value: 'github.com/your-handle', href: 'https://github.com' },
];

function App() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  const sectionIds = useMemo(() => sections.map((section) => section.id), []);

  useEffect(() => {
    let animationFrame = 0;

    const updateScrollState = () => {
      const marker = window.scrollY + window.innerHeight * 0.34;

      const currentSection =
        sectionIds
          .map((id) => document.getElementById(id))
          .filter(Boolean)
          .reverse()
          .find((section) => marker >= section.offsetTop) ?? document.getElementById(sectionIds[0]);

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    const requestScrollStateUpdate = () => {
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(() => {
        updateScrollState();
        animationFrame = 0;
      });
    };

    updateScrollState();
    window.addEventListener('scroll', requestScrollStateUpdate, { passive: true });
    window.addEventListener('resize', requestScrollStateUpdate);

    return () => {
      window.removeEventListener('scroll', requestScrollStateUpdate);
      window.removeEventListener('resize', requestScrollStateUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [sectionIds]);

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.16,
      },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="site-shell">
      <nav className="top-nav" aria-label="Main navigation">
        <a className="brand-mark" href="#timeline" aria-label="Riccardo Masetti home">
          <img src={logo} alt="" />
        </a>
        <div className="nav-links">
          {sections.map((section) => (
            <a
              key={section.id}
              className={activeSection === section.id ? 'nav-link active' : 'nav-link'}
              href={`#${section.id}`}
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="ambient-grid" aria-hidden="true" />

      <section id="timeline" className="page-section timeline-section">
        <div className="hero-copy reveal" style={{ '--reveal-delay': '80ms' }}>
          <p className="intro-label">Riccardo Masetti</p>
          <h1>Engineering reliable digital products with calm precision.</h1>
          <p className="hero-text">
            Technical portfolio shaped around career progress, practical
            skills, personal story, and direct contact points.
          </p>
        </div>

        <div className="timeline-wrap">
          {timelineItems.map((item, index) => (
            <article
              className="timeline-item reveal"
              style={{ '--reveal-delay': `${index * 90}ms` }}
              key={item.title}
            >
              <span className="timeline-year">{item.year}</span>
              <div>
                <h2>{item.title}</h2>
                {item.meta ? <p className="timeline-meta">{item.meta}</p> : null}
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="page-section skills-section">
        <div className="section-heading reveal">
          <p className="section-kicker">Skills</p>
          <h2>Technical range with production focus.</h2>
          <p>
            This section is built to become the densest part of the site: concise,
            scannable, and oriented around what you can actually ship and operate.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <article
              className="skill-panel reveal"
              style={{ '--reveal-delay': `${index * 80}ms` }}
              key={group.name}
            >
              <h3>{group.name}</h3>
              <div className="skill-tags">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="bio" className="page-section bio-section">
        <div className="bio-layout">
          <div className="section-heading reveal">
            <p className="section-kicker">Bio</p>
            <h2>Curious by habit, practical by choice.</h2>
          </div>
          <div className="bio-copy reveal" style={{ '--reveal-delay': '100ms' }}>
            <p>
              Use this space to talk about the person behind the work: hobbies,
              passions, curiosities, dreams, expectations, and the kind of future you
              want to build.
            </p>
            <p>
              The current preview keeps the tone elegant and direct. It can evolve
              toward a warmer personal story, a sharper professional manifesto, or a
              balanced mix of both.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="page-section contact-section">
        <div className="section-heading reveal">
          <p className="section-kicker">Contact</p>
          <h2>Let&apos;s keep the conversation simple.</h2>
          <p>Replace these placeholders with your real links and preferred contact order.</p>
        </div>

        <div className="contact-list">
          {contactItems.map((item, index) => (
            <a
              className="contact-row reveal"
              style={{ '--reveal-delay': `${index * 75}ms` }}
              href={item.href}
              key={item.label}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
