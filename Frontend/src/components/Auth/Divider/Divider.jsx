import React from 'react'
import './Divider.css'

export default function Divider({text}) {
  return (
    <div className="divider">
      <div className="line"></div>Or {text} with<div className="line"></div>
    </div>
  )
}
