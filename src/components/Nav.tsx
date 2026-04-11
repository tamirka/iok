import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Nav() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  if (location.pathname.startsWith('/tool-viewer/') || location.pathname.startsWith('/portfolio-viewer/')) {
    return null;
  }

  return (
    <>
      <nav>
        <Link to="/" className="logo">Ain<span>ario</span></Link>
        <ul className="desktop-nav">
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/ai-services" className={location.pathname === '/ai-services' ? 'active' : ''}>AI Services</Link></li>
          <li><Link to="/filmmaking" className={location.pathname === '/filmmaking' ? 'active' : ''}>Filmmaking</Link></li>
          <li><Link to="/templates" className={location.pathname === '/templates' ? 'active' : ''}>Templates</Link></li>
          <li><Link to="/tools" className={location.pathname === '/tools' ? 'active' : ''}>Tools</Link></li>
          <li><a href="/#contact" className="nav-cta">Start a Project</a></li>
        </ul>
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
          <li><Link to="/ai-services" className={location.pathname === '/ai-services' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>AI Services</Link></li>
          <li><Link to="/filmmaking" className={location.pathname === '/filmmaking' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Filmmaking</Link></li>
          <li><Link to="/templates" className={location.pathname === '/templates' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Templates</Link></li>
          <li><Link to="/tools" className={location.pathname === '/tools' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Tools</Link></li>
          <li><a href="/#contact" className="nav-cta" onClick={() => setIsMobileMenuOpen(false)}>Start a Project</a></li>
        </ul>
      </div>
    </>
  );
}
