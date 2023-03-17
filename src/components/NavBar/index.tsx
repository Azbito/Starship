import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

export default function NavBar() {
  return (
    <div className="content">
      <strong>Minuit</strong>
      <div className="paths">
        <p>About</p>
        <p>Contacts</p>
      </div>
    </div>
  )
}