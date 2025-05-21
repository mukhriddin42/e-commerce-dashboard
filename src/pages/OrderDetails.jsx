import { CalendarIcon, Download } from "lucide-react";


const OrderDetails = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="w-50! text-[20px]! ml-8 mb-2.5 font-semibold!">
        <p>Order detail</p>
        <h6 className="text-[12px]!">Details for Order ID: 3453012</h6>
      </div>
      <div className="max-w-7xl mx-auto bg-white p-6 shadow-sm">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-start space-x-2">
              <CalendarIcon className="h-5 w-5 text-gray-500 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">
                  Wed Aug 15, 2020, 4:34PM
                </span>
                <span className="text-sm text-gray-500">Order ID: 3453012</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <div className="relative">
                <select className="appearance-none bg-gray-100 border border-gray-200 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Change status</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <button className="bg-green-500 hover:bg-green-600 text-white">
                Save
              </button>
              <button variant="outline" className="border-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-printer"
                >
                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <rect width="12" height="8" x="6" y="14"></rect>
                </svg>
              </button>
            </div>
          </div>

          {/* Info Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Customer Info */}
            <div className="flex space-x-3">
              <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-500 text-lg">👤</span>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Customer</h3>
                <p className="text-sm">John Alexander</p>
                <p className="text-sm text-gray-500">alex@example.com</p>
                <p className="text-sm text-gray-500">+998 99 2232456</p>
                <a href="#" className="text-sm text-green-500 hover:underline">
                  View profile
                </a>
              </div>
            </div>

            {/* Order Info */}
            <div className="flex space-x-3">
              <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-500 text-lg">📦</span>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Order info</h3>
                <p className="text-sm">Shipping: Express</p>
                <p className="text-sm">Pay method: card</p>
                <p className="text-sm">
                  Status: <span className="text-green-500">new</span>
                </p>
                <a
                  href="#"
                  className="text-sm text-green-500 hover:underline flex items-center"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download info
                </a>
              </div>
            </div>

            {/* Deliver To */}
            <div className="flex space-x-3">
              <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-500 text-lg">🏠</span>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Deliver to</h3>
                <p className="text-sm">City: Tashkent, Uzbekistan</p>
                <p className="text-sm">Block A, house 123, Floor 2</p>
                <p className="text-sm">Po Box 10000</p>
                <a href="#" className="text-sm text-green-500 hover:underline">
                  View profile
                </a>
              </div>
            </div>
          </div>

          <div className="w-full! flex gap-5">
            {/* Product Table */}
            <div className="w-2/3! mt-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Unit Price
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-md flex items-center justify-center">
                          <span className="text-amber-800">🍦</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Häagen-Dazs Caramel Cone Ice
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      $44.25
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      2
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      $89.50
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-md flex items-center justify-center">
                          <span className="text-orange-800">🥤</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Seeds of Change Organic
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      $7.50
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      2
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      $15.00
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-md flex items-center justify-center">
                          <span className="text-green-800">🍝</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            All Natural Italian-Style
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      $45.50
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      2
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      $102.00
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-yellow-100 rounded-md flex items-center justify-center">
                          <span className="text-yellow-800">🌽</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Sweet & Salty Kettle Corn
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      $99.00
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      3
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      $297.00
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* Order Summary */}
              <div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Subtotal:</span>
                    <span className="text-sm font-medium">$473.50</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Shipping cost:
                    </span>
                    <span className="text-sm font-medium">$10.00</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200 mt-4">
                    <span className="text-sm font-medium">Grand total:</span>
                    <span className="text-lg font-bold">$483.00</span>
                  </div>
                  <div className="mt-6">
                    <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-md inline-block">
                      Payment done
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary and Payment Info */}
            <div className="w-1/3">
              {/* Payment Info */}
              <div>
                <h3 className="text-sm font-medium mb-4">Payment info</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center mb-3">
                    <div className="h-5 w-5 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">
                      Master Card **** **** **** 4768
                    </span>
                  </div>
                  <p className="text-sm">Business name: Grand Market LLC</p>
                  <p className="text-sm">Phone: +1 (800) 555-154-52</p>
                </div>

                <h3 className="text-sm font-medium mt-6 mb-4">Notes</h3>
                <div className="bg-gray-50 p-4 rounded-md h-32">
                  <textarea
                    className="w-full h-full bg-transparent border-0 focus:ring-0 resize-none text-sm"
                    placeholder="Add notes about the order"
                  ></textarea>
                </div>
                <div className="mt-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white text-sm">
                    Save note
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
