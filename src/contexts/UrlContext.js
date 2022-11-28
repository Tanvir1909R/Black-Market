import React, { createContext } from 'react'

export const urlProvider = createContext() 

const UrlContext = ({children}) => {
    const url = {
        baseUrl:'https://resale-server-beta.vercel.app',
    }
  return (
    <urlProvider.Provider value={url}>{children}</urlProvider.Provider>
  )
}

export default UrlContext
