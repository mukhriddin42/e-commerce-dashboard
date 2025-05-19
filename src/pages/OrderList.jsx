import React, { useState, useMemo } from "react";

const orders = [
  {
    id: 452,
    name: "Devon Lane",
    price: "$948.55",
    status: "Received",
    date: "07.05.2020",
  },
  {
    id: 789,
    name: "Guy Hawkins",
    price: "$0.00",
    status: "Cancelled",
    date: "25.05.2020",
  },
  {
    id: 478,
    name: "Leslie Alexander",
    price: "$293.01",
    status: "Pending",
    date: "18.05.2020",
  },
  {
    id: 589,
    name: "Albert Flores",
    price: "$105.55",
    status: "Pending",
    date: "07.02.2020",
  },
  {
    id: 345,
    name: "Eleanor Pena",
    price: "$779.58",
    status: "Received",
    date: "18.03.2020",
  },
  {
    id: 456,
    name: "Dianne Russell",
    price: "$576.28",
    status: "Received",
    date: "23.04.2020",
  },
  {
    id: 768,
    name: "Savannah Nguyen",
    price: "$589.99",
    status: "Received",
    date: "18.05.2020",
  },
  {
    id: 977,
    name: "Kathryn Murphy",
    price: "$149.43",
    status: "Received",
    date: "23.03.2020",
  },
  {
    id: 687,
    name: "Jacob Jones",
    price: "$219.78",
    status: "Received",
    date: "07.05.2020",
  },
  {
    id: 688,
    name: "Jacob Jones",
    price: "$219.78",
    status: "Received",
    date: "07.05.2020",
  },
  {
    id: 1000,
    name: "Jacob Jones",
    price: "$219.78",
    status: "Received",
    date: "07.05.2020",
  },
  {
    id: 1001,
    name: "Jacob Jones",
    price: "$219.78",
    status: "Received",
    date: "07.05.2020",
  },
  {
    id: 1002,
    name: "Jacob Jones",
    price: "$219.78",
    status: "Received",
    date: "07.05.2020",
  },
  {
    id: 1003,
    name: "Jacob Jones",
    price: "$219.78",
    status: "Received",
    date: "07.05.2020",
  },
  {
    id: 1004,
    name: "Jacob Jones",
    price: "$219.78",
    status: "Received",
    date: "07.05.2020",
  },
  {
    id: 1005,
    name: "Jacob Jones",
    price: "$219.78",
    status: "Received",
    date: "07.05.2020",
  },
];

const statusClasses = {
  Received: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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

    const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter va search orqali yangi array hosil qilish uchun useMemo
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
    if (searchTerm && !order.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
      if (
        filters.orderId &&
        !order.orderId.toLowerCase().includes(filters.orderId.toLowerCase())
      )
        return false;
      if (
        filters.customer &&
        !order.customer.toLowerCase().includes(filters.customer.toLowerCase())
      )
        return false;
      if (
        filters.customer2 &&
        !order.customer2.toLowerCase().includes(filters.customer2.toLowerCase())
      )
        return false;
      if (filters.orderStatus && order.orderStatus !== filters.orderStatus)
        return false;
      if (filters.published) {
        const pubBool = filters.published === "true";
        if (order.published !== pubBool) return false;
      }
      if (
        filters.total &&
        !order.total.toString().includes(filters.total.toString())
      )
        return false;
      if (
        filters.dataAdet &&
        !order.dataAdet.toString().includes(filters.dataAdet.toString())
      )
        return false;
      if (
        filters.dateModified &&
        !order.dateModified.includes(filters.dateModified)
      )
        return false;

      return true;
    });
  }, [searchTerm, filterStatus, filters]);

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
  }, [searchTerm, filterStatus]);

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Order List</h1>
        <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="w-full max-w-7xl mx-auto flex gap-6">
        {/* Left Table */}
        <div className="flex-1 w-[1000px] bg-white rounded-lg shadow-lg p-6">
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
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
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
                        <button className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-600">
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
            <label htmlFor="order-id">Order Id</label>
            <input
              name="orderId"
              value={filters.orderId}
              onChange={handleFilterChange}
              placeholder="Filter by Order Id"
              className="border rounded px-2 py-1"
            />
            <label htmlFor="customer">Customer</label>
            <input
              type="text"
              placeholder="Type here"
              className="bg-gray-200 text-gray-700 mb-4 mt-1 border border-gray-300 rounded px-1 py-2 w-full"
              disabled
            />
            <label htmlFor="order-status">Order Status</label>
            <select
              className="bg-gray-200 text-gray-700 mb-4 mt-1 border border-gray-300 rounded px-1 py-2 w-full"
              disabled
            >
              <option>Published</option>
            </select>
            <label htmlFor="total">Total</label>
            <input
              type="text"
              placeholder="Type here"
              className="bg-gray-200 text-gray-700 mb-4 mt-1 border border-gray-300 rounded px-1 py-2 w-full"
              disabled
            />
            <label htmlFor="data-adet">Data Adet</label>
            <input
              type="text"
              placeholder="Type here"
              className="bg-gray-200 text-gray-700 mb-4 mt-1 border border-gray-300 rounded px-1 py-2 w-full"
              disabled
            />
            <label htmlFor="date-modified">Date Modified</label>
            <input
              type="text"
              placeholder="Type here"
              className="bg-gray-200 text-gray-700 mb-4 mt-1 border border-gray-300 rounded px-1 py-2 w-full"
              disabled
            />
            <label htmlFor="customer">Customer</label>
            <input
              type="text"
              placeholder="Type here"
              className="bg-gray-200 text-gray-700 mb-4 mt-1 border border-gray-300 rounded px-1 py-2 w-full"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Pagination */}
      <nav className="flex justify-center items-center mt-8 gap-3 text-gray-500 font-semibold">
        <button
          className={`hover:text-gray-900 px-2 py-1 rounded ${
            currentPage === 1 ? "opacity-40 pointer-events-none" : ""
          }`}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        >
          &lt;
        </button>

        {getCurrentRange().map((page, idx) =>
          page === "..." ? (
            <span key={`dots-${idx}`} className="px-3 py-1 cursor-default">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`hover:text-gray-900 px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          )
        )}

        <button
          className={`hover:text-gray-900 px-2 py-1 rounded ${
            currentPage === totalPages ? "opacity-40 pointer-events-none" : ""
          }`}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        >
          &gt;
        </button>
      </nav>
    </div>
  );
};

export default OrderList;
