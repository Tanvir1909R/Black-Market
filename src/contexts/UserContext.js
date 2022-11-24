import React, { createContext } from 'react'

export const authProvider = createContext();

const UserContext = ({children}) => {
    const userInfo = {}
  return (
    <authProvider.Provider value={userInfo} >{children}</authProvider.Provider>
  )
}

export default UserContext