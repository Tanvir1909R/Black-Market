import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { urlProvider } from '../../contexts/UrlContext';
import { authProvider } from '../../contexts/UserContext';
import { FaCheckCircle, FaTimesCircle, FaClock, FaMoneyBillWave } from 'react-icons/fa';
import { SiCashapp } from 'react-icons/si';
import bkashImg from '../../assets/image/bkash.jpg';
import nagadImg from '../../assets/image/nogot.webp';

const SellerPendingPayments = () => {
  const { user } = useContext(authProvider);
  const { baseUrl } = useContext(urlProvider);
  const [processingId, setProcessingId] = useState(null);

  const { data: pendingPayments = [], refetch, isLoading } = useQuery({
    queryKey: ['pendingPayments', user?.email],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/pendingPayments?email=${user.email}`);
      const data = await res.json();
      return data;
    },
  });

  const getPaymentImage = (method) => {
    return method === 'bkash' ? bkashImg : nagadImg;
  };

  const handleApprove = (payment) => {
    if (window.confirm('Are you sure you want to approve this payment?')) {
      setProcessingId(payment._id);
      axios
        .put(`${baseUrl}/approvePayment/${payment._id}`)
        .then((res) => {
          if (res.data.acknowledged) {
            return axios.put(`${baseUrl}/updateBooking/${payment.productId}`);
          }
        })
        .then((res) => {
          toast.success('Payment approved successfully');
          refetch();
          setProcessingId(null);
        })
        .catch((err) => {
          toast.error('Failed to approve payment');
          setProcessingId(null);
        });
    }
  };

  const handleReject = (payment) => {
    if (window.confirm('Are you sure you want to reject this payment?')) {
      setProcessingId(payment._id);
      axios
        .put(`${baseUrl}/rejectPayment/${payment._id}`)
        .then((res) => {
          if (res.data.acknowledged) {
            toast.success('Payment rejected');
            refetch();
          }
          setProcessingId(null);
        })
        .catch((err) => {
          toast.error('Failed to reject payment');
          setProcessingId(null);
        });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <FaClock className="text-orange-500" />
          Pending Payments
        </h1>
        <p className="text-gray-500">
          Review and approve payment confirmations from buyers
        </p>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm mb-1">Total Pending Payments</p>
            <p className="text-4xl font-bold">{pendingPayments.length}</p>
          </div>
          <FaMoneyBillWave className="text-6xl opacity-20" />
        </div>
      </div>

      {/* Pending Payments List */}
      {pendingPayments.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No Pending Payments
          </h3>
          <p className="text-gray-500">
            All payments have been processed. New payment requests will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingPayments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Section - Product & Buyer Info */}
                  <div className="lg:col-span-1">
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                        <FaClock />
                        Pending Review
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {payment.productName}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Buyer:</span>
                        <p className="font-semibold text-gray-800">{payment.buyerName}</p>
                        <p className="text-gray-600">{payment.buyerEmail}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Amount:</span>
                        <p className="text-2xl font-bold text-green-600">৳{payment.amount}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Payment Date:</span>
                        <p className="text-gray-700">
                          {new Date(payment.paymentDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Middle Section - Payment Details */}
                  <div className="lg:col-span-1 border-l border-r border-gray-200 px-6">
                    <h4 className="text-sm font-semibold text-gray-500 mb-4">
                      Payment Details
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={getPaymentImage(payment.paymentMethod)}
                            alt={payment.paymentMethod}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Payment Method</p>
                          <p className="font-bold text-gray-800 capitalize">
                            {payment.paymentMethod}
                          </p>
                          <p className="text-sm text-gray-600">{payment.paymentNumber}</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                        <p className="font-mono font-bold text-gray-800 break-all">
                          {payment.transactionId}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="lg:col-span-1 flex flex-col justify-center">
                    <h4 className="text-sm font-semibold text-gray-500 mb-4">
                      Review Payment
                    </h4>
                    <div className="space-y-3">
                      <button
                        onClick={() => handleApprove(payment)}
                        disabled={processingId === payment._id}
                        className="w-full btn bg-green-500 text-white hover:bg-green-600 gap-2 disabled:opacity-50"
                      >
                        {processingId === payment._id ? (
                          <>
                            <span className="loading loading-spinner loading-sm"></span>
                            Processing...
                          </>
                        ) : (
                          <>
                            <FaCheckCircle />
                            Approve Payment
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleReject(payment)}
                        disabled={processingId === payment._id}
                        className="w-full btn bg-red-500 text-white hover:bg-red-600 gap-2 disabled:opacity-50"
                      >
                        <FaTimesCircle />
                        Reject Payment
                      </button>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-800">
                        <strong>Note:</strong> Verify the transaction ID in your mobile banking app before approving.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerPendingPayments;
