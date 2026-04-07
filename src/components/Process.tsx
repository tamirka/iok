export function Process() {
  return (
    <section id="process" style={{ paddingTop: 0 }}>
      <p className="section-label reveal">How We Work</p>
      <h2 className="section-title reveal">Simple Process.<br />Predictable Outcomes.</h2>

      <div className="process-wrap reveal">
        <div className="process-line"></div>
        <div className="process-steps">
          <div className="step">
            <div className="step-dot">01</div>
            <h4>Discovery</h4>
            <p>You share requirements. We scope, recommend, and align on the best solution.</p>
          </div>
          <div className="step">
            <div className="step-dot">02</div>
            <h4>Architecture</h4>
            <p>Technical plan, stack selection, timeline, and milestone breakdown.</p>
          </div>
          <div className="step">
            <div className="step-dot">03</div>
            <h4>Build</h4>
            <p>Fast iteration with clear communication. Updates at every milestone.</p>
          </div>
          <div className="step">
            <div className="step-dot">04</div>
            <h4>Deploy</h4>
            <p>Full deployment, testing, and launch. App stores, hosting, domains included.</p>
          </div>
          <div className="step">
            <div className="step-dot">05</div>
            <h4>Support</h4>
            <p>Post-launch support, bug fixes, and optimization. We don't disappear.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
