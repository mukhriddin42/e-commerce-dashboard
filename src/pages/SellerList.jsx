import React from 'react'

const SellerList = () => {
  return (
    <div className='max-w-full h-max'>
      <div className='flex justify-between items-center '>
        <h1>Sellers List</h1>
        <button className='bg-green-600 py-2 px-5 rounded text-white'>Create New</button>
      </div>
      <div className='flex flex-col p-3 gap-5'>
        <ul className='flex justify-between items-center'>
          <input type="search" placeholder='Search...' className='bg-gray-100 w-70  p-2 rounded' />
          <ul className='flex gap-5'>
            <select name="select" id="selectStatus" className='p-3 w-40 rounded bg-gray-100'>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select name="select" id="selectShow" className='p-3 w-40 rounded bg-gray-100'>
              <option value="active">Show 20</option>
              <option value="inactive">Show 10</option>
            </select>
          </ul>
        </ul>
        <ul className='w-full  p-3 rounded h-10 flex items-center justify-between bg-gray-100'>
          <li>Seller</li>
          <li>Email</li>
          <ul className='flex gap-30'>
            <li>Status</li>
            <li className='mr-10'>Registered</li>
            <li>Action</li>
          </ul>
        </ul>
        <h1>salom</h1>
      </div>
    </div>
  )
}
export default SellerList