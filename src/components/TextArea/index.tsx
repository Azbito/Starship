import React, { TextareaHTMLAttributes } from 'react'
import './textarea.modules.scss'

type TextAreaProps = {
  errorMessage?: string,
  width?: string,
  height?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export default function TextArea({ errorMessage, width, height, ...props }: TextAreaProps) {
  return (
    <div className="textareaDiv">
      <textarea {...props} maxLength={240} style={{ width, height }} />
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  )
}