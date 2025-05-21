import { Outlet } from 'react-router-dom'
import DashboardNavbar from './components/DashboardNavbar'
import DashboardSideBar from './components/DashboardSideBar'
import { useContext } from 'react'
import { ThemeContext } from './hooks/useContext'

function App() {
  const { theme } = useContext(ThemeContext)  
  
  return (
    <>
    <div className='w-full h-full mymodal fixed inset-0  z-30'>
    </div>
      <div className={theme === 'black' ? "text-white! flex bg-black!" : "text-black bg-white flex"}>
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
