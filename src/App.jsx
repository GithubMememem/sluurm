import { useEffect, useMemo, useState } from 'react';
import { Search, House, Clapperboard, Tv, Bookmark, Settings2, ChevronRight, Play, Plus, Check, Star, X, SlidersHorizontal, Sparkles, Menu, ArrowUpRight, Info } from 'lucide-react';
import { getFeed, getDetails, getCollection, getApiKey, setApiKey, image, searchTitles } from './services/tmdb';
import CarouselComponent from './components/CarouselComponent/CarouselComponent';

const savedKey = 'sluurm-saved-v1';
const readSaved = () => { try { return JSON.parse(localStorage.getItem(savedKey) || '[]'); } catch { return []; } };
const titleOf = (item) => item.title || item.name || 'Untitled';
const yearOf = (item) => (item.release_date || item.first_air_date || '').slice(0, 4);
const posterOf = (item) => image(item.poster_path, 'w500');
const backdropOf = (item) => image(item.backdrop_path, 'original');

function PosterCard({ item, kind, onOpen, saved, onSave }) {
  const type = item.media_type || kind || 'movie';
  return <article className="poster-card">
    <button className="poster-hit" onClick={() => onOpen(item, type)} aria-label={'Open ' + titleOf(item)}>
      <div className="poster-frame">{posterOf(item) ? <img src={posterOf(item)} alt="" loading="lazy" /> : <div className="poster-empty">SLUURM</div>}
        <span className="rating"><Star size={11} fill="currentColor" /> {(item.vote_average || 0).toFixed(1)}</span>
        <span className="poster-hover"><span className="play-circle"><Play size={19} fill="currentColor" /></span><b>View details</b></span>
      </div>
      <div className="poster-meta"><strong>{titleOf(item)}</strong><span>{yearOf(item) || 'New'} <i>·</i> {type === 'tv' ? 'Series' : 'Movie'}</span></div>
    </button>
    <button className={'save-mini ' + (saved ? 'is-saved' : '')} onClick={() => onSave(item, type)} title={saved ? 'Remove from list' : 'Add to list'}>{saved ? <Check size={15}/> : <Plus size={15}/>}</button>
  </article>;
}

function Row({ title, items, kind, onOpen, saved, onSave, more }) {
  if (!items?.length) return null;
  return <section className="shelf"><div className="shelf-head"><div><span className="eyebrow">CURATED FOR YOU</span><h2>{title}</h2></div>{more && <button className="text-action" onClick={more}>See all <ChevronRight size={15}/></button>}</div>
    <CarouselComponent cardsData={items} type={kind} title={title} onOpen={onOpen} />
  </section>;
}

