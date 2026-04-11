import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, updateDoc, doc, deleteDoc, serverTimestamp, onSnapshot, query } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { templatesData } from './Templates';
import { toolsData } from './Tools';
import { portfolioData } from './Portfolio';

export function Admin() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [activeTab, setActiveTab] = useState<'templates' | 'tools' | 'portfolio'>('templates');
  
  const [dbTemplates, setDbTemplates] = useState<any[]>([]);
  const [dbTools, setDbTools] = useState<any[]>([]);
  const [dbPortfolio, setDbPortfolio] = useState<any[]>([]);
  
  const [selectedItemId, setSelectedItemId] = useState<string>('new');

  const defaultForm = {
    title: '',
    slug: '',
    description: '',
    category: 'web',
    categoryLabel: 'Web Platforms',
    categoryColor: 'purple',
    emoji: '🚀',
    short: '',
    features: '',
    stack: '',
    link: '',
    iframeUrl: '',
    imageUrl: ''
  };

  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    
    const unsubTemplates = onSnapshot(query(collection(db, 'templates')), (snapshot) => {
      setDbTemplates(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    
    const unsubTools = onSnapshot(query(collection(db, 'tools')), (snapshot) => {
      setDbTools(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    
    const unsubPortfolio = onSnapshot(query(collection(db, 'portfolio')), (snapshot) => {
      setDbPortfolio(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    
    return () => {
      unsubTemplates();
      unsubTools();
      unsubPortfolio();
    };
  }, [user]);

  const getActiveData = () => {
    if (activeTab === 'templates') {
      return [
        ...dbTemplates,
        ...templatesData.filter(staticT => !dbTemplates.some(dbT => 
          (dbT.originalId && dbT.originalId.toString() === staticT.id.toString()) || 
          (dbT.title && staticT.name && dbT.title.toLowerCase().trim() === staticT.name.toLowerCase().trim())
        ))
      ];
    }
    if (activeTab === 'tools') {
      return [
        ...dbTools,
        ...toolsData.filter(staticT => !dbTools.some(dbT => 
          (dbT.originalId && dbT.originalId.toString() === staticT.id.toString()) || 
          (dbT.title && staticT.name && dbT.title.toLowerCase().trim() === staticT.name.toLowerCase().trim())
        ))
      ];
    }
    if (activeTab === 'portfolio') {
      return [
        ...dbPortfolio,
        ...portfolioData.filter(staticP => !dbPortfolio.some(dbP => 
          (dbP.originalId && dbP.originalId.toString() === staticP.id.toString()) || 
          (dbP.title && staticP.name && dbP.title.toLowerCase().trim() === staticP.name.toLowerCase().trim())
        ))
      ];
    }
    return [];
  };

  const allItems = getActiveData();

  const handleTabChange = (tab: 'templates' | 'tools' | 'portfolio') => {
    setActiveTab(tab);
    setSelectedItemId('new');
    setFormData(defaultForm);
    setError('');
    setSuccess('');
  };

  const handleSelectItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedItemId(val);
    setError('');
    setSuccess('');

    if (val === 'new') {
      setFormData(defaultForm);
    } else {
      const t = allItems.find(x => x.id.toString() === val);
      if (t) {
        setFormData({
          title: t.title || t.name || '',
          slug: t.slug || '',
          description: t.description || '',
          category: t.category || 'web',
          categoryLabel: t.categoryLabel || '',
          categoryColor: t.categoryColor || 'purple',
          emoji: t.emoji || '🚀',
          short: t.short || '',
          features: Array.isArray(t.features) ? t.features.join(', ') : (t.features || ''),
          stack: Array.isArray(t.stack) ? t.stack.join(', ') : (t.stack || ''),
          link: t.link || '',
          iframeUrl: t.iframeUrl || '',
          imageUrl: t.imageUrl || t.image || ''
        });
      }
    }
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleDelete = async () => {
    if (selectedItemId === 'new') return;
    
    let currentDbItems = [];
    if (activeTab === 'templates') currentDbItems = dbTemplates;
    if (activeTab === 'tools') currentDbItems = dbTools;
    if (activeTab === 'portfolio') currentDbItems = dbPortfolio;

    const existingDbItem = currentDbItems.find(t => t.id === selectedItemId);
    if (existingDbItem) {
      try {
        await deleteDoc(doc(db, activeTab, selectedItemId));
        setSuccess('Item deleted successfully!');
        setSelectedItemId('new');
        setFormData(defaultForm);
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      setError("You cannot delete a default static item. You can only edit it to override it.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setFormData(prev => ({ ...prev, imageUrl: dataUrl }));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const slugify = (text: string) => text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');

      const finalSlug = formData.slug.trim() || slugify(formData.title);

      const dataToSave: any = {
        title: formData.title,
        slug: finalSlug,
        description: formData.description,
        category: formData.category,
        categoryLabel: formData.categoryLabel,
        categoryColor: formData.categoryColor,
        emoji: formData.emoji,
        short: formData.short,
        features: formData.features.split(',').map(s => s.trim()).filter(Boolean),
        stack: formData.stack.split(',').map(s => s.trim()).filter(Boolean),
        link: formData.link,
        iframeUrl: formData.iframeUrl,
        imageUrl: formData.imageUrl,
        authorUid: user.uid
      };

      let currentDbItems = [];
      if (activeTab === 'templates') currentDbItems = dbTemplates;
      if (activeTab === 'tools') currentDbItems = dbTools;
      if (activeTab === 'portfolio') currentDbItems = dbPortfolio;

      const isOverridingStatic = selectedItemId !== 'new' && !currentDbItems.find(t => t.id === selectedItemId);
      if (isOverridingStatic) {
        dataToSave.originalId = selectedItemId.toString();
      }

      const existingDbItem = currentDbItems.find(t => t.id === selectedItemId);
      
      if (existingDbItem) {
        await updateDoc(doc(db, activeTab, selectedItemId), dataToSave);
        setSuccess('Item updated successfully!');
      } else {
        await addDoc(collection(db, activeTab), {
          ...dataToSave,
          createdAt: serverTimestamp()
        });
        setSuccess('Item saved successfully!');
        if (selectedItemId === 'new') {
          setFormData(defaultForm);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="hero">Loading...</div>;

  if (!user) {
    return (
      <div className="hero" style={{ flexDirection: 'column', gap: '20px' }}>
        <h2>Admin Login</h2>
        <button className="nav-cta" onClick={handleLogin}>Sign in with Google</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div className="hero" style={{ alignItems: 'flex-start', paddingTop: '120px' }}>
      <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto', textAlign: 'left', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Admin Dashboard</h2>
          <button onClick={handleLogout} style={{ background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: '6px' }}>Logout</button>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            onClick={() => handleTabChange('templates')} 
            style={{ flex: 1, padding: '10px', background: activeTab === 'templates' ? 'var(--accent)' : 'var(--card)', color: 'white', border: '1px solid var(--border)', borderRadius: '6px' }}
          >
            Templates
          </button>
          <button 
            onClick={() => handleTabChange('tools')} 
            style={{ flex: 1, padding: '10px', background: activeTab === 'tools' ? 'var(--accent)' : 'var(--card)', color: 'white', border: '1px solid var(--border)', borderRadius: '6px' }}
          >
            Tools
          </button>
          <button 
            onClick={() => handleTabChange('portfolio')} 
            style={{ flex: 1, padding: '10px', background: activeTab === 'portfolio' ? 'var(--accent)' : 'var(--card)', color: 'white', border: '1px solid var(--border)', borderRadius: '6px' }}
          >
            Portfolio
          </button>
        </div>

        {error && <div style={{ padding: '10px', background: 'rgba(255,0,0,0.1)', color: '#ff5c87', marginBottom: '20px', borderRadius: '6px' }}>{error}</div>}
        {success && <div style={{ padding: '10px', background: 'rgba(0,229,192,0.1)', color: '#00e5c0', marginBottom: '20px', borderRadius: '6px' }}>{success}</div>}

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Select Item to Edit</label>
          <select value={selectedItemId} onChange={handleSelectItem} style={{ width: '100%', padding: '12px', background: 'var(--card)', border: '1px solid var(--accent)', color: 'white', borderRadius: '6px', fontSize: '16px' }}>
            <option value="new">✨ Create New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</option>
            <optgroup label={`Existing ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}>
              {allItems.map(t => (
                <option key={t.id} value={t.id}>{t.title || t.name}</option>
              ))}
            </optgroup>
          </select>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '10px' }}>{selectedItemId === 'new' ? 'New Item Details' : 'Edit Item Details'}</h3>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Title</label>
            <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '10px', background: 'var(--card)', border: '1px solid var(--border)', color: 'white', borderRadius: '6px' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Slug (optional, auto-generated from title if empty)</label>
            <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} style={{ width: '100%', padding: '10px', background: 'var(--card)', border: '1px solid var(--border)', color: 'white', borderRadius: '6px' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Short Summary</label>
            <input required type="text" value={formData.short} onChange={e => setFormData({...formData, short: e.target.value})} style={{ width: '100%', padding: '10px', background: 'var(--card)', border: '1px solid var(--border)', color: 'white', borderRadius: '6px' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Full Description</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '10px', background: 'var(--card)', border: '1px solid var(--border)', color: 'white', borderRadius: '6px', minHeight: '100px' }} />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Category ID</label>
              <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '10px', background: 'var(--card)', border: '1px solid var(--border)', color: 'white', borderRadius: '6px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Category Label</label>
              <input type="text" value={formData.categoryLabel} onChange={e => setFormData({...formData, categoryLabel: e.target.value})} style={{ width: '100%', padding: '10px', background: 'var(--card)', border: '1px solid var(--border)', color: 'white', borderRadius: '6px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Color (purple, pink, green, blue, orange)</label>
              <input required type="text" value={formData.categoryColor} onChange={e => setFormData({...formData, categoryColor: e.target.value})} style={{ width: '100%', padding: '10px', background: 'var(--card)', border: '1px solid var(--border)', color: 'white', borderRadius: '6px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Emoji</label>
              <input required type="text" value={formData.emoji} onChange={e => setFormData({...formData, emoji: e.target.value})} style={{ width: '100%', padding: '10px', background: 'var(--card)', border: '1px solid var(--border)', color: 'white', borderRadius: '6px' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Features (comma separated)</label>
            <input type="text" value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} style={{ width: '100%', padding: '10px', background: 'var(--card)', border: '1px solid var(--border)', color: 'white', borderRadius: '6px' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Tech Stack (comma separated)</label>
            <input required type="text" value={formData.stack} onChange={e => setFormData({...formData, stack: e.target.value})} style={{ width: '100%', padding: '10px', background: 'var(--card)', border: '1px solid var(--border)', color: 'white', borderRadius: '6px' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Live Demo Link (External URL)</label>
            <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} style={{ width: '100%', padding: '10px', background: 'var(--card)', border: '1px solid var(--border)', color: 'white', borderRadius: '6px' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Iframe URL (For Tools/Portfolio Viewer)</label>
            <input type="text" value={formData.iframeUrl} onChange={e => setFormData({...formData, iframeUrl: e.target.value})} style={{ width: '100%', padding: '10px', background: 'var(--card)', border: '1px solid var(--border)', color: 'white', borderRadius: '6px' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Image Upload</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ width: '100%', padding: '10px', background: 'var(--card)', border: '1px solid var(--border)', color: 'white', borderRadius: '6px' }} />
            {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" style={{ marginTop: '10px', maxWidth: '100%', height: 'auto', borderRadius: '6px', border: '1px solid var(--border)' }} />}
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
            <button type="submit" disabled={uploading} className="nav-cta" style={{ flex: 1, padding: '14px', fontSize: '16px' }}>
              {uploading ? 'Saving...' : (selectedItemId === 'new' ? 'Create Item' : 'Save Changes')}
            </button>
            {selectedItemId !== 'new' && (
              <button 
                type="button" 
                onClick={handleDelete}
                style={{ padding: '14px', fontSize: '16px', background: 'rgba(255, 92, 135, 0.1)', color: '#ff5c87', border: '1px solid rgba(255, 92, 135, 0.3)', borderRadius: '6px', cursor: 'pointer' }}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
