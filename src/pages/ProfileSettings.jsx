import React from 'react'

const ProfileSettings = () => {
  return (
    <div className='w-full h-150 '>
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col md:flex-row gap-8 ">

        <form className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Type here"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Type here"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="+998 "
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Type here"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                Birthday
              </label>
              <input
                type="date"
                id="birthday"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6! bg-emerald-500 text-white! px-6 py-2 rounded-md! hover:bg-emerald-600! transition"
          >
            Save changes
          </button>
        </form>

        
        <div className="flex flex-col items-center gap-3 ">
          <div className='w-30 h-30 rounded-[50%] bg-gray-400'>
          </div>
          <button className="mt-3 text-blue-600 hover:underline">Upload</button>
        </div>
      </div>
      <div className='w-full h-40  flex items-center p-3 gap-5 shadow-xl!'>
        <div className='flex w-[50%] h-full bg-gray-200 p-4 rounded! justify-between items-center'>
          <ul>
            <h1 className='text-[20px]!'>Password</h1>
            <li className='text-gray-400!'>You can reset or change your password by <br /> clicking here</li>
          </ul>
          <button className='px-5 h-10 rounded! border-gray-500! border!'>Change </button>
        </div>
        <div className='flex w-[50%] h-full bg-gray-200 p-4 rounded! justify-between items-center'>
          <ul>
            <h1 className='text-[20px]!'>Remove account</h1>
            <li className='text-gray-400!'>Once you delete your acount there is no <br />  going back</li>
          </ul>
          <button className='px-5 h-10 rounded! border-gray-500! border!'>Deactive </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings