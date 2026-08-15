import React, { useEffect, useState } from "react";
import "../assets/css/admin-dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });

  const getDashboardStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStats({
        totalProducts: res.data.totalProducts,
        totalUsers: res.data.totalUsers,
        totalOrders: res.data.totalOrders,
        pendingOrders: res.data.pendingOrders,
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getDashboardStats();
  }, []);
  return (
    <div className="dashboard">
      <div className="main-topbar">
        <div className="main-topbar-content">
          <h2>Dashboard</h2>
          <p>Welcome back Admin 👋</p>
        </div>
      </div>
      <div className="dashboard-home">
        <div className="dashboard-card">
          <i className="bx bx-package"></i>
          <h3>{stats.totalProducts}</h3>
          <p>Total Products</p>
        </div>
        <div className="dashboard-card">
          <i className="bx bx-user"></i>
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </div>
        <div className="dashboard-card">
          <i className="bx bx-cart"></i>
          <h3>{stats.totalOrders}</h3>
          <p>Total Orders</p>
        </div>
        <div className="dashboard-card">
          <i className="bx bx-time-five"></i>
          <h3>{stats.pendingOrders}</h3>
          <p>Pending Orders</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
