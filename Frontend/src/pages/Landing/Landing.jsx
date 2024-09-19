import React from 'react'
import Background from '../../components/Background/Background'
import Heading from '../../components/Heading/Heading'
import Hero from '../../components/Landing/Hero'
import './Landing.css'

export default function Landing() {
  return (
    <div>
      <Background> 
        <Heading />
        <Hero />
      </Background>
    </div>
  )
}
