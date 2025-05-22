import React, { useContext } from 'react'
import { Avatar, Button } from 'rsuite'
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import avatarimg from "../assets/blog-1.jpg"

// icons
import { AiFillDollarCircle } from "react-icons/ai";
import { FaTruckMoving } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa6";
import MySteps from '../components/Steps';
import ApexChart from '../components/charts/Chart';
import ApexChartColumn from '../components/charts/ChartColumn';
import ApexChartRow from '../components/charts/ChartRow';
import { ThemeContext } from '../hooks/useContext';




const Dashboard = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <>
      <div className="mx-3 duration-200 ease-in-out">
        <h2 className='font-bold!'>Dashboard</h2>
        <p className='mt-3!'>Whole data about your business here</p>
        <Button color="green" appearance="primary"  startIcon={<AddOutlineIcon  />}>Create Report</Button>

        <div className='flex flex-col md:flex-col xl:flex-row xl:gap-2'>

          <div 
          className={theme === "black"
             ? "my-3 w-full xl:w-1/4 p-5 bg-gray-900 rounded-md border border-gray-500 shadow "
             : "my-3 w-full xl:w-1/4 p-5 bg-green-50 rounded-md border border-green-200 shadow "
            
            }>
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

          <div className={theme === "black"
             ? "my-3 w-full xl:w-1/4 p-5 bg-gray-900 rounded-md border border-gray-500 shadow"
             : "my-3 w-full xl:w-1/4 p-5 bg-green-50 rounded-md border border-green-200 shadow"
            
            }>
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

          <div 
          className={theme === "black"
             ? "my-3 w-full xl:w-1/4 p-5 bg-gray-900 rounded-md border border-gray-500 shadow"
             : "my-3 w-full xl:w-1/4 p-5 bg-green-50 rounded-md border border-green-200 shadow"
            
            }>
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

          <div 
          className={theme === "black"
             ? "my-3 w-full xl:w-1/4 p-5 bg-gray-900 rounded-md border border-gray-500 shadow"
             : "my-3 w-full xl:w-1/4 p-5 bg-green-50 rounded-md border border-green-200 shadow"
            
            }>
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
        </div>


        <div className="w-full flex flex-col xl:flex-row  xl:gap-2">


          <div className='w-full xl:w-4/6 '>
            {/* chart */}
            <div className={theme === "black" 
              ? "bg-gray-900 rounded-md border border-gray-500 shadow my-3 py-5"
              : "bg-green-50 rounded-md border border-green-200 shadow my-3 py-5"
            }>
              <h4 className='m-2! font-bold!'>Sale Statistics</h4>
              <ApexChart />

            </div>



            <div className="w-full flex flex-col xl:flex-row gap-3 xl:items-start">


              <div className={theme === 'black' 
                ? "w-full xl:w-2/5 bg-gray-900 rounded-xl border-1 border-gray-500 p-3"
                : "w-full xl:w-2/5 bg-green-50 rounded-xl border-1 border-green-300 p-3"
              }>
                {/* New members */}
                <h5 className="font-bold!">New Members</h5>
                <div className="flex justify-between items-center mt-5">
                  <div className="flex gap-2 items-center">
                    <img src={avatarimg} className='w-10 h-10 rounded-full' alt="" />
                    <p className='font-bold! text-[12px]'>Patric Adams</p>
                  </div>
                  <Button color="green" appearance="primary"  startIcon={<AddOutlineIcon />}>Add</Button>
                </div>
                <div className="flex justify-between items-center mt-5">
                  <div className="flex gap-2 items-center">
                    <img src={avatarimg} className='w-10 h-10 rounded-full' alt="" />
                    <p className='font-bold! text-[12px]'>Patric Adams</p>
                  </div>
                  <Button color="green" appearance="primary"  startIcon={<AddOutlineIcon />}>Add</Button>
                </div>
                <div className="flex justify-between items-center my-5">
                  <div className="flex gap-2 items-center">
                    <img src={avatarimg} className='w-10 h-10 rounded-full' alt="" />
                    <p className='font-bold! text-[12px]'>Patric Adams</p>
                  </div>
                  <Button color="green" appearance="primary"  startIcon={<AddOutlineIcon />}>Add</Button>
                </div>
              </div>


              <div className={theme === 'black'
                ? "w-full xl:w-3/5 bg-gray-900 rounded-xl border-1 border-gray-500 p-3 flex"
                : "w-full xl:w-3/5 bg-green-50 rounded-xl border-1 border-green-300 p-3 flex"
              }>
              {/* Steps */}
                <MySteps />
                <span>
                  <p className='pb-[16px] pt-1'>Lorem ipsum dolor, sit amet ?</p>
                  <p className='py-[16px]'>Lorem ipsum dolor, sit amet ?</p>
                  <p className='py-[16px]'>Lorem ipsum dolor, sit amet ?</p>
                  <p className='py-[16px]'>Lorem ipsum dolor, sit amet ?</p>
                  <p className='py-[16px]'>Lorem ipsum dolor, sit amet ?</p>
                </span>
            
              </div>
            </div>

          </div>


          <div className="w-full xl:w-2/6 ">

            <div className={
              theme === "black"
                ? "w-full bg-gray-900 rounded-md border border-gray-500 shadow my-3 py-2"
                : "w-full bg-green-50 rounded-md border border-green-200 shadow my-3 py-2"
            }>
              <h6 className='ml-3! font-bold!'>Revenue Base on Area</h6>
              <ApexChartColumn />
            </div>

            <div className={
              theme === "black"
                ? "w-full bg-gray-900 rounded-md border border-gray-500 shadow my-3 py-2"
                : "w-full bg-green-50 rounded-md border border-green-200 shadow my-3 py-2"
            }>
              <ApexChartRow />
            </div>
          </div>

        </div>



      </div>
    </>
  )
}

export default Dashboard