import React, { useRef } from 'react'
import MovieSwiperPopularTv from './MovieSwiper/MovieSwiperPopularTv';

function MostPopularSeries() {
  const refreshPopular = useRef()

  const refreshPopularFunc = () => {
    refreshPopular.current.getMostPopular();
  }

  return (
    <div className='mt-10'>
      <div className='flex items-center justify-between gap-2'>
        <h2 className="text-2xl font-bold">Most Popular Series</h2>
        <small onClick={refreshPopularFunc} className='cursor-pointer flex items-center'>
          Refresh
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </small>
      </div>
      <div className="mt-10 mx-auto w-fit md:w-auto">
        <MovieSwiperPopularTv ref={refreshPopular} />
      </div>
    </div>
  )
}

export default MostPopularSeries