import React, { createContext, useEffect, useState } from 'react'
import app from '../firebase/firebase.config'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'

export const authProvider = createContext();
const auth = getAuth(app);

const UserContext = ({children}) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const Register = (email, password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const Login = (email, password)=>{
    return signInWithEmailAndPassword(auth, email, password)
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, currentUser=>{
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  },[])

  const userInfo = {user, loading, Register, Login}
  return (
    <authProvider.Provider value={userInfo} >{children}</authProvider.Provider>
  )
}

export default UserContext