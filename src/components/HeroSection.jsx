import React, { useEffect, useRef } from 'react'
import FloatingCard from './FloatingCard'
import Pen from '../svgs/pen'
import Youtube from '../svgs/Youtube'
import Brain from '../svgs/Brain'
import Bulb from '../svgs/Bulb'
import Question from '../svgs/Question'
import Bubble from '../svgs/Bubble'
import gsap from 'gsap'
import Button from './button'
import Scroll from '../svgs/Scroll'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {

  const ref1=useRef(null)
  const ref2=useRef(null)
  const ref3=useRef(null)
  const ref4=useRef(null)
  const ref5=useRef(null)
  const navigate=useNavigate()

  useEffect(()=>{
    
    gsap.to(ref1.current.children,{
      duration:1,
      y:10,
      repeat:-1,
      yoyo:true,
      ease:"power2.inout"
    }
    )
    gsap.to(ref2.current.children,{
      duration:1,
      y:-14,
      repeat:-1,
      yoyo:true,
      ease:"power2.inOut"
    }
    )

  gsap.from([ref3.current,ref4.current],{
    y:30,
    duration:1,
    opacity:0,
    ease:"circ.in"
  })

  gsap.to(ref5.current,{
    y:50,
    duration:2.5,
    opacity:0,
    repeat:-1,
    ease:"circ.Out"
  })
  })

  return (
    <div className='h-screen bg-blackStandard mx-auto font-poppins relative border-t border-white/60'>
    <div className='py-14 sm:py-18'>
      <div className='rounded-2xl w-fit bg-[#4a494d]/80 mx-auto text-sm sm:text-base px-3 py-1 text-white/80 '>
        Welcome to your virtual brain ✧
      </div>
      <div className=' text-white/60 my-10 text-2xl w-fit mx-auto font-medium sm:text-4xl md:text-7xl sm:w-[65%] md:w-[50%] text-center '>
      Your<span className='silverGradient font-bold' ref={ref3}> Second Brain</span> Powered by <span className='silverGradient font-bold' ref={ref4}>AI</span>
      </div>
      <div className='text-white/60 my-10 w-[80%] mx-auto text-sm text-center sm:text-lg md:text-xl sm:w-[60%] md:w-[50%] lg:w-[40%]'>
      Store, organize, and recall your memories effortlessly with AI-powered insights and contextual Q&A
      </div>
      <div className='w-fit mx-auto cursor-pointer' onClick={()=>{
        if(localStorage.getItem("token")){
          navigate("/home")
          return
        }
        navigate("/signup")
      }}>
        <Button text={"Get Started "} theme={"light"} variant={"large"} ></Button>
      </div> 
      </div>
      <div ref={ref1}>
      <div className='absolute top-[4%] left-[5%] -rotate-12 sm:top-[8%] sm:left-[8%]'> <FloatingCard icon={<Pen/>}></FloatingCard> </div>
      <div className='absolute top-[4%] right-[5%] rotate-12 sm:top-[8%] sm:right-[8%]'> <FloatingCard icon={<Youtube/>}></FloatingCard> </div>
      <div className='absolute top-[50%] right-[12%] rotate-12 sm:top-[50%] sm:right-[17%]'> <FloatingCard icon={<Brain/>}></FloatingCard> </div>
      </div>
      <div ref={ref2}>
      <div className='absolute top-[50%] left-[12%] -rotate-12 sm:top-[50%] sm:left-[17%]'><FloatingCard icon={<Bulb/>}></FloatingCard> </div>
      <div className='absolute hidden sm:block sm:top-[62%] sm:left-[3%]'> <FloatingCard icon={<Question/>}></FloatingCard> </div>
      <div className='absolute hidden sm:block sm:top-[62%] sm:right-[3%]'> <FloatingCard icon={<Bubble/>}></FloatingCard> </div>
      </div>
      <div className='flex justify-center'>
      <div ref={ref5} className='my-16 sm:hidden lg:block md:my-0'>
        <Scroll ></Scroll>
      </div>
      </div>
    </div>
  )
}

export default HeroSection