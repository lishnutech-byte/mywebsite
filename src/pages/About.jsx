import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import PageTransition from '../components/PageTransition'
import Footer from '../components/Footer'
import photo from '../assets/photo.jpg'

function RevealUp({ children, delay = 0, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.65, 0, 0.35, 1] }}
    >{children}</motion.div>
  )
}

function RevealLeft({ children, delay = 0, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x: -36 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.65, 0, 0.35, 1] }}
    >{children}</motion.div>
  )
}

function RevealRight({ children, delay = 0, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x: 36 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.65, 0, 0.35, 1] }}
    >{children}</motion.div>
  )
}

const skills = {
  Technical: [
    { name: 'Python', pct: 88 },
    { name: 'C Programming', pct: 74 },
    { name: 'Web Development', pct: 80 },
    { name: 'Machine Learning', pct: 70 },
  ],
  Management: [
    { name: 'Project Management', pct: 95 },
    { name: 'Agile & Scrum', pct: 90 },
    { name: 'System Analysis', pct: 92 },
    { name: 'Budget Management', pct: 85 },
  ],
  Strategy: [
    { name: 'Business Analysis', pct: 88 },
    { name: 'Stakeholder Mgmt', pct: 90 },
    { name: 'Change Management', pct: 82 },
    { name: 'Info Architecture', pct: 78 },
  ],
}

function SkillBar({ name, pct, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div className="skr" ref={ref}>
      <span>{name}</span>
      <div className="skr-bar">
        <motion.div
          className="skr-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.4, delay, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>
      <em>{pct}%</em>
    </div>
  )
}

export default function About() {
  return (
    <PageTransition>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="sec-tag">About Me</div>
            <h1>The Person <em>Behind the Work</em></h1>
          </motion.div>
        </div>
        <div className="ph-bg-word">NISHAN</div>
      </section>

      {/* ABOUT BODY */}
      <section className="section about-body">
        <div className="container">
          <div className="ab-grid">
            <RevealLeft>
              <div className="ab-photo-wrap">
                <div className="ab-photo-frame">
                  <img src={photo} alt="Nishan Timilsina" className="ab-photo-img" />
                  <div className="ab-photo-overlay" />
                </div>
                <div className="ab-photo-accent" />
                <div className="ab-photo-badge">
                  <span className="avail-dot" />
                  <span>CEO @ Lishnu Tech</span>
                </div>
                <motion.div
                  className="ab-photo-stat"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="aps-num">25+</div>
                  <div className="aps-lbl">Projects Delivered</div>
                </motion.div>
              </div>
            </RevealLeft>

            <RevealRight>
              <div className="ab-text-col">
                <div className="sec-tag">My Story</div>
                <h2 className="sec-title">Tech entrepreneur &amp;<br /><em>strategic thinker</em></h2>
                <div className="ab-rule" />
                <p className="ab-lead">I'm Nishan Timilsina — a tech entrepreneur with expertise spanning project management, system analysis, and software development, based in Kathmandu, Nepal.</p>
                <p>As Co-Founder & CEO of Lishnu Tech, I lead strategic initiatives, oversee product development from concept to delivery, and build partnerships that drive lasting growth.</p>
                <p>My career spans backend development with Python & Django, business analysis, municipal system reform, and founding a technology company. I'm most energized when turning ambitious ideas into products that make a real difference.</p>
                <div className="ab-langs">
                  <span>🇳🇵 Nepali</span>
                  <span>🇬🇧 English</span>
                  <span>🇮🇳 Hindi</span>
                </div>
                <Link to="/experience" className="btn-fill" style={{ marginTop: '2.5rem', display: 'inline-flex' }}>
                  <span className="btn-fill-bg" />
                  <span className="btn-fill-text">View Experience</span>
                </Link>
              </div>
            </RevealRight>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section skills-sec">
        <div className="container">
          <RevealLeft>
            <div className="sec-tag">Expertise</div>
            <h2 className="sec-title">Skills &amp; <em>Capabilities</em></h2>
          </RevealLeft>
          <div className="sk-grid">
            {Object.entries(skills).map(([group, items], gi) => (
              <RevealUp key={group} delay={gi * 0.1}>
                <div className="sk-group">
                  <h4>{group}</h4>
                  <div className="sk-rows">
                    {items.map((item, i) => (
                      <SkillBar key={item.name} name={item.name} pct={item.pct} delay={i * 0.1} />
                    ))}
                  </div>
                </div>
              </RevealUp>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="section edu-sec">
        <div className="container">
          <RevealUp>
            <div className="sec-tag">Education</div>
            <h2 className="sec-title">Academic <em>Foundation</em></h2>
          </RevealUp>
          <div className="edu-grid">
            <RevealUp delay={0.1}>
              <div className="edu-card edu-active">
                <div className="edu-yr">2024 — Present</div>
                <div className="edu-badge">Ongoing</div>
                <h3>Master of Computer Science &amp; IT</h3>
                <p className="edu-school">Pokhara University — Medhavi College</p>
                <p>Major in Information Systems and Advanced Computing.</p>
              </div>
            </RevealUp>
            <RevealUp delay={0.2}>
              <div className="edu-card">
                <div className="edu-yr">2019 — 2023</div>
                <div className="edu-badge edu-done">Completed</div>
                <h3>Bachelor of Computer Information System</h3>
                <p className="edu-school">Pokhara University — Apex College</p>
                <p>Software Engineering, System Analysis, and Web Development.</p>
              </div>
            </RevealUp>
          </div>
        </div>
      </section>

      {/* CERTS */}
      <section className="section cert-sec">
        <div className="container">
          <RevealUp>
            <div className="sec-tag">Certifications</div>
            <h2 className="sec-title">Continuous <em>Growth</em></h2>
          </RevealUp>
          <div className="cert-list">
            {[
              { icon: '🏆', label: 'Project Management Certification' },
              { icon: '🔒', label: 'Cybersecurity Roles, Processes & Operating' },
              { icon: '🛡️', label: 'System Security' },
              { icon: '🤖', label: 'Python for Machine Learning' },
              { icon: '📊', label: 'COVID-19 Data Analysis Using Python' },
            ].map((c, i) => (
              <RevealUp key={c.label} delay={i * 0.08}>
                <div className="cert-row">
                  <span className="cr-icon">{c.icon}</span>
                  <span>{c.label}</span>
                </div>
              </RevealUp>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </PageTransition>
  )
}
