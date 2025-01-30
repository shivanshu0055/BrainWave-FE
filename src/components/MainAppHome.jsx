import React, { useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { allMemories, bookmarkMemories, isModalOpen, unmarkMemories } from '../../atoms'
import axios from 'axios'
import gsap from 'gsap'
import Modal from './Modal'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import Plus from '../svgs/Plus'
import MemoryCard from './MemoryCard'
import Loader from './LoadingScreen'

const MainAppHome = () => {
    const ref1=useRef()
    const bookmarkMems=useRecoilValue(bookmarkMemories)
    const ref2=useRef()
    const unmarkMems=useRecoilValue(unmarkMemories)
    const setAllMems=useSetRecoilState(allMemories)
    const [ isLoading,setIsLoading ]=useState(true)

    async function bringMems(){
    setIsLoading(true)
    document.body.style.overflow="hidden"
    const usersMems=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/getAllMemories`,{
        headers:{
        "authorization":localStorage.getItem("token")
        }
    })
      await setAllMems(usersMems.data.allMemories)
      setIsLoading(false)
      document.body.style.overflow=""
      gsap.from(ref1.current.children,{
        scale:0.0, 
        transformOrigin:"left", 
        opacity:0,
        duration:0.7,
        stagger:0.1
      })
    }
    

    useEffect(()=>{
      bringMems()
      gsap.from(ref2.current,{
        y:100,
        opacity:0,
        duration:2.5,
     })
    },[])

  return (
    <div> 
      <Navbar></Navbar>
      {/* MODAL */}
      <Modal></Modal>
      <div className='min-h-screen bg-blackStandard mx-auto py-8 font-poppins'>

        <SearchBar></SearchBar>
        <div className='columns-1 sm:columns-2 sm:gap-3 px-4 my-10 md:columns-3 md:gap-4 lg:columns-4 lg:gap-5'>
          
          <div ref={ref1}>
          {
            bookmarkMems.map((memory,index)=>(
            <MemoryCard
            key={index}
            type={memory.type}
            title={memory.title}
            description={memory.description}
            creationDate={memory.creationDate}
            creationTime={memory.creationTime}
            link={memory.link}
            imageUrl={memory.logoUrl}
            bookMark={memory.bookmark}
            objectId={memory._id}
            showExtras={true}
            > 
            </MemoryCard>))
          }

          {
            unmarkMems.map((memory,index)=>(
              <MemoryCard
              key={index}
              type={memory.type}
              title={memory.title}
              description={memory.description}
              creationDate={memory.creationDate}
              creationTime={memory.creationTime}
              link={memory.link}
              imageUrl={memory.logoUrl}
              bookMark={memory.bookmark}
              objectId={memory._id}
              showExtras={true}
              > 
              </MemoryCard>))
          }
         
          </div>
          </div>
          </div>
          {isLoading && <div className='text-white'>
                <Loader/>
            </div>}
            { bookmarkMems.length==0 && unmarkMems.length==0 && <div ref={ref2} className='silverGradient text-7xl md:text-8xl font-bold absolute top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-righteous tracking-wide overflow-hidden'>
                <span>Start </span>
                <span>filling </span>
                <span>your </span>
                <span>second </span>
                <span>brain </span>
          </div>}
        </div>
  )
}

export default MainAppHome