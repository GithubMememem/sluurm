import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import Card from '../Card/Card';

// Port of Cinejoy's original Swiper-based CarouselComponent, wired to Sluurm's
// no-key local catalogue and the redesigned purple Card component.
export default function CarouselComponent({ cardsData = [], type = 'movie', title, onOpen }) {
  if (!cardsData.length) return null;
  return <section className="cinejoy-carousel" aria-label={title}>
    <Swiper modules={[Navigation, FreeMode]} navigation freeMode spaceBetween={14} slidesPerView="auto" className="w-full">
      {cardsData.map(item => <SwiperSlide key={item.id}>
        <Card item={item} type={type} onOpen={onOpen}/>
      </SwiperSlide>)}
    </Swiper>
  </section>;
}
