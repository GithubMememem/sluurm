import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import Card from '../Card/Card';

// Directly adapted from Cinejoy's Swiper carousel component.
export default function CarouselComponent({ cardsData = [], type = 'movie', title, onOpen }) {
  if (!cardsData.length) return null;
  return (
    <div className="cinejoy-carousel relative" aria-label={title}>
      <Swiper
        modules={[Navigation, FreeMode]}
        navigation
        freeMode
        spaceBetween={16}
        slidesPerView="auto"
        className="w-full"
      >
        {cardsData.map(item => (
          <SwiperSlide key={item.id} className="select-none">
            <Card item={item} type={type} onOpen={onOpen} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
