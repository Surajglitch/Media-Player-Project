import React from 'react'
import video from '/Loader.gif'

function NotFound() {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-black'>
      <img className='h-[50%] ' src={video} alt="" />
    </div>
  )
}

export default NotFound
