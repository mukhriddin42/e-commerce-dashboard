import React from 'react'
import { Link } from 'react-router-dom';

const Sign = () => {
    return (
        <div className=" flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold !mb-10 text-center">Sign in</h2>

                <form className="flex flex-col gap-10 w-80">
                    <input
                        type="text"
                        placeholder="Username or email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="accent-green-500" />
                            <span>Remember</span>
                        </label>
                        <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
                    </div>

                    <Link to='/'>
                        <button
                            type="submit"
                            className="w-full bg-green-500 !text-white py-2 !rounded-md hover:bg-green-600 transition"
                        >
                            Login
                        </button>
                    </Link>
                </form>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500 text-sm">or sign up with</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <div className="flex flex-col gap-5 mb-5">
                    <button className="w-full !border !border-green-300 py-2 !rounded-md flex items-center justify-center hover:bg-gray-100">
                        <img src="https://yt3.googleusercontent.com/K8WVrQAQHTTwsHEtisMYcNai7p7XIlyEAdZg86qYw78ye57r5DRemHQ9Te4PcD_v98HB-ZvQjQ=s900-c-k-c0x00ffffff-no-rj" alt="Google" className="w-5 h-5 mr-2" />
                        Sign in using Google
                    </button>

                    <button className="w-full !border !border-green-300 py-2 !rounded-md flex items-center justify-center hover:bg-gray-100">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXN9xSEe8unzPBEQOeAKXd9Q55efGHGB9BA&s" alt="Facebook" className="w-5 h-5 mr-2" />
                        Sign in using Facebook
                    </button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have account? <a href="#" className="text-green-600 hover:underline"><Link to='/login/createAkk'>Sign up</Link></a>
                </p>
            </div>
        </div>
    );
}

export default Sign