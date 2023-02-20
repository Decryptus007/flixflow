import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { dateFormatter } from '../../utils/dateFormatter'
import Loading from '../../components/Loading/Loading';
import Layout from '../../components/Layout/Layout'
import PosterSwiper from './components/PosterSwiper'
import Recommended from './components/Recommended'
import './styles.css'

//Prevent duplicate toast
const customIdWarning = "custom-id-warn";
const customIdError = "custom-id-error";

function MovieDetails() {
  //It gets the id from the url and populate the page
  const { id } = useParams();

  //actorList default was added to be able to load the cast
  const [movieData, setMovieData] = useState({ actorList: [] })
  const [moreDetails, setMoreDetails] = useState(false)

  const { pathname } = useLocation();
  useEffect(() => {
    setMovieData({ actorList: [] })
  }, [pathname]);

  async function fetchMovieData(movieId) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL_LANG}/Title/${import.meta.env.VITE_IMDB_API_KEY}/${movieId}`)
      setMovieData({ ...response.data })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMovieData(id)
  }, [id])


  // Toast Notification
  const notify = {
    warning: (mssg) => {
      toast.warning(mssg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        theme: "dark",
        toastId: customIdWarning
      });
    },
    error: (mssg) => {
      toast.error(mssg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        theme: "dark",
        toastId: customIdError
      });
    }
  }

  //Share page function
  const sharePage = async () => {
    if (navigator.share) {
      try {
        if (movieData.title) {
          const response = await fetch(movieData.image);
          const blob = await response.blob();

          await navigator.share({
            title: document.title,
            url: window.location.href,
            text: movieData.plot,
            files: [blob],
          });
        } else {
          notify.warning("The page you are attempting to share is currently loading")
        }
      } catch (error) {
        notify.error("Error sharing page")
      }
    } else {
      notify.warning("Your browser does not support this feature")
    }
  };

  return (
    <Layout>
      {
        // Check if movieData has loaded if not display `<Loading />`
        !movieData.plot ?
          <Loading />
          :
          <>
            {/* For SEO */}
            <Helmet>
              <meta name="description" content={movieData.plot} />
              <title>{movieData.title}</title>
            </Helmet>

            <div className="2xl:container 2xl:mx-auto">
              <div className="overflow-hidden pb-40 px-2 md:px-4">
                <div className="relative min-h-[300px]">
                  <PosterSwiper id={id} />

                  {/* Movie Title */}
                  <div className="absolute z-[3] bottom-0 left-0 w-full flex justify-center">
                    <div className="bg-white/20 rounded-xl px-4 flex flex-col justify-center gap-4 w-11/12 min-h-[6rem] md:w-[700px]">
                      <div className="flex items-center justify-between">
                        <p className='movie-title font-extrabold text-xl md:text-2xl'>{movieData.title}</p>
                        <div className="flex items-center gap-4">
                          {/* Share */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500 cursor-pointer w-6 h-6" onClick={sharePage}>
                            <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
                          </svg>
                          {/* Love */}
                          <Link to={'/watchlist'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-yellow-500 cursor-pointer w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg></Link>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:gap-4">
                        <span className="py-1 px-4 rounded-xl bg-blue-600 text-white font-mono text-sm md:text-base">{movieData.type}</span>
                        <span className="py-1 px-4 rounded-xl bg-green-600 text-white font-mono text-sm md:text-base">
                          {movieData.type === 'TVSeries' ? `${movieData.tvSeriesInfo.seasons.length} Season` : movieData.runtimeStr || 'N/A'}
                        </span>
                        <span className="py-1 px-4 rounded-xl bg-yellow-500 flex items-center gap-2">
                          <span className='text-white font-mono text-sm md:text-base'>{movieData.imDbRating || 'N/A'}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dark overlay */}
                  <div className="absolute z-[2] bottom-0 left-0 w-full h-[200px] fadeBottom"></div>
                </div>
                <div className='mt-8 flex flex-col gap-8 lg:gap-0 lg:flex-row'>
                  <div className="lg:p-4">
                    <h2 className="text-2xl font-bold">Plot</h2>
                    <div className="mt-2 bg-yellow-500 p-2 rounded-lg md:p-4">
                      <p className="text-neutral-900 font-mono">
                        {movieData.plot}
                      </p>
                    </div>
                  </div>
                  <div className="lg:p-4">
                    <div className={`relative pb-10 flex flex-wrap gap-8 items-center transition-[height] duration-300 ${moreDetails ? 'h-full' : 'h-[200px]'} overflow-hidden`}>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg underline font-semibold">Release Date</h3>
                        <span className='text-sm md:text-base'>{dateFormatter(movieData.releaseDate)}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg underline font-semibold">Genres</h3>
                        <span className='text-sm md:text-base'>{movieData.genres || 'N/A'}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg underline font-semibold">Awards</h3>
                        <span className='text-sm md:text-base'>{movieData.awards || 'N/A'}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg underline font-semibold">Prod. Companies</h3>
                        <span className='text-sm md:text-base'>{movieData.companies || 'N/A'}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg underline font-semibold">Director</h3>
                        <span className='text-sm md:text-base'>{movieData.directors || 'N/A'}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg underline font-semibold">Writer(s)</h3>
                        <span className='text-sm md:text-base'>{movieData.writers || 'N/A'}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg underline font-semibold">Languages</h3>
                        <span className='text-sm md:text-base'>{movieData.languages || 'N/A'}</span>
                      </div>
                      {/* Show More/Less Button */}
                      <div className="absolute bg-neutral-900 bottom-0 left-0 flex gap-2 w-full items-center justify-center">
                        {/* Yellow lines div below */}
                        <div className="border-t border-yellow-500 flex-grow"></div>
                        <button className='text-sm flex items-center gap-2' onClick={() => setMoreDetails(!moreDetails)}>
                          <span>{!moreDetails ? 'More' : 'Less'}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 text-neutral-900 bg-yellow-500 p-1 rounded-full transition-transform ${moreDetails && 'rotate-180'}`}>
                            <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
                          </svg>
                        </button>
                        {/* Yellow lines div below */}
                        <div className="border-t border-yellow-500 flex-grow"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h2 className="text-2xl font-bold">Cast</h2>
                  <div className='overflow-y-auto w-full'>
                    <div className="mt-2 flex item-center gap-2">
                      {
                        movieData.actorList.length ?
                          movieData.actorList.map((img, id) => (
                            <img key={id} src={img.image} alt="" className='rounded-md min-w-[100px] h-[100px] w-[100px]' />
                          ))
                          :
                          [0, 0, 0, 0, 0].map((_, id) => (
                            <div key={id} className='rounded-md min-w-[100px] h-[100px] w-[100px]'>
                              <div className="skeleton"></div>
                            </div>
                          ))
                      }
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <h2 className="text-2xl block mb-4 font-bold">Recommended for you</h2>
                  <Recommended recommend={movieData.similars ? movieData.similars : []} />
                </div>
              </div>
            </div>
          </>
      }
    </Layout>
  )
}

export default MovieDetails