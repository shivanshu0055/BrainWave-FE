import React, { useEffect, useRef, useState } from 'react'
import Youtube2 from '../svgs/Youtube2'
import Twitter2 from '../svgs/Twitter2'
import Globe from '../svgs/Globe'
import Note from '../svgs/Note'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { allMemories, isModalOpen, modalSelectedTab } from '../../atoms'
import Button from './button'
import axios from 'axios'
import Plus from '../svgs/Plus'
// import Loader from './LoadingProcess'
import LoaderProcess from './LoadingProcess'
import { ToastContainer,toast } from 'react-toastify'

const Modal = () => {

    const [selectedTab,setSelectedTab]=useRecoilState(modalSelectedTab)
    const [modalOpen,setModalOpen]=useRecoilState(isModalOpen)
    const setAllMems=useSetRecoilState(allMemories)
    const titleRef=useRef()
    const descriptionRef=useRef()
    const linkRef=useRef()
    const [isLoading,setIsLoading]=useState(false)

    // useEffect(()=>{

    // },[])

    async function addNewMemory(){
            try{
                setIsLoading(true)
                let reqBody={}
                if(selectedTab=="Note"){
                    const title=titleRef.current.value
                    const description=descriptionRef.current.value
                    reqBody={
                        type:selectedTab,
                        title:title,
                        description:description
                    }
                }
                else{
                    const link=linkRef.current.value 
                    if(selectedTab=="Twitter"){
                      if(!link.includes("https://x.com/") || !link.includes("/status/")){
                        toast.warn("Please enter a valid link")
                        setIsLoading(false)
                        return
                      }
                    }
                    reqBody={
                        type:selectedTab,
                        link:link
                    }
                }
            const newMemory=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/addMemory`,reqBody,{
                headers:{
                    "authorization":localStorage.getItem("token")
                }
            })
            setAllMems((prev)=>[...prev,newMemory.data.NewMemory])
            setModalOpen(false)
        }
        catch(error){
            toast.warn("Please enter a valid link")
          }
          finally{
            setIsLoading(false)
        }
        
    }

  return (
    <>
    {modalOpen && <div className="h-screen w-full bg-genericBlack/60 fixed top-0 left-0 border border-black flex justify-center items-center z-10">
        <div className='p-4 py-8 w-[90%] md:w-[60%] lg:w-[40%] bg-black/30 backdrop-blur-2xl h-fit rounded-2xl border-2 border-white/50 relative duration-1000'>
        <div className='absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/10 sm:text-2xl text-xl text-white/80 font-semibold'>{selectedTab}</div>
        <div className='flex w-full justify-end h-6 mb-8 '>
            <div onClick={()=>setModalOpen(false)} className='rotate-45 cursor-pointer text-white/80'>
            <Plus></Plus>
            </div>
        </div>
        
          <div className='flex justify-center gap-4 '>
              <div onClick={()=>setSelectedTab("Youtube")} className={`text-white bg-red-400/70 flex justify-center items-center rounded-2xl inset-shadow-sm inset-shadow-white/80 cursor-pointer ${selectedTab=="Youtube"?"ring-4 ring-white/60":""}`}><Youtube2/></div>
              <div onClick={()=>setSelectedTab("Twitter")} className={`text-white bg-blue-400/70 flex justify-center items-center rounded-2xl inset-shadow-sm inset-shadow-white/80 cursor-pointer ${selectedTab=="Twitter"?"ring-4 ring-white/60":""}`}><Twitter2/></div>
              <div onClick={()=>setSelectedTab("Website")} className={`text-white bg-green-400/70 flex justify-center items-center rounded-2xl inset-shadow-sm inset-shadow-white/80 cursor-pointer ${selectedTab=="Website"?"ring-4 ring-white/60":""}`}><Globe/></div>
              <div onClick={()=>setSelectedTab("Note")} className={`text-white bg-cyan-400/70 flex justify-center items-center rounded-2xl inset-shadow-sm inset-shadow-white/80 cursor-pointer ${selectedTab=="Note"?"ring-4 ring-white/60":""}`}><Note/> </div>
          </div>

          <div className='w-full my-8'>
            <div className={`${selectedTab=="Note"?"hidden":""}`}>
              <div className="text-white mb-2" >Paste the link below </div>
              <input spellCheck="false" ref={linkRef} className='bg-genericBlack/70 w-full rounded-md outline-none px-3 py-1 text-white/70' type="text" name="" id="" />
            </div>
          </div>
          <div className='w-full my-4'>
            <div className={`${selectedTab=="Note"?"block":"hidden"}`}>
              <div className='text-white mb-2'>Add a Title note</div>
              <input spellCheck="false" ref={titleRef} className='bg-genericBlack/70 w-full rounded-md outline-none px-3 py-1 text-white/70' type="text" name="" id="" />
            </div>
          </div>
          <div className='w-full my-4'>
            <div className={`${selectedTab=="Note"?"block":"hidden"}`}>
              <div className='text-white mb-2'>Note</div>
              <textarea spellCheck="false" ref={descriptionRef} className='bg-genericBlack/70 w-full rounded-md outline-none px-3 py-1 text-white/70 max-h-64 min-h-24' name="" id=""></textarea>
            </div>
          </div>
          <div className='flex justify-center mb-2 font-semibold '>
            <div onClick={addNewMemory} className='cursor-pointer flex gap-4'>
            <Button text="Add to Brain" theme="light" variant={"medium"}></Button>
            <div className=' duration-1000'>
            {isLoading && <LoaderProcess></LoaderProcess>}
            </div>
            </div>
          </div>
        </div>
        <ToastContainer></ToastContainer>
      </div>}
      </>
  )
}

export default Modal