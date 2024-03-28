import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dropdown from './templates/Dropdown';
import Topnav from './templates/Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';
import VerticalCards from './templates/VerticalCards';
import Loading from './Loading';

function TvShows() {

    const navigate  = useNavigate();
    const [Category , setCategory] =  useState("now_playing")
    const [TvShows, setTvShows] =   useState([]);
    const [page, setpage] = useState(1);
    const [hasMore , setHasMore] = useState(true)
    

        const GetTvShows = async () => {
        try {
           const { data } = await axios.get(`/tv/airing_today?page=${page}`);
           

           if(data.results.length > 0){
               setTvShows((prevState) => [...prevState, ...data.results])
               setpage(page+1)
               
           }else{
                setHasMore(false)
           }
           
        } catch (error) {
           console.log(error);
        }
     };

     const refreshhandler  = () => {
        if(TvShows.length === 0){
            GetTvShows();
        }else{
            setpage(1)
            setTvShows([])
            GetTvShows()
        }
     } 
  
     useEffect (() => {
        refreshhandler();
     }, [Category]);


     return TvShows.length > 0 ? ( 
        <div className='w-screen h-screen  '>
    
    
    
          <div className="px-[5%] w-full flex items-center justify-between   ">
            <h1 className='text-2xl font-semibold text-zinc-400'>
            <i onClick={()=> navigate(-1)}
            className="hover:text-[violet] ri-arrow-left-line "
            ></i>{""}
            TvShows
            </h1>
    
    
            <div className='flex  items-center w-[80%] '>
            <Topnav  />
          <Dropdown title="Category" options={["top_rated" , "popular" , "on_the-air"  ]} func = {(e)=> setCategory(e.target.value)} />
          <div className='w-[2%] '></div>
            </div>
    
            </div>
    
          <InfiniteScroll 
          dataLength={TvShows.length}
          next={GetTvShows}
          hasMore = {hasMore}
          loader={<h1>Loading</h1>}>
    
    
          <VerticalCards data  ={TvShows} title = "tv" />
    
          </InfiniteScroll>
    
    
        </div> 
      ): <Loading />
    }

export default TvShows
