import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { urlProvider } from "../../contexts/UrlContext";
import { authProvider } from "../../contexts/UserContext";
import useUserState from "../../hooks/useUserState";

const BuyerDashboard = () => {
  const {user} = useContext(authProvider)
  const { baseUrl } = useContext(urlProvider);
  const { data: products=[] } = useQuery({
    queryKey: ["bookingProducts"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/bookingProducts/${user.email}`);
      const data = res.json();
      return data;
    },
  });

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
                        <img
                          src={product.img}
                          alt="phon"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <p>{product.itemName}</p>
                </td>
                <td>{product.price}</td>
                <td>
                  <button className="btn btn-sm">pay</button>
                </td>
                <td>
                  <button className="btn btn-sm">cancel</button>
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
