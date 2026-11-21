import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Play } from 'lucide-react';

// Adapted from Cinejoy's Card component (MIT); metadata fields are mapped to Cinemeta.
export default function Card({ item, type = 'movie', onOpen }) {
  const [isHovered, setIsHovered] = useState(false);
  const title = item.title || item.name || 'Untitled';
  const release = item.release_date || item.first_air_date || item.releaseInfo || '';

  return (
    <button
      type="button"
      className="cinejoy-card"
      onClick={() => onOpen?.(item, item.media_type || type)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Open ${title}`}
    >
      <div className="cinejoy-card-media">
        {item.poster ? <img src={item.poster} alt={title} loading="lazy" /> : <div className="poster-empty">SLUURM</div>}
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
                <span className="cinejoy-card-play"><Play size={20} fill="currentColor" /></span>
                <strong>{title}</strong>
                <span className="cinejoy-card-year">{release.slice(0, 4)}</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="cinejoy-card-info">
        <strong title={title}>{title}</strong>
        <span>{release.slice(0, 4)}</span>
      </div>
    </button>
  );
}
