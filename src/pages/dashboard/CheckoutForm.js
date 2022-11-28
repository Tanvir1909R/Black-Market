import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { urlProvider } from "../../contexts/UrlContext";
import { authProvider } from "../../contexts/UserContext";

const CheckoutForm = ({product}) => {
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState('')
  const [process, setProcess] = useState(false)
  const {user} = useContext(authProvider)
  const {baseUrl} = useContext(urlProvider)
  const stripe = useStripe();
  const elements = useElements();
  const {resalePrice, name, _id } = product
  const navigate = useNavigate()


  useEffect(()=>{
        fetch(`${baseUrl}/paymentIntent`,{
            method:'post',
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({resalePrice})
        })
        .then(res => res.json())
        .then(data =>{
            setClientSecret(data.clientSecret);
        })
  },[resalePrice])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error);
    } else {
      setCardError("");
    }
    setCardError("");
    setProcess(true)
    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name:name,
              email:user.email
            },
          },
        },
      );
      if(confirmError){
        setCardError(confirmError.message)
        return
      }
      if(paymentIntent.status === 'succeeded'){
        const paymentInfo = {
          transactionID: paymentIntent.id,
          productID:_id,
          email:user.email
        }
        axios.post(`${baseUrl}/confirmPayment`,paymentInfo )
        .then(res =>{
          axios.put(`${baseUrl}/updateBooking/${_id}`)
          .then(res =>{
            axios.delete(`${baseUrl}/deleteProduct/${_id}`)
            .then(res =>{
              axios.delete(`${baseUrl}/deleteAdvertiseProduct/${_id}`)
              .then(res =>{
                toast.success('Payment successful')
                setProcess(false)
                navigate('/dashboard/myOrder')
              })
            })
          })

        })
      }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <p className="mt-3 text-red-600">{cardError.message}</p>
      <button type="submit" className="btn btn-sm mt-5" disabled={!stripe || !clientSecret || process}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
