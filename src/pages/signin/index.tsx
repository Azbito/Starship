import React from 'react'
import CardLogin from '../../components/CardLogin'
import 'animate.css';

export default function SignIn() {
  return (
    <div className="container">
      <div className="login animate__animated animate__fadeInUp">
        <CardLogin />
      </div>
    </div>
  )
}