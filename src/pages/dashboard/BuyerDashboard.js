import React from 'react'

const BuyerDashboard = () => {
  return (
    <div className="overflow-x-auto w-full">
  <table className="table w-full">
    <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Payment</th>
      </tr>
    </thead>
    <tbody>
    <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Hart Hagerty</div>
            </div>
          </div>
        </td>
        <td>
          <p>iphone</p>
        </td>
        <td>
            70000
        </td>
        <td>
            <button className='btn btn-sm'>pay</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
  )
}

export default BuyerDashboard