import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Components/Loader';
import { authProvider } from '../contexts/UserContext'

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(authProvider);
    const location = useLocation()
    
    if(loading){
        return <Loader/>
    }
    
    if(!user?.email){
        return <Navigate to='/login' state={{from:location}} replace />
    }
  return children
}

export default PrivateRoute