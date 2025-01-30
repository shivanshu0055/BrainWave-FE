import React, { useEffect } from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import FeatureSection from './FeatureSection'
import Footer from './Footer'

const LandingPage = () => {
    return (
        <>
        <Navbar></Navbar>
        <HeroSection></HeroSection>
        <FeatureSection></FeatureSection>
        <Footer></Footer>
        </>
      )
  
}

export default LandingPage