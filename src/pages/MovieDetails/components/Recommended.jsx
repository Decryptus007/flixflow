import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import '../../Home/styles.css'

const Recommended = ({ recommend }) => {

  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={20}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      {
        recommend.length ?
          recommend.map(movie => (
            <SwiperSlide key={movie.id} className='relative group cursor-cell overflow-hidden'>
              <img src={movie.image} alt="" />
              <div className="absolute top-0 left-0 flex gap-4 flex-col justify-center overflow-hidden transition-[width] bg-neutral-900/90 w-0 h-full group-hover:w-full group-hover:p-2 group-hover:pb-8">
                <div className="flex items-center">
                  <small className="w-[50px] text-sm font-normal block">Title:</small>
                  <h2 className="text-xl font-semibold">{movie.title}</h2>
                </div>
                <div className="flex items-center gap-1">
                  <small className="w-[50px] text-sm font-normal block">Rating:</small>
                  <h2 className="text-base font-semibold">{movie.imDbRating}</h2>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <button className='bg-yellow-500 w-fit text-sm text-neutral-900 font-bold rounded-lg px-4 py-2'>
                    Add to Watchlist
                  </button>
                  <Link to={`/flix/${movie.id}`} className='bg-yellow-500 w-fit text-sm text-neutral-900 font-bold rounded-lg px-4 py-2'>
                    View More
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))
          :
          [0, 0, 0, 0, 0].map((_, id) => (
            <SwiperSlide key={id}>
              <div className="skeleton"></div>
            </SwiperSlide>
          ))
      }
    </Swiper>
  )
}

export default Recommended
