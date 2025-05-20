import React from 'react'
import DashboardNavbar from './DashboardNavbar'
import { Outlet } from 'react-router-dom'

const Login = () => {
    return (
        <div className=' w-full h-[100vh]'>
            <DashboardNavbar />
            <div className='w-full h-[90%]  flex items-center justify-center'>
                <Outlet />
            </div>
        </div>
    )
}

export default Login