import React from 'react'
import './Input.css'

export default function Input({ label, type }) {
  return (
    <div className="auth-input-container">
      <label htmlFor={label}>{label}</label>
      <input className="auth-input" type={type} name={label} id={label} />
    </div>
  )
}
