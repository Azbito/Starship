import React from 'react'
import { useNavigate } from 'react-router-dom'
import './home.modules.scss'

export default function Home() {
  const navigate = useNavigate()

  const goSignIn = () => {
    navigate("/sign-in")
  }

  const goSignUp = () => {
    navigate("/sign-up")
  }

  return (
    <div className="containerHome">
      <div className="welcomeBox">
        <h1 className="text">This is Starship!</h1>
        <div className="subtitle animate__animated animate__fadeInDown" >
          <p>See new worlds, new persons, new creatures in anywhere, anytime</p>
        </div>
        <div className="buttons">
          <button className="homeButton" onClick={goSignIn}>Sign in</button>
          <button className="homeButton" onClick={goSignUp}>Sign up</button>
        </div>
      </div>
    </div>
  )
}