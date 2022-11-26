import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { urlProvider } from '../contexts/UrlContext'
import { authProvider } from '../contexts/UserContext';

const useUserState = (email) => {
    const { deleteAccount } = useContext(authProvider)
    const navigate = useNavigate();
    const [userState, setUserState] = useState({});
    const [stateLoading, setStateLoading] = useState(true)
    const {baseUrl} = useContext(urlProvider)
    
    useEffect(()=>{
        axios.get(`${baseUrl}/users?email=${email}`)
        .then(res =>{
            if(res.data.acknowledged){
                setUserState(res.data);
                setStateLoading(false)
            }else{
                toast.error(res.data.message,{
                    duration:3000,
                })
                deleteAccount()
                .then(()=>{
                    navigate('/login')
                })
            }
        })
    },[email])
  return [userState, stateLoading]
}

export default useUserState