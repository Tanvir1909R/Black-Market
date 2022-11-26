import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { urlProvider } from '../../contexts/UrlContext';
import { authProvider } from '../../contexts/UserContext';

const AllBuyer = () => {
    const { baseUrl } = useContext(urlProvider);

    const { data: users=[], refetch } = useQuery({
      queryKey: ["usersBuyer"],
      queryFn: async () => {
        const res = await fetch(`${baseUrl}/buyers`);
        const data = res.json();
        return data;
      },
    });
  
    const handleDelete = (id)=>{
        axios.delete(`${baseUrl}/buyers/${id}`)
        .then(res=>{
          console.log(res.data);
          refetch()
        })
    }

    return (
      <div className="overflow-x-auto w-full mb-32">
        <table className="table w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => {
              return (
                <tr key={user._id}>
                  <td>
                    {idx + 1}
                  </td>
                  <td>
                    <p>{user.name}</p>
                  </td>
                  <td>
                    <p>{user.email}</p>
                  </td>
                  <td>{user.type}</td>
                  <td>
                    <button className="btn btn-sm" onClick={()=>handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
}

export default AllBuyer