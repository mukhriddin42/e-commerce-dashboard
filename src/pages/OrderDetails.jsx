import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams(); // URL dan orderId olish
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="p-6 bg-white rounded shadow max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Order Details #{order.id}</h1>
      <p>
        <strong>Customer Name:</strong> {order.name}
      </p>
      <p>
        <strong>Price:</strong> {order.price}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p>
        <strong>Date:</strong> {order.date}
      </p>
      {/* Qo‘shimcha order ma’lumotlarini shunga o‘xshab qo‘shing */}
      <button
        onClick={() => navigate("/order-list")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Orders
      </button>
    </div>
  );
};

export default OrderDetails;
