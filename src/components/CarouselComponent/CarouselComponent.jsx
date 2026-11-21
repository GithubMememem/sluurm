import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import Card from '../Card/Card';

// Adapted from Cinejoy's Swiper carousel component (MIT).
export default function CarouselComponent({ cardsData = [], type = 'movie', title, onOpen }) {
  if (!cardsData.length) return null;

  return (
    <div className="cinejoy-carousel" aria-label={title}>
      <Swiper
        modules={[Navigation, FreeMode]}
        navigation
        freeMode={{ enabled: true, sticky: false }}
        spaceBetween={16}
        slidesPerView="auto"
        watchOverflow
        className="w-full"
      >
        {cardsData.map((item) => (
          <SwiperSlide key={item.id}>
            <Card item={item} type={type} onOpen={onOpen} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
