import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout'
import { addToWatchList, checkIfMovieExist } from '../utils/handleWatchList';

const itemsPerPage = 10; // maximum number of items to display per page

function InTheaters() {
  const navigate = useNavigate()

  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoved, setIsLoved] = useState(false)

  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startItemIndex = (currentPage - 1) * itemsPerPage;
  const endItemIndex = currentPage * itemsPerPage;
  let currentItems = movies.slice(startItemIndex, endItemIndex);

  async function fetchMovieData() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL_LANG}/InTheaters/${import.meta.env.VITE_IMDB_API_KEY}`)
      setMovies(response.data.items)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMovieData()
  }, [])

  //Fix to trigger re-rendering when 'Add to Watchlist' btn is clicked
  useEffect(() => {
    currentItems = currentItems
  }, [isLoved])


  return (
    <Layout>
      <div className="pb-20 2xl:container 2xl:mx-auto">
        <div className="px-2 md:px-4">
          <h2 className="text-2xl font-bold">In Theaters</h2>
          <div className="mt-6">
            <div className="flex flex-col gap-4 mx-auto lg:w-[700px]">
              {
                movies ?
                  currentItems.map((movie => (
                    <div key={movie.id}
                      className="cursor-pointer rounded-md overflow-hidden border border-yellow-500 h-[150px] flex transition-transform hover:scale-[1.01]"
                    >
                      <img
                        src={movie.image}
                        alt="" className='skeleton-lite w-[35%] lg:w-[200px]'
                        onClick={() => navigate(`/flix/${movie.id}`)}
                      />
                      <div className="flex w-full p-2 justify-evenly flex-col">
                        <p className="font-semibold" onClick={() => navigate(`/flix/${movie.id}`)}>{movie.title}</p>
                        <span>{movie.starList[0].name}</span>
                        <div className="flex w-full items-center justify-between">
                          <span>{movie.year}</span>
                          <button
                            onClick={() => {
                              addToWatchList(movie)
                              setIsLoved(!isLoved)
                            }}
                            className='bg-yellow-500 text-sm text-neutral-900 font-bold rounded-lg px-4 py-2'
                          >
                            {checkIfMovieExist(movie.id) ? 'Remove' : 'Add to Watchlist'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )))
                  :
                  [0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, id) => (
                    <div key={id} className="rounded-md overflow-hidden border border-yellow-500 min-h-[150px] flex">
                      <img src="" alt="" className='skeleton-lite w-[35%] lg:w-[200px]' />
                      <div className="flex p-2 justify-evenly flex-col">
                        <span className='skeleton-lite block h-6 w-20'></span>
                        <p className="skeleton-lite block h-6 w-32"></p>
                        <span className='skeleton-lite block h-6 w-10'></span>
                      </div>
                    </div>
                  ))
              }
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button key={index} onClick={() => handlePageChange(index + 1)} className="p-1 bg-yellow-500 text-neutral-900">
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default InTheaters