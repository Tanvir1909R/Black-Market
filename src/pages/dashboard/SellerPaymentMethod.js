import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { urlProvider } from '../../contexts/UrlContext';
import { authProvider } from '../../contexts/UserContext';
import { FaMobileAlt, FaCheckCircle } from 'react-icons/fa';
import { SiCashapp } from 'react-icons/si';
import bkashImg from '../../assets/image/bkash.jpg';
import nagadImg from '../../assets/image/nogot.webp';

const SellerPaymentMethod = () => {
  const { user } = useContext(authProvider);
  const { baseUrl } = useContext(urlProvider);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paymentMethods = [
    {
      id: 'bkash',
      name: 'Bkash',
      image: bkashImg,
      color: 'bg-pink-500',
      hoverColor: 'hover:bg-pink-600',
      borderColor: 'border-pink-500',
    },
    {
      id: 'nagad',
      name: 'Nagad',
      image: nagadImg,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      borderColor: 'border-orange-500',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedMethod) {
      toast.error('Please select a payment method');
      return;
    }

    if (!phoneNumber) {
      toast.error('Please enter a phone number');
      return;
    }

    // Validate phone number (basic validation for 11 digits)
    if (!/^01[0-9]{9}$/.test(phoneNumber)) {
      toast.error('Please enter a valid 11-digit phone number starting with 01');
      return;
    }

    setIsSubmitting(true);

    const paymentData = {
      email: user.email,
      sellerName: user.displayName,
      method: selectedMethod,
      phoneNumber: phoneNumber,
      createdAt: new Date().toISOString(),
    };

    axios
      .post(`${baseUrl}/paymentMethod`, paymentData)
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success('Payment method added successfully!');
          setSelectedMethod('');
          setPhoneNumber('');
        }
        setIsSubmitting(false);
      })
      .catch((err) => {
        toast.error('Failed to add payment method');
        setIsSubmitting(false);
      });
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <SiCashapp className="text-orange-500" />
          Payment Method
        </h1>
        <p className="text-gray-500">
          Add your mobile payment number to receive payments from buyers
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Payment Method Selection */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              Select Payment Method *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedMethod(method.id)}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                    selectedMethod === method.id
                      ? `${method.borderColor} bg-gradient-to-br from-white to-gray-50 shadow-lg scale-105`
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`w-32 h-32 rounded-2xl overflow-hidden flex items-center justify-center ${
                        selectedMethod === method.id
                          ? 'ring-4 ring-offset-2 ' + method.borderColor.replace('border-', 'ring-')
                          : 'ring-2 ring-gray-200'
                      } transition-all duration-300`}
                    >
                      <img
                        src={method.image}
                        alt={method.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xl font-bold text-gray-800">
                      {method.name}
                    </span>
                  </div>
                  {selectedMethod === method.id && (
                    <div className="absolute top-3 right-3">
                      <FaCheckCircle className="text-green-500 text-2xl" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Phone Number Input */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              Phone Number *
            </label>
            <div className="relative">
              <FaMobileAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="01XXXXXXXXX"
                maxLength="11"
                className="w-full pl-14 pr-4 py-4 text-lg bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Enter your 11-digit mobile number (e.g., 01712345678)
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 text-xl mt-0.5">ℹ️</div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">
                  Important Information
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Make sure the number is active and belongs to you</li>
                  <li>• Buyers will use this number to send payments</li>
                  <li>• You can update your payment method anytime</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !selectedMethod || !phoneNumber}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Saving...
                </>
              ) : (
                <>
                  <FaCheckCircle />
                  Add Payment Method
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Additional Info */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          Need help? Contact support at{' '}
          <a href="mailto:support@phonemarket.com" className="text-orange-500 hover:underline">
            support@phonemarket.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default SellerPaymentMethod;
