import React from 'react'
import './AuthOptions.css'

export default function AuthOptions({ icon, authType, authOption }) {
  return (
    <button className="auth-option"><i className={icon}>&nbsp;&nbsp;&nbsp;</i>{authType} with {authOption}</button>
  )
}
