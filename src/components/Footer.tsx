import { Link, useLocation } from 'react-router-dom';

export function Footer() {
  const location = useLocation();
  if (location.pathname.startsWith('/tool-viewer/')) {
    return null;
  }

  return (
    <footer>
      <div className="footer-logo">Ain<span>ario</span></div>
      <p>© 2026 Ainario. AI Agency. Morocco · Southeast Asia · Global.</p>
      <div className="footer-links">
        <Link to="/#services">Services</Link>
        <Link to="/#capabilities">Capabilities</Link>
        <Link to="/templates">Templates</Link>
        <Link to="/#process">Process</Link>
        <a href="mailto:hello@ainario.com">Contact</a>
      </div>
    </footer>
  );
}
