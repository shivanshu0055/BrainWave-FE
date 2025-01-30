import React from 'react'
import Github from '../svgs/Github'
import Twitter from '../svgs/Twitter'
import Discord from '../svgs/Discord'

const Footer = () => {
  return (
    <>
    <div className="mt-7 bg-blackStandard py-2 text-white  mx-auto px-4 flex justify-between items-center font-poppins sm:px-8">
            <div className='text-sm '>
            Made with 🤍 by Shivanshu 
            </div>
            <div className='flex gap-3'>
                <Github></Github>
                <Twitter></Twitter>
                <Discord></Discord>
            </div>
    </div>
        
    </>
  )
}

export default Footer