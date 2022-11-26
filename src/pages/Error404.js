import React from 'react'
import errorImg from '../assets/404.png'

const Error404 = () => {
  return (
    <div className='flex w-full h-full justify-center items-center my-40'>
        <img src={errorImg} alt="404" />
    </div>
  )
}

export default Error404