import { AnimatePresence, motion } from 'motion/react';
import { Play, Star } from 'lucide-react';

// Adapted from Cinejoy's original Card component: same hover-reveal card pattern,
// with Sluurm's local catalogue and HyperOS-inspired purple treatment.
export default function Card({ item, type, onOpen }) {
  const title = item.title || item.name || 'Untitled';
  const date = item.release_date || item.first_air_date || '';
  const imagePath = item.backdrop_path || item.poster_path;
  const imageUrl = imagePath ? `https://image.tmdb.org/t/p/w500/${imagePath}` : '';
  return <button className="cinejoy-card" onClick={() => onOpen(item, type)} aria-label={`Open ${title}`}>
    <motion.div className="cinejoy-card-media" whileHover={{ y: -4 }} transition={{ duration: .22 }}>
      {imageUrl ? <img src={imageUrl} alt={title} loading="lazy"/> : <div className="poster-empty">SLUURM</div>}
      <AnimatePresence>
        <motion.div className="cinejoy-card-overlay" initial={{opacity:0}} whileHover={{opacity:1}} exit={{opacity:0}} transition={{duration:.22}}>
          <span className="cinejoy-card-play"><Play size={18} fill="currentColor"/></span>
          <strong>{title}</strong>
        </motion.div>
      </AnimatePresence>
      <span className="rating"><Star size={11} fill="currentColor"/> {(item.vote_average || 0).toFixed(1)}</span>
    </motion.div>
    <div className="cinejoy-card-info"><strong>{title}</strong><span>{date.slice(0,4) || '—'}</span></div>
  </button>;
}
