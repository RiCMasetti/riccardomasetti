import { useEffect, useMemo, useState } from 'react';
import logo from './assets/riccardo_vector_icon.svg';
import portrait from './assets/Primo piano chitarra.jpg';
import aspublisherLogo from './assets/aspublisher-logo.png';
import aspublisherDashboard from './assets/aspublisher-dashboard.png';

const sections = [
  { id: 'timeline', label: 'Timeline' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
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
    title: 'From software development to DevOps',
    meta: 'YOOX-NET-A-PORTER Group',
    text: 'Spent more than 11 years growing through backend, frontend architecture, software development, and DBOps responsibilities, moving from product engineering into operational ownership.',
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
    title: 'DevOps, AIOps, and automation',
    meta: 'Bullfinch - DevOps Engineer',
    text: 'Optimizes cloud infrastructure for scalability and security, migrated from AWS EKS to Rancher RKE2 on Hetzner Cloud, and integrates LLM platforms such as Vertex AI, Gemini, Claude and ChatGPT into business automation.',
  },
];

const skillGroups = [
  {
    name: 'Cloud Platforms',
    skills: ['AWS', 'Hetzner Cloud', 'Kubernetes EKS', 'Rancher RKE2', 'ECS', 'Flux CD'],
  },
  {
    name: 'Infrastructure as Code',
    skills: ['Terraform Cloud', 'Terragrunt', 'AWS CDK', 'CloudFormation', 'Cost optimization'],
  },
  {
    name: 'DevOps & Reliability',
    skills: ['CI/CD pipelines', 'GitOps', 'Deployment automation', 'Grafana', 'CloudWatch', 'Monitoring', 'Incident response'],
  },
  {
    name: 'AI & Automation',
    skills: ['LLM integration', 'Multi-agent workflows', 'Google ADK', 'Vertex AI', 'Gemini', 'Claude', 'ChatGPT', 'n8n'],
  },
  {
    name: 'Data & ML Workflows',
    skills: ['AWS SageMaker', 'Data workflows', 'Analytics pipelines', 'Document analysis', 'Data management'],
  },
  {
    name: 'Software Roots',
    skills: ['Backend development', 'Frontend architecture', 'WordPress', 'Interface development', 'Web consulting'],
  },
];

const contactItems = [
  { label: 'LinkedIn', value: 'linkedin.com/in/riccardomasetti', href: 'https://www.linkedin.com/in/riccardomasetti' },
  { label: 'GitHub', value: 'github.com/RiCMasetti', href: 'https://github.com/RiCMasetti' },
];

const experimentProjects = [
  {
    status: 'Experimental · Multi-agent FinOps',
    title: 'OpenWeb Cost Agents',
    description:
      'A read-only multi-agent assistant that routes cloud cost questions to AWS Cost Explorer and Hetzner specialists through Google ADK and Open WebUI.',
    tags: ['Google ADK', 'AWS Cost Explorer', 'Hetzner', 'Bedrock', 'Open WebUI'],
    links: [
      {
        label: 'View repository',
        href: 'https://github.com/RiCMasetti/google-adk-multiagent',
      },
    ],
  },
  {
    status: 'Reference implementation · GitOps',
    title: 'EKS GitOps Platform',
    description:
      'A modular AWS EKS platform reference built with Terraform, Terragrunt, Flux CD, and GitHub Actions, with environment promotion and infrastructure validation workflows.',
    tags: ['Terragrunt', 'Terraform', 'Amazon EKS', 'Flux CD', 'GitHub Actions'],
    links: [
      {
        label: 'View repository',
        href: 'https://github.com/RiCMasetti/terragrunt-eks',
      },
    ],
  },
  {
    status: 'Experimental · Agent orchestration',
    title: 'Multi-Agent App Factory',
    description:
      'Two implementations of a specification-driven workflow where specialized agents plan, build, test, and package frontend applications using isolated workspaces.',
    tags: ['LangGraph', 'Google ADK', 'Docker', 'Testing', 'LangSmith'],
    links: [
      {
        label: 'LangGraph implementation',
        href: 'https://github.com/RiCMasetti/langchain-frontend-app-factory',
      },
      {
        label: 'Google ADK implementation',
        href: 'https://github.com/RiCMasetti/google-adk-app-factory',
      },
    ],
  },
];

const privacyNoticeKey = 'riccardomasetti-privacy-notice-v1';

