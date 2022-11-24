import React, { createContext } from 'react'

export const urlProvider = createContext() 

const UrlContext = ({children}) => {
    const url = {
        baseUrl:'http://localhost:7000',
    }
  return (
    <urlProvider.Provider value={url}>{children}</urlProvider.Provider>
  )
}

export default UrlContext
