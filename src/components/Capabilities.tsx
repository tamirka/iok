import { useEffect, useState } from 'react';

export function Capabilities() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prev => prev + 1);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="capabilities" id="capabilities">
      <div className="cap-inner">
        <div>
          <p className="section-label reveal">Deep Capabilities</p>
          <h2 className="section-title reveal">Built By Builders.<br />Not Theorists.</h2>
          <p className="section-sub reveal">We've shipped AI products that real users depend on daily. Every integration is production-tested.</p>

          <div className="cap-list" style={{ marginTop: '40px' }}>
            <div className="cap-item reveal">
              <span className="cap-num">01</span>
              <div className="cap-text">
                <h4>Multimodal AI — Text, Voice, Vision</h4>
                <p>GPT-4 Vision, Whisper voice I/O, image generation, document understanding. Full multimodal pipelines.</p>
              </div>
            </div>
            <div className="cap-item reveal">
              <span className="cap-num">02</span>
              <div className="cap-text">
                <h4>RAG & Knowledge Bases</h4>
                <p>Vector embeddings, semantic search, PDF/doc ingestion. Chatbots that actually know your business.</p>
              </div>
            </div>
            <div className="cap-item reveal">
              <span className="cap-num">03</span>
              <div className="cap-text">
                <h4>Agentic Automation</h4>
                <p>Playwright-based browser agents, API orchestration, multi-step reasoning with memory and retry logic.</p>
              </div>
            </div>
            <div className="cap-item reveal">
              <span className="cap-num">04</span>
              <div className="cap-text">
                <h4>Full-Stack Deployment</h4>
                <p>React Native, Next.js, Python/Node backends, Supabase, Vercel, App Store—end to end, no handoff gaps.</p>
              </div>
            </div>
            <div className="cap-item reveal">
              <span className="cap-num">05</span>
              <div className="cap-text">
                <h4>Multilingual Reach</h4>
                <p>English, French, Arabic. Serving clients globally from Morocco and Southeast Asia.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cap-visual reveal">
          <div className="cap-visual-inner">
            <div className="terminal" key={key}>
              <div className="terminal-header">
                <div className="dot r"></div>
                <div className="dot y"></div>
                <div className="dot g"></div>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginLeft: '8px' }}>ainario agent</span>
              </div>
              <div className="terminal-body">
                <div className="t-line t1"><span className="t-prompt">▶</span> <span className="t-cmd">init agent --task=outreach</span></div>
                <div className="t-line t2"><span className="t-output">↳ Loading knowledge base...</span></div>
                <div className="t-line t3"><span className="t-output">↳ Connecting tools: [web, email, crm]</span></div>
                <div className="t-line t4"><span className="t-success">✓ Agent ready. 3 tools loaded.</span></div>
                <div className="t-line t5"><span className="t-prompt">▶</span> <span className="t-cmd">run --targets=leads.csv</span></div>
                <div className="t-line t6"><span className="t-success">✓ 24 leads processed · 18 emails sent</span></div>
                <div style={{ marginTop: '8px' }}><span className="t-prompt">▶</span> <span className="cursor-blink"></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
