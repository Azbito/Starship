import React from 'react'
import Button from '../Button'
import Input from '../Input'
import './styles.scss'

export default function CardLogin() {
  return (
    <div className="container">
      <h1>Login</h1>
      <Input placeholder='Type your username' />
      <h1>Password</h1>
      <Input placeholder="Type your password" />
      <Button title="Enter" />
      <p>Do you not have an account yet? <strong>Sign up</strong></p>
    </div>
  )
}