import React from 'react'
import { Link } from 'react-router-dom';

const Createakk = () => {
    return (
        <div className=" flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold  text-center">Create an Account</h2>

                <form className="flex flex-col gap-5 mt-5">
                    <input
                        type="email"
                        placeholder="Your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <div className="flex space-x-2">
                        <span className="flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md select-none">+998</span>
                        <input
                            type="tel"
                            placeholder="Phone"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <p className="text-xs text-gray-500">
                        By signing up, you confirm that you've read and accepted our <span className="text-blue-600 underline cursor-pointer">User Notice</span> and <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>.
                    </p>

                    <button
                        type="submit"
                        className="w-full bg-green-500 !text-white py-2 !rounded-md hover:bg-green-600 transition"
                    >
                        Login
                    </button>
                </form>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500 text-sm">or sign up with</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <div className="flex space-x-2 mb-3 gap-5">
                    <button className="flex-1 !border !border-green-300 py-2 !rounded-md flex items-center justify-center hover:bg-gray-100">
                        <img src="https://yt3.googleusercontent.com/K8WVrQAQHTTwsHEtisMYcNai7p7XIlyEAdZg86qYw78ye57r5DRemHQ9Te4PcD_v98HB-ZvQjQ=s900-c-k-c0x00ffffff-no-rj" alt="Google" className="w-5 h-5 mr-2" />
                        Google
                    </button>
                    <button className="flex-1 !border !border-green-300 py-2 !rounded-md flex items-center justify-center hover:bg-gray-100">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXN9xSEe8unzPBEQOeAKXd9Q55efGHGB9BA&s" alt="Facebook" className="w-5 h-5 mr-2" />
                        Facebook
                    </button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account? <a href="#" className="text-green-600 hover:underline"><Link to='/login'>Sign in now</Link></a>
                </p>
            </div>
        </div>
    );
}

export default Createakk