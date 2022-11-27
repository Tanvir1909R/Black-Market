import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { urlProvider } from "../../contexts/UrlContext";

const AllSeller = () => {
  const { baseUrl } = useContext(urlProvider);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["usersSeller"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/seller`);
      const data = res.json();
      return data;
    },
  });

  const handleDelete = (id) => {
    axios.delete(`${baseUrl}/buyers/${id}`).then((res) => {
      console.log(res.data);
      refetch();
    });
  };
  const handleVerify = (user) => {
    console.log(user);
    axios.put(`${baseUrl}/verifyAccount?email=${user.email}`).then((res) => {
      if (res.data.update) {
        refetch();
      }
    });
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Verify</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => {
            return (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>
                  <p>{user.name}</p>
                </td>
                <td>
                  <p>{user.email}</p>
                </td>
                <td>{user.type}</td>
                <td>
                  {user.userVerified ? (
                    "verified"
                  ) : (
                    <button
                      className="btn btn-sm"
                      onClick={() => handleVerify(user)}
                    >
                      verify
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllSeller;
