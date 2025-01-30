import React from 'react'

const FloatingCard = ({icon}) => {
  return (
    <div className='bg-[#4a494d]/30 p-3 w-fit rounded-2xl backdrop-blur-[5px] inset-shadow-sm inset-shadow-white/50'>{icon}</div>
  )
}

export default FloatingCard