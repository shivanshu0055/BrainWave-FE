import React from 'react'

const themeCSS={
    "dark":"bg-buttonBlack text-white",
    "light":"bg-white text-blackStandard shadow-md"
}

const variants={
    "small":"text-sm px-4 py-1 sm:text-base rounded-md",
    "medium":"text-xs px-2 md:px-4 py-1 sm:text-sm md:text-lg rounded-md",
    "large":"text-base sm:text-lg px-4 py-2 rounded-lg"
}

const Button = ({theme,variant,text}) => {
  const styleString=`${themeCSS[theme]} ${variants[variant]} w-fit`
  return (
    <>
    <div className={styleString}>{text}</div>
    </>
  )
}

export default Button