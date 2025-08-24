import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import './styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';



export default function StyleSlider6 () {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className='h-screen relative'>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={8}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <img src="/styles/img1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/styles/img2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/styles/img3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/styles/img4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/styles/img5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/styles/img6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/styles/img7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/styles/img8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/styles/img9.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/styles/img10.jpg" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/styles/img1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/styles/img2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/styles/img3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/styles/img4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/styles/img5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/styles/img6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/styles/img7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/styles/img8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/styles/img9.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/styles/img10.jpg" />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
