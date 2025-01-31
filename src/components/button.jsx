import React from 'react'

const themeCSS={
    "dark":"bg-buttonBlack text-white",
    "light":"bg-white text-blackStandard shadow-md"
}

const variants={
    "small":"text-sm px-4 py-1 sm:text-base rounded-md flex items-center",
    "medium":"text-sm px-2 md:px-3 py-1 sm:text-base md:text-lg rounded-md flex items-center",
    "large":"text-base sm:text-lg px-4 py-2 rounded-lg flex items-center"
}

const Button = ({theme,variant,text}) => {
  const styleString=`${themeCSS[theme]} ${variants[variant]} w-fit`
  return (
    <>
    <div className={styleString}><span > {text} </span></div>
    </>
  )
}

export default Button