import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export const toolsData = [
  {
    id: 5,
    name: "Architecture Image Studio",
    slug: "architecture-image-studio",
    category: "image",
    categoryLabel: "Image AI",
    categoryColor: "blue",
    emoji: "🏛️",
    short: "AI-powered architecture image generation",
    description: "Generate stunning architectural concepts and interior designs using advanced AI models. Perfect for architects, interior designers, and real estate professionals.",
    features: [
      "Exterior and interior generation",
      "Multiple architectural styles",
      "High-resolution output",
      "Lighting and environment controls"
    ],
    stack: ["React", "AI Image Gen", "Tailwind"],
    link: "/tool-viewer/5",
    iframeUrl: "https://architecture-image-studio-635102282857.us-west1.run.app/",
    image: null,
    comingSoon: false
  },
  {
    id: 6,
    name: "Wildlife Image Studio",
    slug: "wildlife-image-studio",
    category: "image",
    categoryLabel: "Image AI",
    categoryColor: "green",
    emoji: "🦁",
    short: "AI-powered wildlife image generation",
    description: "Generate stunning wildlife photography and concepts using advanced AI models. Perfect for nature enthusiasts, photographers, and creators.",
    features: [
      "Realistic wildlife generation",
      "Multiple environments and biomes",
      "High-resolution output",
      "Lighting and camera controls"
    ],
    stack: ["React", "AI Image Gen", "Tailwind"],
    link: "/tool-viewer/6",
    iframeUrl: "https://wildlife-image-studio-635102282857.us-west1.run.app/",
    image: null,
    comingSoon: false
  },
  {
    id: 7,
    name: "Business & Finance Image Studio",
    slug: "business-finance-image-studio",
    category: "image",
    categoryLabel: "Image AI",
    categoryColor: "blue",
    emoji: "📈",
    short: "AI-powered business and finance image generation",
    description: "Generate professional business, finance, and corporate imagery using advanced AI models. Perfect for presentations, reports, and marketing materials.",
    features: [
      "Professional corporate imagery",
      "Financial charts and concepts",
      "High-resolution output",
      "Lighting and style controls"
    ],
    stack: ["React", "AI Image Gen", "Tailwind"],
    link: "/tool-viewer/7",
    iframeUrl: "https://business-finance-image-studio-635102282857.us-west1.run.app",
    image: null,
    comingSoon: false
  },
  {
    id: 8,
    name: "Education Image Studio",
    slug: "education-image-studio",
    category: "image",
    categoryLabel: "Image AI",
    categoryColor: "orange",
    emoji: "🎓",
    short: "AI-powered education and learning image generation",
    description: "Generate engaging educational illustrations, classroom scenes, and e-learning materials using advanced AI models. Perfect for teachers, course creators, and students.",
    features: [
      "Educational illustrations",
      "Classroom and learning scenes",
      "High-resolution output",
      "Style and composition controls"
    ],
    stack: ["React", "AI Image Gen", "Tailwind"],
    link: "/tool-viewer/8",
    iframeUrl: "https://education-image-studio-635102282857.us-west1.run.app",
    image: null,
    comingSoon: false
  },
  {
    id: 9,
    name: "SawtSync Arabic/Darija Transcriber",
    slug: "sawtsync-transcriber",
    category: "audio",
    categoryLabel: "Audio AI",
    categoryColor: "purple",
    emoji: "🎙️",
    short: "AI-powered Arabic and Darija transcription",
    description: "Transcribe Arabic and Darija audio accurately using advanced AI models. Perfect for content creators, journalists, and businesses.",
    features: [
      "Arabic transcription",
      "Darija transcription",
      "High accuracy",
      "Fast processing"
    ],
    stack: ["React", "AI Audio", "Tailwind"],
    link: "/tool-viewer/9",
    iframeUrl: "https://sawtsync-arabic-darija-transcriber-635102282857.us-west1.run.app",
    image: null,
    comingSoon: false
  },
  {
    id: 10,
    name: "Speech Buddy",
    slug: "speech-buddy",
    category: "audio",
    categoryLabel: "Audio AI",
    categoryColor: "purple",
    emoji: "🗣️",
    short: "AI-powered speech companion and analysis",
    description: "Your personal AI speech companion. Analyze, improve, and practice your speech with real-time feedback and advanced audio processing.",
    features: [
      "Real-time speech analysis",
      "Pronunciation feedback",
      "Pacing and tone detection",
      "Interactive practice sessions"
    ],
    stack: ["React", "AI Audio", "Tailwind"],
    link: "/tool-viewer/10",
    iframeUrl: "https://speech-buddy-635102282857.us-west1.run.app",
    image: null,
    comingSoon: false
  },
  {
    id: 11,
    name: "AdGenius Prompt Studio",
    slug: "adgenius-prompt-studio",
    category: "prompt",
    categoryLabel: "Prompt Tools",
    categoryColor: "orange",
    emoji: "🎯",
    short: "AI-powered ad copy and creative prompts",
    description: "Generate high-converting ad copy and creative prompts using advanced AI. Perfect for marketers, agencies, and copywriters looking to scale their campaigns.",
    features: [
      "Ad copy generation",
      "Creative concept prompts",
      "Multiple platform formats",
      "High conversion focus"
    ],
    stack: ["React", "AI Prompts", "Tailwind"],
    link: "/tool-viewer/11",
    iframeUrl: "https://adgenius-prompt-studio-635102282857.us-west1.run.app",
    image: null,
    comingSoon: false
  },
  {
    id: 12,
    name: "Kaftan Studio AI",
    slug: "kaftan-studio-ai",
    category: "image",
    categoryLabel: "Image AI",
    categoryColor: "blue",
    emoji: "👗",
    short: "AI-powered Kaftan design generation",
    description: "Generate stunning Kaftan designs and fashion concepts using advanced AI models. Perfect for fashion designers, boutiques, and creators.",
    features: [
      "Kaftan design generation",
      "Multiple fashion styles",
      "High-resolution output",
      "Color and pattern controls"
    ],
    stack: ["React", "AI Image Gen", "Tailwind"],
    link: "/tool-viewer/12",
    iframeUrl: "https://kaftan-studio-ai-635102282857.us-west1.run.app",
    image: null,
    comingSoon: false
  },
  {
    id: 13,
    name: "Etsy Listing Generator",
    slug: "etsy-listing-generator",
    category: "content",
    categoryLabel: "Content AI",
    categoryColor: "green",
    emoji: "🛍️",
    short: "AI-powered Etsy listing generation",
    description: "Generate SEO-optimized Etsy product listings, titles, and tags using advanced AI. Perfect for Etsy sellers looking to boost their shop's visibility and sales.",
    features: [
      "SEO-optimized titles",
      "Engaging product descriptions",
      "Relevant tag generation",
      "Conversion-focused copy"
    ],
    stack: ["React", "AI Content", "Tailwind"],
    link: "/tool-viewer/13",
    iframeUrl: "https://etsy-listing-generator-635102282857.us-west1.run.app",
    image: null,
    comingSoon: false
  },
  {
    id: 14,
    name: "MarketForge",
    slug: "marketforge",
    category: "automation",
    categoryLabel: "Automation AI",
    categoryColor: "blue",
    emoji: "📈",
    short: "AI-powered marketing and business forging",
    description: "A comprehensive suite for forging marketing strategies, content, and business analytics using advanced AI.",
    features: [
      "Marketing strategy generation",
      "Content creation",
      "Business analytics",
      "Campaign forging"
    ],
    stack: ["React", "AI Automation", "Tailwind"],
    link: "/tool-viewer/14",
    iframeUrl: "https://marketforge-635102282857.us-west1.run.app",
    image: null,
    comingSoon: false
  }
];

