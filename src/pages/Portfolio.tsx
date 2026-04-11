import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export const portfolioData = [
  {
    id: 1,
    name: "Dalia Rick's Café",
    slug: "dalia-ricks-cafe",
    category: "Restaurant",
    categoryColor: "orange",
    emoji: "☕",
    short: "Elegant cafe and restaurant with a garden.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/dalia-ricks-cafe",
    iframeUrl: "https://remix-dalia-ricks-caf-avec-jardin-635102282857.us-west1.run.app",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Zen Thai Spa Casablanca",
    slug: "zen-thai-spa",
    category: "Wellness",
    categoryColor: "green",
    emoji: "💆‍♀️",
    short: "Relaxing Thai spa and wellness center.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/zen-thai-spa",
    iframeUrl: "https://remix-zen-thai-spa-casablanca-635102282857.us-west1.run.app",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Ease Hostel Bangkok",
    slug: "ease-hostel",
    category: "Hospitality",
    categoryColor: "blue",
    emoji: "🛏️",
    short: "Comfortable and modern hostel in Bangkok.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/ease-hostel",
    iframeUrl: "https://remix-ease-hostel-bangkok-635102282857.us-west1.run.app",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "T Hostel Victory Monument",
    slug: "t-hostel",
    category: "Hospitality",
    categoryColor: "blue",
    emoji: "🛏️",
    short: "Conveniently located hostel near Victory Monument.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/t-hostel",
    iframeUrl: "https://remix-t-hostel-victory-monument-635102282857.us-west1.run.app",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Ekkamai Buds & Beds",
    slug: "ekkamai-buds-beds",
    category: "Hospitality",
    categoryColor: "blue",
    emoji: "🛏️",
    short: "Cozy beds and friendly vibes in Ekkamai.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/ekkamai-buds-beds",
    iframeUrl: "https://remix-ekkamai-buds-beds-635102282857.us-west1.run.app",
    image: "https://images.unsplash.com/photo-1522771731478-44eb939aa37a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "The Bob Hostel",
    slug: "the-bob-hostel",
    category: "Hospitality",
    categoryColor: "blue",
    emoji: "🛏️",
    short: "Vibrant and welcoming hostel experience.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/the-bob-hostel",
    iframeUrl: "https://remix-the-bob-hostel-635102282857.us-west1.run.app",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Tian Tian Hostel",
    slug: "tian-tian-hostel",
    category: "Hospitality",
    categoryColor: "blue",
    emoji: "🛏️",
    short: "A peaceful stay in the heart of the city.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/tian-tian-hostel",
    iframeUrl: "https://remix-remix-tian-tian-hostel-635102282857.us-west1.run.app",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Palette The Ex Capital Hotel",
    slug: "palette-ex-capital",
    category: "Hospitality",
    categoryColor: "blue",
    emoji: "🏨",
    short: "Premium hotel experience in Bangkok.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/palette-ex-capital",
    iframeUrl: "https://remix-palette-the-ex-capital-hotel-bangkok-635102282857.us-west1.run.app",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 9,
    name: "Luk Hostel Bangkok",
    slug: "luk-hostel",
    category: "Hospitality",
    categoryColor: "blue",
    emoji: "🛏️",
    short: "Modern and stylish hostel in Bangkok.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/luk-hostel",
    iframeUrl: "https://remix-luk-hostel-bangkok-635102282857.us-west1.run.app",
    image: "https://images.unsplash.com/photo-1522771731478-44eb939aa37a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 10,
    name: "Lobsuek Hostel",
    slug: "lobsuek-hostel",
    category: "Hospitality",
    categoryColor: "blue",
    emoji: "🛏️",
    short: "Authentic and cozy hostel stay.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/lobsuek-hostel",
    iframeUrl: "https://remix-lobsuek-hostel-635102282857.us-west1.run.app",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 11,
    name: "Sylvis Hostel Chiangmai",
    slug: "sylvis-hostel-chiangmai",
    category: "Hospitality",
    categoryColor: "blue",
    emoji: "🛏️",
    short: "A vibrant and welcoming hostel in Chiangmai.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/sylvis-hostel-chiangmai",
    iframeUrl: "https://sylvis-hostel-chiangmai.vercel.app/",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 12,
    name: "Phuket Thailand Travel",
    slug: "phuket-thailand-travel",
    category: "Tourism",
    categoryColor: "blue",
    emoji: "🌴",
    short: "Explore the best of Phuket with True Design.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/phuket-thailand-travel",
    iframeUrl: "https://phuket-thailand-travel-x-true-desig.vercel.app/",
    image: "https://images.unsplash.com/photo-1589394815804-964ce0ff9657?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 13,
    name: "PNT Phuket Roong Siam Pier",
    slug: "pnt-phuket-roong-siam-pier",
    category: "Tourism",
    categoryColor: "blue",
    emoji: "⛵",
    short: "Premium pier and travel services in Phuket.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/pnt-phuket-roong-siam-pier",
    iframeUrl: "https://pnt-phuket-roong-siam-pier.vercel.app/",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 14,
    name: "Phuket Chill Trips",
    slug: "phuket-chill-trips",
    category: "Tourism",
    categoryColor: "blue",
    emoji: "🏖️",
    short: "Relaxing and chill trips around Phuket.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/phuket-chill-trips",
    iframeUrl: "https://phuket-chill-trips.vercel.app/",
    image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 15,
    name: "Prasert Phuket Travel",
    slug: "prasert-phuket-travel",
    category: "Tourism",
    categoryColor: "blue",
    emoji: "🗺️",
    short: "Your trusted travel partner in Phuket.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/prasert-phuket-travel",
    iframeUrl: "https://prasert-phuket-travel.vercel.app/",
    image: "https://images.unsplash.com/photo-1589394815804-964ce0ff9657?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 16,
    name: "C.I.M Tour Phuket",
    slug: "c-i-m-tour-phuket",
    category: "Tourism",
    categoryColor: "blue",
    emoji: "🚤",
    short: "Exciting tours and adventures in Phuket.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/c-i-m-tour-phuket",
    iframeUrl: "https://c-i-m-tour-phuket.vercel.app/",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 17,
    name: "Phuket Best Tours",
    slug: "phuket-best-tours",
    category: "Tourism",
    categoryColor: "blue",
    emoji: "⭐",
    short: "The best tour experiences in Phuket.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/phuket-best-tours",
    iframeUrl: "https://phuket-best-tours.vercel.app/",
    image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 18,
    name: "Phuket Best Tours Golden Key",
    slug: "phuket-best-tours-golden-key",
    category: "Tourism",
    categoryColor: "blue",
    emoji: "🔑",
    short: "Exclusive Golden Key tours in Phuket.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/phuket-best-tours-golden-key",
    iframeUrl: "https://phuket-best-tours-golden-key.vercel.app/",
    image: "https://images.unsplash.com/photo-1589394815804-964ce0ff9657?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 19,
    name: "Coral Grand Divers Koh Tao",
    slug: "coral-grand-divers-koh-tao",
    category: "Tourism",
    categoryColor: "blue",
    emoji: "🤿",
    short: "Premier diving experiences in Koh Tao.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/coral-grand-divers-koh-tao",
    iframeUrl: "https://coral-grand-divers-koh-tao.vercel.app/",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 20,
    name: "Savanna Massage & Spa Krabi",
    slug: "savanna-massage-spa-krabi",
    category: "Wellness",
    categoryColor: "green",
    emoji: "💆",
    short: "Relaxing massage and spa treatments in Krabi.",
    stack: ["React", "Tailwind", "Vite"],
    link: "/portfolio-viewer/savanna-massage-spa-krabi",
    iframeUrl: "https://savanna-massage-spa-krabi.vercel.app/",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80"
  }
];

