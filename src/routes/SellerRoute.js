import React, { useContext } from 'react'
import { authProvider } from '../contexts/UserContext'
import useUserState from '../hooks/useUserState'
import Loader from '../Components/Loader'
import { Navigate } from 'react-router-dom'

const SellerRoute = ({children}) => {
    const {user,loading } = useContext(authProvider)
    const [userState, stateLoading] = useUserState(user.email)

    if(loading || stateLoading){
        return <Loader/>
    }
    if(user && userState.isSeller){
        return children
    }
  return <Navigate to={'/'} />
}

export default SellerRoute