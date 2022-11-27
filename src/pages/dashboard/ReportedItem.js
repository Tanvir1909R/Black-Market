import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { urlProvider } from '../../contexts/UrlContext'

const ReportedItem = () => {
  const {baseUrl} = useContext(urlProvider);
  const {data:products=[], refetch} = useQuery({
    queryKey:['reportedProducts'],
    queryFn: async() =>{
      const res =  await fetch(`${baseUrl}/reportedProducts`)
      const data = await res.json();
      return data
    }
  })

  const handleDelete = (product) =>{
    axios.delete(`${baseUrl}/reportedProducts/${product.productID}`)
    .then(res =>{
      if(res.data.delete){
        refetch()
        toast.success('products delete successfully')
      }
    })
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Report By</th>
            <th>Report To</th>
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
                        <img src={product.img} alt="phon" className='w-full object-cover' />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <p>{product.userEmail}</p>
                </td>
                <td>
                  {product.email} <br />
                  {product.number}
                </td>
                <td>
                  <button className="btn btn-sm" onClick={()=> handleDelete(product)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ReportedItem