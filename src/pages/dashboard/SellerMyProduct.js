import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { urlProvider } from '../../contexts/UrlContext';
import { authProvider } from '../../contexts/UserContext';

const SellerMyProduct = () => {
    const {user} = useContext(authProvider)
    const { baseUrl } = useContext(urlProvider);
    const { data: products=[], refetch } = useQuery({
      queryKey: ["productsDelete"],
      queryFn: async () => {
        const res = await fetch(`${baseUrl}/sellerProducts?email=${user.email}`);
        const data = res.json();
        return data;
      },
    });
  
    const handleDelete = (id)=>{
        axios.delete(`${baseUrl}/products/${id}`)
        .then(res =>{
          if(res.data.acknowledged){
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

    return (
      <div className="overflow-x-auto w-full mb-32">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment</th>
              <th>#</th>
              <th>#</th>
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
                    <button className="btn btn-sm" onClick={()=>handleAdvertise(product)}>Advertise</button>
                  </td>
                  <td>
                    <button className="btn btn-sm" onClick={()=>handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
}

export default SellerMyProduct