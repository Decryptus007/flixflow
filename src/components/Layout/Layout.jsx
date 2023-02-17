import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

function Layout({ children }) {
  return (
    <>
      <div className='min-h-[90vh] bg-neutral-900'>
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout
