import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useAnimation } from 'framer-motion'
import * as THREE from 'three'
import PageTransition from '../components/PageTransition'
import Footer from '../components/Footer'
import photo from '../assets/photo.jpg'
import team1 from '../assets/team1.jpg'
import team2 from '../assets/team2.jpg'
import team3 from '../assets/team3.jpg'
import lishnuLogo from '../assets/lishnu-logo.png'

// Reusable reveal animation hook
function useReveal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return { ref, inView }
}

function RevealUp({ children, delay = 0, className }) {
  const { ref, inView } = useReveal()
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.div>
  )
}

function RevealLeft({ children, delay = 0, className }) {
  const { ref, inView } = useReveal()
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: -36 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.div>
  )
}

function RevealRight({ children, delay = 0, className }) {
  const { ref, inView } = useReveal()
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: 36 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Counter animation
function Counter({ target }) {
  const { ref, inView } = useReveal()
  const countRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.max(1, Math.ceil(target / 50))
    const iv = setInterval(() => {
      start = Math.min(start + step, target)
      if (countRef.current) countRef.current.textContent = start
      if (start >= target) clearInterval(iv)
    }, 35)
    return () => clearInterval(iv)
  }, [inView, target])

  return <span ref={(el) => { ref.current = el; countRef.current = el; }} className="hs-num">0</span>
}

