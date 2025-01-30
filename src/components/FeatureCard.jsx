import React from 'react'
import Search from '../svgs/Search'

const colorMapping={
    "green":"bg-green-300",
    "pink":"bg-pink-300",
    "orange":"bg-orange-300",
    "yellow":"bg-yellow-300",
    "blue":"bg-blue-300",
    "red":"bg-red-400"
}

const FeatureCard = ({title,text,icon,color}) => {
  return (
    <div className='w-[90%] md:w-[50%] rounded-lg mx-auto bg-black px-4 py-2 my-5 '>
        <div className='flex gap-5 items-center my-2'>
            <div className={`${colorMapping[color]} p-1 rounded-xl ring-2 ring-white`}>
            {icon}
            </div>
            <div className='text-white font-semibold'> 
                {title}
            </div>
        </div>
        <div className='text-sm text-white/80 my-2'>
        {text}
        </div>
    </div>
  )
}

export default FeatureCard