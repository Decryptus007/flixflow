import React from 'react'
import Layout from '../../components/Layout/Layout'

function WatchList() {
  return (
    <Layout>
      <div className="2xl:container 2xl:mx-auto">
        <div className="overflow-hidden p-2 pb-40 md:pb-40 md:p-4">
          <h2 className="text-2xl font-bold">My Watchlist</h2>
          <div className="mt-8">
            <div className="flex flex-col gap-4 items-center lg:flex-row lg:flex-wrap">
              <div className="w-full h-[150px] rounded-md overflow-hidden shadow shadow-yellow-200 flex lg:w-[250px] lg:h-[300px] lg:flex-col">
                <img src="" alt="" className='h-full w-[35%] bg-yellow-500 lg:w-full' />
                <div className="h-full p-2 flex flex-col justify-between lg:p-4">
                  <p className="font-semibold text-base lg:text-lg">Moonlight</p>
                  <div className="flex justify-between flex-col lg;items-center lg:flex-row">
                    <span>Berry Jenkins</span>
                    <span>2018</span>
                  </div>
                  <button className='py-1 font-semibold bg-yellow-500 text-sm rounded-lg lg:font-mono'>Remove</button>
                </div>
              </div>
              <div className="w-full h-[150px] rounded-md overflow-hidden shadow shadow-yellow-200 flex lg:w-[250px] lg:h-[300px] lg:flex-col">
                <div className='h-full w-[35%] bg-yellow-500 lg:w-full skeleton-lite'></div>
                <div className="h-full flex-grow p-2 flex flex-col justify-between lg:p-4">
                  <p className="font-semibold text-base w-full h-6 lg:text-lg skeleton-lite"></p>
                  <div className="flex justify-between flex-col gap-2 lg:gap-0 lg:items-center lg:flex-row">
                    <span className='w-1/2 h-6 skeleton-lite'></span>
                    <span className='w-[20%] h-6 skeleton-lite'></span>
                  </div>
                  <p className="font-semibold text-base w-full h-6 lg:text-lg skeleton-lite"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default WatchList