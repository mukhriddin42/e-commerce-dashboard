import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import AddProducts from './pages/AddProducts.jsx'
import Products from './pages/Products.jsx'
import Orders from './pages/Orders.jsx'
import Reviews from './pages/Reviews.jsx'
import Sellers from './pages/Sellers.jsx'
import Settings from './pages/Settings.jsx'
import Transactions from './pages/Transactions.jsx'


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
        path: "product",
        element: <Products />
      },
      {
        path: "orders",
        element: <Orders />
      },
      {
        path: "reviews",
        element: <Reviews />
      },
      {
        path: "sellers",
        element: <Sellers />
      },
      {
        path: "settings",
        element: <Settings />
      },
      {
        path: "transactions",
        element: <Transactions />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