export default function Home() {
  const canvasRef = useRef(null)

  // Three.js hero particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    renderer.setClearColor(0, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000)
    camera.position.z = 90

    const N = 2200
    const pos = new Float32Array(N * 3)
    const vel = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - .5) * 220
      pos[i * 3 + 1] = (Math.random() - .5) * 150
      pos[i * 3 + 2] = (Math.random() - .5) * 70
      vel[i] = .003 + Math.random() * .004
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({ color: 0xffffff, size: .22, transparent: true, opacity: .28, sizeAttenuation: true })
    const pts = new THREE.Points(geo, mat)
    scene.add(pts)

    const lm = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: .04 })
    for (let i = 0; i < 10; i++) {
      const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-110, -75 + i * 17, 0), new THREE.Vector3(110, -75 + i * 17, 0)])
      scene.add(new THREE.Line(g, lm))
    }
    for (let i = 0; i < 14; i++) {
      const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-110 + i * 17, -80, 0), new THREE.Vector3(-110 + i * 17, 80, 0)])
      scene.add(new THREE.Line(g, lm))
    }

    let mxr = 0, myr = 0, frame = 0, animId
    const onMouse = e => { mxr = (e.clientX / innerWidth - .5) * 2; myr = -(e.clientY / innerHeight - .5) * 2 }
    document.addEventListener('mousemove', onMouse)

    const tick = () => {
      animId = requestAnimationFrame(tick)
      frame += .004
      const pa = geo.attributes.position.array
      for (let i = 0; i < N; i++) {
        pa[i * 3 + 1] += vel[i] * .35
        if (pa[i * 3 + 1] > 75) pa[i * 3 + 1] = -75
      }
      geo.attributes.position.needsUpdate = true
      camera.position.x += (mxr * 10 - camera.position.x) * .04
      camera.position.y += (myr * 6 - camera.position.y) * .04
      pts.rotation.y = frame * .05
      renderer.render(scene, camera)
    }
    tick()

    const onResize = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      camera.aspect = w / h; camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  const services = [
    { num: '01', title: 'Project Management', desc: 'Cross-functional team leadership. Agile & Scrum. Delivering on time, on budget — every time.' },
    { num: '02', title: 'Systems Analysis', desc: 'Deep architectural review. Aligning technology with business strategy, building scalable solutions.' },
    { num: '03', title: 'Software Development', desc: 'Python, Django, and full-stack web. From ML pipelines to enterprise systems for governments.' },
    { num: '04', title: 'Business Strategy', desc: 'Stakeholder management, market analysis, and funding partnerships. Making tech sustainable.' },
  ]

  const stats = [
    { count: 5, label: 'Years Experience' },
    { count: 25, label: 'Projects Delivered' },
    { count: 4, label: 'Companies Led' },
    { count: 3, label: 'Industries Served' },
  ]

  const marqueeItems = ['Project Management', 'System Analysis', 'Python & Django', 'Agile & Scrum', 'Machine Learning', 'Business Strategy', 'Web Development', 'Startup Leadership']

  return (
    <PageTransition>
      {/* HERO */}
      <section className="hero">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-inner">
          <div className="hero-left">
            <motion.div
              className="hero-tag"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              <span className="hero-tag-line" />
              <span>CEO & Co-Founder, Lishnu Tech · Kathmandu, Nepal</span>
            </motion.div>

            <h1 className="hero-title">
              <span className="hero-title-line">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.75, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                  style={{ display: 'block' }}
                >
                  Nishan
                </motion.span>
              </span>
              <span className="hero-title-line">
                <motion.em
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.95, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                  style={{ display: 'block' }}
                >
                  Timilsina
                </motion.em>
              </span>
            </h1>

            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              Tech entrepreneur. Systems thinker.<br />Builder of products that matter.
            </motion.p>

            <motion.div
              className="hero-btns"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.8 }}
            >
              <Link to="/experience" className="btn-fill">
                <span className="btn-fill-bg" />
                <span className="btn-fill-text">View My Work</span>
              </Link>
              <Link to="/contact" className="btn-ghost-line">Get In Touch</Link>
            </motion.div>
          </div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="hero-photo-block">
              <div className="hero-photo-frame">
                <img src={photo} alt="Nishan Timilsina" className="hero-photo-img" />
                <div className="hero-photo-overlay" />
              </div>
              <div className="hero-corner hero-corner-tl" />
              <div className="hero-corner hero-corner-br" />
              <div className="hero-badge">
                <span className="avail-dot" />
                <span>Available for Collaboration</span>
              </div>
              <motion.div
                className="hero-float"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="hero-float-top">CEO @ Lishnu Tech</div>
                <div className="hero-float-num">25<sup>+</sup></div>
                <div className="hero-float-lbl">Projects</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {stats.map((s, i) => (
            <>
              <div className="hs-item" key={s.label}>
                <Counter target={s.count} />
                <span className="hs-plus">+</span>
                <span className="hs-lbl">{s.label}</span>
              </div>
              {i < stats.length - 1 && <div className="hs-div" key={`div-${i}`} />}
            </>
          ))}
        </motion.div>

        <div className="scroll-cue">
          <div className="sc-wheel"><div className="sc-ball" /></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="mq-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i}>{item}<i style={{ margin: '0 1.5rem' }}>✦</i></span>
          ))}
        </div>
      </div>

      {/* ABOUT STRIP */}
      <section className="section about-strip">
        <div className="container">
          <div className="as-grid">
            <RevealLeft>
              <div className="sec-tag">Who I Am</div>
              <h2 className="sec-title">Turning complexity<br />into <em>clarity</em></h2>
            </RevealLeft>
            <RevealRight>
              <div className="as-right">
                <p>A tech entrepreneur with expertise in project management, system analysis, and software development. Co-Founder & CEO of Lishnu Tech — leading innovation and driving business growth across Nepal's technology landscape.</p>
                <Link to="/about" className="tlink">Read full story →</Link>
              </div>
            </RevealRight>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section services-sec">
        <div className="container">
          <RevealLeft>
            <div className="sec-tag">What I Do</div>
            <h2 className="sec-title" style={{ marginBottom: '3rem' }}>Core <em>Disciplines</em></h2>
          </RevealLeft>
          <div className="svc-list">
            {services.map((s, i) => (
              <motion.div
                key={s.num}
                className="svc-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ x: 8 }}
              >
                <span className="svc-n">{s.num}</span>
                <div className="svc-mid">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                <motion.span
                  className="svc-arr"
                  initial={{ opacity: 0, x: -4 }}
                  whileHover={{ opacity: 1, x: 0 }}
                >↗</motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="section numbers-sec">
        <div className="numbers-grid container">
          {[
            { icon: '⚙️', count: 25, label: 'Projects Delivered' },
            { icon: '👥', count: 50, label: 'Team Members Led' },
            { icon: '🏛️', count: 3, label: 'Gov. Systems Improved' },
            { icon: '🌏', count: 5, label: 'Years of Impact' },
          ].map((item, i) => (
            <RevealUp key={item.label} delay={i * 0.1}>
              <div className="num-card">
                <div className="nc-icon">{item.icon}</div>
                <div>
                  <span className="nc-big">{item.count}</span>
                  <span className="nc-plus">+</span>
                </div>
                <div className="nc-label">{item.label}</div>
              </div>
            </RevealUp>
          ))}
        </div>
      </section>

      {/* LISHNU TECH */}
      <section className="section lishnu-sec">
        <div className="container">
          <RevealUp>
            <div className="lt-header">
              <div className="sec-tag" style={{ justifyContent: 'center' }}>My Company</div>
              <div className="lt-title-row">
                <img src={lishnuLogo} alt="Lishnu Tech" style={{width:'60px', height:'60px', objectFit:'contain'}} />
                <h2 className="sec-title">Lishnu <em>Tech</em></h2>
              </div>
              <p className="lt-desc">Building technology solutions that drive real impact. From product development to strategic innovation — Lishnu Tech is where ideas become products.</p>
            </div>
          </RevealUp>
          <RevealUp delay={0.2}>
            <div className="lt-team-grid">
              <div className="lt-team-card lt-main">
                <img src={team3} alt="Lishnu Tech Team" />
                <div className="lt-card-label">The Full Team</div>
              </div>
              <div className="lt-team-right">
                <div className="lt-team-card">
                  <img src={team1} alt="Lishnu Tech Team" />
                  <div className="lt-card-label">Team Gathering</div>
                </div>
                <div className="lt-team-card">
                  <img src={team2} alt="Lishnu Tech Team" />
                  <div className="lt-card-label">Company Event</div>
                </div>
              </div>
            </div>
          </RevealUp>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-sec">
        <div className="container">
          <RevealUp>
            <div className="cta-block">
              <div className="cta-label">Let's Work Together</div>
              <h2>Have a project<br />in mind?</h2>
              <p>Whether it's a startup idea, a system that needs rethinking, or a partnership — let's make something exceptional.</p>
              <Link to="/contact" className="btn-fill btn-fill-lg">
                <span className="btn-fill-bg" />
                <span className="btn-fill-text">Start a Conversation</span>
              </Link>
            </div>
          </RevealUp>
        </div>
      </section>

      <Footer />
    </PageTransition>
  )
}
