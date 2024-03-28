import React from 'react';
import { Link } from 'react-router-dom';
import NoImage from '../../../public/noimage.jpeg'

function HorizontalCards({ data }) {
  return (
    <div className='w-[100%] overflow-y-hidden flex mb-5 p-5'>
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link to={`/${d.media_type}/details/${d.id}`} className='min-w-[15%] h-[40vh] mr-5 bg-zinc-900 mb-10'>
            <img className='w-full h-[45%] object-cover'

             src={ d.backdrop_path || d.poster_path ?
               `https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path}`: NoImage  } 
                alt="" />

            <div className='text-white p-3 h-[55%] overflow-auto'>
              <h1 className='text-xl'>{d.title || d.original_name || d.name || d.original_title}</h1>
              <p>{d.overview.slice(0, 50)}...<span className="text-zinc-400">more</span></p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className='text-white font-black '>Nothing to Show</h1>
      )}
    </div>
  );
}

export default HorizontalCards;
