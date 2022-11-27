import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../Components/Loader'
import { urlProvider } from '../../contexts/UrlContext'
import CheckoutForm from './CheckoutForm'

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk)

const Payment = () => {
    const {baseUrl} = useContext(urlProvider)
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
    const [product, setProduct] = useState({})
    useEffect(()=>{
        setLoading(true)
        axios.get(`${baseUrl}/paymentItem/${id}`)
        .then(res =>{
            setProduct(res.data);
            setLoading(false)
        })
    },[])
    if(loading){
        return <Loader/>
    }
  return (
    <div className='Container'>
        <div className="p-5 mt-5 mb-60">
            <h1 className='text-3xl'>Payment for {product.name}</h1>
            <p className='text-xl'>Price: {product.resalePrice}</p>
            <div className='mb-40 mt-10'>
                <div className='w-[400px] p-8 border rounded-lg'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm product={product}/>
                </Elements>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment