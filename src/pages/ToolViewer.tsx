import { useParams, Navigate } from 'react-router-dom';
import { toolsData } from './Tools';

export function ToolViewer() {
  const { slug } = useParams();
  const tool = toolsData.find(t => t.slug === slug || t.id.toString() === slug);

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
