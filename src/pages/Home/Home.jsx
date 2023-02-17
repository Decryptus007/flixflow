import React, { useRef, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import { ButtonLoader } from '../../components/Loading/Loading'
import ComingSoon from './components/ComingSoon'
import MostPopularMovies from './components/MostPopularMovies'
import MostPopularSeries from './components/MostPopularSeries'
import Select from 'react-select'

const resultsOptions = [
  { value: 5, label: '5' },
  { value: 8, label: '8' },
  { value: 15, label: '15' },
]

function Home() {
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState({
    isLoading: false,
    resultsReady: false
  })
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isFilterOpened, setIsFilterOpened] = useState(false)

  const abortController = useRef(new AbortController());

  function handleSearch(e) {
    e.preventDefault()

    if (e.target.value) {
      setSearching({ ...searching, isLoading: true })
      setSearchResults([])

      // Abort previous request before it is successful when new input is typed
      abortController.current.abort();
      abortController.current = new AbortController();

      searchFlix(e.target.value)
    } else {
      setSearching({ isLoading: false, resultsReady: false })
    }
  }

  async function searchFlix(exp) {
    try {
      // Abort previous request before it is successful when new input is typed
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/Search/${import.meta.env.VITE_IMDB_API_KEY}/${exp}`, {
        signal: abortController.current.signal,
      });

      setSearchResults([...response.data.results.slice(0, 14)])
      setSearching({ isLoading: false, resultsReady: true })
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.log(error);
      }
    }
  }

  return (
    <Layout>
      <div className="2xl:container 2xl:mx-auto">
        <div className="overflow-hidden p-2 pb-40 md:pb-40 md:p-4">
          <h1 className='text-center font-bold text-xl md:text-3xl'>Find your next favorite flick with FlixFlow!</h1>
          <form onSubmit={(e) => handleSearch(e)} className='relative mt-8 mx-auto h-[44px] md:w-[700px] first-line'>
            {/* Search Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer text-yellow-500 absolute top-2.5 left-2" onClick={handleSearch}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>

            {/* Input Bar */}
            <input
              type="search"
              name="movie-search"
              id="movie-search"
              autoComplete='off'
              className='w-full h-full rounded-md bg-transparent text-yellow-500 border border-yellow-500 transition px-10 md:px-10 focus:outline-none focus:shadow-md focus:shadow-yellow-500 placeholder:text-yellow-800'
              placeholder='Search Movies, Shows...'
              onChange={handleSearch}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />

            {/* Loading Icon */}
            <div className={`absolute top-2.5 right-2 ${searching.isLoading ? 'block' : 'hidden'}`}>
              <ButtonLoader />
            </div>

            {/* Filter Icon */}
            <div className="absolute top-[48px] flex items-center gap-2 cursor-pointer rounded-md p-2 border border-yellow-500 lg:top-0 lg:-right-36" onClick={() => setIsFilterOpened(!isFilterOpened)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
              <span className='text-sm lg:text-base'>Filters</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`transition-transform w-6 h-6 text-yellow-500 ${isFilterOpened && 'rotate-180'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>

            {/* Filter Bar */}
            <div className={`${isFilterOpened ? 'block' : 'hidden'} p-2 bg-neutral-900 rounded-md border border-yellow-500 absolute z-10 left-0 top-[92px] min-h-[100px] w-[200px] flex flex-col gap-2 lg:right-0 lg:top-[48px]`}>
              <div className="flex items-center gap-2">
                <small>Results per Input</small>
                <Select
                  defaultValue={resultsOptions[2]}
                  options={resultsOptions}
                />
              </div>
            </div>

            {/* Results Bar */}
            <div className={`absolute top-[44px] z-10 left-0 bg-neutral-900 w-full max-h-[200px] overflow-y-auto flex flex-col shadow-sm shadow-yellow-500 ${(searching.resultsReady && isSearchFocused) ? 'block' : 'hidden'}`}>
              {
                searchResults.length ?
                  searchResults.map(res => (
                    <Link key={res.id} to={'/'} className="border-b border-yellow-500 px-2 py-4 flex gap-2 hover:bg-neutral-800 md:px-4 md:gap-4">
                      <img src={res.image} alt="" className='h-[100px] w-[80px] rounded-sm' />
                      <div className="flex flex-col gap-1">
                        <span className='font-semibold'>{res.title}</span>
                        <small>{res.description}</small>
                      </div>
                    </Link>
                  ))
                  :
                  <div className="px-2 py-4 flex flex-col gap-1 hover:bg-neutral-800 md:px-4">
                    <span className='font-semibold h-4 skeleton'></span>
                    <small className='h-2 skeleton'></small>
                  </div>
              }
            </div>
          </form>
          <div className="mt-20 lg:mt-16">
            <ComingSoon />
            <MostPopularSeries />
            <MostPopularMovies />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home