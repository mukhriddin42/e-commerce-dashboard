import React, { useContext } from 'react'
import DashboardNavbar from './DashboardNavbar'
import { Outlet } from 'react-router-dom'
import { ThemeContext } from '../hooks/useContext'

const Login = () => {

    const { theme } = useContext(ThemeContext)

    return (
        <div className=' w-full h-[100vh]'>
            {/* <DashboardNavbar /> */}
            <div className={theme === 'black' ? '!bg-black !text-white w-full h-full flex items-center justify-center'
                : '!bg-white !text-black w-full h-full flex items-center justify-center'
            }>
            
                <Outlet />
            </div>
        </div >
    )
}

export default Login