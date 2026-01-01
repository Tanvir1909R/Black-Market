import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { urlProvider } from "../../contexts/UrlContext";
import { authProvider } from "../../contexts/UserContext";
import { FaShoppingBag, FaCheckCircle, FaClock, FaTrash, FaCreditCard } from "react-icons/fa";

const BuyerDashboard = () => {
  const { user } = useContext(authProvider);
  const { baseUrl } = useContext(urlProvider);
  const [cancelingId, setCancelingId] = useState(null);
  
  const { data: products = [], refetch, isLoading } = useQuery({
    queryKey: ["bookingProducts"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/bookingProducts/${user.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("blackToken")}`,
        },
      });
      const data = res.json();
      return data;
    },
  });

  const handleCancel = (product) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setCancelingId(product._id);
      axios
        .delete(`${baseUrl}/deleteBookingProduct/${product._id}`)
        .then((res) => {
          toast.success("Order canceled successfully");
          refetch();
          setCancelingId(null);
        })
        .catch((err) => {
          toast.error("Failed to cancel order");
          setCancelingId(null);
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
          <FaShoppingBag className="text-orange-500" />
          My Orders
        </h1>
        <p className="text-gray-500">
          View and manage your product orders
        </p>
      </div>

      {/* Orders List */}
      {products.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No Orders Yet
          </h3>
          <p className="text-gray-500 mb-6">
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <Link
            to="/products"
            className="btn bg-orange-500 text-white hover:bg-orange-600"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={product.img}
                        alt={product.itemName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {product.itemName}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Price:</span>
                            <span className="text-2xl font-bold text-green-600">
                              ৳{product.price}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Status:</span>
                            {product.isPaid ? (
                              <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                <FaCheckCircle />
                                Paid
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                                <FaClock />
                                Pending Payment
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3 lg:min-w-[200px]">
                        {!product.isPaid && (
                          <Link
                            to={`/payment/${product.productID}`}
                            className="btn bg-orange-500 text-white hover:bg-orange-600 gap-2"
                          >
                            <FaCreditCard />
                            Pay Now
                          </Link>
                        )}
                        <button
                          onClick={() => handleCancel(product)}
                          disabled={cancelingId === product._id}
                          className="btn btn-error btn-outline gap-2 disabled:opacity-50"
                        >
                          {cancelingId === product._id ? (
                            <>
                              <span className="loading loading-spinner loading-sm"></span>
                              Canceling...
                            </>
                          ) : (
                            <>
                              <FaTrash />
                              Cancel Order
                            </>
                          )}
                        </button>
                      </div>
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

export default BuyerDashboard;
