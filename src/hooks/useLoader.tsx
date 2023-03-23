import React, { useContext } from 'react'
import { LoaderContext } from '../context/loaderContext'

export default function useLoader() {
  const { setIsLoading } = useContext(LoaderContext)

  function openLoader() {
    setIsLoading(true)
  }

  function closeLoader() {
    setIsLoading(false)
  }

  return {
    openLoader,
    closeLoader
  }
}