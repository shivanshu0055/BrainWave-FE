import React, { useRef, useState } from 'react'
import Search2 from '../svgs/Search2'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { filteredMemories, isModalOpen, searchBarValue } from '../../atoms'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import Loader from './LoadingScreen'

const SearchBar = () => {

  const setModalOpen=useSetRecoilState(isModalOpen)
  const setFiltertedQueries=useSetRecoilState(filteredMemories)
  
  const navigate=useNavigate()
  const setQueryValue=useSetRecoilState(searchBarValue)

  const queryTab=useRef()

  return (
    <div className='w-[93%] mx-auto md:w-[63%] lg:w-[43%]' >
        <div className='flex gap-3 '>
          <div className='bg-blackStandard/80 inset-shadow-sm inset-shadow-white justify-center items-center rounded-2xl w-fit text-white/80  cursor-pointer hover:scale-x-104 hover:scale-y-104 duration-600 flex hover:border hover:border-blue-400'>
          <div className="h-8 w-fit flex items-center pr-2 pl-1 " onClick={async ()=>{
            if(queryTab.current.value==""){
              alert("Please ask a valid question")
              return
            }
            setQueryValue(queryTab.current.value)
            navigate("/askMemories")
          }} >
            <div className='h-9 w-9 flex items-center justify-center '>
          <Search2/>
          </div>
          <div >Search</div>
          </div>
          </div>
          <input spellCheck="false" ref={queryTab} placeholder='Search and ask AI about your memories ...' className=' bg-[#4a494d]/40  caret-white inset-shadow-sm inset-shadow-blue-400 rounded-2xl h-11 w-full text-white/70 px-3 text-sm outline-none hover:scale-x-101 hover:scale-y-102 duration-600 hover:border hover:border-blue-400 font-inter' type="text" name="" id="" />
          </div>
          <div className='hover:border hover:border-blue-400 bg-blackStandard text-white/90 mt-3 inset-shadow-sm inset-shadow-white h-fit py-2 rounded-2xl mx-auto px-2 text-center font-bold tracking-wider text-xl cursor-pointer hover:scale-x-103 hover:scale-y-102 duration-600' onClick={()=>setModalOpen((prev)=>!prev)}>
              ADD A NEW MEMORY 💨
          </div>
        </div>
  )
}

export default SearchBar