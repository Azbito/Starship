import React from 'react'
import './input.modules.scss'

type inputProps = {
  placeholder: string,
  onChange?: (e: any) => void,
  value: any,
  type?: string,
  hasError?: boolean
}

export default function Input({ placeholder, onChange, value, type, hasError }: inputProps) {
  return <input className={hasError ? "error" : "noError"} placeholder={placeholder} onChange={onChange} value={value} type={type} maxLength={240} />
}