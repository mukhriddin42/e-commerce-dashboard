import React, { useEffect, useState } from 'react'
import DetailButton from '../components/DetailButton'
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('https://67fdf9a43da09811b1771b6c.mockapi.io/categories')
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
        setLoading(false)
      })
      .catch(err => {
        console.log("Bir dunyo xatolik: ", err);
        setLoading(false)
      })
  }, [])

  return (
    <div className='border-red-400 shadow-main p-10 rounded-sm flex gap-6 justify-between'>
      <div className='w-[100%]'>
        <div className='flex justify-between border-b-[2px] pb-[15px] border-gray-500'>
          <input className='shadow-main rounded-sm p-2' type="text" placeholder='Search...' />
          <select className='p-2 shadow-main rounded-sm cursor-pointer' name="filter_method" id="">
            <option value="">By time (Last)</option>
            <option value="">By time (First)</option>
            <option value="">Top rating</option>
            <option value="">Low rating</option>
          </select>
        </div>
        <div className='my-4'>
          {loading? (
            <p>Loading..</p>
          ) : (
            <table className='table-auto border-separate border-spacing-y-2'>
            <tr >
              <th className='w-20 text-left'>#ID</th>
              <th className='w-80 text-left'>Product</th>
              <th className='w-80 text-left'>Name</th>
              <th className='w-40 text-left'>Rating</th>
              <th className='w-60 text-left'>Date</th>
              <th className='w-20 text-left'>Action</th>
            </tr>
            {reviews.map(review => (
              <tr className='h-12'>
                <td>{review.id}</td>
                <td>{review.productName}</td>
                <td>{review.userFullname}</td>
                <td>Yulduzcha</td>
                <td>{review.date.toString().split("T")[0]}, 15:33</td>
                <td>
                  {/* <p className='inline px-4 py-1 rounded-sm cursor-pointer border-2 border-[#5DB996] hover:border-[#118B50] hover:bg-[#118B50] hover:text-white transactions-text transition-colors duration-300'>Details</p> */}
                  <DetailButton text={'More'} />
                </td>
              </tr>
            ))}
          </table>
          )}
        </div>
      </div>
      <div className='shadow-main rounded-sm min-w-70 p-4'>
        <p id='transaction-details-empty' className='non-selected-tr text-center text-[#A6AEBF]'>Please select transactions to see details</p>

        <div id='transaction-details' className=' hidden'>
          <p className='text-[16px] border-b-[2px] pb-[15px] border-gray-500 font-bold'>Transaction details</p>
          <div>
            <div className='py-4 flex flex-col gap-5'>
              <div>
                <p className='font-bold'>Suplier:</p>
                <span>TemplateMount</span>
              </div>
              <div>
                <p className='font-bold'>Date:</p>
                <p>23.23.2345</p>
              </div>
              <div>
                <p className='font-bold'>Billing address:</p>
                <p>reg</p>
              </div>
              <div>
                <p className='font-bold'>VAT ID:</p>
                <p>rewtrw</p>
              </div>
              <div>
                <p className='font-bold'>Email:</p>
                <p>wrg</p>
              </div>
              <div>
                <p className='font-bold'>Payment:</p>
                <p>ioquoruw</p>
                <p className='text-xl'>fqfasdfa</p>
              </div>
            </div>
          </div>
          <p className='inline px-4 py-1 rounded-sm cursor-pointer border-2 border-[#5DB996] hover:border-[#118B50] hover:bg-[#118B50] hover:text-white transactions-text transition-colors duration-300'>Download recipe</p>
        </div>
      </div>
    </div>
  )
}

export default Reviews