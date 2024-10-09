import React from 'react'
import './Background.css'

export default function Background({ children }) {
  return (
    <div className="background">
      {children}
    </div>
  )
}
