import React from 'react'

const Loader = () => {
  return (
    <div className='w-full h-full absolute top-0 left-0 flex justify-center items-center bg-white' style={{zIndex:10}}>
        <progress className="progress w-56"></progress>
    </div>
  )
}

export default Loader