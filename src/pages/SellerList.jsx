import React, { useContext, useEffect, useRef, useState } from 'react'
import DetailButton from '../components/DetailButton'
import useFetch from '../hooks/api'
import axios from 'axios'
import { ThemeContext } from '../hooks/useContext'
import { useTranslation } from 'react-i18next'



const SellerList = () => {


  const { t } = useTranslation()
  const { theme } = useContext(ThemeContext)

  const { data, loading, error } = useFetch('https://682739736b7628c5290f890c.mockapi.io/users')
  const [users, setUsers] = useState([])
  const [select, setSelect] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setUsers(data)
  }, [data])

  const filter = useRef(null)
  const search = useRef(null)

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

    let now = new Date()
    let month = String(now.getMonth() + 1).padStart(2, '0')
    let day = String(now.getDate()).padStart(2, '0')
    let year = now.getFullYear()
    let formattedDate = `${month}.${day}.${year}`

    let obj = {
      id: users?.length + 1,
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      email: formData.get('email'),
      status: formData.get('select'),
      registerDate: formattedDate
    }

    axios.post('https://682739736b7628c5290f890c.mockapi.io/users', obj)
      .then(response => {
        setUsers(prevUsers => [...prevUsers, response.data])
      })
      .catch(error => {
        console.error('Error posting user:', error)
      })

    mymodalo.style.display = 'none'
    modal.style.right = '-500px'
    form.reset()
  }

  function selectvalue() {
    setSelect(filter.current.value)
  }

  function handleInput() {
    setSearchTerm(search.current.value)
  }

  function handleUser(id) {
    alert(id)
  }

  const filteredUsers = select === 'all'
    ? users
    : users?.filter(item => item.status === select)

  return (
    <div className={theme === "black"
      ? '!text-white !bg-black max-w-full min-h-150 h-max p-3 overflow-hidden' : '!text-black !bg-white max-w-full min-h-150 h-max p-3 overflow-hidden'}>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl!'>{t('sellerList.sellerlist')}</h1>
        <button onClick={modalExit} className='bg-green-600 py-2 px-5 rounded! text-white!'>{t("sellerList.button")}</button>
      </div>

      <div className='flex flex-col my-3 gap-1 relative'>
        <ul className='flex justify-between items-center'>
          <input
            ref={search}
            onChange={handleInput}
            type="search"
            placeholder={t('sellerList.inputsearch')}
            className={theme === 'black'
              ? '!text-white !bg-black  w-70 p-2 !rounded outline-none !border !border-white' : '!text-black !bg-white bg-gray-100 w-70 p-2 rounded outline-none'}

          />
          <ul className='flex gap-5'>
            <select
              ref={filter}
              onChange={selectvalue}
              name="select"
              id="selectStatus"
              className={theme === 'black'
                ? '!text-white !bg-black  p-3 w-40 !rounded  outline-none !border !border-white '
                : '!text-black !bg-white p-3 w-40 rounded  outline-none'}
            >
              <option value="all">{t("sellerList.sectionAll")}</option>
              <option value="active">{t("sellerList.sectionActive")}</option>
              <option value="inactive">{t("sellerList.sectionInactive")}</option>
            </select>
            <select
              name="select"
              id="selectShow"
              className={theme === 'black'
                ? '!text-white !bg-black  p-3 w-40 !rounded  outline-none !border !border-white '
                : '!text-black !bg-white p-3 w-40 rounded  outline-none'}
            >
              <option value="active">{t("sellerList.show20")}</option>
              <option value="inactive">{t("sellerList.show10")}</option>
            </select>
          </ul>
        </ul>

        <table className="w-full border-separate !border-spacing-y-4">
          <thead>
            <tr className={theme === 'black'
              ? '!text-white !bg-black text-left  h-10'
              : '!text-black !bg-white text-left  h-10'}>
              <th className="p-2">{t("sellerList.arrUser")}</th>
              <th className="p-2">{t("sellerList.arrEmail")}</th>
              <th className="p-2">{t("sellerList.arrStatus")}</th>
              <th className="p-2">{t("sellerList.arrDate")}</th>
              <th className="p-2">{t("sellerList.arrAction")}</th>
            </tr>
          </thead>
          <tbody className='relative'>
            {loading ? (
              <tr>
                <td colSpan={5} className=' h-100'>
                  <div className='flex justify-center items-center w-full h-40'>
                    <div className={`loader ${theme === 'black' ? 'loader-dark' : ''}`}></div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredUsers
                ?.filter(user => user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(user => (
                  <tr key={user.id} className={theme === 'black'
                    ? '!text-white !bg-black shadow h-15'
                    : '!text-black !bg-white shadow h-15'
                  }>
                    <td className="p-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-600 w-10 h-10 rounded-full"></div>
                        <div>
                          <div>{user.firstname} {user.lastname}</div>
                          <div className="text-[13px] text-gray-400">Seller ID: #{user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">
                      <span className={`py-2 px-4 rounded-3xl text-sm ${user.status === 'active' ? 'bg-green-200 text-green-500' : 'bg-red-200 text-red-500'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-2">{user.registerDate}</td>
                    <td className="p-2">
                      <DetailButton onClick={() => handleUser(user.id)} text={t("sellerList.arrButton")} />
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>

        {/* Modal */}
        <div className='modal w-100 h-100 shadow-md p-3 absolute right-[-500px] top-0 flex flex-col items-center z-50 bg-white rounded-[10px] duration-300 ease-in-out'>
          <h3>New Seller</h3>
          <form onSubmit={getUser} className='flex flex-col gap-7 mt-4'>
            <input name='firstname' type="text" placeholder='FirstName' className='border-1 p-2 rounded border-green-600 outline-none' />
            <input name='lastname' type="text" placeholder='LastName' className='border-1 p-2 rounded border-green-600 outline-none' />
            <input name='email' type="email" placeholder='Email' className='border-1 p-2 rounded border-green-600 outline-none' />
            <select name='select' id="select" className='border-1 p-2 rounded border-green-600 outline-none'>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className='p-1 text-[20px]! border! duration-300 ease-in-out border-green-600 rounded! hover:bg-green-600! hover:text-white!'>Submit</button>
          </form>
        </div>
      </div>
    </div >
  )
}

export default SellerList
