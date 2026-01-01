import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { urlProvider } from '../../contexts/UrlContext';
import { authProvider } from '../../contexts/UserContext';
import { FaUsers, FaTrash, FaEnvelope, FaUserCircle } from 'react-icons/fa';

const AllBuyer = () => {
    const { baseUrl } = useContext(urlProvider);
    const {user} = useContext(authProvider);
    const [deletingId, setDeletingId] = useState(null);

    const { data: users=[], refetch, isLoading } = useQuery({
      queryKey: ["usersBuyer"],
      queryFn: async () => {
        const res = await fetch(`${baseUrl}/buyers?email=${user.email}`,{
          headers:{
            authorization:`bearer ${localStorage.getItem('blackToken')}`
          }
        });
        const data = await res.json();
        return data;
      },
    });
  
    const handleDelete = (id)=>{
        if(window.confirm('Are you sure you want to delete this buyer?')){
          setDeletingId(id);
          axios.delete(`${baseUrl}/buyers/${id}`)
          .then(res=>{
            toast.success('Buyer deleted successfully');
            refetch();
            setDeletingId(null);
          })
          .catch(err=>{
            toast.error('Failed to delete buyer');
            setDeletingId(null);
          })
        }
    }

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
            <FaUsers className="text-blue-500" />
            All Buyers
          </h1>
          <p className="text-gray-500">
            Manage all registered buyers on the platform
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Total Buyers</p>
              <p className="text-4xl font-bold">{users.length}</p>
            </div>
            <FaUsers className="text-6xl opacity-20" />
          </div>
        </div>

        {/* Buyers List */}
        {users.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Buyers Found
            </h3>
            <p className="text-gray-500">
              There are no registered buyers on the platform yet.
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
                    <th className="text-gray-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((buyer, idx) => {
                    return (
                      <tr key={buyer._id} className="hover:bg-gray-50 transition-colors">
                        <td className="font-medium text-gray-600">
                          {idx + 1}
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar placeholder">
                              <div className="bg-blue-100 text-blue-600 rounded-full w-10">
                                <FaUserCircle className="text-2xl" />
                              </div>
                            </div>
                            <p className="font-semibold text-gray-800">{buyer.name}</p>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2 text-gray-600">
                            <FaEnvelope className="text-gray-400" />
                            <p>{buyer.email}</p>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-info badge-sm">{buyer.type}</span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-error btn-sm gap-2"
                            onClick={()=>handleDelete(buyer._id)}
                            disabled={deletingId === buyer._id}
                          >
                            {deletingId === buyer._id ? (
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
}

export default AllBuyer