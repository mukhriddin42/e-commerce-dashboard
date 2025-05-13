import { Outlet } from 'react-router-dom'
import DashboardNavbar from './components/DashboardNavbar'
import DashboardSideBar from './components/DashboardSideBar'

function App() {

  return (
    <>
      <div className="flex">
      <DashboardSideBar />
      <div className="w-full">
        <DashboardNavbar />
        <main className="p-4">
          {/* Asosiy kontent shu yerda bo‘ladi */}
          <Outlet/>
        </main>
      </div>
    </div>

    </>
  )
}

export default App
