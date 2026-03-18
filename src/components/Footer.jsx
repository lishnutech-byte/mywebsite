import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="ft-grid">
          <div className="ft-brand">
            <div className="ft-logo">NT<span>.</span></div>
            <p>CEO & Co-Founder at Lishnu Tech.<br />Based in Kathmandu, Nepal.</p>
          </div>
          <div className="ft-col">
            <h5>Pages</h5>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/experience">Experience</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="ft-col">
            <h5>Connect</h5>
            <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="#" target="_blank" rel="noreferrer">GitHub</a>
            <a href="#" target="_blank" rel="noreferrer">Twitter / X</a>
          </div>
        </div>
        <div className="ft-bottom">
          <span>© 2025 Nishan Timilsina. All rights reserved.</span>
          <span>Kathmandu, Nepal</span>
        </div>
      </div>
    </footer>
  )
}
