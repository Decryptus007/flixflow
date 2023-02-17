import { lazy, Suspense, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Loading from './components/Loading/Loading'

//Lazy imports
const Home = lazy(() => import('./pages/Home/Home'))
const Top250Movies = lazy(() => import('./pages/TopMovies/Top250Movies'))

function App() {

  return (
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      } />
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
