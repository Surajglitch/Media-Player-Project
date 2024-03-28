import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Topnav from './templates/Topnav';
import Dropdown from './templates/Dropdown';
import axios from '../utils/axios'
import Loading from './Loading';
import VerticalCards from './templates/VerticalCards';
import InfiniteScroll from 'react-infinite-scroll-component';


function Trending() {

    const navigate  = useNavigate();
    const [Category , setCategory] =  useState("all")
    const [Duration , setDuration] =  useState("day")
    const [Trending, setTrending] =   useState([]);
    const [page, setpage] = useState(1);
    const [hasMore , setHasMore] = useState(true)

    document.title = "SCSDB | Trending"

    const GetTrending = async () => {
        try {
           const { data } = await axios.get(`/trending/${Category}/${Duration}?page=${page}`);

           if(data.results.length > 0){
               setTrending((prevState) => [...prevState, ...data.results])
               setpage(page+1)
               
           }else{
                setHasMore(false)
           }
           
        } catch (error) {
           console.log(error);
        }
     };

     const refreshhandler  = () => {
        if(Trending.length === 0){
            GetTrending();
        }else{
            setpage(1)
            setTrending([])
            GetTrending()
        }
     } 
  
     useEffect (() => {
        refreshhandler();
     }, [Category, Duration]);


  return Trending.length > 0 ? ( 
    <div className='w-screen h-screen  '>



      <div className="px-[5%] w-full flex items-center justify-between   ">
        <h1 className='text-2xl font-semibold text-zinc-400'>
        <i onClick={()=> navigate(-1)}
        className="hover:text-[violet] ri-arrow-left-line "
        ></i>{""}
        Trending</h1>


        <div className='flex  items-center w-[80%] '>
        <Topnav  />
      <Dropdown title="Category" options={["movie" , "tv" , "all"]} func = {(e)=> setCategory(e.target.value)} />
      <div className='w-[2%] '></div>
      <Dropdown title="Duration" options={["week" , "day"]} func = {(e)=> setDuration(e.target.value)} />
        </div>

        </div>

      <InfiniteScroll 
      dataLength={Trending.length}
      next={GetTrending}
      hasMore = {hasMore}
      loader={<h1>Loading</h1>}>


      <VerticalCards data  ={Trending} title = {Category} />

      </InfiniteScroll>


    </div> 
  ): <Loading />
}

export default Trending

