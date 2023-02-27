import React from 'react'
import Navbar from './Navbar/Navbar'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function Layout({ children }) {
  return (
    <>
      <div className='bg-neutral-900'>
        <Navbar />
        {children}
      </div>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default Layout
