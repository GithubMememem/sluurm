import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Play } from 'lucide-react';

// Cinejoy-inspired animated poster card, adapted for Sluurm's metadata source.
export default function Card({item,type='movie',onOpen}){
 const [hovered,setHovered]=useState(false);
 const title=item.title||item.name||'Untitled';
 const year=item.release_date||item.first_air_date||item.releaseInfo||'';
 return <button type="button" className="cinejoy-card" onClick={()=>onOpen?.(item,item.media_type||type)}
  aria-label={'Open '+title} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
  <div className="cinejoy-card-media">{item.poster?<img src={item.poster} alt={title} loading="lazy"/>:<div className="poster-empty">SLUURM</div>}
   <AnimatePresence>{hovered&&<motion.div key="overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.22}} className="cinejoy-card-overlay">
    <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:12}} className="cinejoy-card-overlay-content">
     <span className="cinejoy-card-play"><Play size={18} fill="currentColor"/></span><strong>{title}</strong><span className="cinejoy-card-year">{year}</span>
    </motion.div></motion.div>}</AnimatePresence>
  </div><div className="cinejoy-card-info"><strong>{title}</strong><span>{year||'—'}</span></div>
 </button>;
}
