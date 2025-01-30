import React, { useEffect, useRef, useState } from 'react'
import { filteredMemories, searchBarValue } from '../../atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import Navbar from './Navbar'
import MemoryCard from './MemoryCard'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import axios from 'axios'
import Loader from './LoadingScreen'
import Gemini from '../svgs/Gemini'
import Markdown from 'react-markdown'
import { parse } from 'dotenv'
import { marked } from 'marked'
import gsap from 'gsap'
import BackArrow from '../svgs/BackArrow'

const AfterSearchMainApp = () => {

    const [query,setQuery]=useRecoilState(searchBarValue)
    const [isLoading,setIsLoading]=useState(true)
    const [filteredMems,setFiltertedMems]=useRecoilState(filteredMemories)
    const [geminiAnswer,setGeminiAnswer]=useState("")
    const ref1=useRef()
    const ref2=useRef()
    const navigate=useNavigate()
    async function parseToFormattedText(geminiResponse){
      // console.log(geminiResponse);
      const htmlString =await marked(geminiResponse);
      // console.log(htmlString);
      ref1.current.innerHTML=htmlString
    
    }


    async function getRelatedMemories(){
        setIsLoading(true)
        // console.log("Hello");
        document.body.style.overflow="hidden"
        const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/getRelatedMemories`,{
            query:query},{
                headers:{
                    "authorization":localStorage.getItem("token")
                }
            }
        )
        // console.log(res.data);

        if(res.data.topMemories.length!=0){
            // console.log("More than 0");
        const geminiRes=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/askGemini`,{
            prompt:`${query} and context of this is ${res.data.topMemories[0].title!="N/A"?res.data.topMemories[0].title:""}  ${res.data.topMemories[0].description!="N/A"?res.data.topMemories[0].description:""}`
        },{
            headers:{
                "authorization":localStorage.getItem("token")
            }
        })
        setGeminiAnswer(geminiRes.data.Response)
        // console.log(geminiAnswer);
        }
        else{
          setIsLoading(false)
        }
        // console.log(res.data.topMemories);
        setFiltertedMems(res.data.topMemories)
    }    

    async function injectHtml(){
      await parseToFormattedText(geminiAnswer);
      setIsLoading(false)
      document.body.style.overflow=""
      gsap.from(ref1.current.children,{
        opacity:0,
        duration:0.6,
        stagger:0.4,
        delay:0.2
       })
    }

    useEffect(() => {
      if (geminiAnswer) {
        injectHtml()
      } 
    }, [geminiAnswer]);
      
    async function main(){
      await getRelatedMemories()
      // await parseToFormattedText(geminiAnswer)
    } 
    
    useEffect(()=>{
         main()   
         gsap.from(ref2.current,{
          opacity:0, 
          duration:3,
          y:60,
          delay:2
         })
    },[])
    
    // useEffect(()=>{

    // },[])

  return (
    <div> 
      <Navbar></Navbar>
      <div onClick={()=>{
        navigate("/home")
        setQuery("")
      }} className='pt-5 bg-blackStandard'>
        <div className='font-poppins cursor-pointer w-fit bg-blackStandard text-white/80 inset-shadow-sm inset-shadow-white items-center rounded-full flex gap-2 ml-3 px-3 py-1 lg:ml-6' >
          <div className='h-8 w-8 flex justify-center items-center '>
          <BackArrow></BackArrow>
          </div>
          <div>
          Return back 
          </div>
        </div>
      </div> 
      <div className='bg-blackStandard min-h-screen w-full mx-auto py-2 '>
      {geminiAnswer!="" && 
      <div className=' px-4 py-6 max-h-[90vh] font-light overflow-y-scroll noScrollbar h-fit my-10 text-black/70 font-inter inset-shadow-sm inset-shadow-white rounded-lg mx-3 md:mx-4 lg:mx-6'>
      <div className=' inset-shadow-sm inset-shadow-white geminiGradientNormal rounded-lg px-3 pb-3'>
          <div className='pt-6 pb-4 text-4xl font-poppins font-semibold flex gap-2 w-[100%] '>
            <div className='geminiLogoGradient w-fit'>
            Gemini's Answer ✦
            </div>
          </div>
            <div ref={ref1} className='overflow-x-hidden overflow-y-auto '>
            {/* {geminiAnswer.map((word)=><Markdown>{word}</Markdown>)} */}
            {/* Nothing to render */}
            </div>
            </div>
        </div>
      }
      <div className=' columns-1 sm:columns-2 sm:gap-3 px-4 my-10 lg:columns-4 lg:gap-5 mx-3 md:mx-4 lg:mx-6'>
          <div>
          {
            filteredMems.map((memory,index)=>(
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
              showExtras={false}
              > 
              </MemoryCard>))
          }
          </div>
          </div>
      </div>
        {
            isLoading && <Loader/>
        }
        { geminiAnswer=="" && <div ref={ref2} className='silverGradient w-full py-3 px-4 mx-auto text-7xl md:w-[80%] md:text-8xl md:leading-20 leading-16 font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-righteous tracking-wider'>
                Unable to find related memories try to use more specific keywords
          </div>}
      {/* MODAL */}
    </div>
  )
}

export default AfterSearchMainApp