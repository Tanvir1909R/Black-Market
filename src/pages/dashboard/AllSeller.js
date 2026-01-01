import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from 'react-hot-toast';
import { urlProvider } from "../../contexts/UrlContext";
import { FaStore, FaTrash, FaEnvelope, FaUserCircle, FaCheckCircle } from 'react-icons/fa';

const AllSeller = () => {
  const { baseUrl } = useContext(urlProvider);
  const [deletingId, setDeletingId] = useState(null);
  const [verifyingId, setVerifyingId] = useState(null);

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["usersSeller"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/seller`);
      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this seller?')){
      setDeletingId(id);
      axios.delete(`${baseUrl}/buyers/${id}`)
      .then((res) => {
        toast.success('Seller deleted successfully');
        refetch();
        setDeletingId(null);
      })
      .catch(err=>{
        toast.error('Failed to delete seller');
        setDeletingId(null);
      });
    }
  };

  const handleVerify = (user) => {
    setVerifyingId(user._id);
    axios.put(`${baseUrl}/verifyAccount?email=${user.email}`)
    .then((res) => {
      if (res.data.update) {
        toast.success('Seller verified successfully');
        refetch();
        setVerifyingId(null);
      }
    })
    .catch(err=>{
      toast.error('Failed to verify seller');
      setVerifyingId(null);
    });
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
          <FaStore className="text-purple-500" />
          All Sellers
        </h1>
        <p className="text-gray-500">
          Manage all registered sellers and verify their accounts
        </p>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white mb-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm mb-1">Total Sellers</p>
            <p className="text-4xl font-bold">{users.length}</p>
          </div>
          <FaStore className="text-6xl opacity-20" />
        </div>
      </div>

      {/* Sellers List */}
      {users.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🏪</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No Sellers Found
          </h3>
          <p className="text-gray-500">
            There are no registered sellers on the platform yet.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-gray-700 font-semibold">#</th>
                  <th className="text-gray-700 font-semibold">Name</th>
                  <th className="text-gray-700 font-semibold">Email</th>
                  <th className="text-gray-700 font-semibold">Role</th>
                  <th className="text-gray-700 font-semibold">Status</th>
                  <th className="text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((seller, idx) => {
                  return (
                    <tr key={seller._id} className="hover:bg-gray-50 transition-colors">
                      <td className="font-medium text-gray-600">
                        {idx + 1}
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="bg-purple-100 text-purple-600 rounded-full w-10">
                              <FaUserCircle className="text-2xl" />
                            </div>
                          </div>
                          <p className="font-semibold text-gray-800">{seller.name}</p>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaEnvelope className="text-gray-400" />
                          <p>{seller.email}</p>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-secondary badge-sm">{seller.type}</span>
                      </td>
                      <td>
                        {seller.userVerified ? (
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                            <FaCheckCircle />
                            Verified
                          </span>
                        ) : (
                          <button
                            className="btn btn-success btn-sm gap-2"
                            onClick={() => handleVerify(seller)}
                            disabled={verifyingId === seller._id}
                          >
                            {verifyingId === seller._id ? (
                              <>
                                <span className="loading loading-spinner loading-xs"></span>
                                Verifying...
                              </>
                            ) : (
                              <>
                                <FaCheckCircle />
                                Verify
                              </>
                            )}
                          </button>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-error btn-sm gap-2"
                          onClick={() => handleDelete(seller._id)}
                          disabled={deletingId === seller._id}
                        >
                          {deletingId === seller._id ? (
                            <>
                              <span className="loading loading-spinner loading-xs"></span>
                              Deleting...
                            </>
                          ) : (
                            <>
                              <FaTrash />
                              Delete
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSeller;
