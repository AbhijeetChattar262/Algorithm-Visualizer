import React from 'react'
import './Container.css'

export default function Container({ children }) {
  return (
    <div className="main">
        <div className="container">{children}</div>
    </div>
  )
}
