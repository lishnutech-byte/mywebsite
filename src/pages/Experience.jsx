import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Footer from '../components/Footer'

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

const experiences = [
  {
    date: 'Apr 2024 — Present', current: true, icon: '🚀',
    title: 'Co-Founder & CEO', company: 'Lishnu Tech',
    points: [
      'Spearheading strategic initiatives to drive company growth and innovation',
      'Overseeing product development, leading to improved service efficiency',
      'Collaborating with stakeholders to secure partnerships and funding',
    ],
    tags: ['Leadership', 'Product Strategy', 'Stakeholder Mgmt', 'Fundraising'],
  },
  {
    date: 'May 2023 — Mar 2024', icon: '📋',
    title: 'Project Manager', company: 'Fishtail Product Lab',
    points: [
      'Led cross-functional teams to deliver projects on time and within budget',
      'Optimized project workflows, enhancing overall team productivity',
      'Ensured compliance with client requirements and industry standards',
    ],
    tags: ['Agile', 'Scrum', 'Budget Management', 'Team Leadership'],
  },
  {
    date: 'Nov 2023 — Mar 2024', icon: '🏛️',
    title: 'System Analyst & Software Manager', company: 'Kathmandu Metropolitan City Office',
    points: [
      'Analyzed and improved existing software systems, boosting performance',
      'Facilitated system upgrades, minimizing downtime across city operations',
      'Collaborated with officials to align technology with municipal goals',
    ],
    tags: ['System Analysis', 'Government Tech', 'Software Management'],
  },
  {
    date: 'May 2023 — Oct 2023', icon: '📈',
    title: 'Business Analyst', company: 'Dropshipping Nepal Pvt. Ltd',
    points: [
      'Conducted market analysis, identifying key growth opportunities',
      'Developed data-driven strategies to streamline supply chain operations',
      'Delivered actionable insights, enhancing decision-making processes',
    ],
    tags: ['Market Analysis', 'Data Strategy', 'Supply Chain'],
  },
  {
    date: 'May 2022 — Nov 2022', icon: '🔬',
    title: 'Researcher & Developer', company: "North Star Developer's Village (NSDevil)",
    points: [
      'Built backend solutions with Python Django for a Cheat Detection System',
      'Applied machine learning techniques to enhance system functionality',
      'Collaborated with senior developers on advanced development practices',
    ],
    tags: ['Python', 'Django', 'Machine Learning', 'Backend Dev'],
  },
]

const tools = ['Python', 'Django', 'C Programming', 'JavaScript', 'HTML / CSS', 'Machine Learning', 'Agile / Scrum', 'Jira', 'System Design', 'Data Analysis', 'Git', 'Linux']

export default function Experience() {
  return (
    <PageTransition>
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="sec-tag">Career Journey</div>
            <h1>From Developer<br /><em>to CEO</em></h1>
          </motion.div>
        </div>
        <div className="ph-bg-word">WORK</div>
      </section>

      <section className="section exp-sec">
        <div className="container">
          <RevealUp>
            <div className="sec-tag">Professional Timeline</div>
            <h2 className="sec-title" style={{ marginBottom: '4rem' }}>Every Role,<br />Every <em>Lesson</em></h2>
          </RevealUp>

          <div className="tl-wrap">
            <div className="tl-line" />
            {experiences.map((exp, i) => (
              <RevealUp key={exp.title} delay={i * 0.1}>
                <div className="tl-entry">
                  <div className="tl-meta">
                    <div className="tl-date">{exp.date}</div>
                    {exp.current && <div className="tl-now">Current</div>}
                  </div>
                  <div>
                    <div className={`tl-node ${exp.current ? 'current' : ''}`}>
                      {exp.current && <div className="tl-node-ring" />}
                    </div>
                  </div>
                  <motion.div
                    className={`tl-card ${exp.current ? 'current' : ''}`}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="tlc-top">
                      <div className="tlc-ico">{exp.icon}</div>
                      <div>
                        <h3>{exp.title}</h3>
                        <div className="tlc-co">{exp.company}</div>
                      </div>
                    </div>
                    <ul className="tlc-pts">
                      {exp.points.map(p => <li key={p}>{p}</li>)}
                    </ul>
                    <div className="tlc-tags">
                      {exp.tags.map(t => <span key={t}>{t}</span>)}
                    </div>
                  </motion.div>
                </div>
              </RevealUp>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="section tools-sec">
        <div className="container">
          <RevealUp>
            <div className="sec-tag">Toolkit</div>
            <h2 className="sec-title">Technologies &amp; <em>Tools</em></h2>
          </RevealUp>
          <div className="tools-grid">
            {tools.map((tool, i) => (
              <motion.div
                key={tool}
                className="tool-item"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ color: '#fff', backgroundColor: 'rgba(255,255,255,0.04)' }}
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </PageTransition>
  )
}