export function Portfolio() {
  const [dbPortfolio, setDbPortfolio] = useState<any[]>([]);

  useEffect(() => {
    document.title = 'Thailand Hostel & Tourism Web Services | Ainario';
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const portfolio = snapshot.docs.map(d => {
        const data = d.data();
        const staticMatch = portfolioData.find(p => p.id.toString() === data.originalId);
        return { 
          id: d.id, 
          image: data.imageUrl || (staticMatch ? staticMatch.image : ''),
          ...data 
        };
      });
      setDbPortfolio(portfolio);
    });
    return () => unsubscribe();
  }, []);

  const allPortfolio = [
    ...dbPortfolio,
    ...portfolioData.filter(staticP => !dbPortfolio.some(dbP => 
      (dbP.originalId && dbP.originalId.toString() === staticP.id.toString()) || 
      (dbP.title && staticP.name && dbP.title.toLowerCase().trim() === staticP.name.toLowerCase().trim())
    )).map(p => ({
      ...p,
      title: p.name,
      imageUrl: p.image
    }))
  ].map(p => ({
    ...p,
    name: p.title || p.name,
    image: p.imageUrl || p.image,
    link: p.link || `/portfolio-viewer/${p.slug}`
  }));

  const displayPortfolio = allPortfolio;

  const whatsappLink = "https://wa.me/66921818962?text=Hi,%20I'm%20interested%20in%20a%20website%20for%20my%20hostel";

  return (
    <div className="landing-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
        
        .landing-page {
          font-family: 'Inter', sans-serif;
          background-color: #0a0a0a;
          color: #ffffff;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .landing-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 5%;
          background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(10px);
          z-index: 1000;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .landing-logo {
          font-size: 24px;
          font-weight: 900;
          color: #ffffff;
          text-decoration: none;
          letter-spacing: -0.5px;
        }

        .landing-logo span {
          color: #7B5CF0;
        }

        .wa-btn {
          background-color: #25D366;
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.2s, box-shadow 0.2s;
          border: none;
          cursor: pointer;
        }

        .wa-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
        }

        .hero-section {
          padding: 150px 5% 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
        }

        .hero-bg-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80vw;
          height: 80vh;
          background: radial-gradient(circle, rgba(123,92,240,0.15) 0%, rgba(10,10,10,0) 70%);
          z-index: 0;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
        }

        .hero-headline {
          font-size: clamp(40px, 6vw, 64px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -1px;
        }

        .hero-headline span {
          color: #F5A623;
        }

        .hero-sub {
          font-size: clamp(18px, 2vw, 22px);
          color: #a0a0a0;
          margin-bottom: 40px;
          line-height: 1.5;
        }

        .hero-sub strong {
          color: #ffffff;
        }

        .micro-copy {
          font-size: 14px;
          color: #888;
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .pain-section {
          padding: 80px 5%;
          background: #111;
        }

        .section-title {
          text-align: center;
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 48px;
        }

        .pain-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .pain-card {
          background: #1a1a1a;
          padding: 32px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .pain-card h3 {
          font-size: 20px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pain-card p {
          color: #a0a0a0;
          line-height: 1.6;
        }

        .trust-bar {
          padding: 40px 5%;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
          background: #0a0a0a;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #ccc;
        }

        .trust-item span {
          color: #7B5CF0;
        }

        .services-section {
          padding: 100px 5%;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .service-card {
          background: linear-gradient(180deg, #1a1a1a 0%, #111 100%);
          padding: 40px;
          border-radius: 24px;
          border: 1px solid rgba(123,92,240,0.2);
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 4px;
          background: #7B5CF0;
        }

        .service-card h3 {
          font-size: 24px;
          margin-bottom: 16px;
        }

        .service-card p {
          color: #a0a0a0;
          line-height: 1.6;
        }

        .portfolio-section {
          padding: 100px 5%;
          background: #111;
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .portfolio-card {
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 4/3;
          display: block;
          text-decoration: none;
        }

        .portfolio-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .portfolio-card:hover img {
          transform: scale(1.05);
        }

        .portfolio-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 30px 20px 20px;
          background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%);
          color: white;
        }

        .portfolio-tag {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #7B5CF0;
          font-weight: 800;
          margin-bottom: 4px;
          display: block;
        }

        .portfolio-title {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
        }

        .how-it-works {
          padding: 100px 5%;
        }

        .steps-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
          max-width: 800px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .steps-container {
            flex-direction: row;
          }
        }

        .step {
          flex: 1;
          text-align: left;
        }

        .step-num {
          font-size: 48px;
          font-weight: 900;
          color: rgba(123,92,240,0.3);
          margin-bottom: 16px;
          line-height: 1;
        }

        .step h3 {
          font-size: 20px;
          margin-bottom: 12px;
        }

        .step p {
          color: #a0a0a0;
          line-height: 1.6;
        }

        .pricing-section {
          padding: 100px 5%;
          background: #111;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          max-width: 800px;
          margin: 0 auto;
        }

        .pricing-card {
          background: #1a1a1a;
          padding: 40px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.05);
          text-align: center;
        }

        .pricing-card.featured {
          border-color: #7B5CF0;
          box-shadow: 0 0 40px rgba(123,92,240,0.1);
        }

        .price {
          font-size: 48px;
          font-weight: 900;
          margin: 24px 0;
          color: #ffffff;
        }

        .price span {
          font-size: 20px;
          color: #888;
        }

        .final-cta {
          padding: 120px 5%;
          text-align: center;
          background: #7B5CF0;
          position: relative;
          overflow: hidden;
          border-top: 4px solid #F5A623;
        }

        .final-cta h2 {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 900;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .final-cta p {
          font-size: 20px;
          margin-bottom: 40px;
          opacity: 0.9;
          position: relative;
          z-index: 1;
        }

        .landing-footer {
          padding: 60px 5%;
          text-align: center;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .landing-footer p {
          color: #666;
          margin-top: 24px;
          font-size: 14px;
        }

        .floating-wa {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 60px;
          height: 60px;
          background: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
          z-index: 1000;
          transition: transform 0.2s;
        }

        .floating-wa:hover {
          transform: scale(1.1);
        }

        .floating-wa svg {
          width: 32px;
          height: 32px;
          fill: white;
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-bg-glow"></div>
        <div className="hero-content">
          <h1 className="hero-headline">Your hostel online.<br/><span>In 24 hours.</span></h1>
          <p className="hero-sub">We build fast, beautiful websites for hostels and guesthouses across Thailand — so guests find you on Google and contact you directly on WhatsApp.</p>
          
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="wa-btn" style={{ fontSize: '18px', padding: '16px 32px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Get Your Free Website Quote on WhatsApp
          </a>
          <div className="micro-copy">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            No commitment · Reply within 1 hour · English & Thai supported
          </div>
        </div>
      </section>

      <section className="pain-section">
        <h2 className="section-title">Does This Sound Familiar?</h2>
        <div className="pain-grid">
          <div className="pain-card">
            <h3>🏨 Invisible on Google</h3>
            <p>Backpackers are searching "hostel in Chiang Mai" right now. If you don't have a website, you don't exist to them.</p>
          </div>
          <div className="pain-card">
            <h3>📱 Your Online Presence Doesn't Match Your Vibe</h3>
            <p>Your hostel looks amazing in person. But guests judging you online see an outdated page — or nothing at all.</p>
          </div>
          <div className="pain-card">
            <h3>💬 No Easy Way for Guests to Reach You Directly</h3>
            <p>Most hostels have no simple way for guests to ask questions, check availability or contact them outside of OTA platforms.</p>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '20px', fontWeight: 'bold', color: '#7B5CF0' }}>We fix all of this. Fast.</p>
      </section>

      <div className="trust-bar">
        <div className="trust-item"><span>★</span> 8+ Hospitality Websites Built</div>
        <div className="trust-item"><span>★</span> Thailand-based clients</div>
        <div className="trust-item"><span>★</span> Avg. 7–10 day delivery</div>
        <div className="trust-item"><span>★</span> 100% Client Satisfaction</div>
      </div>

      <section className="services-section">
        <h2 className="section-title">Everything your hostel needs online</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', maxWidth: '1000px', margin: '0 auto', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '18px', marginBottom: '32px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ color: '#25D366' }}>✓</span> Mobile-first, fast-loading design</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ color: '#25D366' }}>✓</span> WhatsApp contact button built in</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ color: '#25D366' }}>✓</span> Photo gallery for your rooms and common areas</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ color: '#25D366' }}>✓</span> Google Maps location integration</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ color: '#25D366' }}>✓</span> Your hostel info, amenities and house rules</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ color: '#25D366' }}>✓</span> Social media links</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ color: '#25D366' }}>✓</span> Delivered and live within 24 hours</li>
            </ul>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="wa-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Get started on WhatsApp
            </a>
          </div>
          <div style={{ flex: '1 1 300px', background: '#1a1a1a', padding: '40px', borderRadius: '24px', border: '2px solid #7B5CF0', textAlign: 'center', position: 'relative', boxShadow: '0 0 40px rgba(123,92,240,0.1)' }}>
            <div style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', background: '#F5A623', color: '#000', padding: '6px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap' }}>
              ⚡ Delivered in 24 hours
            </div>
            <p style={{ color: '#a0a0a0', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', marginBottom: '8px' }}>Starting from only</p>
            <div style={{ fontSize: '64px', fontWeight: '900', color: '#fff', marginBottom: '16px', lineHeight: '1' }}>฿500</div>
            <p style={{ color: '#888', fontSize: '14px' }}>One-time payment · No hidden fees</p>
          </div>
        </div>
      </section>

      <section className="portfolio-section">
        <h2 className="section-title">Websites We've Crafted for Thailand Hospitality</h2>
        <div className="portfolio-grid">
          {displayPortfolio.map(p => (
            <Link to={p.link} className="portfolio-card" key={p.id}>
              <img src={p.image} alt={p.name} loading="lazy" />
              <div className="portfolio-overlay">
                <span className="portfolio-tag">{p.category}</span>
                <h3 className="portfolio-title">{p.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-num">01</div>
            <h3>Chat With Us</h3>
            <p>Message us on WhatsApp. Tell us about your hostel or business. Free consultation, no pressure.</p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <h3>We Design & Build</h3>
            <p>We handle everything — design, copy, booking setup. You get updates daily. Done in 7–10 days.</p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <h3>Go Live & Get Bookings</h3>
            <p>Your site goes live. We set up Google and hand you full control. You start getting direct bookings.</p>
          </div>
        </div>
      </section>

      <section className="faq-section" style={{ padding: '100px 5%', background: '#111' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ color: '#7B5CF0', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px' }}>Questions</span>
            <h2 className="section-title" style={{ marginBottom: '0', marginTop: '8px' }}>Quick answers</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
            <details style={{ background: '#1a1a1a', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
              <summary style={{ fontSize: '18px', fontWeight: 'bold', outline: 'none', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Is it really only 500 baht?
                <span style={{ color: '#7B5CF0' }}>+</span>
              </summary>
              <p style={{ color: '#a0a0a0', marginTop: '16px', lineHeight: '1.6' }}>Yes. 500 baht for a complete, professional website for your hostel or guesthouse. One-time payment, no monthly fees, no hidden costs. We keep prices low because we want every hostel in Thailand to have a proper online presence.</p>
            </details>
            
            <details style={{ background: '#1a1a1a', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
              <summary style={{ fontSize: '18px', fontWeight: 'bold', outline: 'none', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                How fast will my website be ready?
                <span style={{ color: '#7B5CF0' }}>+</span>
              </summary>
              <p style={{ color: '#a0a0a0', marginTop: '16px', lineHeight: '1.6' }}>Within 24 hours of receiving your photos and information. Most sites are delivered the same day. Just message us on WhatsApp, share your content, and we handle the rest.</p>
            </details>
            
            <details style={{ background: '#1a1a1a', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
              <summary style={{ fontSize: '18px', fontWeight: 'bold', outline: 'none', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Will guests be able to book directly?
                <span style={{ color: '#7B5CF0' }}>+</span>
              </summary>
              <p style={{ color: '#a0a0a0', marginTop: '16px', lineHeight: '1.6' }}>Your website includes a WhatsApp button so guests can contact you directly to ask questions or arrange a stay. You keep using Booking.com and Agoda as normal — this just gives you a professional home base online.</p>
            </details>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#a0a0a0', marginBottom: '16px' }}>Have another question?</p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="wa-btn" style={{ background: 'transparent', border: '1px solid #25D366', color: '#25D366' }}>
              Ask us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <span style={{ color: '#F5A623', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', display: 'block', marginBottom: '16px', position: 'relative', zIndex: 1 }}>Ready?</span>
        <h2>Your hostel deserves to be found online.</h2>
        <p>500 baht. 24 hours. Done.</p>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="wa-btn" style={{ fontSize: '20px', padding: '16px 40px', backgroundColor: '#25D366', color: '#fff' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Message Us on WhatsApp Now
        </a>
        <div className="micro-copy" style={{ color: 'rgba(255,255,255,0.7)', marginTop: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span>✓ No commitment required</span>
          <span>✓ Reply within 1 hour</span>
          <span>✓ English & Thai supported</span>
        </div>
      </section>

      <footer className="landing-footer" style={{ background: '#0d0d14' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          <Link to="/" className="landing-logo" style={{ fontSize: '20px' }}>Ain<span>ario</span></Link>
          <p style={{ margin: 0, color: '#888' }}>Web solutions for hospitality businesses in Thailand</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link to="/ai-services" style={{ color: '#888', textDecoration: 'none' }}>AI Services</Link>
            <a href={whatsappLink} style={{ color: '#888', textDecoration: 'none' }}>Contact</a>
          </div>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>© 2026 Ainario</p>
        </div>
      </footer>

      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="floating-wa">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}
