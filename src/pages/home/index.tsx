import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.scss'

export default function Home() {
  const navigate = useNavigate()

  const goSignIn = () => {
    navigate("/sign-in")
  }

  const goSignUp = () => {
    navigate("/sign-up")
  }

  return (
    <div className="container">
      <div className="welcomeBox">
        <h1 className="text">This is Starship!</h1>
        <p className="animate__animated animate__fadeInDown">See new worlds, new persons, new creatures in anywhere, anytime</p>
        <div className="buttons">
          <button className="homeButton" onClick={goSignIn}>Sign in</button>
          <button className="homeButton" onClick={goSignUp}>Sign up</button>
        </div>
      </div>
    </div>
  )
}