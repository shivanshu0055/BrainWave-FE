import React from 'react'
import Button from './button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { allMemories } from '../../atoms'

const Navbar = () => {
  const navigate=useNavigate()
  const isLoggedIn=localStorage.getItem("token")
  const setAllMems=useSetRecoilState(allMemories)

  return (
    <div className={` bg-blackStandard flex justify-between font-poppins py-5 mx-auto px-4`} >
        <div className='text-2xl font-bold sm:text-4xl p-auto silverGradient'>
          BrainWave 🗲
        </div>
        <div className='flex gap-2 md:gap-3 items-center justify-center'>
          {!isLoggedIn ? <>
          <div className='cursor-pointer' onClick={()=>{navigate("/signin")}}> <Button text="Sign In" theme="light" variant="medium"></Button></div>
          <div className='cursor-pointer' onClick={()=>{navigate("/signup")}}> <Button text="Get Started" theme="light" variant="medium"></Button></div>
          </> :<div className='cursor-pointer' onClick={()=>{
            localStorage.removeItem("token")
            navigate("/")
            setAllMems([])
            }}> <Button text="LogOut" theme="light" variant="medium"></Button></div>}
        </div>
    </div>
  )
}

export default Navbar