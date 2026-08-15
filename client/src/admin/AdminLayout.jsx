import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../assets/css/admin-common.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
