import React from 'react'
import imdbImg from '../../assets/imdb.png'

function Footer() {
  return (
    <div className='h-[15vh] bg-neutral-900 border-t border-yellow-500'>
      <div className="py-2 flex items-center justify-center flex-col gap-2 2xl:container 2xl:mx-auto">
        <small>
          Created with &hearts; by {" "}
          <a href="https://www.linkedin.com/in/decryptus/" target={'_blank'} className='underline'>Decryptus</a>
        </small>
        <small>Copyright &copy; {new Date().getFullYear()}.</small>
        <small>Powered by {" "}
          <a href="https://imdb-api.com/" target={'_blank'} className='underline'>
            <img src={imdbImg} alt="" className='inline h-[20px] w-[60px]' />
          </a>
        </small>
      </div>
    </div>
  )
}

export default Footer