import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import '../../styles.css'

const MovieSwiper = forwardRef((props, ref) => {
  const [comingSoonMovies, setComingSoonMovies] = useState([])

  //It will check if the data exist in localstorage before fetching new contents
  function getComingSoonOptimized() {
    if (localStorage.getItem('coming-soon') !== null) {
      setComingSoonMovies(JSON.parse(localStorage.getItem('coming-soon')))
    } else {
      getComingSoon()
    }
  }

  async function getComingSoon() {
    try {
      setComingSoonMovies([])
      localStorage.getItem('coming-soon') !== null && localStorage.removeItem('coming-soon')
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ComingSoon/${import.meta.env.VITE_IMDB_API_KEY}`);
      setComingSoonMovies(prev => ([...prev, response.data.items.slice(0, 14)]))
    } catch (error) {
      getComingSoon()
    }
  }

  //To make the function called in it's parent component
  useImperativeHandle(ref, () => ({
    getComingSoon,
  }));

  useEffect(() => {
    getComingSoonOptimized()
  }, [])

  useEffect(() => {
    // Stores the data in localstorage to prevent obsolete fetching
    //PENDING: Should auto refresh every 24 hours
    comingSoonMovies.length && localStorage.setItem('coming-soon', JSON.stringify(comingSoonMovies))
  }, [comingSoonMovies.length])

  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper mobile md:!hidden"
      >
        {
          comingSoonMovies.length ?
            comingSoonMovies[0].map(movie => (
              <SwiperSlide key={movie.id} className='relative group cursor-cell overflow-hidden'>
                <img src={movie.image} alt="" />
                <div className="absolute top-0 left-0 flex gap-4 flex-col justify-center overflow-hidden transition-[width] bg-neutral-900/90 w-0 h-full group-hover:w-full group-hover:p-2 group-hover:pb-8">
                  <div className="flex items-center">
                    <small className="w-[50px] text-sm font-normal block">Title:</small>
                    <h2 className="text-xl font-semibold">{movie.title}</h2>
                  </div>
                  <div className="flex items-center gap-1">
                    <small className="w-[50px] text-sm font-normal block">Date:</small>
                    <h2 className="text-base font-semibold">{movie.releaseState}</h2>
                  </div>
                  <div className="flex items-center gap-1">
                    <small className="w-[50px] text-sm font-normal block">Genres:</small>
                    <small className="font-semibold">{movie.genres}</small>
                  </div>
                  <div className="flex items-center gap-1">
                    <small className="w-[50px] text-sm font-normal block">Stars:</small>
                    <small className="font-semibold">{movie.stars}</small>
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
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper !hidden md:!block"
      >
        {
          comingSoonMovies.length ?
            comingSoonMovies[0].map(movie => (
              <SwiperSlide key={movie.id} className='relative group cursor-cell overflow-hidden'>
                <img src={movie.image} alt="" />
                <div className="absolute top-0 left-0 flex gap-4 flex-col justify-center overflow-hidden transition-[width] bg-neutral-900/90 w-0 h-full group-hover:w-full group-hover:p-4 group-hover:pb-8">
                  <div className="flex items-center">
                    <small className="w-[50px] block">Title:</small>
                    <h2 className="text-xl font-semibold">{movie.title}</h2>
                  </div>
                  <div className="flex items-center gap-1">
                    <small className="w-[50px] block">Date:</small>
                    <h2 className="text-base font-semibold">{movie.releaseState}</h2>
                  </div>
                  <div className="flex items-center gap-1">
                    <small className="w-[50px] block">Genres:</small>
                    <small className="font-semibold">{movie.genres}</small>
                  </div>
                  <div className="flex items-center gap-1">
                    <small className="w-[50px] block">Stars:</small>
                    <small className="font-semibold">{movie.stars}</small>
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
    </>
  )
})

export default MovieSwiper
