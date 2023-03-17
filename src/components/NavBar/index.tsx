import React from 'react'
import './style.scss'

export default function NavBar() {
  return (
    <div className="content">
      <strong>Minuit</strong>
      <div className="paths">
        <p>Home</p>
        <p>About</p>
        <p>Contacts</p>
      </div>
    </div>
  )
}