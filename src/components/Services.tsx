export function Services() {
  return (
    <section id="services">
      <p className="section-label reveal">What We Build</p>
      <h2 className="section-title reveal">Six Ways We Deploy<br />AI For Your Business</h2>
      <p className="section-sub reveal">From intelligent mobile apps to fully autonomous agents—every solution is production-ready, fast, and built to scale.</p>

      <div className="services-grid reveal">
        <div className="service-card">
          <p className="service-num">01</p>
          <span className="service-icon">📱</span>
          <h3>AI Mobile Apps</h3>
          <p>React Native & Flutter apps with GPT-4, Gemini, voice, camera AI, and real-time processing. iOS + Android, deployed to stores.</p>
          <div className="service-tags">
            <span className="tag">React Native</span>
            <span className="tag">Flutter</span>
            <span className="tag green">GPT-4 Vision</span>
          </div>
        </div>

        <div className="service-card">
          <p className="service-num">02</p>
          <span className="service-icon">🌐</span>
          <h3>AI Web Platforms</h3>
          <p>Next.js SaaS products, e-commerce, marketplaces, and agency sites with embedded AI features, CMS, and Stripe payments.</p>
          <div className="service-tags">
            <span className="tag">Next.js 14</span>
            <span className="tag">Supabase</span>
            <span className="tag green">Stripe</span>
          </div>
        </div>

        <div className="service-card">
          <p className="service-num">03</p>
          <span className="service-icon">🤖</span>
          <h3>AI Chatbots</h3>
          <p>Intelligent bots for WhatsApp, Telegram, Web, Discord, and Messenger. Custom knowledge bases, CRM integration, human handoff.</p>
          <div className="service-tags">
            <span className="tag">WhatsApp</span>
            <span className="tag">Telegram</span>
            <span className="tag pink">RAG</span>
          </div>
        </div>

        <div className="service-card">
          <p className="service-num">04</p>
          <span className="service-icon">⚡</span>
          <h3>Autonomous Agents</h3>
          <p>Multi-step AI agents that research, write, outreach, analyze, and execute tasks automatically—with full audit trails and monitoring.</p>
          <div className="service-tags">
            <span className="tag">LangChain</span>
            <span className="tag">Playwright</span>
            <span className="tag green">Multi-Agent</span>
          </div>
        </div>

        <div className="service-card">
          <p className="service-num">05</p>
          <span className="service-icon">📡</span>
          <h3>Social Media AI</h3>
          <p>Fully autonomous social agents that generate content, post on schedule, engage with followers, and report performance daily.</p>
          <div className="service-tags">
            <span className="tag">Instagram</span>
            <span className="tag">TikTok</span>
            <span className="tag pink">LinkedIn</span>
          </div>
        </div>

        <div className="service-card">
          <p className="service-num">06</p>
          <span className="service-icon">🔧</span>
          <h3>Custom AI Solutions</h3>
          <p>Predictive analytics, document intelligence, recommendation engines, process automation—any AI need, scoped and shipped.</p>
          <div className="service-tags">
            <span className="tag">Custom ML</span>
            <span className="tag">APIs</span>
            <span className="tag green">Any Stack</span>
          </div>
        </div>
      </div>

      <div className="stack-row reveal">
        {["OpenAI GPT-4", "Anthropic Claude", "Google Gemini", "Hugging Face", "TensorFlow Lite", "LangChain", "LlamaIndex", "Pinecone", "Supabase", "Firebase", "Vercel", "AWS", "Node.js", "Python", "Playwright"].map(tech => (
          <span key={tech} className="stack-pill">{tech}</span>
        ))}
      </div>
    </section>
  );
}
