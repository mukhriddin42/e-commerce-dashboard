import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { ThemeContext } from '../../hooks/useContext'
import { Toaster } from 'react-hot-toast'

const AuthLayout = () => {

    const { theme } = useContext(ThemeContext)

    return (
        <div className=' w-full h-[100vh]'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {/* <DashboardNavbar /> */}
            <div className={theme === 'black' ? '!bg-black !text-white w-full h-full flex items-center justify-center'
                : '!bg-white !text-black w-full h-full flex items-center justify-center'
            }>

                <Outlet />
            </div>
        </div >
    )
}

export default AuthLayout