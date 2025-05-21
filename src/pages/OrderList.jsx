import axios from "axios";
import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

const statusClasses = {
  Received: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;
  const baseUrl = "/data/data.json";
  const [data, setData] = useState([]);

  // Filters state
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    customer2: "",
    status: "",
    price: "",
    date: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("So‘rov yuborilmoqda...");
        const res = await axios.get(baseUrl);
        console.log("So‘rov muvaffaqiyatli", res.data);
        setData(res.data);
      } catch (error) {
        console.error("Ma'lumot olishda xatolik bor", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter qilingan ma'lumotlar
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
      !order.customer2?.toLowerCase().includes(filters.customer2.toLowerCase())
    )
      return false;

    if (filters.price && !order.price.toString().includes(filters.price)) return false;

    if (filters.status && order.status !== filters.status) return false;

    if (filters.date) {
      const filterDate = new Date(filters.date);
      const orderDate = new Date(order.date);
      if (
        orderDate.getFullYear() !== filterDate.getFullYear() ||
        orderDate.getMonth() !== filterDate.getMonth() ||
        orderDate.getDate() !== filterDate.getDate()
      ) {
        return false;
      }
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
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  // Filter o'zgarganda sahifa 1 ga qaytadi
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  if (loading) return <div>Ma’lumot yuklanmoqda...</div>;
  if (!data.length) return <div>Ma’lumot topilmadi</div>;

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Order List</h1>
        <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="mx-auto flex flex-col md:flex-row gap-6">
        {/* Left Table */}
        <div className="flex-1 w-full bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
          <div className="flex justify-between items-center mb-4 border-b pb-3">
            <input
              type="text"
              placeholder="Search by customer name..."
              className="border bg-gray-200 text-gray-700 border-gray-300 rounded px-4 py-2 w-1/3"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
            />
            <div className="flex space-x-3 gap-5">
              <select
                className="border border-gray-300 bg-gray-200 text-gray-700 rounded px-4 py-2"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Status</option>
                <option value="Received">Received</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Pending">Pending</option>
              </select>
              <select
                className="border bg-gray-200 text-gray-700 border-gray-300 rounded px-4 py-2"
                disabled
              >
                <option>Show 20</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-gray-600 bg-gray-50 border-none">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th>Customer name</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  currentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-none h-[60px] hover:bg-gray-50"
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
                          {order.status}
                        </span>
                      </td>
                      <td>{order.date}</td>
                      <td>
                        <Link
                          to={`/order-details/${order.id}`}
                          className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Filter Panel */}
        <div className="w-full md:w-65 bg-white rounded-lg shadow-lg p-6">
          <h2 className="font-bold text-lg mb-4">Filter by</h2>
          <div className="space-y-4">
            <label htmlFor="order-id" className="block text-sm font-medium mb-1">
              Order Id
            </label>
            <input
              name="id"
              placeholder="Order ID"
              value={filters.id}
              onChange={handleFilterChange}
              className="w-full border-none  bg-gray-100 px-3 py-2 rounded text-sm"
            />

            <label htmlFor="customer" className="block text-sm font-medium mb-1">
              Customer
            </label>
            <input
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              className="w-full border-none bg-gray-100 px-3 py-2 rounded text-sm"
              placeholder="Enter customer"
            />

            <label htmlFor="customer2" className="block text-sm font-medium mb-1">
              Customer 2
            </label>
            <input
              name="customer2"
              value={filters.customer2}
              onChange={handleFilterChange}
              className="w-full border-none bg-gray-100 px-3 py-2 rounded text-sm"
              placeholder="Enter customer 2"
            />

            <label htmlFor="orderStatus" className="block text-sm font-medium mb-1">
              Order Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full border-none bg-gray-100 px-3 py-2 rounded text-sm"
            >
              <option value="">All</option>
              <option value="Received">Received</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <label htmlFor="total" className="block text-sm font-medium mb-1">
              Total
            </label>
            <input
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              className="w-full border-none bg-gray-100 px-3 py-2 rounded text-sm"
              placeholder="Enter total"
            />

            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="w-full border-none bg-gray-100 px-3 py-2 rounded text-sm"
            />
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-5 flex justify-center gap-2 items-center">
        <button
          className={`px-3 py-1 rounded border ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </button>

        {getCurrentRange().map((page, idx) =>
          page === "..." ? (
            <span key={`dots-${idx}`} className="px-3 py-1">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`px-3 py-1 rounded border ${
                page === currentPage ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          )
        )}

        <button
          className={`px-3 py-1 rounded border ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderList;
