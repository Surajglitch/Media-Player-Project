import React from 'react'
import Loader from '/Loader.gif'

function Loading() {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-black'>
      <img className='h-[50%] ' src={Loader} alt="" />
    </div>
  )
}

export default Loading
