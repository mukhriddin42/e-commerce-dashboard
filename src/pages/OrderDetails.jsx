import axios from "axios";
import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { GoDownload } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams(); // URL dan orderId olish
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const calculateSubtotal = () => {
    return order.details.items
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const [status, setStatus] = useState(order?.status || "new");

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
  if (order) {
    setStatus(order.status);
  }
}, [order]);

const handleSave = () => {
  setOrder(prevOrder => ({
    ...prevOrder,
    status: status,
  }));
  alert(`Status changed to: ${status}`);
};

  useEffect(() => {
    // Ma'lumotni yuklash, sizda data.json ni olish
    const fetchOrder = async () => {
      if (id) {
        localStorage.setItem("lastId", id); // id o'zgaruvchidan olinadi
      }
      try {
        const res = await axios.get("/data/data.json");
        const orderData = res.data.find((o) => o.id.toString() === id);
        if (!orderData) {
          alert("Order topilmadi");
          setOrder(null);
          navigate("/orders");
          return;
        } else {
          setOrder(orderData);
        }
      } catch (error) {
        console.error("Xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  if (loading) return <div>Yuklanmoqda...</div>;
  if (!order) return <div>Order topilmadi</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="w-50! text-[20px]! ml-8 mb-2.5 font-semibold!">
        <p>Order detail</p>
        <h6 className="text-[12px]!">Details for Order ID: {order.id}</h6>
      </div>
      <div className="max-w-7xl mx-auto bg-white p-6 shadow-sm">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-start space-x-2">
              <CiCalendar className="h-5 w-5 text-gray-500 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">
                  Order Date: {order.date}
                </span>
                <span className="text-sm text-gray-500">
                  Order ID: {order.id}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <div className="relative">
                <select
                  value={status}
                  onChange={handleStatusChange}
                  className="appearance-none bg-gray-100 border border-gray-200 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
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
                <p className="text-sm">{order?.name}</p>
                <p className="text-sm text-gray-500">alex@example.com</p>
                <p className="text-sm text-gray-500">{order.details?.phone}</p>
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
                  Status: <span className="text-green-500">{order.status}</span>
                </p>
                <a
                  href="#"
                  className="text-sm text-green-500 hover:underline flex items-center"
                >
                  <GoDownload className="h-3 w-3 mr-1" />
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
                <p className="text-sm">{order.details?.address}</p>
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
                  {order.details.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-md flex items-center justify-center">
                            <span className="text-amber-800">🍦</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${item.price}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Order Summary */}
              <div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Subtotal:</span>
                    <span className="text-sm font-medium">
                      {calculateSubtotal()}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Shipping cost:
                    </span>
                    <span className="text-sm font-medium">$10.00</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200 mt-4">
                    <span className="text-sm font-medium">Grand total:</span>
                    <span className="text-lg font-bold">
                     ${(Number(calculateSubtotal()) + 10).toFixed(2)}
                    </span>
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
                  <button
                    onClick={handleSave}
                    className="!border !border-gray-200 !px-3 !py-1 !rounded-md !hover:bg-gray-100"
                  >
                    Save
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
