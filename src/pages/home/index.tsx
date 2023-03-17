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
      <div className="animate__animated animate__fadeInUp">
        <div className="homeContent">
          <p className="text">Welcome!</p>
          <div className="buttons">
            <button className="homeButton" onClick={goSignIn}>Sign in</button>
            <button className="homeButton" onClick={goSignUp}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  )
}