import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Loading from './components/Loading/Loading'

//Lazy imports
const Home = lazy(() => import('./pages/Home/Home'))
const Top250Movies = lazy(() => import('./pages/TopMovies/Top250Movies'))
const Top250Series = lazy(() => import('./pages/TopMovies/Top250Series'))
const MovieDetails = lazy(() => import('./pages/MovieDetails/MovieDetails'))
const WatchList = lazy(() => import('./pages/WatchList/WatchList'))
const InTheaters = lazy(() => import('./pages/InTheaters'))
const AllTimeBoxOffice = lazy(() => import('./pages/AllTimeBoxOffice'))

function App() {
  // Reset page scroll when navigating to another path
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);

    // Reset the title and meta head if the path !== movie page
    if (!pathname.includes('/flix/tt')) {
      //Check if the document.title has been modified
      if (document.title !== 'FlixFlow') {
        document.title = 'FlixFlow'
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute("content", "Discover your next favorite movie with FlixFlow - the ultimate movie search web app. Find the latest releases, explore top-rated films, and search by keyword to uncover hidden gems. With FlixFlow, your next movie night is just a click away.");
        }
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      } />
      <Route path="/flix">
        <Route index={true} element={<Navigate to="/" />} />
        <Route path=":id" element={
          <Suspense fallback={<Loading />}>
            <MovieDetails />
          </Suspense>
        } />
      </Route>
      <Route path="/watchlist" element={
        <Suspense fallback={<Loading />}>
          <WatchList />
        </Suspense>
      } />
      <Route path="/top-250-movies" element={
        <Suspense fallback={<Loading />}>
          <Top250Movies />
        </Suspense>
      } />
      <Route path="/top-250-series" element={
        <Suspense fallback={<Loading />}>
          <Top250Series />
        </Suspense>
      } />
      <Route path="/in-theaters" element={
        <Suspense fallback={<Loading />}>
          <InTheaters />
        </Suspense>
      } />
      <Route path="//all-time-box-office" element={
        <Suspense fallback={<Loading />}>
          <AllTimeBoxOffice />
        </Suspense>
      } />

      {/* Might build a 404 page here later */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
