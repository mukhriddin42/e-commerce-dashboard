import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import AddProducts from './pages/AddProducts.jsx'
import Products from './pages/Products.jsx'
import Reviews from './pages/Reviews.jsx'
import Transactions from './pages/Transactions.jsx'
import Categories from './pages/Categories.jsx'
import OrderList from './pages/OrderList.jsx'
import OrderDetails from './pages/OrderDetails.jsx'
import SellerList from './pages/SellerList.jsx'
import SellerProfile from './pages/SellerProfile.jsx'
import ProfileSettings from './pages/ProfileSettings.jsx'
import SiteSettings from './pages/SiteSettings.jsx'
import AddProductTwo from './pages/AddProductTwo.jsx'
import Login from './components/Login.jsx'
import Sign from './components/Routes/Sign.jsx'
import Createakk from './components/Routes/Createakk.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "addproduct",
        element: <AddProducts />
      },
      {
        path: "addproducttwo",
        element: <AddProductTwo />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "order-list",
        element: <OrderList />
      },
      {
        path: "order-details/:id",
        element: <OrderDetails />
      },
      {
        path: "reviews",
        element: <Reviews />
      },
      {
        path: "seller-list",
        element: <SellerList />
      },
      {
        path: "seller-profile",
        element: <SellerProfile />
      },
      {
        path: "profile-setting",
        element: <ProfileSettings />
      },
      {
        path: "site-setting",
        element: <SiteSettings />
      },
      {
        path: "transactions",
        element: <Transactions />
      },
      {
        path: "categories",
        element: <Categories />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />,
    children: [
      {
        index: true,
        element: <Sign />
      },
      {
        path: 'createAkk',
        element: <Createakk />
      }
    ]
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>

    </RouterProvider>
  </StrictMode>,
)
