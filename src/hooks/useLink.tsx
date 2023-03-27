import Cookies from 'js-cookie'
import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function useLink() {

  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
  }

  const goSignIn = () => {
    navigate("/sign-in")
  }

  const goSignUp = () => {
    navigate("/sign-up")
  }

  const goToPosts = () => {
    navigate("/posts")
  }

  const goToUser = () => {
    navigate('/user')
  }

  const goToSettings = () => {
    navigate("/user/settings")
  }

  const logout = () => {
    Cookies.remove("token")
    window.location.reload()
  }

  return {
    goSignIn,
    goSignUp,
    goToPosts,
    goToUser,
    goToSettings,
    logout,
    goHome
  }
}