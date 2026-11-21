import { useEffect, useRef, useState } from 'react';
import { Search, House, Clapperboard, Tv, Bookmark } from 'lucide-react';

const tabs = [['home','Home',House],['movies','Movies',Clapperboard],['series','Shows',Tv],['saved','My List',Bookmark],['search','Search',Search]];

export default function CinejoyNavbar({ page, onNavigate }) {
  const navRef = useRef(null);
  const refs = useRef({});
  const [pill, setPill] = useState({left:0,width:0,opacity:0});
  const move = (key) => {
    const item = refs.current[key];
    if (!item || !navRef.current) return;
    setPill({left:item.offsetLeft,width:item.offsetWidth,opacity:1});
  };
  useEffect(() => {
    move(page);
    const resize = () => move(page);
    window.addEventListener('resize',resize);
    return () => window.removeEventListener('resize',resize);
  },[page]);
  return <>
    <header className="cinejoy-header">
      <button className="cinejoy-brand" onClick={() => onNavigate('home')} aria-label="Sluurm home"><span className="cinejoy-brand-mark">s<span>.</span></span><span className="cinejoy-brand-word">sluurm</span></button>
      <nav className="cinejoy-nav" ref={navRef} aria-label="Main navigation">
        <span className="cinejoy-nav-pill" style={{left:pill.left,width:pill.width,opacity:pill.opacity}} />
        {tabs.map(([key,label,Icon]) => <button key={key} ref={node => {refs.current[key]=node;}} className={'cinejoy-nav-item '+(page===key?'active':'')} onClick={() => onNavigate(key)} aria-current={page===key?'page':undefined}><Icon size={16}/><span>{label}</span></button>)}
      </nav>
      <button className="cinejoy-mobile-search" onClick={() => onNavigate('search')} aria-label="Search"><Search size={19}/></button>
    </header>
    <nav className="cinejoy-mobile-nav" aria-label="Mobile navigation">
      {tabs.map(([key,label,Icon]) => <button key={key} className={page===key?'active':''} onClick={() => onNavigate(key)}><Icon size={18}/><span>{label}</span></button>)}
    </nav>
  </>;
}