export function Tools() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dbTools, setDbTools] = useState<any[]>([]);
  
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'tools'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tools = snapshot.docs.map(d => {
        const data = d.data();
        const staticMatch = toolsData.find(t => t.id.toString() === data.originalId);
        return { 
          id: d.id, 
          image: data.imageUrl || (staticMatch ? staticMatch.image : ''),
          ...data 
        };
      });
      setDbTools(tools);
    });
    return () => unsubscribe();
  }, []);

  const allTools = [
    ...dbTools,
    ...toolsData.filter(staticT => !dbTools.some(dbT => 
      (dbT.originalId && dbT.originalId.toString() === staticT.id.toString()) || 
      (dbT.title && staticT.name && dbT.title.toLowerCase().trim() === staticT.name.toLowerCase().trim())
    )).map(t => ({
      ...t,
      title: t.name,
      imageUrl: t.image
    }))
  ].map(t => ({
    ...t,
    name: t.title || t.name,
    image: t.imageUrl || t.image
  }));

  useEffect(() => {
    if (slug) {
      const t = allTools.find(x => x.slug === slug || x.id.toString() === slug);
      if (t) {
        document.title = `${t.name} - Ainario Tools`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', t.description || t.short || '');
        } else {
          const meta = document.createElement('meta');
          meta.name = 'description';
          meta.content = t.description || t.short || '';
          document.head.appendChild(meta);
        }
      }
    } else {
      document.title = 'Tools - Ainario AI Agency';
    }
  }, [slug, allTools]);

  const handleBack = () => {
    navigate('/tools');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredTools = allTools.filter(t => {
    const matchFilter = activeFilter === 'all' || t.category === activeFilter;
    const matchSearch = !searchQuery || 
      (t.name || '').toLowerCase().includes(searchQuery) || 
      (t.short || '').toLowerCase().includes(searchQuery) ||
      (t.categoryLabel || '').toLowerCase().includes(searchQuery) ||
      (t.stack || []).some((s: string) => s.toLowerCase().includes(searchQuery));
    return matchFilter && matchSearch;
  });

  // Sort: live first, then coming soon
  const sortedTools = [...filteredTools].sort((a, b) => {
    if (a.comingSoon === b.comingSoon) return 0;
    return a.comingSoon ? 1 : -1;
  });

  if (slug) {
    const t = allTools.find(x => x.slug === slug || x.id.toString() === slug);
    if (!t) return null;

    const related = allTools.filter(x => x.id !== t.id && !x.comingSoon && x.category === t.category).slice(0, 3);
    const allOther = allTools.filter(x => x.id !== t.id && !x.comingSoon).slice(0, 3 - related.length);
    const relatedAll = [...related, ...allOther].slice(0, 3);

    return (
      <div id="page-detail" className="page-in" style={{ display: 'block' }}>
        <span className="detail-back" onClick={handleBack}>Back to Tools</span>

        <div className="detail-hero">
          <div className="detail-meta">
            <p className={`detail-category ${t.categoryColor}`}>{t.categoryLabel}</p>
            <h1 className="detail-title">{t.name}</h1>
            <p className="detail-desc">{t.description}</p>

            <div className="detail-features">
              <h4>What it does</h4>
              {t.features.map((f, i) => (
                <div className="feature-item" key={i}>
                  <span className="feature-check">✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="detail-stack">
              {t.stack.map((s, i) => <span className="detail-tag" key={i}>{s}</span>)}
            </div>

            <div>
              {t.iframeUrl ? (
                <Link to={`/tool-viewer/${t.slug || t.id}`} className="detail-cta">
                  Open Tool
                </Link>
              ) : (
                <a href={t.link} target="_blank" rel="noopener noreferrer" className="detail-cta">
                  Open Tool
                </a>
              )}
              <a href="/#contact" className="detail-cta-ghost">Request Custom Version</a>
            </div>
          </div>

          <div className="detail-image-panel">
            <div className="detail-main-image">
              {t.image ? (
                <img src={t.image} alt={t.name} />
              ) : (
                <div className="detail-placeholder">{t.emoji}</div>
              )}
            </div>
            <div className="detail-thumbs">
              <div className="detail-thumb active">{t.emoji}</div>
              <div className="detail-thumb">📐</div>
              <div className="detail-thumb">⚙️</div>
            </div>
          </div>
        </div>

        <div className="related-section">
          <h3>More Tools</h3>
          <div className="related-grid">
            {relatedAll.map(r => (
              <Link to={`/tools/${r.slug || r.id}`} className="tool-card" key={r.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card-image">
                  {r.image ? (
                    <img src={r.image} alt={r.name} loading="lazy" />
                  ) : (
                    <div className="card-image-placeholder">{r.emoji}</div>
                  )}
                  <div className="card-overlay"><div className="overlay-btn">Explore Tool</div></div>
                </div>
                <div className="card-body">
                  <p className={`card-category ${r.categoryColor}`}>{r.categoryLabel}</p>
                  <h3>{r.name}</h3>
                  <p>{r.short}</p>
                </div>
                <div className="card-footer">
                  <div className="card-stack">
                    {r.stack.slice(0, 2).map((s, i) => <span className="mini-tag" key={i}>{s}</span>)}
                  </div>
                  <span className="card-arrow">↗</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="page-grid" style={{ display: 'block' }}>
      <div className="grid-hero">
        <div className="grid-hero-bg" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,229,192,0.12) 0%, transparent 70%)' }}></div>
        <div className="grid-hero-inner">
          <p className="page-label">Ainario Tools</p>
          <h1>AI Tools We<br/><em>Actually Use</em></h1>
          <p>A curated set of standalone tools built by Ainario — free to try, ready to embed, or available as a starting point for your product.</p>
        </div>
      </div>

      <div className="filters-bar">
        <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All</button>
        <button className={`filter-btn ${activeFilter === 'image' ? 'active' : ''}`} onClick={() => setActiveFilter('image')}>Image AI</button>
        <button className={`filter-btn ${activeFilter === 'audio' ? 'active' : ''}`} onClick={() => setActiveFilter('audio')}>Audio AI</button>
        <button className={`filter-btn ${activeFilter === 'prompt' ? 'active' : ''}`} onClick={() => setActiveFilter('prompt')}>Prompt Tools</button>
        <button className={`filter-btn ${activeFilter === 'automation' ? 'active' : ''}`} onClick={() => setActiveFilter('automation')}>Automation</button>
        <button className={`filter-btn ${activeFilter === 'content' ? 'active' : ''}`} onClick={() => setActiveFilter('content')}>Content</button>
        <button className={`filter-btn ${activeFilter === 'analytics' ? 'active' : ''}`} onClick={() => setActiveFilter('analytics')}>Analytics</button>
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input 
            className="search-input" 
            type="text" 
            placeholder="Search tools..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <span className="count-badge">
          {filteredTools.filter(t => !t.comingSoon).length} tool{filteredTools.filter(t => !t.comingSoon).length !== 1 ? 's' : ''}
          {filteredTools.some(t => t.comingSoon) && ` · ${filteredTools.filter(t => t.comingSoon).length} coming soon`}
        </span>
      </div>

      <div className="tools-grid">
        {sortedTools.length === 0 ? (
          <div className="empty-state">
            <span style={{ fontSize: '40px' }}>🔍</span>
            <p>No tools found. Try a different filter.</p>
          </div>
        ) : (
          sortedTools.map((t, i) => {
            const inner = (
              <>
                <div className="card-image">
                  {t.image ? (
                    <img src={t.image} alt={t.name} loading="lazy" />
                  ) : (
                    <div className="card-image-placeholder">{t.emoji}</div>
                  )}
                  {t.comingSoon && <div className="coming-badge">Coming Soon</div>}
                  <div className="card-overlay"><div className="overlay-btn">Explore Tool</div></div>
                </div>
                <div className="card-body">
                  <p className={`card-category ${t.categoryColor}`}>{t.categoryLabel}</p>
                  <h3>{t.name}</h3>
                  <p>{t.short}</p>
                </div>
                <div className="card-footer">
                  <div className="card-stack">
                    {t.stack.slice(0, 3).map((s, j) => <span className="mini-tag" key={j}>{s}</span>)}
                  </div>
                  <span className="card-arrow">↗</span>
                </div>
              </>
            );

            if (t.comingSoon) {
              return (
                <div 
                  className={`tool-card card-in coming-soon`} 
                  style={{ animationDelay: `${i * 40}ms` }} 
                  key={t.id}
                >
                  {inner}
                </div>
              );
            }

            return (
              <Link 
                to={`/tools/${t.slug || t.id}`}
                className={`tool-card card-in`} 
                style={{ animationDelay: `${i * 40}ms`, textDecoration: 'none', color: 'inherit' }} 
                key={t.id}
              >
                {inner}
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
