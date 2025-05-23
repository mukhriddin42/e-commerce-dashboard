import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { fetchLastImage, uploadImage } from '../hooks/imagesFuncion';
import { ThemeContext } from '../hooks/useContext';
export const base_url = 'https://682739736b7628c5290f890c.mockapi.io/ava'

const ProfileSettings = () => {
  const { theme } = useContext(ThemeContext)

  const [image, setImage] = useState(null);


  useEffect(() => {
    fetchLastImage().then(img => {
      if (img) setImage(img);
    });
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedImg = await uploadImage(file);
        setImage(uploadedImg);
      } catch (err) {
        console.error("Uploadda xatolik:", err);
      }
    }
  };


  return (
    <div className='w-full h-auto'>
      <div className={theme === 'black'
        ? '!bg-black !text-white  w-full mx-auto p-10 bg-white border border-gray-300 rounded-lg flex flex-col md:flex-row gap-8'
        : '!bg-white !text-black w-full mx-auto p-10 bg-white border border-gray-300 rounded-lg flex flex-col md:flex-row gap-8'}>

        <form className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
              <input type="text" id="firstName" placeholder="Type here"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
              <input type="text" id="lastName" placeholder="Type here"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" placeholder="example@gmail.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="tel" id="phone" placeholder="+998"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" id="address" placeholder="Type here"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">Birthday</label>
              <input type="date" id="birthday"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>

          <button type="submit"
            className="!mt-6 !bg-emerald-500 !text-white px-6 py-2 !rounded-md hover:bg-emerald-600 transition">
            Save changes
          </button>
        </form>

        <div className="flex flex-col items-center gap-5 w-90">
          <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
            {image ? (
              <img src={image} alt="Preview" className="w-full h-full object-cover border-none" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">No image</div>
            )}
          </div>

          <label htmlFor="file_input"
            className={theme === 'black '
              ? 'text-white p-2 !rounded !border !border-green-300 block text-sm font-medium cursor-pointer'
              : 'p-2 !rounded !border !border-green-300 block text-sm font-medium cursor-pointer'}>
            Upload file
          </label>
          <input
            id="file_input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      <div className='w-full h-40 flex items-center p-3 gap-5 border border-gray-300 mt-5 rounded'>
        <div className={theme === 'black '
          ? '!text-white !bg-black flex w-[50%] h-full  !rounded justify-between items-center p-3'
          : ' flex w-[50%] h-full  !rounded justify-between items-center p-3'} >
          <ul className={theme === 'black'
            ? '!text-white bg-black'
            : ''
          }>
            <h1 className='!text-[25px]'>Password</h1>
            <li className='text-gray-400'>You can reset or change your password by <br /> clicking here</li>
          </ul>
          <button className='px-5 h-10 !rounded !border-gray-300 !border'>Change</button>
        </div>
        <div className={theme === 'black '
          ? '!text-white  flex w-[50%] h-full  !rounded justify-between items-center p-3'
          : 'flex w-[50%] h-full  !rounded justify-between items-center p-3'}>
          <ul>
            <h1 className='!text-[25px]'>Remove account</h1>
            <li className='text-gray-400'>Once you delete your account there is no <br /> going back</li>
          </ul>
          <button className='px-5 h-10 !rounded !border-gray-300 !border'>Deactivate</button>
        </div>
      </div>
    </div >
  );
};

export default ProfileSettings;
