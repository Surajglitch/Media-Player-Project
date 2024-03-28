import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ data }) => {
  return (
    <div 
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.8)) , 
        url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path  }) `,
        backgroundPosition:'center',
        backgroundSize: 'cover',
      }}
      className='w-full h-[50vh]  flex flex-col items-start justify-end p-[5%] '
    >
      <h1 className='text-4xl text-white  font-black'> 
      { data.title || data.original_name || data.name || data .original_title}
      </h1>

      <p className='text w-[70%] mt-3 text-white'>{data.overview.slice(0,200) } ...<Link to={`/${data.media_type}/details/${data.id}`} className = "text-blue-400">more</Link></p>
      
     <p className='text-white'>
     <i className="ri-megaphone-fill text-yellow-300 "></i>{" "}
     {data.release_date}
     <i className="ri-album-fill ml-5 text-yellow-300 "></i>{" "}
     {data.media_type.toUpperCase()}
     </p> 
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className='bg-violet-400 p-3 rounded-3xl mt-3'>Watch Trailer</Link>
    </div>
  );
};

export default Header;
