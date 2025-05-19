import React from 'react'
import { Avatar, Button } from 'rsuite'
import AddOutlineIcon from '@rsuite/icons/AddOutline';

// icons
import { AiFillDollarCircle } from "react-icons/ai";
import { FaTruckMoving } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa6";
import Chart from '../components/Chart';




const Dashboard = () => {
  return (
    <>
      <div className="mx-3">
        <h2 className='font-bold!'>Dashboard</h2>
        <p className='mt-3!'>Whole data about your business here</p>
        <Button color="green" appearance="primary"  startIcon={<AddOutlineIcon />}>Create Report</Button>

        <div className='my-3 p-5 bg-green-50 rounded-md border border-green-200 shadow'>
          <div className="flex flex-row items-center justify-start gap-5">
            <div className='w-15 h-15 bg-green-200 flex justify-center items-center rounded-full'>
              <AiFillDollarCircle size={35} color='green' />
            </div>
            <div>
              <h6 className='font-bold!'>Revenu</h6>
              <h3 className='font-mono!'>$13.405.09</h3>
              <p className='opacity-50'>Shipping fees are not included</p>
            </div>
          </div>
        </div>

        <div className='my-3 p-5 bg-green-50 rounded-md border border-green-200 shadow'>
          <div className="flex flex-row items-center justify-start gap-5">
            <div className='w-15 h-15 bg-green-300 flex justify-center items-center rounded-full'>
              <FaTruckMoving  size={35} color='green' />
            </div>
            <div>
              <h6 className='font-bold!'>Orders</h6>
              <h3 className='font-mono!'>509</h3>
              <p className='opacity-50'>Shipping fees are not included</p>
            </div>
          </div>
        </div>

        <div className='my-3 p-5 bg-green-50 rounded-md border border-green-200 shadow'>
          <div className="flex flex-row items-center justify-start gap-5">
            <div className='w-15 h-15 bg-orange-100 flex justify-center items-center rounded-full'>
              <AiFillProduct size={35} color='orange' />
            </div>
            <div>
              <h6 className='font-bold!'>Products</h6>
              <h3 className='font-mono!'>9.003</h3>
              <p className='opacity-50'>Shipping fees are not included</p>
            </div>
          </div>
        </div>

        <div className='my-3 p-5 bg-green-50 rounded-md border border-green-200 shadow'>
          <div className="flex flex-row items-center justify-start gap-5">
            <div className='w-15 h-15 bg-blue-100 flex justify-center items-center rounded-full'>
              <FaOpencart size={35} color='blue' />
            </div>
            <div>
              <h6 className='font-bold!'>Monthly Earnging</h6>
              <h3 className='font-mono!'>$6.002</h3>
              <p className='opacity-50'>Shipping fees are not included</p>
            </div>
          </div>
        </div>


        {/* chart */}
        <div className="w-full">
          <Chart />
        </div>


        {/* New members */}


        <div className="w-full p-5 bg-green-50 rounded-2xl">
          <h4 className='font-bold!'>New Members</h4>
          <div className="flex justify-between items-center">
          <Avatar
                  circle
                  src="https://i.pravatar.cc/40" // Bu avatar o‘rniga o‘zingizning rasm URL’ingizni qo‘yishingiz mumkin
                  alt="User"
                  className='w-10! h-10! md:w-20! md:h-20!'
                />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard