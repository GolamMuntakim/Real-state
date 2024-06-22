import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';


// import required modules
import { EffectCards } from 'swiper/modules';

const Testimonial = () => {
    return (
        <div className='mt-20'>
           <div className='text-center font-bold text-3xl'>
            Testimonial
           </div>
           <div className='flex flex-col lg:flex-row justify-between items-center lg:p-4 mt-20 mx-auto'>
            <div className='lg:w-1/2'>
            <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper w-[300px] lg:w-[400px]"
      >
        <SwiperSlide> <img src="/images/slide1.png" alt=""  /></SwiperSlide>
        <SwiperSlide> <img src="/images/slide2.png" alt=""  /></SwiperSlide>
        <SwiperSlide> <img src="/images/slide3.png" alt=""  /></SwiperSlide>
        <SwiperSlide> <img src="/images/slide4.png" alt=""  /></SwiperSlide>
        <SwiperSlide> <img src="/images/slide5.png" alt=""  /></SwiperSlide>
       
      </Swiper>
            </div>
            <div className='w-[300px] lg:w-1/2'>
                <h4 className='font-bold text-2xl border-b-2 border-blue-900 pb-4'>
                “I couldn't have asked for a better real estate partner. <br />From the moment I expressed interest in buying a home, <br />their team went above and beyond to make the process”
                </h4>
            </div>
           </div>
        </div>
    );
};

export default Testimonial;