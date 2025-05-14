import React, { useState } from "react";

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
  const [curentPage, setCurentPage] = useState(1);
  const [curentPerPage] = useState(5);

  const indexOfLastDetails = curentPage * curentPerPage;
  const indexOfFirstDetails = indexOfLastDetails - curentPerPage;
  const curentDetails = orders.slice(indexOfFirstDetails, indexOfLastDetails);
  const totalPage = Math.ceil(orders.length / curentPerPage);

  const getCurrentRange = () => {
    const range = [];
    if (totalPage <= 5) {
      return Array.from({length:totalPage},(_,i)=>i+1)
    }

    if (curentPage <= 3) {
      range.push(1, 2, 3, 4, "...", totalPage);
      return range;
    }

    if (curentPage >= totalPage - 2) {
      range.push(
        1,
        "...",
        totalPage - 4,
        totalPage - 3,
        totalPage - 2,
        totalPage - 1,
        totalPage
      );
      return range;
    }

    range.push(
      1,
      "...",
      curentPage - 1,
      curentPage,
      curentPage + 1,
      "...",
      totalPage
    );
    return range;
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Order List</h1>
        <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="w-full max-w-[2020px] mx-auto flex gap-6">
        {/* Left Table */}
        <div className="flex-1 w-[1000px] bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4 border-b pb-3">
            <input
              type="text"
              placeholder="Search..."
              className="border bg-gray-200 text-gray-500! border-gray-300 rounded px-4 py-2 w-1/3"
            />
            <div className="flex space-x-3 gap-5">
              <select className="border border-gray-300 bg-gray-200 text-gray-500! rounded px-4 py-2">
                <option>Status</option>
              </select>
              <select className="border bg-gray-200 text-gray-500! border-gray-300 rounded px-4 py-2">
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
                {curentDetails.map((order) => (
                  <tr
                    key={order.id}
                    className="border-none h-[60px] hover:bg-gray-50"
                  >
                    <td className="p-2!">{order.id}</td>
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
                      <button className="bg-green-400 text-white! px-4 py-2 rounded-[8px]! hover:bg-green-600">
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
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
              type="text"
              placeholder="Type here"
              className="border-none bg-gray-200 text-gray-500! mb-4! mt-1! border-gray-300 rounded px-1 py-2 w-full"
            />
            <label htmlFor="customer">Customer</label>
            <input
              type="text"
              placeholder="Type here"
              className="border-none bg-gray-200 text-gray-500! mb-4! mt-1! border-gray-300 rounded px-1 py-2 w-full"
            />
            <label htmlFor="order-status">Order Status</label>
            <select className="border-none border-gray-300 bg-gray-200 mt-1! mb-4! text-gray-400! rounded px-1 py-2 w-full">
              <option>Published</option>
            </select>
            <label htmlFor="total">Total</label>
            <input
              type="text"
              placeholder="Type here"
              className="border-none bg-gray-200 text-gray-500! mb-4! mt-1! border-gray-300 rounded px-1 py-2 w-full"
            />
            <label htmlFor="data-adet">Data Adet</label>
            <input
              type="text"
              placeholder="Type here"
              className="border-none bg-gray-200 text-gray-500! mb-4! mt-1! border-gray-300 rounded px-1 py-2 w-full"
            />
            <label htmlFor="date-modified">Date Modified</label>
            <input
              type="text"
              placeholder="Type here"
              className="border-none bg-gray-200 text-gray-500! mb-4! mt-1! border-gray-300 rounded px-1 py-2 w-full"
            />
            <label htmlFor="customer">Customer</label>
            <input
              type="text"
              placeholder="Type here"
              className="border-none bg-gray-200 text-gray-500! mb-4! mt-1! border-gray-300 rounded px-1 py-2 w-full"
            />
          </div>
        </div>
      </div>

      <div className="m-5 flex gap-1">
        <button disabled={curentPage===1} onClick={() => setCurentPage((prev) => Math.max(prev - 1, 1))} className={`${curentPage===1?'opacity-0':'opacity-100'}`}>
          Prev
        </button>
        {getCurrentRange().map((page, index) => {
          return (
            <button key={index} onClick={()=>{
              if(page!=='...'){
                setCurentPage(page)
              }
            }} className={`w-[60px] h-[40px] text-[18px]! border p-1 ${page === curentPage ? 'bg-green-500 text-amber-50!': page==='...'?'bg-gray-400 text-gray-200':'bg-white text-black'}`}>
              {page}
            </button>
          );
        })}
        <button
          disabled={curentPage===totalPage}
          onClick={() => setCurentPage((prev) => Math.min(prev + 1, totalPage))}
          className={`${curentPage===totalPage?'opacity-0':'opacity-100'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderList;
