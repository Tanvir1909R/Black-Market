import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { urlProvider } from "../../contexts/UrlContext";
import { authProvider } from "../../contexts/UserContext";

const BuyerDashboard = () => {
  const { user } = useContext(authProvider);
  const { baseUrl } = useContext(urlProvider);
  const { data: products = [], refetch } = useQuery({
    queryKey: ["bookingProducts"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/bookingProducts/${user.email}`,{
        headers:{
          authorization:`bearer ${localStorage.getItem('blackToken')}`
        }
      });
      const data = res.json();
      return data;
    },
  });

  const handleCancel = (product)=>{
    axios.delete(`${baseUrl}/deleteBookingProduct/${product._id}`)
    .then(res=>{
      toast.success('canceled')
      refetch()
    })
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Payment</th>
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
                        <img src={product.img} alt="phon" className="w-full object-cover" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <p>{product.itemName}</p>
                </td>
                <td>{product.price}</td>
                <td>
                  <Link to={`/payment/${product.productID}`} className="btn btn-sm">pay</Link>
                </td>
                <td>
                  <button className="btn btn-sm" onClick={()=>handleCancel(product)}>cancel</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BuyerDashboard;
