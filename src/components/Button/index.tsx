import React from 'react'
import './styles.scss'

type buttonProps = {
  title: string
}

export default function Button({ title }: buttonProps) {
  return <button>{title}</button>
}