import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  // console.log(`Base URL: ${baseUrl}`); 



  // Token olib kelish va tekshirish

  



  // Foydalanuvchini Login Qilish

  const login = async (email, password) => {
    console.log(email, password); // Konsolga email va parolni chiqarish

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email: email,
        password: password
      });
      console.log('Login response:', response.data.data.token, response.data.data); // Konsolga javobni chiqarish

4
      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        setUser(response.data.user);
        toast.success('Login successful!'); // Muvaffaqiyatli kirish haqida xabar berish
      }



    }
    catch (error) {
      console.error('Login error:', error);
    }

  }


  // Foydalanuvchini Logout Qilish
  const logout = () => {
    localStorage.removeItem('token');
    
    setUser(null);
  };

  // Foydalanuvchi Registratsiya qilish

  const register = async (firstname, lastname, email, password) => {
    try {

      const response = await axios.post(`${baseUrl}/auth/register`, {
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password
      });

      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        setUser(response.data.data.user);
        (true); // Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tganda autentifikatsiya holatini yangilash
        toast.success('Registration successful!'); // Muvaffaqiyatli ro'yxatdan o'tish haqida xabar berish
      }
    }
    catch (error) {
      console.error('Registration error:', error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
