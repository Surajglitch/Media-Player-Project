import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dropdown from './templates/Dropdown';
import Topnav from './templates/Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';
import VerticalCards from './templates/VerticalCards';
import Loading from './Loading';

function Movie() {

    const navigate  = useNavigate();
    const [Category , setCategory] =  useState("now_playing")
    const [Movie, setMovie] =   useState([]);
    const [page, setpage] = useState(1);
    const [hasMore , setHasMore] = useState(true)
    

        const GetMovie = async () => {
        try {
           const { data } = await axios.get(`/movie/${Category}?page=${page}`);
           

           if(data.results.length > 0){
               setMovie((prevState) => [...prevState, ...data.results])
               setpage(page+1)
               
           }else{
                setHasMore(false)
           }
           
        } catch (error) {
           console.log(error);
        }
     };

     const refreshhandler  = () => {
        if(Movie.length === 0){
            GetMovie();
        }else{
            setpage(1)
            setMovie([])
            GetMovie()
        }
     } 
  
     useEffect (() => {
        refreshhandler();
     }, [Category]);


     return Movie.length > 0 ? ( 
        <div className='w-screen h-screen  '>
    
    
    
          <div className="px-[5%] w-full flex items-center justify-between   ">
            <h1 className='text-2xl font-semibold text-zinc-400'>
            <i onClick={()=> navigate(-1)}
            className="hover:text-[violet] ri-arrow-left-line "
            ></i>{""}
            Movie
            </h1>
    
    
            <div className='flex  items-center w-[80%] '>
            <Topnav  />
          <Dropdown title="Category" options={["popular" , "top_rated" , "upcoming" , "now_playing" ]} func = {(e)=> setCategory(e.target.value)} />
          <div className='w-[2%] '></div>
            </div>
    
            </div>
    
          <InfiniteScroll 
          dataLength={Movie.length}
          next={GetMovie}
          hasMore = {hasMore}
          loader={<h1>Loading</h1>}>
    
    
          <VerticalCards data  ={Movie} title = "movie" />
    
          </InfiniteScroll>
    
    
        </div> 
      ): <Loading />
    }

export default Movie
