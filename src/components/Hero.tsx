import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="hero">
      <div className="hero-bg"></div>
      <div className="grid-lines"></div>
      <div className="floating-orb orb1"></div>
      <div className="floating-orb orb2"></div>
      <div className="floating-orb orb3"></div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          AI-First Agency · Worldwide
        </div>
        <h1>
          We Build AI<br />
          <span className="line2">That Works.</span><br />
          <span className="line3">For Real.</span>
        </h1>
        <p className="hero-sub">
          Apps, agents, chatbots, automation—<br />
          production-grade AI solutions, shipped fast.
        </p>
        <div className="hero-actions">
          <Link to="/#contact" className="btn-primary">Start Your Project</Link>
          <Link to="/#services" className="btn-ghost">Explore Services</Link>
        </div>
      </div>
    </div>
  );
}
