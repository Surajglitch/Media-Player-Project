import axios from '../../utils/axios';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'



const Sidenav = () => {

  return (
    
      <div className='w-[20%] border-r-2 border-zinc-400 p-8'>
        <h1 className='text-white text-2xl font-bold mr-2'>
        <i className="text-[#6556CD] ri-tv-fill "></i>
           <span className=' text-white'>SCSDB</span> 
        </h1>
        <nav className='flex flex-col text-zinc-400 gap-3'>
        <h1 className='text-white font-semibold text-xl mt-5 '>New Feeds</h1>
        
        <Link to="/trending" className='hover:bg-[#6556CD] p-2 text-white rounded-lg duration-300 '><i className="ri-fire-fill mr-1"></i>Trending</Link>
        
        <Link to="/popular" className='hover:bg-[#6556CD] p-2 text-white rounded-lg duration-300 '><i className="ri-bard-fill mr-2"></i>Popular</Link>
        <Link to="/movie" className='hover:bg-[#6556CD] p-2 text-white rounded-lg duration-300 '><i class="ri-movie-2-fill mr-2"></i>Movies</Link>
        <Link to = "/tvshows" className='hover:bg-[#6556CD] p-2 text-white rounded-lg duration-300 '><i class="ri-tv-2-fill mr-2"></i>TV Shows</Link>
        <Link to = "/people" className='hover:bg-[#6556CD] p-2 text-white rounded-lg duration-300 mb-3'><i class="ri-account-circle-fill mr-2"></i>People</Link>
        </nav>
<hr />

        <nav className='flex flex-col text-zinc-800 gap-3'>
        <h1 className='text-white font-semibold text-xl mt-5 '>Web Site Information</h1>
        
        <Link className='hover:bg-[#6556CD] p-2 text-white rounded-lg duration-300 '><i className="ri-fire-fill mr-1"></i>About</Link>
        
        <Link className='hover:bg-[#6556CD] p-2 text-white rounded-lg duration-300 '><i className="ri-bard-fill mr-2"></i>Contact Us</Link>
        </nav>
        
      </div>
    
  )
}

export default Sidenav