function App() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [isPrivacyNoticeVisible, setIsPrivacyNoticeVisible] = useState(() => {
    try {
      return window.localStorage.getItem(privacyNoticeKey) !== 'dismissed';
    } catch {
      return true;
    }
  });

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

  useEffect(() => {
    const activeLink = document.querySelector(`.nav-link[href="#${activeSection}"]`);
    const navLinks = activeLink?.parentElement;

    if (!activeLink || !navLinks || navLinks.scrollWidth <= navLinks.clientWidth) return;

    activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeSection]);

  const dismissPrivacyNotice = () => {
    try {
      window.localStorage.setItem(privacyNoticeKey, 'dismissed');
    } catch {
      // Keep the notice dismissible when browser storage is unavailable.
    }

    setIsPrivacyNoticeVisible(false);
  };

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
              aria-current={activeSection === section.id ? 'location' : undefined}
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
          <h1>From web development to cloud platforms and AI automation.</h1>
          <p className="hero-text">
            A technical path shaped by software engineering, DevOps, Kubernetes,
            Infrastructure as Code, GitOps, and practical automation for modern
            cloud environments.
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
          <h2>Cloud-native delivery, automation, and AI-enabled operations.</h2>
          <p>
            Practical experience across AWS, Kubernetes, GitOps, Infrastructure as
            Code, observability, data workflows, and applied AI automation.
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

      <section id="projects" className="page-section projects-section">
        <div className="section-heading reveal">
          <p className="section-kicker">Projects</p>
          <h2>Turning infrastructure experience into products.</h2>
          <p>
            Independent work where cloud architecture, automation, security, and
            product design come together in software people can use.
          </p>
        </div>

        <article className="project-showcase">
          <div className="project-copy reveal" style={{ '--reveal-delay': '80ms' }}>
            <div className="project-heading">
              <img src={aspublisherLogo} width="256" height="256" alt="" />
              <div>
                <span className="project-status">Public beta · v0.9.0</span>
                <h3>Advanced Static Publisher</h3>
              </div>
            </div>

            <p className="project-tagline">WordPress in. Static out.</p>
            <p className="project-description">
              A WordPress plugin that turns selected content into versioned static
              releases and publishes them to the user&apos;s own cloud. Visitors get a
              fast static site without a public WordPress, PHP, or database runtime.
            </p>

            <div className="project-tags" aria-label="Advanced Static Publisher technologies">
              {['WordPress', 'Static publishing', 'AWS', 'Cloudflare', 'Netlify', 'MCP'].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <dl className="project-facts">
              <div>
                <dt>Architecture</dt>
                <dd>No public CMS runtime</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>Versioned cloud releases</dd>
              </div>
              <div>
                <dt>Control</dt>
                <dd>Costs and resources reviewed before provisioning</dd>
              </div>
            </dl>

            <a
              className="project-link"
              href="https://aspublisher.riccardomasetti.com"
              target="_blank"
              rel="noreferrer"
            >
              Explore the project
            </a>
          </div>

          <a
            className="project-media reveal"
            style={{ '--reveal-delay': '160ms' }}
            href="https://aspublisher.riccardomasetti.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Open the Advanced Static Publisher website"
          >
            <img
              src={aspublisherDashboard}
              width="1180"
              height="846"
              alt="Advanced Static Publisher dashboard showing sites, cloud resources, releases, MCP agents, and health checks"
              loading="lazy"
            />
            <span>View product website</span>
          </a>
        </article>

        <div className="experiments-heading reveal">
          <p className="section-kicker">Selected experiments</p>
          <h3>Open-source explorations in agents, FinOps, and platform engineering.</h3>
        </div>

        <div className="experiment-grid">
          {experimentProjects.map((project, index) => (
            <article
              className="experiment-card reveal"
              style={{ '--reveal-delay': `${index * 80}ms` }}
              key={project.title}
            >
              <span className="project-status">{project.status}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags" aria-label={`${project.title} technologies`}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="experiment-links">
                {project.links.map((link) => (
                  <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="bio" className="page-section bio-section">
        <div className="bio-layout">
          <div className="bio-content">
            <div className="section-heading reveal">
              <p className="section-kicker">Bio</p>
              <h2>Curious by habit, practical by choice.</h2>
            </div>
            <div className="bio-copy reveal" style={{ '--reveal-delay': '100ms' }}>
              <p>
                I’m a DevOps and cloud infrastructure engineer focused on Kubernetes, automation,
                platform engineering, and reliable systems.
                I enjoy turning complex technical environments into scalable, maintainable solutions, 
                while exploring how AI can improve operations and collaboration.
              </p>
              <p>
                Beyond technology, I’m deeply connected to music, Argentine tango, 
                meditation, and a broader curiosity for spirituality and human experience.
              </p>
            </div>
          </div>

          <div className="bio-portrait reveal" style={{ '--reveal-delay': '180ms' }}>
            <img src={portrait} alt="Riccardo Masetti playing guitar" />
          </div>
        </div>
      </section>

      <section id="contact" className="page-section contact-section">
        <div className="section-heading reveal">
          <p className="section-kicker">Contact</p>
          <h2>Open to cloud, DevOps, and AI automation conversations.</h2>
          <p>
            LinkedIn is the best public channel to reach me for collaboration,
            consulting, platform engineering, and automation-focused opportunities.
          </p>
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

      <footer className="site-footer">
        <div className="footer-inner">
          <span>Riccardo Masetti</span>
          <span>Cloud, DevOps, AI automation</span>
          <span>Built with React</span>
          <button
            className="privacy-link"
            type="button"
            onClick={() => setIsPrivacyNoticeVisible(true)}
          >
            Privacy
          </button>
        </div>
      </footer>

      {isPrivacyNoticeVisible ? (
        <aside className="privacy-notice" aria-label="Privacy notice" aria-live="polite">
          <div className="privacy-notice-copy">
            <strong>Your privacy</strong>
            <p>
              This site does not use analytics, advertising, or tracking cookies. It only
              stores your choice to hide this notice in your browser.
            </p>
          </div>
          <button type="button" onClick={dismissPrivacyNotice}>
            Understood
          </button>
        </aside>
      ) : null}
    </main>
  );
}

export default App;
