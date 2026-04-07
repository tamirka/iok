import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export function Filmmaking() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="filmmaking-page">
      {/* HERO SECTION */}
      <section className="hero" style={{ minHeight: '90vh' }}>
        <div className="hero-bg"></div>
        <div className="grid-lines"></div>
        <div className="floating-orb orb1"></div>
        <div className="floating-orb orb2"></div>
        
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-badge"
          >
            <span className="badge-dot"></span>
            AI Animation Filmmaking Studio
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Frame <br/>
            <span className="line2">by Frame</span> <br/>
            <span className="line3">Reimagined</span>
          </motion.h1>
          
          <motion.p 
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From a single prompt to a finished film— cinematic AI animation for music videos, brand films, explainers, and everything in between.
          </motion.p>
          
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a href="#contact" className="btn-primary">Commission a Film</a>
            <a href="#services" className="btn-ghost">Explore Services</a>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-[60px]">
              <div className="marquee-item">Music Videos</div>
              <div className="marquee-item">Brand Films</div>
              <div className="marquee-item">Explainer Videos</div>
              <div className="marquee-item">Claymation</div>
              <div className="marquee-item">Character Animation</div>
              <div className="marquee-item">Social Ads</div>
              <div className="marquee-item">Cinematic Trailers</div>
              <div className="marquee-item">AI Prompt Engineering</div>
              <div className="marquee-item">Scene-by-Scene Direction</div>
            </div>
          ))}
        </div>
      </div>

      {/* TWO WAYS TO WORK */}
      <section id="services">
        <p className="section-label">What We Do</p>
        <h2 className="section-title">Two Ways to Work <br/>with Cinari</h2>
        <p className="section-sub">Commission a full production or just the precision prompts. Either way, every frame is intentional.</p>
        
        <div className="services-grid">
          <motion.div 
            whileHover={{ backgroundColor: 'rgba(124,106,255,0.08)' }}
            className="service-card"
          >
            <span className="service-num">01</span>
            <span className="service-icon">🎬</span>
            <h3>Full AI Animation Production</h3>
            <p>We handle the entire pipeline—from creative direction and storyboarding to prompt engineering, generation, editing, and final delivery. You receive a finished film.</p>
            <div className="detail-features mt-6">
              <div className="feature-item"><span className="feature-check">✓</span><span>Creative direction & script breakdown</span></div>
              <div className="feature-item"><span className="feature-check">✓</span><span>Scene-by-scene storyboard</span></div>
              <div className="feature-item"><span className="feature-check">✓</span><span>AI generation across multiple tools</span></div>
              <div className="feature-item"><span className="feature-check">✓</span><span>Character & style consistency</span></div>
              <div className="feature-item"><span className="feature-check">✓</span><span>Music sync & color grading</span></div>
              <div className="feature-item"><span className="feature-check">✓</span><span>Final edit + delivery in 4K</span></div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ backgroundColor: 'rgba(124,106,255,0.08)' }}
            className="service-card"
          >
            <span className="service-num">02</span>
            <span className="service-icon">✍️</span>
            <h3>Precision Prompt Engineering</h3>
            <p>For studios, creators, and agencies who generate their own footage but need cinematic-grade prompts. We deliver structured, scene-by-scene prompt packages ready to run.</p>
            <div className="detail-features mt-6">
              <div className="feature-item"><span className="feature-check">✓</span><span>Scene analysis & prompt architecture</span></div>
              <div className="feature-item"><span className="feature-check">✓</span><span>Camera movement & lens language</span></div>
              <div className="feature-item"><span className="feature-check">✓</span><span>Character description consistency</span></div>
              <div className="feature-item"><span className="feature-check">✓</span><span>JSON or paragraph format output</span></div>
              <div className="feature-item"><span className="feature-check">✓</span><span>Tool-specific optimization (Seedance, Kling, Veo…)</span></div>
              <div className="feature-item"><span className="feature-check">✓</span><span>Keyframe chaining guidance</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TOOLS SECTION */}
      <section className="capabilities">
        <div className="cap-inner">
          <div className="cap-content">
            <p className="section-label">Tech Stack</p>
            <h2 className="section-title">Generation Tools <br/>We Work With</h2>
            <div className="stack-row">
              <span className="stack-pill">🌱 Seedance 2.0 (Primary)</span>
              <span className="stack-pill">🪁 Kling (Camera Motion)</span>
              <span className="stack-pill">🎥 Veo (Realism)</span>
              <span className="stack-pill">Tracks Runway (Motion FX)</span>
              <span className="stack-pill">⚡ LTX (Speed)</span>
              <span className="stack-pill">🌊 Wan (Stylized)</span>
              <span className="stack-pill">🎞️ Hailuo AI (Keyframes)</span>
            </div>
          </div>
          <div className="cap-visual">
            <div className="cap-visual-inner">
              <div className="terminal">
                <div className="terminal-header">
                  <div className="dot r"></div>
                  <div className="dot y"></div>
                  <div className="dot g"></div>
                </div>
                <div className="terminal-body">
                  <div className="t-line t1"><span className="t-prompt">$</span> <span className="t-cmd">cinari --init production</span></div>
                  <div className="t-line t2"><span className="t-output">Initializing pipeline...</span></div>
                  <div className="t-line t3"><span className="t-prompt">$</span> <span className="t-cmd">cinari --generate --engine seedance</span></div>
                  <div className="t-line t4"><span className="t-output">Generating scene 01: cinematic_wide_shot...</span></div>
                  <div className="t-line t5"><span className="t-output t-success">Success: Frame consistency 98.4%</span></div>
                  <div className="t-line t6"><span className="t-prompt">$</span> <span className="cursor-blink"></span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section>
        <p className="section-label">What You Get</p>
        <h2 className="section-title">Every Frame <br/>Deliberate</h2>
        
        <div className="why-grid">
          <div className="why-card">
            <span className="service-icon">🎭</span>
            <h4>Character Consistency</h4>
            <p>Persistent character design across scenes using reference assets and structured per-shot descriptions. No drift, no mismatched faces.</p>
          </div>
          <div className="why-card">
            <span className="service-icon">🎞️</span>
            <h4>Cinematic Language</h4>
            <p>Camera movement motivated by emotion. The Five C's, mise-en-scène, motivated cuts. Every shot is directed, not generated randomly.</p>
          </div>
          <div className="why-card">
            <span className="service-icon">🎵</span>
            <h4>Music Video Direction</h4>
            <p>Beat-synced scene breakdowns, lyric-driven imagery, cross-clip continuity. Built for artists releasing visual content with their music.</p>
          </div>
          <div className="why-card">
            <span className="service-icon">🧸</span>
            <h4>Claymation & Style</h4>
            <p>Textured, tactile AI animation that mimics physical animation. Character rigs, subtle wobble, and material feel baked into every prompt.</p>
          </div>
          <div className="why-card">
            <span className="service-icon">📐</span>
            <h4>Explainer Structure</h4>
            <p>Clear scene-by-scene narrative flow. Complex ideas rendered simply. Optimized for product launches, SaaS onboarding, and brand education.</p>
          </div>
          <div className="why-card">
            <span className="service-icon">⚡</span>
            <h4>Fast Turnaround</h4>
            <p>Prompt packages in 48–72 hours. Full productions scoped clearly upfront. No ambiguous timelines, no disappearing after kickoff.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="capabilities" style={{ background: 'var(--bg)' }}>
        <div className="cap-inner">
          <div className="cap-visual">
             <div className="cap-visual-inner" style={{ background: 'radial-gradient(circle, rgba(0,229,192,0.1), transparent)' }}>
                <div className="flex flex-col gap-4 p-8 bg-surface rounded-xl border border-border w-80">
                  <div className="h-2 w-full bg-accent/20 rounded"></div>
                  <div className="h-2 w-3/4 bg-accent/20 rounded"></div>
                  <div className="h-2 w-1/2 bg-accent/20 rounded"></div>
                  <div className="mt-4 flex justify-between">
                    <div className="w-12 h-12 rounded bg-accent"></div>
                    <div className="w-12 h-12 rounded bg-accent2"></div>
                    <div className="w-12 h-12 rounded bg-accent3"></div>
                  </div>
                </div>
             </div>
          </div>
          <div className="cap-content">
            <p className="section-label">How It Works</p>
            <h2 className="section-title">The Production <br/>Pipeline</h2>
            <div className="cap-list">
              <div className="cap-item">
                <span className="cap-num">01</span>
                <div className="cap-text">
                  <h4>Brief & Vision</h4>
                  <p>You share your concept, references, music, and mood. We align on style, duration, platform, and deliverable format.</p>
                </div>
              </div>
              <div className="cap-item">
                <span className="cap-num">02</span>
                <div className="cap-text">
                  <h4>Storyboard & Breakdown</h4>
                  <p>Every scene mapped out—shot list, camera language, character descriptions, color palette. A written film before it's generated.</p>
                </div>
              </div>
              <div className="cap-item">
                <span className="cap-num">03</span>
                <div className="cap-text">
                  <h4>Prompt Architecture</h4>
                  <p>Scene-by-scene prompts crafted with precision. Tool selection per shot. Keyframe chaining for continuity.</p>
                </div>
              </div>
              <div className="cap-item">
                <span className="cap-num">04</span>
                <div className="cap-text">
                  <h4>Generation & Audit</h4>
                  <p>Footage generated, reviewed shot by shot. Failures regenerated. Character consistency verified.</p>
                </div>
              </div>
              <div className="cap-item">
                <span className="cap-num">05</span>
                <div className="cap-text">
                  <h4>Edit & Delivery</h4>
                  <p>Assembled, color-graded, music-synced, and exported. Delivered in 4K, social crop, or web-optimized.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMATS */}
      <section>
        <p className="section-label">Formats</p>
        <h2 className="section-title">Films We <br/>Make</h2>
        
        <div className="services-grid">
          <div className="service-card">
            <span className="service-icon">🎵</span>
            <h3>Music Videos</h3>
            <p>Visual storytelling synced to your track. Narrative, abstract, or lyric-driven.</p>
          </div>
          <div className="service-card">
            <span className="service-icon">🏢</span>
            <h3>Brand Films</h3>
            <p>Cinematic brand identity videos. Product launches, manifestos, origin stories.</p>
          </div>
          <div className="service-card">
            <span className="service-icon">💡</span>
            <h3>Explainers</h3>
            <p>Complex ideas made visual. SaaS, fintech, health, and product onboarding.</p>
          </div>
          <div className="service-card">
            <span className="service-icon">🧸</span>
            <h3>Claymation</h3>
            <p>Handcrafted-feel AI animation. Tactile, warm, and deeply memorable.</p>
          </div>
          <div className="service-card">
            <span className="service-icon">📱</span>
            <h3>Social Ads</h3>
            <p>Short-form vertical content built for Instagram, TikTok, and YouTube Shorts.</p>
          </div>
          <div className="service-card">
            <span className="service-icon">🎬</span>
            <h3>Cinematic Trailers</h3>
            <p>High-impact teasers for films, games, or large-scale project announcements.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <div className="cta-section" id="contact">
        <div className="cta-inner">
          <h2>Your Film Starts with a <br/>Conversation</h2>
          <p>Tell us what you're making. We'll tell you how to make it unforgettable.</p>
          <div className="cta-actions">
            <a href="mailto:hello@cinari.ai" className="btn-primary">Start a Production</a>
            <Link to="/templates" className="btn-ghost">View Templates</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
