import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { urlProvider } from '../contexts/UrlContext';

const CategoryItems = () => {
  const { baseUrl } = useContext(urlProvider)
  const {name} = useParams();
  const { data: categoryItems, isLoading } = useQuery({
    queryKey:['categoryItems'],
    queryFn: async()=>{
      const res = await fetch(`${baseUrl}/products/${name}`);
      const data = res.json()
      return data
    }
  })
  if(isLoading){
    return <p>Loading...</p>
  }
  return (
    <div className='Container'>
      <h1 className='text-3xl font-bold'>Find your phon: {name}</h1>
      <div className='p-5'>
        {
          categoryItems.map((item)=> <div>
            <div>
              <img src={item.img} alt='phon' />
            </div>
            <div>
              <p>Name: {item.name}</p>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}

export default CategoryItems