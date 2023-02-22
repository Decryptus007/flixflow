import React, { useRef, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Select from 'react-select'
import { ButtonLoader } from '../../../Loading/Loading';

import '../../../../pages/Home/styles.css'

//Results filter option
const resultsOptions = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
]
//Year filter option
const yearOptions = [];
//Loop from year 1900 to the current year to populate the yearOptions Array
const currentYear = new Date().getFullYear();
for (let year = 1900; year <= currentYear; year++) {
  yearOptions.push({ value: year, label: year.toString() });
}
yearOptions.push({ value: '', label: 'Select' })
// For User experience I reversed the year to start from current year
yearOptions.reverse()

const yearRegex = /\b(19[0-9][0-9]|20[0-9][0-9])\b/; // matches years from 1900 to 2099

// The SearchBar Component
function SearchBar({ desktop }) {
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState({
    isLoading: false,
    resultsReady: false
  })
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  // Filters UseState
  const [isFilterOpened, setIsFilterOpened] = useState(false)
  //Set the default filters
  const [filter, setFilter] = useState({
    resultsNo: resultsOptions[1].label,
    releaseDate: {
      from: '',
      to: ''
    }
  })

  // The initialization to cancel Promises
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

      //The first check is if no year filter is present
      if (filter.releaseDate.from === '' && filter.releaseDate.to === '') {
        //Slice the response and set the last index to the filter
        setSearchResults([...response.data.results.slice(0, parseInt(filter.resultsNo))])
      } else {
        //Set the filter range of years
        let filteredYearArr = []
        response.data.results.map(item => {
          const yearMatch = item.description.match(yearRegex);
          const year = yearMatch ? yearMatch[0] : null;
          //Reset to minimum incase the "from or to filter" is empty
          if (year && (year >= (filter.releaseDate.from || 1900) && year <= (filter.releaseDate.to || 2099))) {
            filteredYearArr.push(item)
          }
        })
        setSearchResults([...filteredYearArr.slice(0, parseInt(filter.resultsNo))])
      }

      setSearching({ isLoading: false, resultsReady: true })
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.log(error);
      }
    }
  }

  return (
    <form onSubmit={(e) => handleSearch(e)} className={`relative flex-grow h-[44px] bg-neutral-900 ${desktop ? 'hidden max-w-[700px] lg:block' : 'w-full lg:hidden'}`}>
      {/* Search Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer text-yellow-500 absolute top-2.5 left-2" onClick={null}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>

      {/* Input Bar */}
      <input
        type="search"
        name="movie-search"
        id="movie-search"
        autoComplete='off'
        className='w-full h-full rounded-md bg-transparent text-yellow-500 border border-yellow-500 transition px-10 focus:outline-none focus:border-2 placeholder:text-yellow-800'
        placeholder='Search Movies, Shows...'
        autoFocus={!desktop && true}
        onChange={handleSearch}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => {
          setTimeout(() => {
            setIsSearchFocused(false)
          }, 300);
        }}
      />

      {/* Loading Icon */}
      <div className={`absolute top-2.5 right-2 ${searching.isLoading ? 'block' : 'hidden'}`}>
        <ButtonLoader />
      </div>

      {/* Filter Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 cursor-pointer text-yellow-500 absolute top-2.5 right-2 ${searching.isLoading && 'hidden'}`} onClick={() => setIsFilterOpened(!isFilterOpened)}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>

      {/* Filter Bar */}
      <div className={`${isFilterOpened ? 'block' : 'hidden'} p-2 bg-neutral-900 rounded-md border border-yellow-500 absolute z-10 right-0 top-[48px] min-h-[100px] w-[300px] flex flex-col gap-2 lg:left-[85%] lg:right-0`}>
        <div className="flex items-center justify-between gap-2">
          <span>Results per Search</span>
          <Select
            isSearchable={false}
            defaultValue={resultsOptions[1]}
            options={resultsOptions}
            onChange={(e) => setFilter({ ...filter, resultsNo: e.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span>Release Date:</span>
          <div className='flex items-center justify-between gap-2'>
            <div className='flex items-center gap-1'>
              <small>From:</small>
              <Select
                options={yearOptions}
                onChange={(e) => setFilter({
                  ...filter,
                  releaseDate: { ...filter.releaseDate, from: e.value }
                })}
              />
            </div>
            <div className='flex items-center gap-1'>
              <small>To:</small>
              <Select
                options={yearOptions}
                onChange={(e) => setFilter({
                  ...filter,
                  releaseDate: { ...filter.releaseDate, to: e.value }
                })
                }
              />
            </div>
          </div>
          {/* Disclaimer */}
          <small className='font-sans block text-center pt-1 border border-yellow-500'>
            Filter by Genre is not available due to the limitation of IMDB API
          </small>
        </div>
      </div>

      {/* Results Bar */}
      <div className={`absolute top-[44px] z-10 left-0 bg-neutral-900 w-full max-h-[400px] overflow-y-auto flex flex-col shadow-sm shadow-yellow-500 ${(searching.resultsReady && isSearchFocused) ? 'block' : 'hidden'}`}>
        {
          searchResults.length ?
            searchResults.map(res => (
              <Link key={res.id} to={`/flix/${res.id}`} className="border-b border-yellow-500 px-2 py-4 flex gap-2 hover:bg-neutral-800 md:px-4 md:gap-4">
                <img src={res.image} alt="" className='h-[100px] w-[80px] skeleton-lite rounded-sm' />
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
  )
}

export default SearchBar