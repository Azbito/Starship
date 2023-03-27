import React, { ChangeEvent, useState } from 'react'
import api from '../../api'
import useLoader from '../../hooks/useLoader'
import Input from '../Input'
import TextArea from '../TextArea'
import './postarea.modules.scss'

type PostAreaProps = {
  onClick: (e: any) => void,
  titleValue: string,
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void
  descriptionValue: string,
  onChangeDescription: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  errorWarning?: string
}

export default function PostArea({ onClick, titleValue, onChangeTitle, descriptionValue, onChangeDescription, errorWarning }: PostAreaProps) {

  return (
    <div className="postContainer">
      <p>What's happening?</p>
      <Input placeholder="Title" value={titleValue} onChange={onChangeTitle} />
      <TextArea placeholder="Tell us what is happening today!" value={descriptionValue}
        onChange={onChangeDescription} errorMessage={errorWarning} />
      <span style={{ color: descriptionValue.length == 240 ? "red" : "white" }}>{`${(240 - descriptionValue?.length)} characters left`}</span>
      <button onClick={onClick}>Post</button>
    </div>
  )
}