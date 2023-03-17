import React from 'react'
import './styles.scss'
type inputProps = {
  placeholder: string
}

export default function Input({ placeholder }: inputProps) {
  return <input placeholder={placeholder} />
}