import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Loading from './components/Loading/Loading'

//Lazy imports
const Home = lazy(() => import('./pages/Home/Home'))
const Top250Movies = lazy(() => import('./pages/TopMovies/Top250Movies'))
const MovieDetails = lazy(() => import('./pages/MovieDetails/MovieDetails'))

function App() {
  // Reset page scroll when navigating to another path
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
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
      <Route path="/top-250-movies" element={
        <Suspense fallback={<Loading />}>
          <Top250Movies />
        </Suspense>
      } />

      {/* Might build a 404 page here later */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
