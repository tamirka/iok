import { Link } from 'react-router-dom';

export function CTA() {
  return (
    <div className="cta-section" id="contact">
      <div className="cta-inner reveal">
        <h2>Ready to Build<br />Something Real?</h2>
        <p>Tell us what you need. We'll tell you how to ship it.</p>
        <div className="cta-actions">
          <a href="mailto:hello@ainario.com" className="btn-primary">Start a Conversation</a>
          <Link to="/#services" className="btn-ghost">View Services</Link>
        </div>
      </div>
    </div>
  );
}
