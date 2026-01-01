import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { urlProvider } from '../../contexts/UrlContext'
import { FaExclamationTriangle, FaTrash, FaUser, FaEnvelope } from 'react-icons/fa';

const ReportedItem = () => {
  const {baseUrl} = useContext(urlProvider);
  const [deletingId, setDeletingId] = useState(null);

  const {data:products=[], refetch, isLoading} = useQuery({
    queryKey:['reportedProducts'],
    queryFn: async() =>{
      const res =  await fetch(`${baseUrl}/reportedProducts`)
      const data = await res.json();
      return data
    }
  })

  const handleDelete = (product) =>{
    if(window.confirm('Are you sure you want to delete this reported product?')){
      setDeletingId(product._id);
      axios.delete(`${baseUrl}/reportedProducts/${product.productID}`)
      .then(res =>{
        if(res.data.delete){
          toast.success('Product deleted successfully');
          refetch();
          setDeletingId(null);
        }
      })
      .catch(err=>{
        toast.error('Failed to delete product');
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
          <FaExclamationTriangle className="text-red-500" />
          Reported Items
        </h1>
        <p className="text-gray-500">
          Review and manage products reported by users
        </p>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white mb-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100 text-sm mb-1">Total Reported Items</p>
            <p className="text-4xl font-bold">{products.length}</p>
          </div>
          <FaExclamationTriangle className="text-6xl opacity-20" />
        </div>
      </div>

      {/* Reported Items List */}
      {products.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No Reported Items
          </h3>
          <p className="text-gray-500">
            Great! There are no reported items at the moment.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-gray-700 font-semibold">Product</th>
                  <th className="text-gray-700 font-semibold">Reported By</th>
                  <th className="text-gray-700 font-semibold">Seller Info</th>
                  <th className="text-gray-700 font-semibold">Report Reason</th>
                  <th className="text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-16 h-16">
                              <img src={product.img} alt="product" className='w-full object-cover' />
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{product.name || 'Product'}</p>
                            <p className="text-sm text-gray-500">৳{product.resalePrice || 'N/A'}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaUser className="text-gray-400" />
                          <p className="text-sm">{product.userEmail}</p>
                        </div>
                      </td>
                      <td>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-gray-600">
                            <FaEnvelope className="text-gray-400 text-xs" />
                            <p className="text-sm">{product.email}</p>
                          </div>
                          <p className="text-xs text-gray-500">{product.number}</p>
                        </div>
                      </td>
                      <td>
                        <div className="max-w-xs">
                          <p className="text-sm text-gray-700 bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                            {product.reportText || 'No reason provided'}
                          </p>
                        </div>
                      </td>
                      <td>
                        <button 
                          className="btn btn-error btn-sm gap-2"
                          onClick={()=> handleDelete(product)}
                          disabled={deletingId === product._id}
                        >
                          {deletingId === product._id ? (
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
  )
}

export default ReportedItem