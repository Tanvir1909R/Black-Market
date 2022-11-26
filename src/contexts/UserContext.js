import React, { createContext, useEffect, useState } from 'react'
import app from '../firebase/firebase.config'
import { createUserWithEmailAndPassword, deleteUser, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'

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

  const ProviderLogin = (provider)=>{
    return signInWithPopup(auth, provider)
  }

  const LogOut = ()=>{
    return signOut(auth)
  }

  const deleteAccount = ()=>{
    return deleteUser(auth.currentUser)
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, currentUser=>{
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  },[])

  const userInfo = {user, loading, Register, updateUser, Login, ProviderLogin, LogOut, deleteAccount}
  return (
    <authProvider.Provider value={userInfo} >{children}</authProvider.Provider>
  )
}

export default UserContext