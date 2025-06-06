import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n';
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
import ContextThemeProvider  from './hooks/useContext.jsx'
import LanguageProvider from './hooks/useLanguageContext.jsx';
import { AuthProvider } from './context/authContext.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import AuthLayout from './components/layouts/AuthLayout';
import Login from './components/Login/Login.jsx';
import SignUp from './components/Login/Signup.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store';


const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'createAkk',
        element: <SignUp />
      }
    ]
  },
  {
    path: "/",
    element: <ProtectedRoute />, // bu protected route
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "addproduct", element: <AddProducts /> },
          { path: "addproducttwo", element: <AddProductTwo /> },
          { path: "products", element: <Products /> },
          { path: "order-list", element: <OrderList /> },
          { path: "order-details/:id", element: <OrderDetails /> },
          { path: "reviews", element: <Reviews /> },
          { path: "seller-list", element: <SellerList /> },
          { path: "seller-profile", element: <SellerProfile /> },
          { path: "profile-setting", element: <ProfileSettings /> },
          { path: "site-setting", element: <SiteSettings /> },
          { path: "transactions", element: <Transactions /> },
          { path: "categories", element: <Categories /> }
        ]
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
    <AuthProvider>
      <LanguageProvider>
        <ContextThemeProvider>
          <RouterProvider router={router} />
        </ContextThemeProvider>
      </LanguageProvider>
    </AuthProvider>
    </Provider>
  </StrictMode>
)