export default function App() {
  const [page, setPage] = useState('home');
  const [kind, setKind] = useState('movie');
  const [feed, setFeed] = useState({ trending: [], popular: [], top: [] });
  const [seriesFeed, setSeriesFeed] = useState({ trending: [], popular: [], top: [] });
  const [saved, setSaved] = useState(readSaved);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [active, setActive] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState('');
  const [apiKey, setApiKeyState] = useState(getApiKey);
  const [keyDraft, setKeyDraft] = useState(getApiKey);
  const [feedPages, setFeedPages] = useState({ trending: 1, popular: 1, top: 1 });

  useEffect(() => {
    if (!apiKey) { setLoading(false); setError(''); return; }
    let alive = true;
    setLoading(true);
    Promise.all([getFeed('movie'), getFeed('tv')]).then(([movies, shows]) => {
      if (!alive) return; setFeed(movies); setSeriesFeed(shows); setError('');
    }).catch(e => { if (alive) setError(e.message); }).finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [apiKey]);
  useEffect(() => { localStorage.setItem(savedKey, JSON.stringify(saved)); }, [saved]);
  useEffect(() => {
    if (page !== 'search' || query.trim().length < 2) { setResults([]); return; }
    const timer = setTimeout(() => searchTitles(query.trim()).then(r => setResults((r.results || []).filter(x => x.media_type !== 'person'))).catch(e => setError(e.message)), 350);
    return () => clearTimeout(timer);
  }, [query, page]);

  const toggleSave = (item, type) => {
    setSaved(old => {
      const exists = old.some(s => s.id === item.id && s.type === type);
      setToast(exists ? 'Removed from your list' : 'Saved to your list');
      setTimeout(() => setToast(''), 1800);
      return exists ? old.filter(s => !(s.id === item.id && s.type === type)) : [{ ...item, type }, ...old];
    });
  };
  const openItem = async (item, type) => {
    setActive({ ...item, type }); setDetails(null);
    try { setDetails(await getDetails(type === 'tv' ? 'tv' : 'movie', item.id)); }
    catch (e) { setError(e.message); }
  };
  const nav = (next) => { setPage(next); setMobileNav(false); if (next === 'movies' || next === 'series') { setKind(next === 'series' ? 'tv' : 'movie'); setFeedPages({ trending: 1, popular: 1, top: 1 }); } };
  const saveCredential = () => { const value = keyDraft.trim(); setApiKey(value); setApiKeyState(value); setError(''); setPage('home'); };
  const loadMore = async (category) => {
    try {
      const nextPage = (feedPages[category] || 1) + 1;
      const data = await getCollection(kind, category, nextPage);
      const setter = kind === 'tv' ? setSeriesFeed : setFeed;
      setter(old => ({ ...old, [category]: [...old[category], ...(data.results || [])] }));
      setFeedPages(old => ({ ...old, [category]: nextPage }));
    } catch (e) { setError(e.message); }
  };
  const currentFeed = page === 'series' ? seriesFeed : feed;
  const savedMovies = saved.filter(x => x.type !== 'tv');
  const savedShows = saved.filter(x => x.type === 'tv');
  const hero = feed.trending[0];
  const featured = hero && backdropOf(hero);
  const navItems = [{id:'home',label:'Discover',icon:House},{id:'movies',label:'Movies',icon:Clapperboard},{id:'series',label:'Series',icon:Tv},{id:'saved',label:'My list',icon:Bookmark},{id:'search',label:'Search',icon:Search},{id:'settings',label:'Settings',icon:Settings2}];

  return <div className="app-shell">
    <aside className={'sidebar ' + (mobileNav ? 'nav-open' : '')}>
      <button className="brand" onClick={() => nav('home')}><span className="brand-mark">s<span>.</span></span><span>sluurm</span></button>
      <div className="side-label">YOUR SPACE</div>
      <nav>{navItems.map(({id,label,icon:Icon}) => <button key={id} className={'nav-link ' + (page === id ? 'active' : '')} onClick={() => nav(id)}><Icon size={18}/><span>{label}</span>{id === 'saved' && saved.length > 0 && <small>{saved.length}</small>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="plan-card"><span className="plan-icon"><Sparkles size={16}/></span><b>Your next watch is out there.</b><p>A little scroll. A lot of cinema.</p></div><div className="profile"><div className="avatar">S</div><div><b>Guest profile</b><span>Local watchlist</span></div><Settings2 size={17}/></div></div>
    </aside>
    {mobileNav && <button className="nav-scrim" onClick={() => setMobileNav(false)} aria-label="Close menu"/>}
    <main className="main-area">
      <header className="topbar"><button className="brand top-brand" onClick={() => nav('home')}><span className="brand-mark">s<span>.</span></span><span>sluurm</span></button><nav className="top-nav">{navItems.map(({id,label,icon:Icon}) => <button key={id} className={'top-nav-link ' + (page === id ? 'active' : '')} onClick={() => nav(id)}><Icon size={16}/><span>{label === 'Discover' ? 'Home' : label === 'Series' ? 'Shows' : label === 'My list' ? 'My List' : label}</span></button>)}</nav><div className="top-actions"><div className="avatar small">S</div></div></header>
      {page === 'home' && <div className="page-content">
        {hero && <section className="hero" style={{backgroundImage: featured ? 'linear-gradient(90deg, rgba(16,11,27,.97) 0%, rgba(16,11,27,.74) 46%, rgba(16,11,27,.1) 100%), linear-gradient(0deg,#100b1b 0%,transparent 42%), url(' + featured + ')' : undefined}}>
          <div className="hero-copy"><span className="hero-kicker"><span className="live-dot"/> THIS WEEK ON SLUURM</span><h1>{titleOf(hero)}</h1><div className="hero-stats"><span><Star size={14} fill="currentColor"/> {(hero.vote_average || 0).toFixed(1)} rating</span><span>{yearOf(hero)}</span><span>Trending now</span></div><p>{hero.overview || 'Find your next favourite story.'}</p><div className="hero-buttons"><button className="primary-button" onClick={() => openItem(hero, 'movie')}><Play size={16} fill="currentColor"/> Explore title</button><button className="soft-button" onClick={() => toggleSave(hero, 'movie')}>{saved.some(s => s.id === hero.id && s.type === 'movie') ? <Check size={17}/> : <Plus size={17}/>} My list</button></div></div>
          <div className="hero-caption"><span>01</span><i/><span>FEATURED PICK</span></div>
        </section>}
        <div className="welcome-line"><div><span className="eyebrow">A BETTER KIND OF WATCHLIST</span><h2>Find your next <em>favourite.</em></h2></div><div className="welcome-note"><Sparkles size={15}/> No ads. Just movies.</div></div>
        <Row title="Trending this week" items={feed.trending} kind="movie" onOpen={openItem} saved={saved} onSave={toggleSave}/>
        <Row title="Popular movies" items={feed.popular} kind="movie" onOpen={openItem} saved={saved} onSave={toggleSave}/>
        <Row title="Worth the rating" items={feed.top} kind="movie" onOpen={openItem} saved={saved} onSave={toggleSave}/>
        <Row title="Series people love" items={seriesFeed.trending} kind="tv" onOpen={openItem} saved={saved} onSave={toggleSave}/>
      </div>}
      {(page === 'movies' || page === 'series') && <div className="page-content standard-page"><div className="page-heading"><span className="eyebrow">THE COLLECTION</span><h1>{page === 'movies' ? 'Movies' : 'Series'}<span>.</span></h1><p>Stories worth giving your time to.</p></div><Row title="Trending" items={currentFeed.trending} kind={kind} onOpen={openItem} saved={saved} onSave={toggleSave} more={() => loadMore('trending')}/><Row title="Popular" items={currentFeed.popular} kind={kind} onOpen={openItem} saved={saved} onSave={toggleSave} more={() => loadMore('popular')}/><Row title="Top rated" items={currentFeed.top} kind={kind} onOpen={openItem} saved={saved} onSave={toggleSave} more={() => loadMore('top')}/></div>}
      {page === 'saved' && <div className="page-content standard-page"><div className="page-heading"><span className="eyebrow">KEPT CLOSE</span><h1>My list<span>.</span></h1><p>Your personal shelf. Saved on this device.</p></div>{saved.length ? <div className="poster-grid">{saved.map(item => <PosterCard key={item.id + item.type} item={item} kind={item.type} onOpen={openItem} saved={true} onSave={toggleSave}/>)}</div> : <div className="empty-state"><Bookmark size={28}/><h3>Your list is waiting.</h3><p>Save movies and series to keep them all in one place.</p><button className="primary-button" onClick={() => nav('home')}>Explore titles <ArrowUpRight size={16}/></button></div>}</div>}
      {page === 'settings' && <div className="page-content standard-page"><div className="page-heading"><span className="eyebrow">APP CONNECTION</span><h1>Settings<span>.</span></h1><p>Connect your own TMDB key to power live movie and series data.</p></div><section className="settings-panel"><div className="settings-copy"><h2>TMDB API credential</h2><p>Use a TMDB API Read Access Token (the long JWT-style token) or a v3 API key. It stays in this browser's local storage and is sent directly to TMDB. It is not uploaded to Sluurm.</p><a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noreferrer">Get a free TMDB API key <ArrowUpRight size={14}/></a></div><label className="key-label">API key / Read Access Token<input type="password" autoComplete="off" placeholder="Paste your TMDB credential" value={keyDraft} onChange={e => setKeyDraft(e.target.value)}/></label><div className="settings-actions"><button className="primary-button" onClick={saveCredential}>Save and connect</button><button className="soft-button" onClick={() => { setKeyDraft(''); setApiKey(''); setApiKeyState(''); setFeed({trending:[],popular:[],top:[]}); setSeriesFeed({trending:[],popular:[],top:[]}); }}>Remove key</button></div><p className="settings-status">{apiKey ? 'A TMDB credential is saved on this device.' : 'No TMDB credential connected yet.'}</p></section></div>}
      {page === 'search' && <div className="page-content standard-page"><div className="page-heading"><span className="eyebrow">FIND YOUR NEXT WATCH</span><h1>Search<span>.</span></h1><p>Search across movies and series.</p></div><div className="search-box"><Search size={20}/><input autoFocus placeholder="Try a title, actor, or series..." value={query} onChange={e => setQuery(e.target.value)}/>{query && <button onClick={() => setQuery('')}><X size={17}/></button>}</div>{results.length > 0 ? <div className="poster-grid">{results.map(item => <PosterCard key={item.id + item.media_type} item={item} kind={item.media_type} onOpen={openItem} saved={saved.some(s => s.id === item.id && s.type === item.media_type)} onSave={toggleSave}/>)}</div> : <div className="search-hint"><SlidersHorizontal size={19}/><span>{query.length < 2 ? 'Start typing to discover something.' : 'No matching titles found.'}</span></div>}</div>}
      {!apiKey && page !== 'settings' && <div className="connect-note"><b>Connect TMDB to get started</b><span>Live titles, search, ratings, trailers and details need your free TMDB credential.</span><button className="primary-button" onClick={() => nav('settings')}>Set up TMDB <ArrowUpRight size={15}/></button></div>}
      {loading && <div className="loading-line"><span/> Getting the good stuff...</div>}
      {error && <div className="error-note"><Info size={16}/><span>{error}</span></div>}
      <footer className="footer"><span>SLUURM © 2026</span><span>Made for movie nights.</span><span>Movie data from TMDB</span></footer>
    </main>
    {active && <div className="modal-backdrop" onClick={() => {setActive(null);setDetails(null);}}><section className="detail-modal" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={() => {setActive(null);setDetails(null);}}><X size={19}/></button>
      <div className="detail-backdrop" style={{backgroundImage: 'linear-gradient(0deg,#171021 0%,rgba(23,16,33,.15) 100%), url(' + (backdropOf(details || active) || posterOf(active)) + ')'}}/>
      <div className="detail-body"><span className="eyebrow">TITLE DETAILS</span><h2>{titleOf(details || active)}</h2><div className="detail-stats"><span><Star size={14} fill="currentColor"/> {((details || active).vote_average || 0).toFixed(1)}</span><span>{yearOf(details || active)}</span><span>{active.type === 'tv' ? 'Series' : 'Movie'}</span></div>
        <p>{details?.overview || active.overview || 'Loading title information...'}</p>
        <div className="detail-actions"><button className="primary-button" onClick={() => toggleSave(active, active.type)}>{saved.some(s => s.id === active.id && s.type === active.type) ? <Check size={16}/> : <Plus size={16}/>} {saved.some(s => s.id === active.id && s.type === active.type) ? 'Saved' : 'Add to my list'}</button>{details?.homepage && <a className="soft-button" href={details.homepage} target="_blank" rel="noreferrer">Official site <ArrowUpRight size={15}/></a>}</div>
        {details?.genres?.length > 0 && <div className="genre-tags">{details.genres.map(g => <span key={g.id}>{g.name}</span>)}</div>}
        {details?.videos?.results?.filter(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')).slice(0,1).map(v => <a className="trailer-link" key={v.key} href={'https://www.youtube.com/watch?v=' + v.key} target="_blank" rel="noreferrer"><Play size={15} fill="currentColor"/> Watch trailer <ArrowUpRight size={14}/></a>)}
      </div>
    </section></div>}
    {toast && <div className="toast"><Check size={15}/>{toast}</div>}
  </div>;
}
