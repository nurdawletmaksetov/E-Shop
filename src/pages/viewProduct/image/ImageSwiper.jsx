import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Swiper.css'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const ImageSwiper = ({ oneProduct }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <>
            <Swiper
                style={{
                    borderRadius: '10px',
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Thumbs]}
                className="mySwiper2"
            >
                {oneProduct?.images?.map((img, index) => (
                    <SwiperSlide
                        style={{
                            borderRadius: '10px',
                        }}
                    >
                        <img key={index} src={img} />
                    </SwiperSlide>
                ))}
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

                {oneProduct?.images?.map((img, index) => (
                    <SwiperSlide
                        style={{
                            borderRadius: '10px',
                        }}
                    >
                        <img key={index} src={img} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default ImageSwiper