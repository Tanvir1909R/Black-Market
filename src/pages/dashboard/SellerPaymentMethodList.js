import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { urlProvider } from '../../contexts/UrlContext';
import { authProvider } from '../../contexts/UserContext';
import { FaTrash, FaCreditCard } from 'react-icons/fa';
import { SiCashapp } from 'react-icons/si';
import bkashImg from '../../assets/image/bkash.jpg';
import nagadImg from '../../assets/image/nogot.webp';

const SellerPaymentMethodList = () => {
  const { user } = useContext(authProvider);
  const { baseUrl } = useContext(urlProvider);

  const { data: paymentMethods = [], refetch, isLoading } = useQuery({
    queryKey: ['paymentMethods', user?.email],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/paymentMethods?email=${user.email}`);
      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      axios
        .delete(`${baseUrl}/paymentMethod/${id}`)
        .then((res) => {
          if (res.data.acknowledged) {
            toast.success('Payment method deleted successfully');
            refetch();
          }
        })
        .catch((err) => {
          toast.error('Failed to delete payment method');
        });
    }
  };

  const getPaymentImage = (method) => {
    return method === 'bkash' ? bkashImg : nagadImg;
  };

  const getPaymentColor = (method) => {
    return method === 'bkash' ? 'bg-pink-500' : 'bg-orange-500';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <SiCashapp className="text-orange-500" />
          My Payment Methods
        </h1>
        <p className="text-gray-500">
          Manage your payment methods for receiving payments from buyers
        </p>
      </div>

      {/* Payment Methods Grid */}
      {paymentMethods.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">💳</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No Payment Methods Added
          </h3>
          <p className="text-gray-500 mb-6">
            You haven't added any payment methods yet. Add one to start receiving payments.
          </p>
          <a
            href="/dashboard/paymentMethod"
            className="btn bg-orange-500 text-white hover:bg-orange-600"
          >
            Add Payment Method
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentMethods.map((method) => (
            <div
              key={method._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Card Header with Image */}
              <div className={`${getPaymentColor(method.method)} p-6 relative`}>
                <div className="flex items-center justify-between">
                  <div className="w-20 h-20 bg-white rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={getPaymentImage(method.method)}
                      alt={method.method}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <FaCreditCard className="text-white text-4xl opacity-20" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500 font-medium">
                      Payment Method
                    </label>
                    <p className="text-lg font-bold text-gray-800 capitalize">
                      {method.method}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 font-medium">
                      Phone Number
                    </label>
                    <p className="text-lg font-semibold text-gray-800">
                      {method.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 font-medium">
                      Account Name
                    </label>
                    <p className="text-base text-gray-700">
                      {method.sellerName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 font-medium">
                      Added On
                    </label>
                    <p className="text-sm text-gray-600">
                      {new Date(method.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {/* Delete Button */}
                <div className="mt-6 pt-4 border-t">
                  <button
                    onClick={() => handleDelete(method._id)}
                    className="w-full btn btn-error btn-sm gap-2 hover:scale-105 transition-transform"
                  >
                    <FaTrash />
                    Delete Method
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Button */}
      {paymentMethods.length > 0 && (
        <div className="mt-8 text-center">
          <a
            href="/dashboard/paymentMethod"
            className="btn bg-orange-500 text-white hover:bg-orange-600 btn-lg gap-2"
          >
            <SiCashapp />
            Add Another Payment Method
          </a>
        </div>
      )}
    </div>
  );
};

export default SellerPaymentMethodList;
