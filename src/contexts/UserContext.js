import React, { createContext, useEffect, useState } from 'react'
import app from '../firebase/firebase.config'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'

export const authProvider = createContext();
const auth = getAuth(app);

const UserContext = ({children}) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const Register = (email, password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const updateUser = (user)=>{
    return updateProfile(auth.currentUser, user)
  }

  const Login = (email, password)=>{
    return signInWithEmailAndPassword(auth, email, password)
  }

  const LogOut = ()=>{
    return signOut(auth)
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, currentUser=>{
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  },[])

  const userInfo = {user, loading, Register, updateUser, Login, LogOut}
  return (
    <authProvider.Provider value={userInfo} >{children}</authProvider.Provider>
  )
}

export default UserContext