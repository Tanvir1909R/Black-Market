import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { urlProvider } from '../../contexts/UrlContext';
import { authProvider } from '../../contexts/UserContext';
import { FaEdit, FaTrash, FaBullhorn } from 'react-icons/fa';

const SellerMyProduct = () => {
    const {user} = useContext(authProvider)
    const { baseUrl } = useContext(urlProvider);
    const [editProduct, setEditProduct] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { data: products=[], refetch } = useQuery({
      queryKey: ["productsDelete"],
      queryFn: async () => {
        const res = await fetch(`${baseUrl}/sellerProducts?email=${user.email}`);
        const data = await res.json();
        return data;
      },
    });
  
    const handleDelete = (id)=>{
        axios.delete(`${baseUrl}/products/${id}`)
        .then(res =>{
          if(res.data.acknowledged){
            toast.success('Product deleted successfully');
            refetch()
          }
        })
    }
    
    const handleAdvertise = (product)=>{
      const advertiseProduct = product;
      advertiseProduct.productID = product._id
      delete advertiseProduct['_id'];

      axios.post(`${baseUrl}/advertiseProducts`,advertiseProduct)
      .then(res =>{
        if(res.data.acknowledged){
          toast.success('successfully added')
        }else{
          toast.error(res.data.message)
        }
      })
    }

    const handleEdit = (product) => {
      setEditProduct(product);
    }

    const handleUpdateProduct = (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      const formData = new FormData(e.target);
      const updatedData = {
        name: formData.get('name'),
        resalePrice: formData.get('resalePrice'),
        originalPrice: formData.get('originalPrice'),
        used: formData.get('used'),
        location: formData.get('location'),
        condition: formData.get('condition'),
        description: formData.get('description'),
        purchaseYear: formData.get('purchaseYear'),
      };

      axios.patch(`${baseUrl}/products/${editProduct._id}`, updatedData)
        .then(res => {
          if(res.data.acknowledged){
            toast.success('Product updated successfully!');
            setEditProduct(null);
            refetch();
          }
          setIsSubmitting(false);
        })
        .catch(err => {
          toast.error('Failed to update product');
          setIsSubmitting(false);
        });
    }

    return (
      <div className="overflow-x-auto w-full mb-32">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Advertise</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>
                    <div className="flex items-center">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={product.img}
                            alt="phon"
                            className='w-full object-cover'
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>{product.name}</p>
                  </td>
                  <td>{product.resalePrice}</td>
                  <td>not sold</td>
                  <td>
                    <button className="btn btn-sm gap-2" onClick={()=>handleAdvertise(product)}>
                      <FaBullhorn /> Advertise
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-info gap-2" onClick={()=>handleEdit(product)}>
                      <FaEdit /> Edit
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-error gap-2" onClick={()=>handleDelete(product._id)}>
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Edit Modal */}
        {editProduct && (
          <div className="modal modal-open z-[9999]">
            <div className="modal-box max-w-2xl z-[9999]">
              <h3 className="font-bold text-2xl mb-4">Edit Product</h3>
              <form onSubmit={handleUpdateProduct} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Phone Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editProduct.name}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Condition</span>
                    </label>
                    <select
                      name="condition"
                      defaultValue={editProduct.condition}
                      className="select select-bordered w-full"
                      required
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Resale Price</span>
                    </label>
                    <input
                      type="number"
                      name="resalePrice"
                      defaultValue={editProduct.resalePrice}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Original Price</span>
                    </label>
                    <input
                      type="number"
                      name="originalPrice"
                      defaultValue={editProduct.originalPrice}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Years of Use</span>
                    </label>
                    <input
                      type="number"
                      name="used"
                      defaultValue={editProduct.used}
                      className="input input-bordered w-full"
                      step="0.5"
                      required
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Purchase Year</span>
                    </label>
                    <input
                      type="number"
                      name="purchaseYear"
                      defaultValue={editProduct.purchaseYear}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="label">
                      <span className="label-text font-medium">Location</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      defaultValue={editProduct.location}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="label">
                      <span className="label-text font-medium">Description</span>
                    </label>
                    <textarea
                      name="description"
                      defaultValue={editProduct.description}
                      className="textarea textarea-bordered w-full"
                      rows="3"
                    />
                  </div>
                </div>
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setEditProduct(null)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      'Update Product'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
}

export default SellerMyProduct