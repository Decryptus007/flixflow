import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { addToWatchList, checkIfMovieExist } from "../../../utils/handleWatchList";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import '../../Home/styles.css'

const Recommended = ({ recommend }) => {
  const [similars, setSimilars] = useState(recommend)
  const [isLoved, setIsLoved] = useState(false)

  //Fix to trigger re-rendering when 'Add to Watchlist' btn is clicked
  useEffect(() => {
    setSimilars(recommend)
  }, [isLoved])

  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {
        similars.length ?
          similars.map(movie => (
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
                  <button
                    onClick={() => {
                      addToWatchList(movie)
                      setIsLoved(!isLoved)
                    }}
                    className='bg-yellow-500 w-fit text-sm text-neutral-900 font-bold rounded-lg px-4 py-2'
                  >
                    {checkIfMovieExist(movie.id) ? 'Remove' : 'Add to Watchlist'}
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
