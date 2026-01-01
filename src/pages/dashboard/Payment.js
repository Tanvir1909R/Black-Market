import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loader from '../../Components/Loader'
import { urlProvider } from '../../contexts/UrlContext'
import { authProvider } from '../../contexts/UserContext'
import { FaMobileAlt, FaCheckCircle } from 'react-icons/fa'
import { SiCashapp } from 'react-icons/si'
import bkashImg from '../../assets/image/bkash.jpg'
import nagadImg from '../../assets/image/nogot.webp'

const Payment = () => {
    const {baseUrl} = useContext(urlProvider)
    const {user} = useContext(authProvider)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
    const [product, setProduct] = useState({})
    const [paymentMethods, setPaymentMethods] = useState([])
    const [selectedMethod, setSelectedMethod] = useState(null)
    const [transactionId, setTransactionId] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    useEffect(()=>{
        setLoading(true)
        axios.get(`${baseUrl}/paymentItem/${id}`)
        .then(res =>{
            setProduct(res.data);
            // Fetch seller's payment methods
            return axios.get(`${baseUrl}/paymentMethods?email=${res.data.email}`)
        })
        .then(res => {
            setPaymentMethods(res.data);
            setLoading(false)
        })
        .catch(err => {
            toast.error('Failed to load payment information');
            setLoading(false)
        })
    },[])

    const getPaymentImage = (method) => {
        return method === 'bkash' ? bkashImg : nagadImg;
    }

    const handlePayment = (e) => {
        e.preventDefault();
        
        if (!selectedMethod) {
            toast.error('Please select a payment method');
            return;
        }
        
        if (!transactionId.trim()) {
            toast.error('Please enter transaction ID');
            return;
        }

        setIsSubmitting(true);

        const paymentData = {
            productId: product._id,
            productName: product.name,
            buyerEmail: user.email,
            buyerName: user.displayName,
            sellerEmail: product.email,
            sellerName: product.sellerName,
            amount: product.resalePrice,
            paymentMethod: selectedMethod.method,
            paymentNumber: selectedMethod.phoneNumber,
            transactionId: transactionId,
            paymentDate: new Date().toISOString(),
            status: 'pending'
        };

        axios.post(`${baseUrl}/confirmPayment`, paymentData)
            .then(res => {
                if (res.data.acknowledged) {
                    // Update booking status
                    return axios.put(`${baseUrl}/updateBooking/${product._id}`);
                }
            })
            .then(res => {
                toast.success('Payment submitted successfully!');
                navigate('/dashboard/myOrder');
                setIsSubmitting(false);
            })
            .catch(err => {
                toast.error('Payment submission failed');
                setIsSubmitting(false);
            });
    }

    if(loading){
        return <Loader/>
    }

    return (
        <div className='Container'>
            <div className="max-w-4xl mx-auto py-8 px-4 mb-32">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 text-white mb-8">
                    <h1 className='text-4xl font-bold mb-4'>Complete Your Payment</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div>
                            <p className="text-orange-100 text-sm">Product</p>
                            <p className='text-2xl font-semibold'>{product.name}</p>
                        </div>
                        <div>
                            <p className="text-orange-100 text-sm">Amount to Pay</p>
                            <p className="text-3xl font-bold text-green-600">৳{product.resalePrice}</p>
                        </div>
                        <div>
                            <p className="text-orange-100 text-sm">Seller</p>
                            <p className='text-xl'>{product.sellerName}</p>
                        </div>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {paymentMethods.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">⚠️</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                No Payment Methods Available
                            </h3>
                            <p className="text-gray-500">
                                The seller hasn't added any payment methods yet. Please contact the seller.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handlePayment} className="space-y-8">
                            {/* Payment Method Selection */}
                            <div>
                                <label className="block text-lg font-semibold text-gray-800 mb-4">
                                    Select Payment Method *
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {paymentMethods.map((method) => (
                                        <button
                                            key={method._id}
                                            type="button"
                                            onClick={() => setSelectedMethod(method)}
                                            className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                                                selectedMethod?._id === method._id
                                                    ? 'border-orange-500 bg-gradient-to-br from-white to-orange-50 shadow-lg scale-105'
                                                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={getPaymentImage(method.method)}
                                                        alt={method.method}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="text-left flex-grow">
                                                    <p className="font-bold text-lg text-gray-800 capitalize">
                                                        {method.method}
                                                    </p>
                                                    <p className="text-gray-600 font-semibold">
                                                        {method.phoneNumber}
                                                    </p>
                                                </div>
                                            </div>
                                            {selectedMethod?._id === method._id && (
                                                <div className="absolute top-3 right-3">
                                                    <FaCheckCircle className="text-green-500 text-2xl" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Instructions */}
                            {selectedMethod && (
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <div className="text-blue-500 text-xl mt-0.5">ℹ️</div>
                                        <div>
                                            <h4 className="font-semibold text-blue-900 mb-2">
                                                Payment Instructions
                                            </h4>
                                            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                                                <li>Send <strong>৳{product.resalePrice}</strong> to <strong>{selectedMethod.phoneNumber}</strong> via {selectedMethod.method}</li>
                                                <li>Copy the transaction ID from your payment confirmation</li>
                                                <li>Enter the transaction ID below</li>
                                                <li>Click "Confirm Payment" to complete</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Transaction ID Input */}
                            <div>
                                <label className="block text-lg font-semibold text-gray-800 mb-3">
                                    Transaction ID *
                                </label>
                                <div className="relative">
                                    <FaMobileAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                    <input
                                        type="text"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        placeholder="Enter your transaction ID"
                                        className="w-full pl-14 pr-4 py-4 text-lg bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    Enter the transaction ID you received after making the payment
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !selectedMethod || !transactionId}
                                    className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <FaCheckCircle />
                                            Confirm Payment
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Payment