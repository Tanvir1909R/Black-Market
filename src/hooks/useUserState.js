import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { urlProvider } from '../contexts/UrlContext'

const useUserState = (email) => {
    const [userState, setUserState] = useState({});
    const {baseUrl} = useContext(urlProvider)
    
    useEffect(()=>{
        axios.get(`${baseUrl}/users?email=${email}`)
        .then(res =>{
            setUserState(res.data);
        })
    },[email])
  return [userState]
}

export default useUserState