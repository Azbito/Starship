import React, { TextareaHTMLAttributes } from 'react'
import './textarea.modules.scss'

type TextAreaProps = {
  errorMessage?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export default function TextArea({ errorMessage, ...props }: TextAreaProps) {
  return (
    <div className="textareaDiv">
      <textarea {...props} maxLength={240} />
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  )
}