import axios from "axios";
import React, { useState, useMemo, useEffect } from "react";

const statusClasses = {
  Received: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [itemsPerPage] = useState(5);
  const baseUrl = "/data/data.json";
  const [data, setData] = useState([]);
  console.log(data);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filters, setFilters] = useState({
    orderId: "",
    customer: "",
    customer2: "",
    orderStatus: "",
    published: "",
    total: "",
    dataAdet: "",
    dateModified: "",
  });

  useEffect(() => {
    // const controller = new AbortController();

    const FetchData = async () => {
      try {
        console.log("So‘rov yuborilmoqda...");
        const res = await axios.get(baseUrl);
        console.log("So‘rov muvaffaqiyatli", res.data);
        setData(res.data);
        setLoading(true)
      } catch (error) {
        if (error.name === "CanceledError") {
          console.log("So‘rov abort qilindi");
        } else {
          console.error("malumot olishda xatolik bor", error);
        }
      } finally {
        setLoading(false);
      }
    };

    FetchData();

    // return () => {
    //   console.log("Cleanup: abort chaqirildi");
    //   controller.abort();
    // };
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter va search orqali yangi array hosil qilish uchun useMemo
  const filteredOrders = useMemo(() => {
    if (!data) return [];

    return data.filter((order) => {
      if (
        searchTerm &&
        !order.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;

      if (filters.id && !order.id.toString().includes(filters.id.toString()))
        return false;
      if (
        filters.name &&
        !order.name.toLowerCase().includes(filters.name.toLowerCase())
      )
        return false;
      if (filters.price && !order.price.includes(filters.price)) return false;
      if (filters.status && order.status !== filters.status) return false;
      if (filters.date && !order.date.includes(filters.date)) return false;

      return true;
    });
  }, [data, searchTerm, filterStatus, filters]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Paginate qilingan buyurtmalar
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getCurrentRange = () => {
    const range = [];
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

  // Agar filter yoki search o‘zgarsa sahifa 1 ga qaytadi
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filters]);

  if (loading) return <div>Ma’lumot yuklanmoqda...</div>;
  if (!data) return <div>Ma’lumot topilmadi</div>;

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Order List</h1>
        <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="w-full! max-w-7xl! mx-auto flex gap-6">
        {/* Left Table */}
        <div className="flex-1 w-full bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4 border-b pb-3">
            <input
              type="text"
              placeholder="Search by customer name..."
              className="border bg-gray-200 text-gray-700 border-gray-300 rounded px-4 py-2 w-1/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                // Hozircha show 20 ishlamayapti, balki kelajakda o‘zgartirish kiritish uchun
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
                        <button className="bg-green-400 text-white! px-4 py-2 rounded! hover:bg-green-600">
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Filter Panel */}
        <div className="w-80 bg-white rounded-lg shadow-lg p-6">
          <h2 className="font-bold text-lg mb-4">Filter by</h2>
          <div className="space-y-4">
            <label
              htmlFor="order-id"
              className="block text-sm font-medium mb-1!"
            >
              Order Id
            </label>
            <input
              name="id"
              placeholder="Order ID"
              value={filters.id}
              onChange={handleFilterChange}
              className="w-full border-none  bg-gray-100 px-3 py-2 rounded text-sm"
            />

            <label
              htmlFor="customer"
              className="block text-sm font-medium m-1! "
            >
              Customer
            </label>
            <input
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              className="w-full border-none bg-gray-100 px-3 py-2 rounded text-sm"
              placeholder="Enter customer"
            />

            <label
              htmlFor="customer2"
              className="block text-sm font-medium m-1! "
            >
              Customer 2
            </label>
            <input
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              className="w-full border-none bg-gray-100 px-3 py-2 rounded text-sm"
              placeholder="Enter customer 2"
            />

            <label
              htmlFor="orderStatus"
              className="block text-sm font-medium m-1! "
            >
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

            <label htmlFor="total" className="block text-sm font-medium m-1">
              Total
            </label>
            <input
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              className="w-full border-none bg-gray-100 px-3 py-2 rounded text-sm"
              placeholder="Enter total"
            />

            <label
              htmlFor="dateModified"
              className="block text-sm font-medium m-1!"
            >
              Date
            </label>
            <input
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="w-full border-none bg-gray-100 px-3 py-2 rounded text-sm"
              placeholder="Enter date (e.g. 07.05.2020)"
            />
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {getCurrentRange().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderList;
