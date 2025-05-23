import React, { useContext, useState } from 'react';
import { ThemeContext } from '../hooks/useContext';

const SiteSettings = () => {
  const [registration, setRegistration] = useState("all");
  const [notify, setNotify] = useState(false);
  const { theme } = useContext(ThemeContext)


  return (
    <div className={theme === 'black'
      ? '!text-white !bg-black max-w-6xl mx-auto  p-8 !rounded-lg shadow'
      : '!text-black !bg-white max-w-6xl mx-auto  p-8 !rounded-lg shadow'}>
      {/* Website name */}
      <div className="mb-6 ">
        <h2 className="text-xl font-semibold mb-1">Website name</h2>
        <p className="text-sm text-gray-500 mb-4">
          Supported languages of all pages including each product
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="homepage" className="block text-sm font-medium text-gray-700 my-3">
              Home page title
            </label>
            <input
              type="text"
              id="homepage"
              placeholder="Type here"
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="description" className="my-3 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows="3"
              placeholder="Write description here"
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
      </div>

      {/* Access options */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Access</h2>
        <p className="text-sm text-gray-500 !my-4">
          Give access of all users including each product/shop owner
        </p>
        <div className="space-y-2">
          {["all", "buyers", "sellers", "stop"].map((type) => (
            <div key={type}>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="access"
                  value={type}
                  checked={registration === type}
                  onChange={() => setRegistration(type)}
                />
                <span className="ml-2 capitalize">
                  {type === "all"
                    ? "All registration is enabled"
                    : type === "buyers"
                      ? "Only buyers is enabled"
                      : type === "sellers"
                        ? "Only sellers is enabled"
                        : "Stop new shop registration"}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Notification */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Notification</h2>
        <label className="inline-flex items-center mt-2">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={notify}
            onChange={() => setNotify(!notify)}
          />
          <span className="ml-2">Send notification on each user registration</span>
        </label>
      </div>
    </div>
  );
};

export default SiteSettings;
