import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { toolsData } from './Tools';
import { db } from '../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

export function ToolViewer() {
  const { slug } = useParams();
  const [dbTools, setDbTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'tools'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tools = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setDbTools(tools);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Loading...</div>;

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

  const tool = allTools.find(t => t.slug === slug || t.id.toString() === slug);

  if (!tool || !tool.iframeUrl) {
    return <Navigate to="/tools" />;
  }

  return (
    <div style={{ width: '100%', height: '100vh', paddingTop: '80px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px 20px', background: 'var(--card)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '18px', margin: 0 }}>{tool.name}</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href={`/tools/${tool.slug || tool.id}`} style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '14px', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: '4px' }}>
            ← Back to Tools
          </a>
          <a href={tool.iframeUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '14px', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: '4px' }}>
            Open in New Tab ↗
          </a>
        </div>
      </div>
      <iframe 
        src={tool.iframeUrl} 
        style={{ flex: 1, width: '100%', border: 'none' }}
        title={tool.name}
        allow="camera; microphone; geolocation"
      />
    </div>
  );
}
