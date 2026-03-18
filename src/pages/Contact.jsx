import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Footer from '../components/Footer'

function RevealLeft({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: -36 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.65, 0, 0.35, 1] }}
    >{children}</motion.div>
  )
}

function RevealRight({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: 36 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.65, 0, 0.35, 1] }}
    >{children}</motion.div>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <PageTransition>
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="sec-tag">Get In Touch</div>
            <h1>Let's Build<br /><em>Together</em></h1>
          </motion.div>
        </div>
        <div className="ph-bg-word">HELLO</div>
      </section>

      <section className="section contact-sec">
        <div className="container">
          <div className="ct-grid">
            <RevealLeft>
              <h2 className="sec-title" style={{ marginBottom: '1.25rem' }}>Have an idea<br />or <em>project?</em></h2>
              <p className="ct-intro">Whether you're looking to collaborate, explore a partnership, or have a conversation about technology — I'm always open to connecting.</p>

              <div className="ct-details">
                {[
                  { ico: '📍', label: 'Location', val: 'New-Baneshwor, Kathmandu, Nepal' },
                  { ico: '🏢', label: 'Company', val: 'Lishnu Tech — Co-Founder & CEO' },
                  { ico: '✉️', label: 'Open To', val: 'Collaborations, Partnerships, Consulting' },
                ].map(d => (
                  <div className="ctd-row" key={d.label}>
                    <div className="ctd-ico">{d.ico}</div>
                    <div><strong>{d.label}</strong><span>{d.val}</span></div>
                  </div>
                ))}
              </div>

              <div className="ct-avail">
                <span className="avail-dot" />
                <span>Currently available for new opportunities</span>
              </div>

              <div className="ct-socials">
                {[
                  { label: 'LinkedIn', href: '#' },
                  { label: 'GitHub', href: '#' },
                  { label: 'Twitter / X', href: '#' },
                ].map(s => (
                  <a key={s.label} href={s.href} className="cts-link">
                    {s.label} <span>↗</span>
                  </a>
                ))}
              </div>
            </RevealLeft>

            <RevealRight>
              {submitted ? (
                <motion.div
                  className="ct-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="cts-icon">✓</div>
                  <h3>Message Received</h3>
                  <p>Thank you for reaching out. I'll get back to you within 24–48 hours.</p>
                </motion.div>
              ) : (
                <form className="ct-form" onSubmit={handleSubmit}>
                  <div className="ctf-row">
                    <div className="ctf-group">
                      <label>Your Name</label>
                      <input type="text" placeholder="John Doe" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="ctf-group">
                      <label>Your Email</label>
                      <input type="email" placeholder="john@example.com" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="ctf-group">
                    <label>Subject</label>
                    <input type="text" placeholder="What's this about?" required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                  </div>
                  <div className="ctf-group">
                    <label>Message</label>
                    <textarea rows="6" placeholder="Tell me about your project or idea..." required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <motion.button
                    type="submit"
                    className="btn-fill"
                    style={{ width: '100%', justifyContent: 'center', border: 'none', cursor: 'none' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="btn-fill-bg" />
                    <span className="btn-fill-text">Send Message →</span>
                  </motion.button>
                  <p className="ctf-note">I typically respond within 24–48 hours.</p>
                </form>
              )}
            </RevealRight>
          </div>
        </div>
      </section>

      <Footer />
    </PageTransition>
  )
}
