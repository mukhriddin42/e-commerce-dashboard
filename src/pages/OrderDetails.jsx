import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { GoDownload } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../hooks/useContext";
import { useTranslation } from 'react-i18next';

const OrderDetails = () => {
  const { id } = useParams(); // URL dan orderId olish
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const calculateSubtotal = () => {
    return order.details.items
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const { theme } = useContext(ThemeContext);

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
    setOrder((prevOrder) => ({
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

  if (loading) return <div>{t('order_detail.loading')}</div>;
  if (!order) return <div>{t("order_detail.order_not_found")}</div>;

  return (
    <div
      className={`${
        theme === "black" ? "bg-gray-900" : "bg-gray-50"
      } min-h-screen p-6`}
    >
      <div className="w-50! text-[20px]! ml-8 mb-2.5 font-semibold!">
        <p>{t('order_detail.order_detail')}</p>
        <h6
          className={`${
            theme === "black" ? "text-gray-400" : "text-gray-500"
          } text-[12px]!`}
        >
          {t("order_detail.details_for_order_id", { id: order.id })}
        </h6>
      </div>
      <div
        className={`${
          theme === "black" ? "bg-gray-700" : "bg-white"
        } max-w-7xl mx-auto p-6 shadow-sm`}
      >
        <div className="flex flex-col space-y-6" >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-start space-x-2">
              <CiCalendar
                className={`${
                  theme === "black" ? "text-gray-400" : "text-gray-500"
                } h-5 w-5 mt-0.5`}
              />
              <div className="flex flex-col">
                <span
                  className={`${
                    theme === "black" ? "text-gray-400" : "text-gray-500"
                  } text-sm`}
                >
                  {t('order_detail.order_date')} {order.date}
                </span>
                <span
                  className={`${
                    theme === "black" ? "text-gray-400" : "text-gray-500"
                  } text-sm`}
                >
                  {t("order_detail.order_id", { id: order.id })}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <div className="relative">
                <select
                  value={status}
                  onChange={handleStatusChange}
                  className={`appearance-none ${
                    theme === "black"
                      ? "bg-gray-700 border-gray-600 text-gray-300"
                      : "bg-gray-100 border-gray-200 text-gray-900"
                  } rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500`}
                >
                  <option>{t('order_detail.change_status')}</option>
                  <option>{t('order_detail.processing')}</option>
                  <option>{t('order_detail.shipped')}</option>
                  <option>{t('order_detail.delivered')}</option>
                  <option>{t('order_detail.cancelled')}</option>
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
              <button className="bg-green-500 h-[30px] w-[60px] mr-1.5! hover:bg-green-600 text-white">
                {t('order_detail.save')}
              </button>
              <button
                variant="outline"
                className={`${
                  theme === "black"
                    ? "border-gray-600 text-gray-300"
                    : "border-gray-200"
                }`}
              >
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
                <h3
                  className={`${
                    theme === "black" ? "text-gray-300" : "text-gray-900"
                  } text-sm font-medium mb-2`}
                >
                  {t('order_detail.customer')}
                </h3>
                <p className="text-sm">{order?.name}</p>
                <p
                  className={`${
                    theme === "black" ? "text-gray-400" : "text-gray-500"
                  } text-sm`}
                >
                  alex@example.com
                </p>
                <p
                  className={`${
                    theme === "black" ? "text-gray-400" : "text-gray-500"
                  } text-sm`}
                >
                  {order.details?.phone}
                </p>
                <a href="#" className="text-sm text-green-500 hover:underline">
                  {t('order_detail.view_profile')}
                </a>
              </div>
            </div>

            {/* Order Info */}
            <div className="flex space-x-3">
              <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-500 text-lg">📦</span>
              </div>
              <div>
                <h3
                  className={`${
                    theme === "black" ? "text-gray-300" : "text-gray-900"
                  } text-sm font-medium mb-2`}
                >
                  {t('order_detail.order_info')}
                </h3>
                <p className="text-sm">{t('order_detail.shipping_express')}</p>
                <p className="text-sm">{t('order_detail.pay_method_card')}</p>
                <p className="text-sm">
                  {t('order_detail.status')} <span className="text-green-500">{order.status}</span>
                </p>
                <a
                  href="#"
                  className="text-sm text-green-500 hover:underline flex items-center"
                >
                  <GoDownload className="h-3 w-3 mr-1" />
                  {t('order_detail.download_info')}
                </a>
              </div>
            </div>

            {/* Deliver To */}
            <div className="flex space-x-3">
              <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-500 text-lg">🏠</span>
              </div>
              <div>
                <h3
                  className={`${
                    theme === "black" ? "text-gray-300" : "text-gray-900"
                  } text-sm font-medium mb-2`}
                >
                  {t('order_detail.delivered')}
                </h3>
                <p className="text-sm">{t('order_detail.city')} Toshkent, O‘zbekiston</p>
                <p className="text-sm">{order.details?.address}</p>
                <p className="text-sm">Po Box 10000</p>
                <a href="#" className="text-sm text-green-500 hover:underline">
                  {t('order_detail.view_profile')}
                </a>
              </div>
            </div>
          </div>

          <div className="w-full! flex gap-5">
            {/* Product Table */}
            <div className="w-2/3! mt-5">
              <table
                className={`${
                  theme === "black" ? "text-gray-300" : "text-gray-900"
                } min-w-full divide-y divide-gray-200 mb-1`}
              >
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t('order_detail.product')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t('order_detail.unit-price')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t('order_detail.quantity')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t('order_detail.total')}
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`${
                    theme === "black"
                      ? "bg-gray-800 divide-gray-700"
                      : "bg-white divide-gray-200"
                  } border-separate! border-spacing-y-2!`}
                >
                  {order.details.items.map((item, index) => (
                    <tr key={index} className="h-[70px] border-b">
                      <td className="px-3! p-5 lmpy-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-amber-100 rounded-md flex items-center justify-center">
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
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Order Summary */}
              <div>
                <div
                  className={`${
                    theme === "black" ? "bg-gray-700" : "bg-gray-50"
                  } pt-4! pl-4 rounded-md`}
                >
                  <div className="flex justify-between mb-2">
                    <span
                      className={`${
                        theme === "black" ? "text-gray-300" : "text-gray-600"
                      } text-sm`}
                    >
                      {t('order_detail.subtotal')}
                    </span>
                    <span
                      className={`${
                        theme === "black" ? "text-gray-300" : "text-gray-900"
                      } text-sm font-medium`}
                    >
                      {calculateSubtotal()}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span
                      className={`${
                        theme === "black" ? "text-gray-300" : "text-gray-600"
                      } text-sm`}
                    >
                      {t('order_detail.shipping_cost')}
                    </span>
                    <span
                      className={`${
                        theme === "black" ? "text-gray-300" : "text-gray-900"
                      } text-sm font-medium`}
                    >
                      $10.00
                    </span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200 mt-4">
                    <span
                      className={`${
                        theme === "black" ? "text-gray-300" : "text-gray-600"
                      } text-sm font-semibold`}
                    >
                      {t('order_detail.grand_total')}
                    </span>
                    <span
                      className={`${
                        theme === "black" ? "text-green-400" : "text-green-600"
                      } text-sm font-semibold`}
                    >
                      ${(Number(calculateSubtotal()) + 10).toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-6">
                    <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-md inline-block">
                      {t('order_detail.payment_done')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary and Payment Info */}
            <div className="w-1/3">
              {/* Payment Info */}
              <div
                className={`${
                  theme === "black" ? "bg-gray-700" : "bg-gray-50"
                } p-6 rounded-md`}
              >
                <h3
                  className={`${
                    theme === "black" ? "text-gray-300" : "text-gray-900"
                  } mb-4 text-lg font-semibold`}
                >
                  {t('order_detail.pay_method_card')}
                </h3>
                <div className={`${
                  theme === "black" ? "bg-gray-700" : "bg-gray-50"
                } pt-3 pb-3 rounded-md`}>
                  <div className={`${
                  theme === "black" ? "bg-gray-800" : "bg-gray-600"
                } p-3 rounded-md flex justify-center items-center`}>
                    <div className="h-5 w-5 rounded-full bg-red-500 mr-2"></div>
                    <span className={`${theme === 'black' ? 'text-gray-50' : 'text-gray-300'}`}>
                      Master Card **** **** **** 4768
                    </span>
                  </div>
                  <p className="text-sm">{t('order_detail.biznes_name')} Grand Market LLC</p>
                  <p className="text-sm">{t('order_detail.phone')} +1 (800) 555-154-52</p>
                  <p
                      className={`${
                        theme === "black" ? "text-gray-300" : "text-gray-900"
                      } mb-2 font-semibold text-[20px]`}
                    >
                      {t('order_detail.grand_total')} ${calculateSubtotal()}
                    </p>
                </div>

                <h3 className="text-sm font-medium mt-6 mb-4">Notes</h3>
                <div  className={`${
                    theme === "black"
                      ? "bg-gray-800 divide-gray-700"
                      : "bg-white divide-gray-200"
                  } h-32 p1`}>
                  <textarea
                    className="w-full p-1 h-full bg-transparent border-0 focus:ring-0 resize-none text-sm"
                    placeholder="Add notes about the order"
                  ></textarea>
                </div>
                <div className="mt-2">
                  <button
                    onClick={handleSave}
                    className="!border !border-gray-200 !px-3 !py-1 !rounded-md !hover:bg-gray-100"
                  >
                    {t('order_detail.save')}
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
