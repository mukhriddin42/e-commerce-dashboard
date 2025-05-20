import { Outlet } from 'react-router-dom'
import DashboardNavbar from './components/DashboardNavbar'
import DashboardSideBar from './components/DashboardSideBar'
import { ThemeContext } from './hooks/useContext'
import { useContext } from 'react'

function App() {
  const { theme } = useContext(ThemeContext)

  return (
    <>
      <div className='w-full h-full mymodal fixed inset-0  z-30'>
      </div>
      <div className='flex'>
        <DashboardSideBar />
        <div className="mainConten  absolute right-0 md:relative flex flex-col md:w-full ">
          <DashboardNavbar />
          <main className=" p-4">
            {/* Asosiy kontent shu yerda bo‘ladi */}
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default App
