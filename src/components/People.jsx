import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dropdown from './templates/Dropdown';
import Topnav from './templates/Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';
import VerticalCards from './templates/VerticalCards';
import Loading from './Loading';

function People() {

    const navigate  = useNavigate();
    const [Category , setCategory] =  useState("movie")
    const [People, setPeople] =   useState([]);
    const [page, setpage] = useState(1);
    const [hasMore , setHasMore] = useState(true)
    

        const GetPeople = async () => {
        try {
           const { data } = await axios.get(`/person/popular?page=${page}`);
           

           if(data.results.length > 0){
               setPeople((prevState) => [...prevState, ...data.results])
               setpage(page+1)
               
           }else{
                setHasMore(false)
           }
           
        } catch (error) {
           console.log(error);
        }
     };

     const refreshhandler  = () => {
        if(People.length === 0){
            GetPeople();
        }else{
            setpage(1)
            setPeople([])
            GetPeople()
        }
     } 
  
     useEffect (() => {
        refreshhandler();
     }, [Category]);


     return People.length > 0 ? ( 
        <div className='w-screen h-screen  '>
    
    
    
          <div className="px-[5%] w-full flex items-center justify-between   ">
            <h1 className='text-2xl font-semibold text-zinc-400'>
            <i onClick={()=> navigate(-1)}
            className="hover:text-[violet] ri-arrow-left-line "
            ></i>{""}
            People</h1>
    
    
            <div className='flex  items-center w-[80%] '>
            <Topnav  />
          <div className='w-[2%] '></div>
            </div>
    
            </div>
    
          <InfiniteScroll 
          dataLength={People.length}
          next={GetPeople}
          hasMore = {hasMore}
          loader={<h1>Loading</h1>}>
    
    
          <VerticalCards data  ={People} title = "person" />
    
          </InfiniteScroll>
    
    
        </div> 
      ): <Loading />
    }
    
export default People
