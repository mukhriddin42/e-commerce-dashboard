import React, { useEffect, useState } from 'react'
import DetailButton from '../components/DetailButton'
import axios from 'axios';
import ReatingStars from '../components/ReatingStars';
import { FaStar } from 'react-icons/fa';

const Reviews = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('')
  const [reviews, setReviews] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [oneReview, setOneReview] = useState(null);

  useEffect(() => {
    axios
      .get('https://67fdf9a43da09811b1771b6c.mockapi.io/categories')
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
        setFilterData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log("Bir dunyo xatolik: ", err);
        setLoading(false)
      })
  }, [])


  // searchTerm yoki reviews o'zgarganda filtrlash uchun effekt
  useEffect(() => {
    if (!reviews || reviews.length === 0) {
      setFilterData([]); // Agar asl reviews bo'sh bo'lsa
      return;
    }

    const term = searchTerm.trim().toLowerCase();

    let filtered = [];

    if (term === '') {
      filtered = [...reviews];
    } else {
      filtered = reviews.filter((item) =>
        (item.userFullname && item.userFullname.toLowerCase().includes(term)) ||
        (item.productName && item.productName.toLowerCase().includes(term))
      );
    }

    // Sortingni qo'shamiz
    let sorted = [...filtered];

    if (filterMethod === 'time-last') {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (filterMethod === 'time-first') {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (filterMethod === 'rating-top') {
      sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    } else if (filterMethod === 'rating-low') {
      sorted.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
    }

    setFilterData(sorted);

  }, [searchTerm, reviews, filterMethod]); // searchTerm yoki reviews o'zgarganda qayta ishlaydi

  function openModal() {
    document.getElementById("transaction-details").classList.remove("hidden")
    document.getElementById("transaction-details-empty").classList.add("hidden")
  }

  const handleClickReview = (id) => {
    const oneReview = reviews.find((rev) => rev.id === id)
    setOneReview(oneReview);
    console.log(oneReview);
    openModal()
  }

  return (
    <div className='border-red-400 shadow-main p-10 rounded-sm flex gap-6 justify-between'>
      <div className='w-[100%]'>
        <div className='flex justify-between border-b-[2px] pb-[15px] border-gray-500'>
          <input className='shadow-main rounded-sm p-2' type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search...' />
          <select className='p-2 shadow-main rounded-sm cursor-pointer' value={filterMethod} onChange={(e) => { setFilterMethod(e.target.value) }} name="filter_method" id="">
            <option value="">Default</option>
            <option value="time-last">By time (Last)</option>
            <option value="time-first">By time (First)</option>
            <option value="rating-top">Top rating</option>
            <option value="rating-low">Low rating</option>
          </select>
        </div>
        <div className='my-4'>
          {loading ? (

            <div className='w-full py-40 flex items-center justify-center'>
              <div className='loader z-35'></div>
            </div>
          ) : (
            <table className='table-auto border-separate border-spacing-y-2'>
              <tr>
                <th className='w-20 text-left'>#ID</th>
                <th className='w-80 text-left'>Product</th>
                <th className='w-80 text-left'>Name</th>
                <th className='w-40 text-left'>Rating</th>
                <th className='w-60 text-left'>Date</th>
                <th className='w-20 text-left'>Action</th>
              </tr>
              {filterData.map((review) => (
                <tr className='h-12' key={review.id}>
                  <td>{review.id}</td>
                  <td>{review.productName}</td>
                  <td>{review.userFullname}</td>
                  <td>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, index) => {
                        console.log('Review rating:', review.id);
                        const ratingStr = review.rating?.toString();
                        const firstDigit = ratingStr ? parseInt(ratingStr[0]) : 0;
                        const limitedDigit = Math.min(firstDigit, 9);
                        const starCount = Math.round((limitedDigit / 10) * 5);
                        return (
                          <FaStar key={index}
                            className={index < starCount ? 'text-yellow-400' : 'text-gray-300'}
                          />
                        )
                      })}
                    </div>
                  </td>
                  <td>{review.date.toString().split("T")[0]}, 15:33</td>
                  <td>
                    {/* <p className='inline px-4 py-1 rounded-sm cursor-pointer border-2 border-[#5DB996] hover:border-[#118B50] hover:bg-[#118B50] hover:text-white transactions-text transition-colors duration-300'>Details</p> */}
                    <DetailButton onClick={() => handleClickReview(review.id)} text={'More'} />
                  </td>
                </tr>
              ))}
            </table>
          )}
        </div>
      </div>
      <div className='shadow-main rounded-sm min-w-70 p-4'>
        <p id='transaction-details-empty' className='non-selected-tr text-center text-[#A6AEBF]'>Please select transactions to see more information</p>
        {oneReview && (
          <div id='transaction-details' className=' hidden'>
            <p className='text-[16px] border-b-[2px] pb-[15px] border-gray-500 font-bold'>Review details</p>
            <div className='py-4 flex flex-col gap-5 w-[100%] max-w-[270px]'>
              <div className='mb-6'>
                <p className='font-bold pb-2'>Comment:</p>
                <span>{oneReview?.comment}</span>
              </div>
            </div>
            {/* <p className='inline px-4 py-1 rounded-sm cursor-pointer border-2 border-[#5DB996] hover:border-[#118B50] hover:bg-[#118B50] hover:text-white transactions-text transition-colors duration-300'>Download recipe</p> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default Reviews