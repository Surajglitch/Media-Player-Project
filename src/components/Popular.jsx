import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dropdown from './templates/Dropdown';
import Topnav from './templates/Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';
import VerticalCards from './templates/VerticalCards';
import Loading from './Loading';

function Popular() {

    const navigate  = useNavigate();
    const [Category , setCategory] =  useState("movie")
    const [Popular, setPopular] =   useState([]);
    const [page, setpage] = useState(1);
    const [hasMore , setHasMore] = useState(true)
    

        const GetPopular = async () => {
        try {
           const { data } = await axios.get(`${Category}/popular?page=${page}`);
           

           if(data.results.length > 0){
               setPopular((prevState) => [...prevState, ...data.results])
               setpage(page+1)
               
           }else{
                setHasMore(false)
           }
           
        } catch (error) {
           console.log(error);
        }
     };

     const refreshhandler  = () => {
        if(Popular.length === 0){
            GetPopular();
        }else{
            setpage(1)
            setPopular([])
            GetPopular()
        }
     } 
  
     useEffect (() => {
        refreshhandler();
     }, [Category]);


     return Popular.length > 0 ? ( 
        <div className='w-screen h-screen  '>
    
    
    
          <div className="px-[5%] w-full flex items-center justify-between   ">
            <h1 className='text-2xl font-semibold text-zinc-400'>
            <i onClick={()=> navigate(-1)}
            className="hover:text-[violet] ri-arrow-left-line "
            ></i>{""}
            Popular</h1>
    
    
            <div className='flex  items-center w-[80%] '>
            <Topnav  />
          <Dropdown title="Category" options={["movie" , "tv" ]} func = {(e)=> setCategory(e.target.value)} />
          <div className='w-[2%] '></div>
            </div>
    
            </div>
    
          <InfiniteScroll 
          dataLength={Popular.length}
          next={GetPopular}
          hasMore = {hasMore}
          loader={<h1>Loading</h1>}>
    
    
          <VerticalCards data  ={Popular} title = {Category} />
    
          </InfiniteScroll>
    
    
        </div> 
      ): <Loading />
    }
    
export default Popular
