import React from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NotFound from '../NotFound';

function Trailer() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytvideo = useSelector(state => state[category].info.videos);

    return (
        <div className='absolute top-[0] z-[100] bg-[rgba(0,0,0,.9)] left-0 w-screen h-screen flex items-center justify-center'>
            <Link  
                onClick={() => navigate(-1)}
                className='absolute hover:text-[violet] top-[5%] right-[5%] ri-close-fill text-3xl text-white'
            ></Link>
            {ytvideo ? (
                <ReactPlayer
                    controls
                    height={720}
                    width={1210}
                    url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
                />
            ) : (
                <NotFound />
            )}
        </div>
    );
}

export default Trailer;
