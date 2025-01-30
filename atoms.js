import axios from "axios";
import { atom } from "recoil";
import { selector } from "recoil";

export const modalSelectedTab=atom({
    key:"modalSelectedTab",
    default:"Youtube"
})

export const isModalOpen=atom({
    key:"isModalOpen",
    default:false
})

export const allMemories=atom({
    key:"bookmarkedMemories",
    default:[]
})

export const bookmarkMemories=atom({
    key:"bookmarkMemories",
    default:selector({
        key:"bookmarkMemoriesSelector",
        get:({get})=>{
            // console.log("Hello");
            const allMems=get(allMemories)
            // console.log(allMems);
            // return []
            return allMems.filter((memory)=>memory.bookmark)
        }
    })
})

export const unmarkMemories=atom({
    key:"unmarkMemories",
    default:selector({
        key:"unmarkMemoriesSelector",
        get:({get})=>{
            const allMems=get(allMemories)
            // return []
            return allMems.filter((memory)=>!memory.bookmark)
        }
    })
})

export const filteredMemories=atom({
    key:"filteredMemories",
    default:[]
})

export const searchBarValue=atom({
    key:"searchBarValue",
    default:""
})
