import { Link, useLocation } from 'react-router-dom';

export function Footer() {
  const location = useLocation();
  if (location.pathname === '/' || location.pathname.startsWith('/tool-viewer/') || location.pathname.startsWith('/portfolio-viewer/')) {
    return null;
  }

  return (
    <footer>
      <div className="footer-logo">Ain<span>ario</span></div>
      <p>© 2026 Ainario. AI Agency. Morocco · Southeast Asia · Global.</p>
      <div className="footer-links">
        <Link to="/ai-services">AI Services</Link>
        <Link to="/ai-services#services">Services</Link>
        <Link to="/ai-services#capabilities">Capabilities</Link>
        <Link to="/">Home</Link>
        <Link to="/templates">Templates</Link>
        <Link to="/ai-services#process">Process</Link>
        <a href="mailto:hello@ainario.com">Contact</a>
      </div>
    </footer>
  );
}
