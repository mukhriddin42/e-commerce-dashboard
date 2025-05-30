import axios from "axios";
import React, { useState, useMemo, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../hooks/useContext";
import { useTranslation } from 'react-i18next';

const statusClasses = {
  Received: "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200",
  Pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200",
};

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;
  const baseUrl = "/data/data.json";
  const [data, setData] = useState([]);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [filters, setFilters] = useState({
    id: "",
    name: "",
    customer2: "",
    status: "",
    price: "",
    date: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("So‘rov yuborilmoqda...");
        const res = await axios.get(baseUrl);
        console.log("So‘rov muvaffaqiyatli", res.data);
        setData(res.data);
      } catch (error) {
        if (error.name === "CanceledError") {
          console.log("So‘rov abort qilindi");
        } else {
          console.error("Malumot olishda xatolik bor", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredOrders = useMemo(() => {
    return data.filter((order) => {
      if (filters.id && !order.id.toString().includes(filters.id.toString()))
        return false;
      if (
        filters.name &&
        !order.name.toLowerCase().includes(filters.name.toLowerCase())
      )
        return false;
      if (
        filters.customer2 &&
        !order.customer2
          ?.toLowerCase()
          .includes(filters.customer2.toLowerCase())
      )
        return false;
      if (filters.price && !order.price.toString().includes(filters.price))
        return false;
      if (filters.status && order.status !== filters.status) return false;
      if (filters.date) {
        const filterDate = new Date(filters.date);
        const orderDate = new Date(order.date);
        if (
          orderDate.getFullYear() !== filterDate.getFullYear() ||
          orderDate.getMonth() !== filterDate.getMonth() ||
          orderDate.getDate() !== filterDate.getDate()
        )
          return false;
      }
      return true;
    });
  }, [data, filters]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getCurrentRange = () => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

if (loading)
  return (
    <div className="text-gray-700 dark:text-gray-200">
      {t('order_list.loading')}
    </div>
  );
if (!data.length)
  return (
    <div className="text-gray-700 dark:text-gray-200">
      {t('order_list.not_found')}
    </div>
  );

return (
  <div
    className={`min-h-screen w-full p-6 ${
      theme === "black" ? "dark:bg-gray-900" : "bg-gray-100"
    }`}
  >
    <div className="mb-4">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        {t('order_list.order_list')}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        {t('order_list.order_subtitle')}
      </p>
    </div>

    <div className="mx-auto flex flex-col md:flex-row gap-6">
      <div className={`flex-1 w-full ${theme === 'black' ? 'dark:bg-gray-800':'bg-white'} rounded-lg shadow-lg p-6 overflow-x-auto`}>
        <div className={`flex justify-between items-center mb-4 border-b ${theme === 'black'?' dark:border-gray-700':'border-gray-200'} pb-3`}>
          <input
            type="text"
            placeholder={t('order_list.search_name')}
            className={`border ${theme === 'black'?'dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600':'bg-gray-200 text-gray-700 border-gray-300'} rounded px-4 py-2 w-1/3`}
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
          />
          <div className="flex space-x-3 gap-5">
            <select
              className={`border ${theme === 'black'?'dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600':'bg-gray-200 text-gray-700 border-gray-300'} rounded px-4 py-2`}
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">{t('order_list.all_status')}</option>
              <option value="Received">{t('order_list.received')}</option>
              <option value="Cancelled">{t('order_list.cancelled')}</option>
              <option value="Pending">{t('order_list.pending')}</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className={`w-full text-sm text-left ${theme === 'black'?'dark:text-gray-300':'text-gray-600'}`}>
            <thead className={`${theme === 'black'?'bg-gray-700 text-gray-300':'bg-gray-50 text-gray-600'}`}>
              <tr>
                <th className="py-3 pl-1 px-4">{t('order_list.id')}</th>
                <th>{t('order_list.customer_name')}</th>
                <th>{t('order_list.price')}</th>
                <th>{t('order_list.status')}</th>
                <th>{t('order_list.date')}</th>
                <th>{t('order_list.action')}</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500 dark:text-gray-400">
                    {t('order_list.not_found')}
                  </td>
                </tr>
              ) : (
                currentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className={`border-none h-[60px] ${theme === 'black'?'dark:hover:bg-gray-700':'hover:bg-gray-50'}`}
                  >
                    <td className="p-2">{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.price}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          statusClasses[order.status]
                        }`}
                      >
                        {t(`order_list.${order.status.toLowerCase()}`)}
                      </span>
                    </td>
                    <td>{order.date}</td>
                    <td>
                      <button
                        onClick={() => navigate(`/order-details/${order.id}`)}
                        className="bg-green-500 text-white! px-3 py-1.5 rounded! hover:bg-green-600"
                      >
                        {t('order_list.detail')}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filter panel */}
      <div className={`w-full md:w-65 ${theme === 'black'?'dark:bg-gray-800':'bg-white'} rounded-lg shadow-lg p-6`}>
        <h2 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">
          {t('order_list.filter_by')}
        </h2>
        <div className={`space-y-4 ${theme === 'black'?'dark:text-gray-200':'text-gray-700'}`}>
          {["id", "name", "customer2", "price", "date"].map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {t(`order_list.${key}`)}
              </label>
              <input
                placeholder={t('order_list.type_here')}
                name={key}
                type={key === "date" ? "date" : "text"}
                value={filters[key]}
                onChange={handleFilterChange}
                className={`w-full border-none ${theme === 'black' ?'dark:bg-gray-700 dark:text-gray-200':'bg-gray-100 text-gray-900'} rounded px-3 py-2`}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">{t('order_list.status')}</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className={`w-full border-none ${theme === 'black' ?'dark:bg-gray-700 dark:text-gray-200':'bg-gray-100 text-gray-900'} rounded px-3 py-2`}
            >
              <option value="">{t('order_list.all')}</option>
              <option value="Received">{t('order_list.received')}</option>
              <option value="Cancelled">{t('order_list.cancelled')}</option>
              <option value="Pending">{t('order_list.pending')}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    {/* Pagination */}
    <div className={`mt-6 flex justify-center space-x-2 ${theme === 'black'?'dark:text-gray-300':'text-gray-700'}`}>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        {t('order_list.prev')}
      </button>
      {getCurrentRange().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 py-1">...</span>
        ) : (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        {t('order_list.next')}
      </button>
    </div>
  </div>
);
};

export default OrderList;