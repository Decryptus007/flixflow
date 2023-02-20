import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import '../../Home/styles.css'

function PosterSwiper({ id }) {
  const [posterImages, setPosterImages] = useState([])

  async function fetchMovieData(movieId) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/Posters/${import.meta.env.VITE_IMDB_API_KEY}/${movieId}`)
      setPosterImages([...response.data.posters.slice(0, 6)])
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMovieData(id)
  }, [id])

  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={20}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      {
        posterImages.length ?
          posterImages.map(img => (
            <SwiperSlide key={img.link} className='relative group cursor-cell overflow-hidden'>
              <img src={img.link} alt="" />
            </SwiperSlide>
          ))
          :
          [0, 0, 0, 0, 0].map((_, id) => (
            <SwiperSlide key={id}>
              <div className="skeleton flex items-center justify-center">
                <b>No image found</b>
              </div>
            </SwiperSlide>
          ))
      }
    </Swiper>
  )
}

export default PosterSwiper