import React, { useRef, useState } from 'react'
import Button from './button'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import image from "./../assets/image.png"
import EyeClose from '../svgs/EyeClose';
import EyeOpen from '../svgs/EyeOpen';
import LoaderProcess from './LoadingProcess';
const SignUp = () => {

  const usernameRef=useRef()
    const passwordRef=useRef()
    const [seePass,setSeePass]=useState(false)
    const navigate=useNavigate()
    const [isLoading,setIsLoading]=useState(false)
    // console.log(process.env.BACKEND_URL);
    
    async function doSignUp(){
      const username=usernameRef.current.value
      const password=passwordRef.current.value
      if(username=="" || password==""){
        alert("Please do not leave any input box empty")
        return
      }
      try{
        setIsLoading(true)
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/signup`,{
        username:username,
        password:password
      })
      const data=res.data
      navigate("/signin")
      }
      catch(error){
        if(error.status==409){
          toast.warn("Username already registered",{
            draggable:true
          })
          return
        }
        // console.log(error);
        toast.error("Server Error")
      }
      finally{
        setIsLoading(false)
      }
      
    }

    return (
      <div className='bg-[#030303] h-screen w-full flex justify-center lg:justify-normal items-center font-poppins  overflow-hidden'>
        <div className='lg:w-[45%] relative flex justify-center'>
        <div className='w-34 h-34 silverGradientNormal  absolute rounded-full top-[-10%] left-[73%] shadow-md lg:hidden'></div>
        <div className='w-20 h-20 silverGradientNormal absolute rounded-full top-[92%] left-[20%] shadow-md lg:hidden'></div>
        <div className='w-20 h-20 silverGradientNormal absolute rounded-full top-[70%] left-[60%] shadow-md lg:hidden'></div>
        <ToastContainer draggable="true" theme='light'/>
        <div className='w-96 bg-white/30 relative backdrop-blur-xs rounded-lg py-16 px-3 text-white border border-white/50'>
            <div className='text-3xl font-semibold'>
                SignUp
            </div>
            <div className='my-8'>
              <div className='my-2'>Username</div>
              <input ref={usernameRef} placeholder='Enter your username' className='w-full bg-white rounded-md outline-none focus:ring-2 ring-blue-400 text-black px-2 py-1 text-sm font-inter ' type="text" />
            </div>
            <div className='my-8'>
            <div className='my-2'>Password</div>
            <div className='flex gap-2 items-center'>
            <input ref={passwordRef} placeholder='Enter your password' className='w-full bg-white rounded-md outline-none focus:ring-2 ring-blue-400 text-black px-2 py-1 text-sm font-inter' type={seePass?"text":"password"} />
            <div onClick={()=>{setSeePass(!seePass)}} className='h-7 w-8 cursor-pointer'>
            {seePass==false &&  <EyeClose></EyeClose>}
            {seePass==true &&  <EyeOpen></EyeOpen>}
            </div>
            </div>
          </div>
            <div onClick={doSignUp} className='mt-12 cursor-pointer flex gap-3  w-fit'>
            <Button text="SignUp" theme="light" variant={"medium"}></Button>
            {isLoading && <LoaderProcess/>}
            </div>
            <div className='mt-10 text-sm'>
            Already Registered? <span onClick={()=>navigate("/signin")} className='underline cursor-pointer'> LogIn </span>
            </div>
        </div>  
        </div>
        <div className='hidden lg:w-[55%] h-screen silverGradientNormal2 lg:flex justify-center items-center bg-white/80'>
          <div className='mx-4 p-2 inset-shadow-sm bg-blackStandard rounded-xl inset-shadow-white'>
              <img src={image} className='h-[100%] w-[100%] object-cover rounded-xl' alt="" />
          </div>
        </div>
      </div>
    )
}

export default SignUp