import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Play, Star } from 'lucide-react';

// Sluurm's adapted Cinejoy Card: same hover-reveal interaction and motion,
// using TMDB poster artwork and Sluurm's accent colour.
export default function Card({ item, type = 'movie', onOpen }) {
  const [isHovered, setIsHovered] = useState(false);
  const title = item.title || item.name || 'Untitled';
  const date = item.release_date || item.first_air_date || '';
  const poster = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : '';

  return (
    <button
      type="button"
      className="cinejoy-card"
      onClick={() => onOpen?.(item, type)}
      aria-label={`Open ${title}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="cinejoy-card-media">
        {poster ? <img src={poster} alt={title} loading="lazy" /> : <div className="poster-empty">SLUURM</div>}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="cinejoy-card-overlay"
            >
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.25 }}
                className="cinejoy-card-overlay-content"
              >
                <span className="cinejoy-card-play"><Play size={19} fill="currentColor" /></span>
                <strong>{title}</strong>
                <span className="cinejoy-card-year">{date.slice(0, 4)} · {(item.vote_average || 0).toFixed(1)} ★</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="cinejoy-card-info">
        <strong>{title}</strong>
        <span>{date.slice(0, 4) || '—'}</span>
      </div>
    </button>
  );
}
