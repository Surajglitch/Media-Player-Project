import React from 'react';
import { Link } from 'react-router-dom';
import NoImage from '../../../public/noimage.jpeg';

function VerticalCards({ data, title }) {
  return (
    <div className='flex flex-wrap h-full px-[5%] bg-zinc-900'>
      {data.map((item) => (
        <Link
          to={`/${item.media_type || title}/details/${item.id}`}
          className='relative w-[25vh] mr-[5%] mb-[5%]'
          key={item.id}
        >
          <img
            className='shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] object-cover'
            src={
              item.backdrop_path || item.poster_path || item.profile_path
                ? `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.poster_path || item.profile_path}`
                : NoImage
            }
            alt=''
          />

          <h1 className='text-2xl text-zinc-400 font-semibold'>
            {item.title || item.original_name || item.name || item.original_title}
          </h1>

          {item.vote_average && (
            <div className='text-white absolute right-[-10%] top-[60%] flex text-xl items-center justify-center bg-yellow-600 h-[7vh] rounded-full  w-[7vh]'>
              {(item.vote_average * 10).toFixed()}<sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default VerticalCards;
