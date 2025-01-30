import React, { useEffect, useRef } from 'react'
import FeatureCard from './FeatureCard'
import Search from '../svgs/Search'
import QuestionMark from '../svgs/QuestionMark'
import Star from '../svgs/Star'
import Bookmark from '../svgs/Bookmark'

import Share from '../svgs/Share'
import Twitter from '../svgs/Twitter'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const FeatureSection = () => {
   const ref1=useRef()

   useEffect(()=>{
    // console.log(ref1.current.children);
    
    gsap.from(ref1.current.children,{
        y:100,
        opacity:0,
        duration:1,
        stagger:0.4,
        scrollTrigger:{
            trigger:ref1.current.children[0],
            start:"top 85%",
            scroller:"body"
        }
    })
   },[])

  return (
    <div ref={ref1} className='md:mx-auto md:w-[70%]'>

        <h1 className='text-center text-3xl sm:text-5xl my-7 font-poppins font-bold'>
            Features ✦
        </h1>
        <div className='md:flex  md:gap-7 '>
        
        <FeatureCard 
        title="Smart Search Across Memories"
        color="green"
        text="A powerful search bar that lets users quickly locate their stored memories (links, notes, documents, YouTube videos) using keywords, tags, or even contextual cues." 
        icon={<Search/>}></FeatureCard>

        <FeatureCard
        title="Contextual Q&A (Powered by Google Gemini API)"
        color="pink"
        text="Users can ask natural-language questions about their saved memories (e.g., What are my notes on project management) and get AI-generated answers."
        icon={<QuestionMark/>}
        ></FeatureCard>

        </div>
       
        <div className='md:flex gap-7'>
        <FeatureCard
        title="Sharing of your brain"
        color="yellow"
        text="Seamlessly Share Your Insights and Memories
        Connect and Collaborate with Friends and Family"
        icon={<Share/>}
        ></FeatureCard>

        <FeatureCard
        title="Bookmark your favourite memories"
        color="red"
        text="Easily Save and Organize Your favourite Moments
        With Just One Click, Keep Your favorites and most frequently used ones Close"
        icon={<Bookmark/>}></FeatureCard>
        </div>

        <div className='md:flex  gap-7'>
        <FeatureCard
        title="Smart preview for Youtube and Tweets"
        color="blue"
        text="Automatically fetch and display rich previews for YouTube videos and Tweets when links are saved. Users can watch videos directly or view embedded Tweets without leaving the app"
        icon={<Twitter/>}
        ></FeatureCard>

        <FeatureCard
        title="Great UI/UX"
        color="orange"
        text="Seamless Interactions and Stunning Aesthetics
        Transforming Memories into Engaging Experiences and a lot of animations in bonus"
        icon={<Star/>}
        ></FeatureCard>

        </div> 
        
    </div>
  )
}

export default FeatureSection