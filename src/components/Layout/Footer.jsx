import React from 'react'

function Footer() {
  return (
    <div className='h-[10vh] bg-neutral-900 border-t border-yellow-500'>
      <div className="py-2 flex items-center justify-center flex-col gap-2 2xl:container 2xl:mx-auto">
        <small>Copyright &copy; {new Date().getFullYear()}</small>
        <small>Powered by
          <a href="https://imdb-api.com/" target={'_blank'} className='underline'> IMDB API</a>
        </small>
      </div>
    </div>
  )
}

export default Footer