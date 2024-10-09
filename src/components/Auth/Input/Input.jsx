import React from 'react'
import './Input.css'

export default function Input({label, type}) {
  return (
    <div className="input">
      <label htmlFor={label}>{label}</label>
      <input type={type} name={label} id={label} />   
    </div>
  )
}
