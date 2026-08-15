import axios from "axios";
import React, { useEffect, useState } from "react";
import "../assets/css/manage-orders.css";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");

  const getOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  //update status function
  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      alert("Status Updated Successfully");
      getOrders();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  //search functionality
  const filteredOrders = orders.filter((order) => {
    return (
      order.user.name.toLowerCase().includes(search.toLowerCase()) ||
      order.user.email.toLowerCase().includes(search.toLowerCase()) ||
      order.status.toLowerCase().includes(search.toLowerCase())
    );
  });
  return (
    <div className="manage-orders">
      <div className="main-topbar">
        <div className="page-header">
          <h2>Dashboard</h2>
          <div className="breadcrumb">
            <span>Dashboard</span>
            <span>/ Orders</span>
            <span>/ Manage Orders</span>
          </div>
        </div>
      </div>
      <div className="orders-table-container">
        <div className="orders-top">
          <h3>Manage Orders</h3>
          <input
            type="text"
            placeholder="Search Order"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table className="orders-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => {
              return (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.user.name}</td>
                  <td>{order.user.email}</td>
                  <td>₹ {order.totalPrice}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#viewOrderModal"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="modal fade" id="viewOrderModal" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-warning">
              <h5 className="modal-title">Order Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              {selectedOrder && (
                <>
                  <p>
                    <strong>Customer Name : </strong>
                    {selectedOrder.user.name}
                  </p>
                  <p>
                    <strong>Email : </strong>
                    {selectedOrder.user.email}
                  </p>
                  <p>
                    <strong>Total : </strong> ₹{selectedOrder.totalPrice}
                  </p>
                  <p>
                    <strong>Status : </strong>
                    {selectedOrder.status}
                  </p>
                  <hr />
                  <h5>Products</h5>
                  {selectedOrder.orderItems.map((item, index) => (
                    <div key={index} className="border rounded p-2 mb-2">
                      <p>
                        <strong>Title : </strong>
                        {item.title}
                      </p>
                      <p>
                        <strong>Price : </strong> ₹{item.price}
                      </p>
                      <p>
                        <strong>Quantity : </strong>
                        {item.quantity}
                      </p>
                      <img src={item.image} alt={item.title} width="80" />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManageOrders;
