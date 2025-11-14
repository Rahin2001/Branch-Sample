import React, { useState, useEffect } from "react";

// One-page React app (single-file). Drop this into src/App.jsx of a create-react-app
// or any React setup. No external deps. Uses a tiny CSS injection so the file is self-contained.

const styles = `
:root{--bg:#0f1724;--card:#0b1220;--muted:#94a3b8;--accent:#06b6d4}
*{box-sizing:border-box}
html,body,#root{height:100%}
body{margin:0;font-family:Inter,ui-sans-serif,system-ui,Segoe UI,Roboto,'Helvetica Neue',Arial;color:#e6eef6;background:linear-gradient(180deg,#071024 0%, #061428 100%);}
.app{max-width:1100px;margin:28px auto;padding:24px}
.header{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:28px}
.brand{display:flex;gap:12px;align-items:center}
.logo{width:44px;height:44px;border-radius:10px;background:linear-gradient(135deg,var(--accent),#7c3aed);display:flex;align-items:center;justify-content:center;font-weight:700;color:#021024}
.nav{display:flex;gap:12px}
.nav a{color:var(--muted);text-decoration:none;padding:8px 10px;border-radius:8px}
.nav a:hover{color:white;background:rgba(255,255,255,0.03)}
.hero{display:grid;grid-template-columns:1fr 360px;gap:24px;align-items:center;margin-bottom:32px}
.card{background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));padding:18px;border-radius:14px;box-shadow:0 6px 24px rgba(2,6,23,0.6);}
.h1{font-size:28px;margin:0 0 8px}
.lead{color:var(--muted);margin:0 0 18px}
.cta{display:flex;gap:10px}
.btn{padding:10px 14px;border-radius:10px;border:0;cursor:pointer;font-weight:600}
.primary{background:var(--accent);color:#021024}
.ghost{background:transparent;color:var(--muted);border:1px solid rgba(255,255,255,0.03)}
.feature-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:18px}
.feature{padding:12px;border-radius:10px}
.section{margin:36px 0}
.footer{margin-top:48px;text-align:center;color:var(--muted)}
input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);background:transparent;color:#e6eef6}
@media (max-width:900px){.hero{grid-template-columns:1fr;}.feature-grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:520px){.nav{display:none}.feature-grid{grid-template-columns:1fr}.header{flex-direction:column;align-items:flex-start}}
`;

autoInjectStyles();

function autoInjectStyles(){
  if (typeof document === 'undefined') return;
  const id = 'onepage-react-styles';
  if (document.getElementById(id)) return;
  const s = document.createElement('style');
  s.id = id; s.innerHTML = styles; document.head.appendChild(s);
}

export default function App(){
  const [darkNote,setDarkNote] = useState(() => {
    try { return localStorage.getItem('onepage_note') || '' } catch(e){ return '' }
  });
  const [message,setMessage] = useState('');

  useEffect(()=>{ try{ localStorage.setItem('onepage_note', darkNote) }catch(e){} },[darkNote])

  function scrollTo(id){
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function handleContact(e){
    e.preventDefault();
    setMessage('Thanks — message saved locally in your browser. This demo has no backend.');
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <div className="logo">OG</div>
          <div>
            <div style={{fontWeight:700}}>OnePage</div>
            <div style={{fontSize:12,color:'var(--muted)'}}>Small starter app • React</div>
          </div>
        </div>

        <nav className="nav">
          <a href="#" onClick={(e)=>{e.preventDefault();scrollTo('home')}}>Home</a>
          <a href="#" onClick={(e)=>{e.preventDefault();scrollTo('features')}}>Features</a>
          <a href="#" onClick={(e)=>{e.preventDefault();scrollTo('about')}}>About</a>
          <a href="#" onClick={(e)=>{e.preventDefault();scrollTo('contact')}}>Contact</a>
        </nav>
      </header>

      <section id="home" className="hero">
        <div className="card">
          <h1 className="h1">Build fast — one page React starter</h1>
          <p className="lead">A minimal, responsive single-file React app you can copy into <code>src/App.jsx</code>. No dependencies.</p>

          <div style={{display:'flex',gap:12}}>
            <button className="btn primary" onClick={()=>scrollTo('features')}>Explore features</button>
            <button className="btn ghost" onClick={()=>scrollTo('contact')}>Contact</button>
          </div>

          <div style={{marginTop:16}}>
            <strong style={{fontSize:13}}>Quick note</strong>
            <div style={{marginTop:8}}>
              <input placeholder="Write something (saved locally)" value={darkNote} onChange={e=>setDarkNote(e.target.value)} />
            </div>
          </div>
        </div>

        <aside className="card">
          <h3 style={{marginTop:0}}>Live preview</h3>
          <p className="lead">This panel imitates a compact dashboard and shows how inputs persist to localStorage.</p>
          <div style={{marginTop:12}}>
            <div style={{padding:12,borderRadius:10,background:'rgba(255,255,255,0.02)'}}>
              <strong>Saved note</strong>
              <div style={{marginTop:8,color:'var(--muted)'}}>{darkNote || <i>— nothing saved yet —</i>}</div>
            </div>
          </div>
        </aside>
      </section>

      <section id="features" className="section card">
        <h2 style={{marginTop:0}}>Features</h2>
        <p className="lead">Small, focused features you can extend:</p>
        <div className="feature-grid">
          <div className="feature">
            <strong>Responsive layout</strong>
            <div className="lead">Works on mobile and desktop — grid-based and accessible.</div>
          </div>
          <div className="feature">
            <strong>Local persistence</strong>
            <div className="lead">Data saved to localStorage so users keep their note between visits.</div>
          </div>
          <div className="feature">
            <strong>Smooth navigation</strong>
            <div className="lead">Click nav items to smoothly scroll to sections.</div>
          </div>
        </div>
      </section>

      <section id="about" className="section card">
        <h2 style={{marginTop:0}}>About this starter</h2>
        <p className="lead">Use this single-file app as a base for small landing pages, MVPs, or internal tools. No build step aside from your normal React tooling.</p>
      </section>

      <section id="contact" className="section card">
        <h2 style={{marginTop:0}}>Contact</h2>
        <form onSubmit={handleContact}>
          <div style={{display:'grid',gap:8,gridTemplateColumns:'1fr 1fr'}}>
            <input required placeholder="Your name" />
            <input required placeholder="Email" />
          </div>
          <div style={{marginTop:8}}>
            <textarea required rows={4} placeholder="Message" />
          </div>
          <div style={{marginTop:10,display:'flex',gap:8}}>
            <button type="submit" className="btn primary">Send</button>
            <button type="button" className="btn ghost" onClick={()=>{setMessage(''); try{localStorage.removeItem('onepage_note')}catch(e){} setDarkNote('')}}>Reset note</button>
          </div>
        </form>
        <div style={{marginTop:10,color:'var(--muted)'}}>{message}</div>
      </section>

      <footer className="footer">
        <div>Made with ❤️ • Single-file React starter</div>
      </footer>
    </div>
  )
}
