import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import { urlProvider } from '../../contexts/UrlContext';

const AllSeller = () => {
    const { baseUrl } = useContext(urlProvider);

    const { data: users=[], refetch } = useQuery({
      queryKey: ["usersSeller"],
      queryFn: async () => {
        const res = await fetch(`${baseUrl}/seller`);
        const data = res.json();
        return data;
      },
    });
  
    const handleDelete = (id)=>{
        
    }

    return (
      <div className="overflow-x-auto w-full mb-32">
        <table className="table w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
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
                  <td>{user.type}</td>
                  <td>
                    <button className="btn btn-sm" onClick={()=>handleDelete(user)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
}

export default AllSeller