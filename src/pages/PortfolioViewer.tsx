import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { portfolioData } from './Portfolio';
import { db } from '../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

export function PortfolioViewer() {
  const { slug } = useParams();
  const [dbPortfolio, setDbPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'portfolio'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const portfolio = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setDbPortfolio(portfolio);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Loading...</div>;

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
    image: p.imageUrl || p.image
  }));

  const portfolioItem = allPortfolio.find(p => p.slug === slug || p.id.toString() === slug);

  if (!portfolioItem || !portfolioItem.iframeUrl) {
    return <Navigate to="/portfolio" />;
  }

  return (
    <div style={{ width: '100%', height: '100vh', paddingTop: '80px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px 20px', background: 'var(--card)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '18px', margin: 0 }}>{portfolioItem.name}</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="/portfolio" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '14px', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: '4px' }}>
            ← Back to Portfolio
          </a>
          <a href={portfolioItem.iframeUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '14px', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: '4px' }}>
            Open in New Tab ↗
          </a>
        </div>
      </div>
      <iframe 
        src={portfolioItem.iframeUrl} 
        style={{ flex: 1, width: '100%', border: 'none' }}
        title={portfolioItem.name}
        allow="camera; microphone; geolocation"
      />
    </div>
  );
}
