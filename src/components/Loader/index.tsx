import React from 'react'
import './loader.modules.scss'

export default function Loader() {
  return (
    <div className="containerLoading">
      <div className="lds-dual-ring" />
    </div>
  )
}