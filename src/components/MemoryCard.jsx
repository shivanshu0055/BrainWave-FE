import React, { useEffect } from 'react'
import Bookmark from '../svgs/Bookmark'

import BookmarkFill from '../svgs/BookmarkFill'
import Cross from '../svgs/Cross'
import Bookmark2 from '../svgs/Bookmark2'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { allMemories } from '../../atoms'
import axios from 'axios'

const colorScheme={
    "Youtube":"bg-[#3d5a80]",
    "Note":"bg-[#3d5a80]",
    "Twitter":"bg-[#3d5a80]",
    "Website":"bg-[#3d5a80]"
}

const MemoryCard = ({title,imageUrl,description,creationTime,creationDate,bookMark,link,type,objectId,showExtras}) => {
    const setAllMems=useSetRecoilState(allMemories)
    // useEffect(() => {
    //     console.log("Updated allMems:", allMems);
    //   }, [allMems]);
    async function doBookmark(){
        try{
        const x=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/updateMemory`,{
            memoryObjectId:objectId,
            currentState:bookMark
        },{
            headers:{
                "authorization":localStorage.getItem("token")
            }
        })
        // console.log(x.data);
        // // console.log(title);
        
        // // console.log(bookMark);
        // // console.log("Hello");
        
        // setAllMems((prev) => {
        //     return prev.map((mem) => {
        //       if (mem._id == objectId) {
        //         return { ...mem, bookmark: !mem.bookmark }; // Flip the bookmark value
        //       }
        //       return mem; // Leave other memories unchanged
        //     });
        //   });
            setAllMems(prev=>prev.map((mem)=>mem._id==objectId?{...mem,bookmark:!mem.bookmark}:mem))
        }
        catch(error){
            console.log(error);
        }
        finally{
            // console.log(allMems);
        }
    }

    async function doDelete(){
        const x=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/deleteMemory`,{
            memoryObjectId:objectId
        },{
            headers:{
                "authorization":localStorage.getItem("token")
            }
        })
        setAllMems((prev)=>prev.filter((mems)=>mems._id!=objectId))
    }
  return(
    <div className={`mb-3 md:mb-4 xl:mb-5 break-inside-avoid h-fit rounded-xl ${colorScheme[type]} inset-shadow-sm inset-shadow-white/50 px-2 sm:px-4 py-5 text-[#f1dac4] `}>
        {/* Title Section */}
            <div className='flex'> 
              <div className='w-[93%] text-lg font-semibold overflow-x-auto overflow-y-scroll noScrollbar break-words pr-2' >{type=="Youtube" || type=="Note"?title:type}</div>
              {showExtras &&  <div onClick={doDelete} className='h-6 w-6 cursor-pointer hover:scale-120 duration-350'><Cross></Cross> </div>}
            </div>

        {/* Go to URL section */}
        {
            (type=="Twitter" || type=="Website") &&  <div className='my-4 text-sm text-[#e0fbfc] font-semibold'>
                <a href={link} className='underline' target="_blank">Click to go to {type}</a>
            </div> 
        }

        {/* Image and description Section */}
              {
                type=="Youtube" &&  <div className='w-full my-4'>
                        
                    <iframe className='w-[100%] rounded-lg' src={link.replace("watch?v=","embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>    
              }
              {
                type=="Website" && imageUrl!="N/A" && <div className='w-full my-4'>
                <a href={link} target="_blank">  <img className='h-[100%] w-[100%] object-cover rounded-lg' src={imageUrl} alt="" /></a>
                </div>
              }
              {
                (type=="Website")  && <div className='my-4 font-inter text-sm text-[#e0fbfc] max-h-96 pr-2 break-words overflow-auto noScrollbar'>
                {description=="N/A" ? title : description}
                </div>
              }
              {
                (type=="Note" || type=="Twitter")  && <div className='my-4 text-sm text-[#e0fbfc] max-h-96  pr-2 break-words overflow-auto noScrollbar'>
                {description}
                </div>
              }
            {/* Footer Section */}
            <div className='flex mt-5 items-center'> 
            <div className='w-[93%] text-xs overflow-hidden text-[#e0fbfc]' >
              <div>Creation Date - {creationDate}</div>
              <div>Creation Time - {creationTime}</div>
            </div>
            {showExtras && <div onClick={doBookmark} className='h-8 w-8 sm:h-6 sm:w-6 cursor-pointer hover:scale-130 duration-350'> 
                {bookMark?<BookmarkFill/>:<Bookmark2/>}
            </div>}
            </div>
          </div>
  )
}

export default MemoryCard