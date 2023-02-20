import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import SearchBar from './components/SearchBar'

import '../styles.css'

function Navbar() {
  const { pathname } = useLocation();

  const [navBarToggled, setNavBarToggled] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  //This is added to prevent the window from scrolling while the navbar is opened
  useEffect(() => {
    if (navBarToggled) {
      document.body.classList.add('body-no-scroll');
    } else {
      document.body.classList.remove('body-no-scroll');
    }

    return () => {
      document.body.classList.remove('body-no-scroll');
    };
  }, [navBarToggled])

  //Handle back button when Search bar is active on Mobile Screen
  useEffect(() => {
    const handlePopstate = (event) => {
      if (event.state && event.state.search) {
        setShowMobileSearch(false);
      }
    };
    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  function openMobileSearch() {
    setShowMobileSearch(true)
    window.history.pushState({ search: true }, '', '?search=true');  // add a new history entry
  }

  function closeMobileSearch() {
    setShowMobileSearch(false)
    window.history.back(); // go back to the previous history entry
  }

  return (
    <div className='bg-neutral-900 mb-6 sticky z-20 top-0 left-0 shadow shadow-yellow-500'>
      <nav className="relative px-2 flex items-center justify-between md:px-4 lg:gap-4 2xl:container 2xl:mx-auto">
        <Link to="/" className='title py-4 text-2xl font-bold'>FlixFlow</Link>

        {/* Search Input */}
        {/* It should only display the search bar if the path is not Home */}
        {pathname !== '/' && <SearchBar desktop={true} />}

        <div className="flex items-center gap-4 h-full lg:hidden">
          {/* Search Icon */}
          {/* It should only display the search bar if the path is not Home */}
          {
            pathname !== '/' && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer text-yellow-500" onClick={openMobileSearch}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          }
          {/* Mobile WatchList Menu */}
          <Link to={'/watchlist'} className='relative flex'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <sup className='text-yellow-500 rounded-full -ml-1 mt-2 font-bold'>0</sup>
          </Link>

          {/* Mobile Nav Toggler */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-yellow-500 cursor-pointer" onClick={() => setNavBarToggled(!navBarToggled)}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
          </svg>
        </div>

        {/* The sidebar effects */}
        <div className={`bg-yellow-500 transition-[width] fixed top-0 right-0 h-screen ${navBarToggled ? 'w-screen rounded-tl-3xl rounded-bl-3xl' : 'w-0'} z-10 lg:hidden`} onClick={() => setNavBarToggled(!navBarToggled)}></div>
        <div className={`bg-neutral-900 transition-[width] duration-300 fixed top-0 right-0 h-screen ${navBarToggled ? 'w-[90vw] rounded-tl-3xl rounded-bl-3xl' : 'w-0'} z-10 lg:hidden`} onClick={() => setNavBarToggled(!navBarToggled)}></div>

        <div className={`nav-container transition-[width] duration-500 ${navBarToggled ? 'flex flex-col fixed top-0 right-0 z-20 h-screen bg-yellow-500 w-[80vw] rounded-tl-3xl rounded-bl-3xl overflow-hidden' : 'w-0 overflow-hidden items-center absolute lg:relative lg:w-auto lg:flex-row lg:flex'}`}>
          <h2 className="text-3xl block py-4 text-neutral-900 font-bold text-center title lg:hidden">FlixFlow</h2>

          {/* Desktop WatchList Menu */}
          <NavLink to={'/watchlist'} activeclassname="active" className='hidden pr-10 font-bold px-2 py-4 transition hover:text-neutral-900 hover:bg-yellow-500 lg:block'>My WatchList<sup className='active rounded-full !p-1'>0</sup></NavLink>

          <NavLink to={'/top-250-movies'} activeclassname="active" className='px-2 py-4 border-y border-neutral-900 lg:border-y-0 lg:border-x lg:border-yellow-500 transition hover:text-neutral-900 hover:bg-yellow-500'>Top 250 Movies</NavLink>
          <NavLink to={'/top-250-series'} activeclassname="active" className='px-2 py-4 border-y border-neutral-900 lg:border-y-0 lg:border-x lg:border-yellow-500 transition hover:text-neutral-900 hover:bg-yellow-500'>Top 250 Series</NavLink>
          <NavLink to={'/in-theaters'} activeclassname="active" className='px-2 py-4 border-y border-neutral-900 lg:border-y-0 lg:border-x lg:border-yellow-500 transition hover:text-neutral-900 hover:bg-yellow-500'>In Theaters</NavLink>
          <NavLink to={'/all-time-box-office'} activeclassname="active" className='mid-none px-2 py-4 border-y border-neutral-900 lg:border-y-0 lg:border-x lg:border-yellow-500 transition hover:text-neutral-900 hover:bg-yellow-500'>All Time Box Office</NavLink>
        </div>

        {/* Mobile Search */}
        {showMobileSearch &&
          <>
            <div className="fixed w-screen h-screen top-0 left-0 z-20" onClick={closeMobileSearch}></div>
            <div className="absolute z-30 top-16 left-0 w-full bg-white">
              <SearchBar />
            </div>
          </>
        }
      </nav>
    </div>
  )
}

export default Navbar