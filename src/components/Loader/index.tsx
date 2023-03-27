import React from 'react'
import './styles.scss'

export default function Loader() {
  return (
    <div className="containerLoading">
      <div className="lds-dual-ring" />
    </div>
  )
}