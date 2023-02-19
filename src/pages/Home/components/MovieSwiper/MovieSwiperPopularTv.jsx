import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import '../../styles.css'

const MovieSwiperPopularTv = forwardRef((props, ref) => {
  const [mostPopularMovies, setMostPopularMovies] = useState([])

  //It will check if the data exist in localstorage before fetching new contents
  function getMostPopularOptimized() {
    if (localStorage.getItem('most-popular-tv') !== null) {
      setMostPopularMovies(JSON.parse(localStorage.getItem('most-popular-tv')))
    } else {
      getMostPopular()
    }
  }

  async function getMostPopular() {
    try {
      setMostPopularMovies([])
      localStorage.getItem('most-popular-tv') !== null && localStorage.removeItem('most-popular-tv')
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/MostPopularTVs/${import.meta.env.VITE_IMDB_API_KEY}`);
      setMostPopularMovies(prev => ([...prev, response.data.items.slice(0, 14)]))
    } catch (error) {
      getMostPopular()
    }
  }

  //To make the function called in it's parent component
  useImperativeHandle(ref, () => ({
    getMostPopular,
  }));

  useEffect(() => {
    getMostPopularOptimized()
  }, [])

  useEffect(() => {
    // Stores the data in localstorage to prevent obsolete fetching
    //PENDING: Should auto refresh every 24 hours
    mostPopularMovies.length && localStorage.setItem('most-popular-tv', JSON.stringify(mostPopularMovies))
  }, [mostPopularMovies.length])

  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper mobile md:!hidden"
      >
        {
          mostPopularMovies.length ?
            mostPopularMovies[0].map(movie => (
              <SwiperSlide key={movie.id} className='relative group cursor-cell overflow-hidden'>
                <img src={movie.image} alt="" />
                <div className="absolute top-0 left-0 flex gap-4 flex-col justify-center overflow-hidden transition-[width] bg-neutral-900/90 w-0 h-full group-hover:w-full group-hover:p-2 group-hover:pb-8">
                  <div className="flex items-center">
                    <small className="w-[50px] text-sm font-normal block">Title:</small>
                    <h2 className="text-xl font-semibold">{movie.title}</h2>
                  </div>
                  <div className="flex items-center gap-1">
                    <small className="w-[50px] text-sm font-normal block">Ratings:</small>
                    <h2 className="text-base font-semibold">{movie.imDbRating}</h2>
                  </div>
                  <div className="flex items-center gap-1">
                    <small className="w-[50px] text-sm font-normal block">Rank:</small>
                    <small className="font-semibold">{movie.rank}</small>
                  </div>
                  <div className="flex items-center gap-1">
                    <small className="w-[50px] text-sm font-normal block">Stars:</small>
                    <small className="font-semibold">{movie.crew}</small>
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
          delay: 2500,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper !hidden md:!block"
      >
        {
          mostPopularMovies.length ?
            mostPopularMovies[0].map(movie => (
              <SwiperSlide key={movie.id} className='relative group cursor-cell overflow-hidden'>
                <img src={movie.image} alt="" />
                <div className="absolute top-0 left-0 flex gap-4 flex-col justify-center overflow-hidden transition-[width] bg-neutral-900/90 w-0 h-full group-hover:w-full group-hover:p-4 group-hover:pb-8">
                  <div className="flex items-center">
                    <small className="w-[50px] block">Title:</small>
                    <h2 className="text-xl font-semibold">{movie.title}</h2>
                  </div>
                  <div className="flex items-center gap-1">
                    <small className="w-[50px] block">Ratings:</small>
                    <h2 className="text-base font-semibold">{movie.imDbRating}</h2>
                  </div>
                  <div className="flex items-center gap-1">
                    <small className="w-[50px] block">Rank:</small>
                    <small className="font-semibold">{movie.rank}</small>
                  </div>
                  <div className="flex items-center gap-1">
                    <small className="w-[50px] block">Stars:</small>
                    <small className="font-semibold">{movie.crew}</small>
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

export default MovieSwiperPopularTv
