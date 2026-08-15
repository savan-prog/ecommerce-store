import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/sidebar.css";

const Sidebar = () => {
  const [openProducts, setOpenProducts] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  //mobile menu close
  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };
  return (
    <>
      <button
        className="sidebar-mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <i className={`bx ${mobileOpen ? "bx-x" : "bx-menu"}`}></i>
      </button>
      <div
        className={`sidebar-overlay ${mobileOpen ? "sidebar-overlay-show" : ""}`}
        onClick={closeMobileSidebar}
      ></div>
      <nav
        id="sidebar"
        className={`${collapsed ? "collapsed" : ""}${mobileOpen ? "mobile-open" : ""}`}
      >
        <ul>
          <li className="sidebar-title">
            <NavLink to="/admin/dashboard" id="title">
              <span className="dashboard-text">Dashboard</span>
            </NavLink>
            <button
              className="sidebar-collapsed-btn"
              onClick={() => setCollapsed(!collapsed)}
            >
              <i className="bx bx-chevrons-right"></i>
            </button>
          </li>
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeMobileSidebar}
            >
              <i className="bx bx-home"></i>
              <span>Home</span>
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <button
              className="sidebar-toggle-btn"
              onClick={() => setOpenProducts(!openProducts)}
            >
              <div className="left-menu">
                <i className="bx bx-package"></i>
                <span>Products</span>
              </div>
              <i
                className={`bx bx-chevron-down ${openProducts ? "rotate" : ""}`}
              ></i>
            </button>
            <ul className={`submenu ${openProducts ? "show" : ""}`}>
              <li>
                <NavLink to="/admin/add-product" onClick={closeMobileSidebar}>
                  Add Product
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/manage-products"
                  onClick={closeMobileSidebar}
                >
                  Manage Products
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <button
              className="sidebar-toggle-btn"
              onClick={() => setOpenOrders(!openOrders)}
            >
              <div className="left-menu">
                <i className="bx bx-cart-add"></i>
                <span>Orders</span>
              </div>
              <i
                className={`bx bx-chevron-down ${openOrders ? "rotate" : ""}`}
              ></i>
            </button>
            <ul className={`submenu ${openOrders ? "show" : ""}`}>
              <li>
                <NavLink to="/admin/orders" onClick={closeMobileSidebar}>
                  Manage Orders
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <button
              className="sidebar-toggle-btn"
              onClick={() => setOpenUsers(!openUsers)}
            >
              <div className="left-menu">
                <i className="bx bx-user"></i>
                <span>Users</span>
              </div>
              <i
                className={`bx bx-chevron-down ${openUsers ? "rotate" : ""}`}
              ></i>
            </button>
            <ul className={`submenu ${openUsers ? "show" : ""}`}>
              <li>
                <NavLink to="/admin/users" onClick={closeMobileSidebar}>
                  Manage Users
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <button className="sidebar-logout-btn" onClick={handleLogout}>
              <i className="bx bx-log-out"></i>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
