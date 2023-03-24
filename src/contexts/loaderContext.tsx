import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import Loader from '../components/Loader';

interface LoaderContextType {
  isLoading: boolean,
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

interface LoaderContextProviderProps {
  children: ReactNode
}

export const LoaderContext = createContext({} as LoaderContextType)


export const LoaderContextProvider = ({ children }: LoaderContextProviderProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <Loader />}
      {children}
    </LoaderContext.Provider>
  )
}