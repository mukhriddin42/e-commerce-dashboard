import React, { use, useState } from 'react'

const SellerList = () => {
  const [users, setUsers] = useState([])
  console.log(users);

  function modalExit() {
    let modal = document.querySelector('.modal')
    let mymodalo = document.querySelector('.mymodal')
    mymodalo.style.display = 'block'
    modal.style.right = '0'
    mymodalo.addEventListener('click', () => {

      mymodalo.style.display = 'none'
      modal.style.right = '-500px'

    })
  }

  function getUser(e) {
    e.preventDefault()
    let modal = document.querySelector('.modal')
    let mymodalo = document.querySelector('.mymodal')
    let form = document.querySelector('form')
    let formData = new FormData(form)

    let obj = {
      id: users.length + 1,
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      email: formData.get('email'),
      status: formData.get('select')
    }

    setUsers(val => [...val, obj])


    mymodalo.style.display = 'none'
    modal.style.right = '-500px'
    form.reset()
  }


  return (
    <div className='max-w-full min-h-150 h-max p-3 overflow-hidden'>
      <div className='flex justify-between items-center '>
        <h1 className='text-4xl!'>Sellers List</h1>
        <button onClick={modalExit} className='bg-green-600 py-2 px-5 rounded! text-white!'>Create New</button>
      </div>
      <div className='flex flex-col my-3 gap-1  relative '>
        <ul className='flex justify-between items-center'>
          <input type="search" placeholder='Search...' className='bg-gray-100 w-70  p-2 rounded outline-none' />
          <ul className='flex gap-5'>
            <select name="select" id="selectStatus" className='p-3 w-40 rounded bg-gray-100 outline-none'>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select name="select" id="selectShow" className='p-3 w-40 rounded bg-gray-100 outline-none'>
              <option value="active">Show 20</option>
              <option value="inactive">Show 10</option>
            </select>
          </ul>
        </ul>
        <ul className='w-full  p-3 rounded h-10 flex items-center justify-between bg-gray-100'>
          <li>Seller</li>
          <li>Email</li>
          <li>Status</li>
          <li>Action</li>
        </ul>

        {users.map(user => {
          return (
            <ul className='flex w-full h-15 p-1 items-center justify-between'>
              <ul className=' flex gap-3 '>
                <div className='bg-gray-600 w-10 h-10 rounded-[50%]'></div>
                <ul>
                  <li >{user.firstname} {user.lastname}</li>
                  <li className='text-[13px] text-gray-400'>Seller ID: #{user.id}</li>
                </ul>
              </ul>
              <li className=''>{user.email}</li>
              <li className={`${user.status === 'active' ? 'bg-green-200 text-green-500' : 'bg-red-200  text-red-500'}   py-2 px-4 rounded-3xl`}>
                {user.status}
              </li>


              <button className='p-2 bg-green-500 text-white! rounded! '>Wiev detail</button>
            </ul>
          )
        })}

        <div className='modal w-100 h-100 shadow-md p-3   absolute right-[-500px] top-0 flex flex-col  items-center z-50 bg-white rounded-[10px] duration-300 ease-in-out'>
          <h3>New Seller</h3>
          <form onSubmit={getUser} className='flex flex-col gap-7 mt-4'>
            <input name='firstname'  type="text" placeholder='FirstName' className='border-1 p-2 rounded border-green-600 outline-none *:' />
            <input name='lastname'  type="text" placeholder='LastName' className='border-1 p-2 rounded border-green-600 outline-none' />
            <input name='email'  type="email" placeholder='Email' className='border-1 p-2 rounded border-green-600 outline-none' />
            <select name='select' id="select" className='border-1 p-2 rounded border-green-600 outline-none'>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className='p-1 text-[20px]! border! duration-300 ease-in-out  border-green-600 rounded! hover:bg-green-600!  hover:text-white!'>Submit</button>
          </form>
        </div>
      </div>

    </div>
  )
}
export default SellerList